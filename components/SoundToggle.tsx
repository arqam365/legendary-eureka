"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

type Props = {
    src?: string;       // optional: override audio file
    className?: string; // optional: extra wrapper classes
};

export default function SoundToggle({ src = "/audio/ambient.mp3", className = "" }: Props) {
    const [enabled, setEnabled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const prefersReduced = useReducedMotion();

    // mount guard (avoid hydration mismatch)
    useEffect(() => { setMounted(true); }, []);

    // lazy-init audio + restore preference
    useEffect(() => {
        if (!mounted) return;

        if (!audioRef.current) {
            const a = new Audio(src);
            a.loop = true;
            a.preload = "auto";
            a.volume = 0.12;
            audioRef.current = a;
        }

        try {
            const saved = localStorage.getItem("ambient-sound");
            if (saved === "on" && !prefersReduced) setEnabled(true);
        } catch {}
    }, [mounted, prefersReduced, src]);

    // react to toggles
    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;

        try {
            if (enabled && !prefersReduced) {
                // user-initiated play; safe on modern browsers
                a.currentTime = Math.max(0, a.currentTime);
                void a.play().catch(() => {});
                localStorage.setItem("ambient-sound", "on");
            } else {
                a.pause();
                localStorage.setItem("ambient-sound", "off");
            }
        } catch {}
    }, [enabled, prefersReduced]);

    if (!mounted) return null;

    const label = enabled ? "Sound on" : "Sound off";
    const Icon = enabled ? Volume2 : VolumeX;

    return (
        <div
            className={[
                "fixed z-50",
                // safe-area aware
                "bottom-[calc(1rem+env(safe-area-inset-bottom,0px))]",
                "right-[calc(1rem+env(safe-area-inset-right,0px))]",
                "sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]",
                "sm:right-[calc(1.25rem+env(safe-area-inset-right,0px))]",
                className,
            ].join(" ")}
        >
            {/* Mobile: icon-only circular (≥44px hit target) */}
            <div className="sm:hidden">
                <button
                    type="button"
                    onClick={() => setEnabled(v => !v)}
                    aria-pressed={enabled}
                    aria-label={label}
                    title={label}
                    className="h-11 w-11 rounded-full bg-white/75 backdrop-blur-md border border-white/60 shadow-sm flex items-center justify-center active:scale-[0.98] transition"
                >
                    <Icon className="h-5 w-5 text-gray-800" />
                </button>
            </div>

            {/* Desktop: labeled button */}
            <div className="hidden sm:block">
                <Button
                    variant="outline"
                    onClick={() => setEnabled(v => !v)}
                    aria-pressed={enabled}
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