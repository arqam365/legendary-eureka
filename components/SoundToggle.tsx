"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

declare global {
    interface Window {
        __ambientAudio?: HTMLAudioElement;
        __ambientBC?: BroadcastChannel | null;
        __ambientBound?: boolean; // to avoid double-binding media events
    }
}

type Props = {
    src?: string;
    className?: string;
    /** If true, do not auto-play on first visit even if localStorage says "on". */
    respectFirstMountOff?: boolean;
};

const LS_KEY = "ambient-sound";
const LS_AT  = "ambient-sound-updated-at"; // number (ms)

const now = () => Date.now();

const getSaved = () => {
    try {
        return {
            enabled: localStorage.getItem(LS_KEY) === "on",
            updatedAt: Number(localStorage.getItem(LS_AT) || "0"),
        };
    } catch {
        return { enabled: false, updatedAt: 0 };
    }
};

const save = (enabled: boolean, updatedAt: number) => {
    try {
        localStorage.setItem(LS_KEY, enabled ? "on" : "off");
        localStorage.setItem(LS_AT, String(updatedAt));
    } catch {}
};

export default function SoundToggle({
                                        src = "/audio/ambient.mp3",
                                        className = "",
                                        respectFirstMountOff = false,
                                    }: Props) {
    const prefersReduced = useReducedMotion();

    const [mounted, setMounted] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [isActuallyPlaying, setIsActuallyPlaying] = useState(false);

    // The last state change we believe is authoritative (ms since epoch).
    const localStampRef = useRef<number>(0);

    // Guard SSR / hydration
    useEffect(() => setMounted(true), []);

    // Create/attach singleton audio and cross-tab channel
    useEffect(() => {
        if (!mounted || typeof window === "undefined") return;

        // Create singleton audio (or reuse)
        if (!window.__ambientAudio) {
            const a = new Audio(src);
            a.loop = true;
            a.preload = "auto";
            a.autoplay = false; // never start by itself
            a.volume = 0.12;
            window.__ambientAudio = a;
        } else {
            // If you sometimes change files:
            const a = window.__ambientAudio!;
            if (!a.src.endsWith(src)) a.src = src;
        }

        // Bind media events exactly once per app lifetime
        if (!window.__ambientBound) {
            const a = window.__ambientAudio!;
            const sync = () => setIsActuallyPlaying(!a.paused);
            const onPlay   = () => sync();
            const onPause  = () => sync();
            const onEnded  = () => sync();
            const onAbort  = () => sync();
            const onStall  = () => sync();
            const onSuspend= () => sync();

            a.addEventListener("playing", onPlay);
            a.addEventListener("pause", onPause);
            a.addEventListener("ended", onEnded);
            a.addEventListener("abort", onAbort);
            a.addEventListener("stalled", onStall);
            a.addEventListener("suspend", onSuspend);

            // mark bound once
            window.__ambientBound = true;
            // initial sync
            sync();
        } else {
            // already bound; just reflect current state
            setIsActuallyPlaying(!window.__ambientAudio!.paused);
        }

        // Setup BroadcastChannel (if supported)
        if ("BroadcastChannel" in window) {
            window.__ambientBC ??= new BroadcastChannel("ambient-sound");
            const bc = window.__ambientBC;

            const onMsg = (ev: MessageEvent) => {
                const data = ev?.data;
                if (!data || data.type !== "ambient:set") return;
                const { enabled: remoteEnabled, updatedAt: remoteAt } = data as {
                    enabled: boolean;
                    updatedAt: number;
                };

                // Only accept newer states
                if (remoteAt > localStampRef.current) {
                    applyEnabled(remoteEnabled, /*fromRemote*/ true, remoteAt);
                }
            };

            bc!.addEventListener("message", onMsg);
            return () => bc!.removeEventListener("message", onMsg);
        }

        // Fallback: storage events
        const onStorage = (e: StorageEvent) => {
            if (!e.key) return;
            if (e.key === LS_AT) {
                const remoteAt = Number(e.newValue || "0");
                const { enabled: remoteEnabled } = getSaved();
                if (remoteAt > localStampRef.current) {
                    applyEnabled(remoteEnabled, /*fromRemote*/ true, remoteAt);
                }
            }
        };
        const w = window as Window & typeof globalThis;
        w.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage as EventListener);
    }, [mounted, src]);

    // Initial state restore (with optional “never autoplay on first mount”)
    useEffect(() => {
        if (!mounted || typeof window === "undefined") return;

        const saved = getSaved();
        localStampRef.current = saved.updatedAt || 0;

        if (respectFirstMountOff) {
            // Force it off and record that as the newest decision
            const stamped = now();
            localStampRef.current = stamped;
            setEnabled(false);
            save(false, stamped);
            // do not play
            return;
        }

        const wantsOn = saved.enabled && !prefersReduced;
        setEnabled(wantsOn);

        // If saved says "on", we still only play if this decision is the newest
        // (it will be if this is the first mount or the latest write)
        if (wantsOn) applyEnabled(true, /*fromRemote*/ true, saved.updatedAt || now());
    }, [mounted, prefersReduced, respectFirstMountOff]);

    // Central state applier with timestamp arbitration
    function applyEnabled(next: boolean, fromRemote = false, stamp?: number) {
        if (typeof window === "undefined" || !window.__ambientAudio) return;
        const a = window.__ambientAudio;

        const effectiveStamp = stamp ?? now();

        // If the incoming decision is older/equal, ignore
        if (effectiveStamp <= localStampRef.current) return;

        // Advance our local authoritative stamp
        localStampRef.current = effectiveStamp;

        // Update UI intent
        setEnabled(next);

        // Control the audio element
        try {
            if (next && !prefersReduced) {
                void a.play().catch(() => {
                    // If play fails (e.g. without a user gesture), record OFF so UI stays consistent
                    const failStamp = now();
                    localStampRef.current = failStamp;
                    setEnabled(false);
                    save(false, failStamp);
                    postEnabled(false, failStamp);
                });
            } else {
                a.pause();
                a.currentTime = 0; // avoid odd auto-resume on some WebKit cases
            }
        } catch {
            // swallow
        }

        // Persist + broadcast if this was a local action
        if (!fromRemote) {
            save(next, effectiveStamp);
            postEnabled(next, effectiveStamp);
        }
    }

    function postEnabled(next: boolean, updatedAt: number) {
        try {
            if (window.__ambientBC) {
                window.__ambientBC.postMessage({ type: "ambient:set", enabled: next, updatedAt });
            } else {
                // storage fallback uses LS_AT write in save()
                // nothing else required here
            }
        } catch {}
    }

    // Toggle handler always creates a *newer* decision
    const onToggle = () => {
        const next = !(enabled && isActuallyPlaying);
        applyEnabled(next, /*fromRemote*/ false, now());
    };

    if (!mounted) return null;

    const label = enabled && isActuallyPlaying ? "Sound on" : "Sound off";
    const Icon = enabled && isActuallyPlaying ? Volume2 : VolumeX;

    return (
        <div
            className={[
                "fixed z-50",
                "bottom-[calc(1rem+env(safe-area-inset-bottom,0px))]",
                "right-[calc(1rem+env(safe-area-inset-right,0px))]",
                "sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]",
                "sm:right-[calc(1.25rem+env(safe-area-inset-right,0px))]",
                className,
            ].join(" ")}
        >
            {/* Mobile */}
            <div className="sm:hidden">
                <button
                    type="button"
                    onClick={onToggle}
                    aria-pressed={enabled && isActuallyPlaying}
                    aria-label={label}
                    title={label}
                    className="h-11 w-11 rounded-full bg-white/75 backdrop-blur-md border border-white/60 shadow-sm flex items-center justify-center active:scale-[0.98] transition"
                >
                    <Icon className="h-5 w-5 text-gray-800" />
                </button>
            </div>

            {/* Desktop */}
            <div className="hidden sm:block">
                <Button
                    variant="outline"
                    onClick={onToggle}
                    aria-pressed={enabled && isActuallyPlaying}
                    aria-label={label}
                    title={label}
                    className="backdrop-blur-md bg-white/70 border-white/60 shadow-sm px-3.5 py-2"
                >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                </Button>
            </div>
        </div>
    );
}