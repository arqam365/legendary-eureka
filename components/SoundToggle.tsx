"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

declare global {
    interface Window {
        __ambientAudio?: HTMLAudioElement;
        __ambientBC?: BroadcastChannel | null;
        __ambientBound?: boolean;
    }
}

type Props = {
    src?: string;
    className?: string;
    respectFirstMountOff?: boolean;
};

const LS_KEY = "ambient-sound";
const LS_AT = "ambient-sound-updated-at";

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

    const localStampRef = useRef<number>(0);
    useEffect(() => setMounted(true), []);

    /* ------------------- setup audio + sync ------------------- */
    useEffect(() => {
        if (!mounted || typeof window === "undefined") return;

        if (!window.__ambientAudio) {
            const a = new Audio(src);
            a.loop = true;
            a.preload = "auto";
            a.autoplay = false;
            a.volume = 0.12;
            window.__ambientAudio = a;
        } else {
            const a = window.__ambientAudio!;
            if (!a.src.endsWith(src)) a.src = src;
        }

        if (!window.__ambientBound) {
            const a = window.__ambientAudio!;
            const sync = () => setIsActuallyPlaying(!a.paused);
            ["playing", "pause", "ended", "abort", "stalled", "suspend"].forEach((ev) =>
                a.addEventListener(ev, sync)
            );
            window.__ambientBound = true;
            sync();
        } else {
            setIsActuallyPlaying(!window.__ambientAudio!.paused);
        }

        if ("BroadcastChannel" in window) {
            window.__ambientBC ??= new BroadcastChannel("ambient-sound");
            const bc = window.__ambientBC;
            const onMsg = (ev: MessageEvent) => {
                if (ev?.data?.type !== "ambient:set") return;
                const { enabled: remoteEnabled, updatedAt: remoteAt } = ev.data;
                if (remoteAt > localStampRef.current) {
                    applyEnabled(remoteEnabled, true, remoteAt);
                }
            };
            bc!.addEventListener("message", onMsg);
            return () => bc!.removeEventListener("message", onMsg);
        }

        const onStorage = (e: StorageEvent) => {
            if (e.key === LS_AT) {
                const remoteAt = Number(e.newValue || "0");
                const { enabled: remoteEnabled } = getSaved();
                if (remoteAt > localStampRef.current) {
                    applyEnabled(remoteEnabled, true, remoteAt);
                }
            }
        };
        const w = window as Window & typeof globalThis;
        w.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage as EventListener);
    }, [mounted, src]);

    /* ------------------- restore saved state ------------------- */
    useEffect(() => {
        if (!mounted || typeof window === "undefined") return;
        const saved = getSaved();
        localStampRef.current = saved.updatedAt || 0;

        if (respectFirstMountOff) {
            const stamped = now();
            localStampRef.current = stamped;
            setEnabled(false);
            save(false, stamped);
            return;
        }
        const wantsOn = saved.enabled && !prefersReduced;
        setEnabled(wantsOn);
        if (wantsOn) applyEnabled(true, true, saved.updatedAt || now());
    }, [mounted, prefersReduced, respectFirstMountOff]);

    /* ------------------- core apply ------------------- */
    function applyEnabled(next: boolean, fromRemote = false, stamp?: number) {
        if (!window.__ambientAudio) return;
        const a = window.__ambientAudio;
        const effectiveStamp = stamp ?? now();
        if (effectiveStamp <= localStampRef.current) return;
        localStampRef.current = effectiveStamp;
        setEnabled(next);
        try {
            if (next && !prefersReduced) {
                void a.play().catch(() => {
                    const failStamp = now();
                    localStampRef.current = failStamp;
                    setEnabled(false);
                    save(false, failStamp);
                    postEnabled(false, failStamp);
                });
            } else {
                a.pause();
                a.currentTime = 0;
            }
        } catch {}
        if (!fromRemote) {
            save(next, effectiveStamp);
            postEnabled(next, effectiveStamp);
        }
    }
    function postEnabled(next: boolean, updatedAt: number) {
        try {
            if (window.__ambientBC) {
                window.__ambientBC.postMessage({ type: "ambient:set", enabled: next, updatedAt });
            }
        } catch {}
    }

    const onToggle = () => {
        const next = !(enabled && isActuallyPlaying);
        applyEnabled(next, false, now());
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
                className,
            ].join(" ")}
        >
            {/* Mobile: round icon */}
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

            {/* Desktop: floating pill, expands on hover */}
            <div className="hidden sm:block pointer-events-auto">
                <Button
                    variant="outline"
                    onClick={onToggle}
                    aria-pressed={enabled && isActuallyPlaying}
                    aria-label={label}
                    title={label}
                    className={[
                        "group flex items-center gap-2 rounded-full",
                        "border border-white/60 bg-white/80 backdrop-blur-md",
                        "shadow-lg hover:shadow-xl",
                        "pl-3 pr-3 py-2",
                        "whitespace-nowrap",
                    ].join(" ")}
                >
                    <Icon className="h-4 w-4 shrink-0 text-gray-800" />
                    {/* label collapses unless hover/focus */}
                    <span
                        className={[
                            "overflow-hidden max-w-0",
                            "group-hover:max-w-[120px] group-focus-visible:max-w-[120px]",
                            "transition-all duration-300 ease-out",
                            "text-sm font-medium text-gray-900",
                        ].join(" ")}
                    >
            {label}
          </span>
                    <span className="sr-only">{label}</span>
                </Button>
            </div>
        </div>
    );
}