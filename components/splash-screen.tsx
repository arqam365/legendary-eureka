"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Image from "next/image"

type SplashProps = {
    minDuration?: number
    onReady?: (resolve: () => void) => void
    brandName?: string
    logoSrc?: string              // e.g. "/logo.svg"
}

export default function SplashScreen({
                                         minDuration = 2200,
                                         onReady,
                                         brandName = "Revzion",
                                         logoSrc = "/logo.svg",
                                     }: SplashProps) {
    const [mounted, setMounted] = useState(false)
    const [done, setDone] = useState(false)
    const [phase, setPhase] = useState<"loading" | "exit">("loading")
    const [progress, setProgress] = useState(0)
    const reduced = useReducedMotion()

    const readyRef = useRef(false)
    const resolveExternal = () => { readyRef.current = true }

    // deterministic particles (no render-time randomness pre-mount)
    const particles = useMemo(() => {
        function prng(seed: number) {
            return () => {
                seed |= 0; seed = (seed + 0x6D2B79F5) | 0
                let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
                t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
                return ((t ^ (t >>> 14)) >>> 0) / 4294967296
            }
        }
        const r = prng(87452391)
        return Array.from({ length: 24 }).map(() => {
            const y = r() * 100
            const x = r() * 100
            return {
                top: `${y}%`,
                left: `${x}%`,
                dy: 8 + Math.floor(r() * 10),
                dur: 2.2 + Math.floor(r() * 10) * 0.12,
                delay: r() * 0.9,
            }
        })
    }, [])

    useEffect(() => { setMounted(true) }, [])
    useEffect(() => { if (!onReady) readyRef.current = true }, [onReady])

    useEffect(() => {
        let raf = 0
        const start = performance.now()
        const softCap = 96

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / minDuration)
            const eased = 1 - Math.pow(1 - t, 2)
            const target = softCap * eased
            setProgress((p) => (target > p ? target : p))

            if (t < 1) {
                raf = requestAnimationFrame(tick)
            } else {
                const finish = () => {
                    const finStart = performance.now()
                    const step = (n2: number) => {
                        const tt = Math.min(1, (n2 - finStart) / 360)
                        const val = softCap + (100 - softCap) * tt
                        setProgress(val)
                        if (tt < 1) requestAnimationFrame(step)
                        else {
                            setPhase("exit")
                            // let curtains/flash play, then mark done + notify page
                            setTimeout(() => {
                                setDone(true)
                                window.dispatchEvent(new Event("revzion:splash-done"))
                            }, 800)
                        }
                    }
                    requestAnimationFrame(step)
                }

                if (readyRef.current) finish()
                else {
                    const id = setInterval(() => {
                        if (readyRef.current) { clearInterval(id); finish() }
                    }, 40)
                }
            }
        }

        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [minDuration])

    useEffect(() => { if (onReady) onReady(resolveExternal) }, [onReady])

    if (!mounted || done) return null

    const pct = Math.round(Math.min(100, Math.max(0, progress)))
    const ringSweep = `${pct * 3.6}deg`

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] overflow-hidden bg-black"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                role="status"
                aria-label="Loading"
            >
                {/* Brand gradient backdrop (matches site) */}
                <div className="absolute inset-0">
                    {/* use your brand utility */}
                    <div className="absolute -inset-[20%] bg-gradient-revzion opacity-[0.18] blur-2xl" />
                    {!reduced && (
                        <motion.div
                            className="absolute inset-0"
                            animate={{ rotate: [0, 10, -8, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.86))]" />
                </div>

                {/* Center medal + progress ring */}
                <div className="absolute inset-0 grid place-items-center">
                    <div className="relative w-[200px] h-[200px]">
                        {/* halo */}
                        {!reduced && (
                            <motion.div
                                className="absolute inset-0 rounded-full bg-white/10 blur-2xl"
                                animate={{ opacity: [0.4, 0.8, 0.4] }}
                                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                            />
                        )}

                        {/* progress ring in brand colors */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(var(--ring, #60a5fa) ${ringSweep}, rgba(255,255,255,0.12) ${ringSweep})`,
                                mask: "radial-gradient(farthest-side, transparent 68%, black 69%)",
                                WebkitMask: "radial-gradient(farthest-side, transparent 68%, black 69%)",
                            }}
                        />

                        {/* inner medal */}
                        <motion.div
                            className="absolute inset-[22px] rounded-2xl border border-white/15 bg-white/8 backdrop-blur-sm grid place-items-center"
                            animate={reduced ? {} : { scale: [0.985, 1, 0.985] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                // subtle gradient frame using your brand
                                background:
                                    "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                            }}
                        >
                            <div className="text-center px-4">
                                {/* prefer your SVG logo */}
                                <div className="mx-auto mb-2 h-10 w-10 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                                    {/* swap to <Image> for crisp logo */}
                                    <Image src={logoSrc} alt={`${brandName} logo`} width={28} height={28} priority />
                                </div>
                                <div className="text-white text-[18px] font-bold tracking-wide">
                  <span className="bg-gradient-revzion bg-clip-text text-transparent">
                    {brandName}
                  </span>
                                </div>
                                <div className="text-white/60 text-[11px] tracking-wider uppercase">
                                    Loading {pct}%
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* floating specs */}
                {!reduced && (
                    <div aria-hidden className="pointer-events-none absolute inset-0">
                        {particles.map((p, i) => (
                            <motion.span
                                key={i}
                                className="absolute h-[2px] w-[2px] rounded-full bg-white/70"
                                style={{ top: p.top, left: p.left }}
                                initial={{ y: 0, opacity: 0 }}
                                animate={{ y: -p.dy, opacity: [0, 1, 0] }}
                                transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                            />
                        ))}
                    </div>
                )}

                {/* exit: brand flash + curtain */}
                <AnimatePresence>
                    {phase === "exit" && (
                        <>
                            <motion.div
                                className="absolute inset-0 bg-gradient-revzion"
                                initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0.9 }}
                                animate={{ clipPath: "circle(140% at 50% 50%)", opacity: [0.9, 0.5, 0] }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <motion.div
                                className="absolute inset-x-0 top-0 h-1/2 bg-black"
                                initial={{ y: 0 }}
                                animate={{ y: "-100%" }}
                                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <motion.div
                                className="absolute inset-x-0 bottom-0 h-1/2 bg-black"
                                initial={{ y: 0 }}
                                animate={{ y: "100%" }}
                                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    )
}