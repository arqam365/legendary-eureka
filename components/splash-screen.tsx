"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

type SplashProps = {
    /** Minimum time (ms) to keep splash visible before we allow exit. */
    minDuration?: number;
    /**
     * Optional: we’ll call this once on mount with a `resolve()` callback.
     * Call `resolve()` when your app/data is ready; the splash will finish and exit.
     */
    onReady?: (resolve: () => void) => void;
    brandName?: string;
    logoSrc?: string;
};

type Phase = "loading" | "exit" | "done";

export default function SplashScreen({
                                         minDuration = 2200,
                                         onReady,
                                         brandName = "Revzion",
                                         logoSrc = "/logo.svg",
                                     }: SplashProps) {
    const reduced = useReducedMotion();

    // lifecycles / machine
    const [mounted, setMounted] = useState(false);
    const [phase, setPhase] = useState<Phase>("loading");
    const [progress, setProgress] = useState(0);

    // responsive flags (CSR only)
    const [isSm, setIsSm] = useState(false);
    const [isMd, setIsMd] = useState(false);

    // external readiness
    const readyRef = useRef(false);
    const resolveExternal = () => {
        readyRef.current = true;
    };

    // mount + media queries (no conditional hooks)
    useEffect(() => {
        setMounted(true);
        if (typeof window === "undefined") return;

        const mqSm = window.matchMedia("(max-width: 640px)");
        const mqMd = window.matchMedia("(max-width: 1024px)");

        const apply = () => {
            setIsSm(mqSm.matches);
            setIsMd(mqMd.matches);
        };
        apply();

        const add = (mq: MediaQueryList, cb: () => void) => {
            if (mq.addEventListener) mq.addEventListener("change", cb);
            else mq.addListener?.(cb);
        };
        const remove = (mq: MediaQueryList, cb: () => void) => {
            if (mq.removeEventListener) mq.removeEventListener("change", cb);
            else mq.removeListener?.(cb);
        };

        add(mqSm, apply);
        add(mqMd, apply);
        return () => {
            remove(mqSm, apply);
            remove(mqMd, apply);
        };
    }, []);

    // if no onReady provided, consider immediately "ready"
    useEffect(() => {
        if (!onReady) readyRef.current = true;
    }, [onReady]);

    // expose resolve to caller (once)
    useEffect(() => {
        if (onReady) onReady(resolveExternal);
    }, [onReady]);

    // progress + exit driver
    useEffect(() => {
        if (!mounted) return;

        let raf = 0;
        const start = performance.now();
        const softCap = 96;

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / minDuration);
            const eased = 1 - Math.pow(1 - t, 2); // easeOutQuad
            const target = softCap * eased;

            setProgress((p) => (target > p ? target : p));

            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                // after minDuration: wait for readiness, then finish to 100 and exit
                const finish = () => {
                    const finStart = performance.now();
                    const step = (n2: number) => {
                        const tt = Math.min(1, (n2 - finStart) / 360);
                        const val = softCap + (100 - softCap) * tt;
                        setProgress(val);
                        if (tt < 1) {
                            requestAnimationFrame(step);
                        } else {
                            document.documentElement.classList.add("rvz-splash-exiting");
                            setPhase("exit");
                            window.dispatchEvent(new Event("revzion:splash-done"));
                        }
                    };
                    requestAnimationFrame(step);
                };

                if (readyRef.current) {
                    finish();
                } else {
                    const id = setInterval(() => {
                        if (readyRef.current) {
                            clearInterval(id);
                            finish();
                        }
                    }, 40);
                }
            }
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [mounted, minDuration]);

    // particles (memoized) — top-level hook, not inside JSX
    const particles = useMemo(() => {
        if (reduced) return [];
        function prng(seed: number) {
            return () => {
                seed |= 0;
                seed = (seed + 0x6d2b79f5) | 0;
                let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
                t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
                return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            };
        }
        const r = prng(87452391);
        const count = isSm ? 12 : isMd ? 18 : 24;
        return Array.from({ length: count }).map(() => {
            const top = `${r() * 100}%`;
            const left = `${r() * 100}%`;
            const dy = 6 + Math.floor(r() * 8);
            const dur = 1.8 + Math.floor(r() * 8) * 0.12;
            const delay = r() * 0.9;
            return { top, left, dy, dur, delay };
        });
    }, [isSm, isMd, reduced]);

    // derived values (safe outside JSX)
    const pct = Math.round(Math.min(100, Math.max(0, progress)));
    const insetPad = isSm ? 18 : 22;
    const logoBox = isSm ? 36 : 40;
    const haloOpacity = isSm ? 0.08 : 0.1;

    // ✅ early return AFTER all hooks have run
    if (!mounted || phase === "done") return null;

    return (
        <AnimatePresence initial={false}>
            <motion.div
                className="fixed inset-0 z-[9999] overflow-hidden bg-black will-change-transform"
                // whole viewport acts as the curtain
                initial={{ y: "0%", opacity: 1 }}
                animate={{ y: phase === "exit" ? "-100%" : "0%", opacity: 1 }}
                transition={{
                    duration: isSm ? 0.6 : 0.75,
                    ease: [0.22, 1, 0.36, 1],
                }}
                role="status"
                aria-label="Loading"
                aria-live="polite"
                onAnimationComplete={() => {
                    if (phase === "exit") {
                        setPhase("done");
                        // Remove SSR placeholder & show app
                        const root = document.documentElement;
                        root.classList.remove("rvz-splashing");
                        document.getElementById("rvz-ssr-splash")?.remove();
                        document.documentElement.classList.remove("rvz-splash-exiting");
                        document.documentElement.classList.remove("rvz-splashing");
                        const ssr = document.getElementById("rvz-ssr-splash");
                        if (ssr?.parentNode) ssr.parentNode.removeChild(ssr);
                    }
                }}
            >
                {/* backdrop */}
                <div className="absolute inset-0">
                    {!reduced && (
                        <motion.div
                            className="absolute inset-0"
                            animate={{ rotate: [0, 10, -8, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.86))]" />
                </div>

                {/* center brand card */}
                <div className="absolute inset-0 grid place-items-center px-4">
                    <div className="relative w-[min(72vw,320px)] h-[min(72vw,320px)]">
                        {!reduced && (
                            <motion.div
                                className="absolute inset-0 rounded-full bg-white blur-2xl"
                                style={{ opacity: haloOpacity }}
                                animate={{ opacity: [haloOpacity, haloOpacity * 1.8, haloOpacity] }}
                                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                            />
                        )}
                        <motion.div
                            className="absolute grid place-items-center rounded-2xl border border-white/15 backdrop-blur-sm"
                            style={{
                                inset: insetPad,
                                background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                            }}
                            animate={reduced ? {} : { scale: [0.985, 1, 0.985] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="text-center px-3">
                                <div
                                    className="mx-auto mb-2 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center"
                                    style={{ width: logoBox, height: logoBox }}
                                >
                                    <Image
                                        src={logoSrc}
                                        alt={`${brandName} logo`}
                                        width={28}
                                        height={28}
                                        priority
                                        sizes="(max-width: 640px) 28px, 32px"
                                    />
                                </div>
                                <div className="text-white font-bold tracking-wide text-[16px] sm:text-[18px]">
                                    <span className="bg-gradient-revzion bg-clip-text text-transparent">{brandName}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* particles */}
                {!reduced && particles.length > 0 && (
                    <div aria-hidden className="pointer-events-none absolute inset-0">
                        {particles.map((p, i) => (
                            <motion.span
                                key={i}
                                className="absolute rounded-full bg-white/70"
                                style={{ top: p.top, left: p.left, width: isSm ? 1.5 : 2, height: isSm ? 1.5 : 2 }}
                                initial={{ y: 0, opacity: 0 }}
                                animate={{ y: -p.dy, opacity: [0, 1, 0] }}
                                transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                            />
                        ))}
                    </div>
                )}

                {/* bottom progress bar + trailing % */}
                <div
                    className="
            fixed left-0 right-0
            bottom-[calc(env(safe-area-inset-bottom,0px))]
            z-[10000]
            pointer-events-none
          "
                    aria-live="polite"
                >
                    {/* rail */}
                    <div
                        className="relative h-4 sm:h-5 w-full bg-white/14 border-y border-white/10 overflow-hidden"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={pct}
                    >
                        <motion.div
                            className="h-full bg-gradient-revzion"
                            style={{ width: `${pct}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ type: "tween", duration: 0.18 }}
                        />
                    </div>
                    {/* subtle shadow stripe */}
                    <div className="h-2 bg-black/40 w-full" />
                    {/* trailing % */}
                    <motion.div
                        className={[
                            "absolute",
                            "bottom-[calc(100%+var(--gap))]",
                            "font-extrabold tracking-tight text-white/20 select-none whitespace-nowrap",
                            // mobile
                            "[--edge:16px] [--gap:14px] [font-size:clamp(35px,20vw,240px)]",
                            // tablet
                            "sm:[--edge:20px] sm:[--gap:18px] sm:[font-size:clamp(45px,14vw,220px)]",
                            // desktop
                            "lg:[--edge:24px] lg:[--gap:22px] lg:[font-size:clamp(55px,10vw,200px)]",
                        ].join(" ")}
                        style={{
                            left: `clamp(var(--edge), calc(${pct}vw), calc(100vw - var(--edge)))`,
                            transform: "translateX(-100%)",
                            lineHeight: 1,
                        }}
                        initial={false}
                        animate={{
                            left: `clamp(var(--edge), calc(${pct}vw), calc(100vw - var(--edge)))`,
                        }}
                        transition={{ type: "tween", duration: 0.18 }}
                    >
                        {pct}%
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}