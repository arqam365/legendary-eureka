// components/splash-screen.tsx
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type SplashProps = {
    /** Minimum time (ms) to show the splash while progress reaches ~95% */
    minDuration?: number
    /** Optional: when you have async prep, call resolve() to complete to 100% */
    onReady?: (resolve: () => void) => void
}

export default function SplashScreen({ minDuration = 2500, onReady }: SplashProps) {
    // ----------------- Hooks (order stable) -----------------
    const [mounted, setMounted] = useState(false)
    const [done, setDone] = useState(false)
    const [progress, setProgress] = useState(0) // 0..100

    // allow an external gate to hold completion
    const externalReadyRef = useRef(false)
    const resolveExternal = () => {
        externalReadyRef.current = true
    }

    // deterministic decorative particles (no randomness at render-time)
    const particles = useMemo(() => {
        function prng(seed: number) {
            return () => {
                seed |= 0; seed = (seed + 0x6D2B79F5) | 0
                let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
                t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
                return ((t ^ (t >>> 14)) >>> 0) / 4294967296
            }
        }
        const r = prng(123456789)
        return Array.from({ length: 32 }).map(() => ({
            top: `${r() * 100}%`,
            left: `${r() * 100}%`,
            dur: 1.6 + (Math.floor(r() * 8)) * 0.1,
            delay: r() * 0.8,
        }))
    }, [])

    // mark mounted
    useEffect(() => { setMounted(true) }, [])

    // optional external async gate
    useEffect(() => {
        // If there’s no onReady gate, don’t hold at 95
        if (!onReady) externalReadyRef.current = true
    }, [onReady])

    // progress driver: ease up to ~95% over minDuration; after both minDuration and external gate are ready, finish to 100, then fade out
    useEffect(() => {
        let raf = 0
        const start = performance.now()
        const softCap = 100 // don't reach 100 until we're truly ready

        const tick = (now: number) => {
            const elapsed = now - start
            const t = Math.min(1, elapsed / minDuration)

            // ease-out curve for nicer feel
            const eased = 1 - Math.pow(1 - t, 2)
            const target = softCap * eased

            setProgress((p) => {
                const next = Math.max(p, target)
                return next > softCap ? softCap : next
            })

            if (t < 1) {
                raf = requestAnimationFrame(tick)
            } else {
                // minDuration reached; wait for external gate (if any), then complete
                const finish = () => {
                    // animate to 100 quickly
                    const finishStart = performance.now()
                    const animateFinish = (now2: number) => {
                        const tt = Math.min(1, (now2 - finishStart) / 350) // 350ms finish
                        const val = softCap + (100 - softCap) * tt
                        setProgress(val)
                        if (tt < 1) requestAnimationFrame(animateFinish)
                        else {
                            // fade out slightly after hitting 100
                            setTimeout(() => setDone(true), 100)
                        }
                    }
                    requestAnimationFrame(animateFinish)
                }

                if (externalReadyRef.current) finish()
                else {
                    // poll until external gate is ready
                    const int = setInterval(() => {
                        if (externalReadyRef.current) {
                            clearInterval(int)
                            finish()
                        }
                    }, 40)
                }
            }
        }

        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [minDuration])

    // ----------------- Render -----------------
    if (!mounted || done) return null

    const pct = Math.round(progress)
    const widthPct = `${Math.min(100, Math.max(0, progress))}%`

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] bg-black"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                role="status"
                aria-label="Loading"
            >
                {/* Brand / center */}
                <div className="absolute inset-0 grid place-items-center">
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0.85 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            className="text-white text-2xl font-heading tracking-wide"
                        >
                            Revzion
                        </motion.div>

                        {/* Percent text */}
                        <div className="text-white/80 text-sm font-medium tabular-nums">
                            {pct.toString().padStart(2, "0")}%
                        </div>

                        {/* Progress bar */}
                        <div className="w-64 h-1.5 rounded-full bg-white/15 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-white via-white to-white"
                                style={{ width: widthPct }}
                                initial={{ width: "0%" }}
                                animate={{ width: widthPct }}
                                transition={{ type: "tween", duration: 0.2 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Decorative particles */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                    {particles.map((p, i) => (
                        <motion.span
                            key={i}
                            className="absolute h-[2px] w-[2px] rounded-full bg-white/70"
                            style={{ top: p.top, left: p.left }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}