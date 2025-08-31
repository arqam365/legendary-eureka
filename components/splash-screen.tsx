"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Image from "next/image"

type SplashProps = {
    minDuration?: number
    onReady?: (resolve: () => void) => void
    brandName?: string
    logoSrc?: string
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

    // CSR-only responsive flags
    const [isSm, setIsSm] = useState(false)
    const [isMd, setIsMd] = useState(false)

    useEffect(() => {
        setMounted(true)
        const mqSm = window.matchMedia("(max-width: 640px)")
        const mqMd = window.matchMedia("(max-width: 1024px)")
        const apply = () => { setIsSm(mqSm.matches); setIsMd(mqMd.matches) }
        apply()
        mqSm.addEventListener?.("change", apply)
        mqMd.addEventListener?.("change", apply)
        return () => {
            mqSm.removeEventListener?.("change", apply)
            mqMd.removeEventListener?.("change", apply)
        }
    }, [])

    const readyRef = useRef(false)
    const resolveExternal = () => { readyRef.current = true }

    // particles
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
        const count = reduced ? 0 : isSm ? 12 : isMd ? 18 : 24
        return Array.from({ length: count }).map(() => {
            const y = r() * 100
            const x = r() * 100
            return { top: `${y}%`, left: `${x}%`, dy: 6 + Math.floor(r() * 8), dur: 1.8 + Math.floor(r() * 8) * 0.12, delay: r() * 0.9 }
        })
    }, [isSm, isMd, reduced])

    useEffect(() => { if (!onReady) readyRef.current = true }, [onReady])

    // progress driver
    useEffect(() => {
        let raf = 0
        const start = performance.now()
        const softCap = 96
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / minDuration)
            const eased = 1 - Math.pow(1 - t, 2)
            const target = softCap * eased
            setProgress(p => (target > p ? target : p))
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
                    const id = setInterval(() => { if (readyRef.current) { clearInterval(id); finish() } }, 40)
                }
            }
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [minDuration])

    useEffect(() => { if (onReady) onReady(resolveExternal) }, [onReady])

    if (!mounted || done) return null

    const pct = Math.round(Math.min(100, Math.max(0, progress)))

    // center card sizing
    const insetPad = isSm ? 18 : 22
    const logoBox = isSm ? 36 : 40
    const haloOpacity = isSm ? 0.08 : 0.10
    const backdropOpacity = isSm ? 0.14 : 0.18

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
                aria-live="polite"
            >
                {/* backdrop */}
                <div className="absolute inset-0">
                    <div className="absolute -inset-[20%] bg-gradient-revzion blur-2xl" style={{ opacity: backdropOpacity }} />
                    {!reduced && (
                        <motion.div className="absolute inset-0" animate={{ rotate: [0, 10, -8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
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
                            style={{ inset: insetPad, background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))" }}
                            animate={reduced ? {} : { scale: [0.985, 1, 0.985] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="text-center px-3">
                                <div className="mx-auto mb-2 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center" style={{ width: logoBox, height: logoBox }}>
                                    <Image src={logoSrc} alt={`${brandName} logo`} width={28} height={28} priority sizes="(max-width: 640px) 28px, 32px" />
                                </div>
                                <div className="text-white font-bold tracking-wide text-[16px] sm:text-[18px]">
                                    <span className="bg-gradient-revzion bg-clip-text text-transparent">{brandName}</span>
                                </div>
                                <div className="text-white/70 tracking-wider uppercase mt-0.5 text-[10px] sm:text-[11px]">
                                    Loading {pct}%
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

                {/* FULL-WIDTH bottom progress bar + trailing % */}
                <div
                    className="
            fixed left-0 right-0
            bottom-[calc(env(safe-area-inset-bottom,0px)+10px)]
            z-[10000]
            pointer-events-none
          "
                    aria-live="polite"
                >
                    {/* rail spans entire viewport */}
                    <div
                        className="relative h-[6px] sm:h-2 w-full
                       bg-white/14 border-y border-white/10
                       overflow-hidden"
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

                    {/* subtle shadow stripe under rail */}
                    <div className="h-[3px] bg-black/45 w-full" />

                    {/* giant trailing percentage, clamped to viewport edges */}
                    <motion.div
                        className="absolute bottom-[calc(100%+10px)]
                       font-extrabold tracking-tight
                       text-white/20 select-none whitespace-nowrap"
                        style={{
                            left: `clamp(12px, calc(${pct}vw), calc(100vw - 12px))`,
                            transform: "translateX(-100%)",
                            fontSize: "clamp(48px, 18vw, 220px)",
                            lineHeight: 1,
                        }}
                        initial={false}
                        animate={{ left: `clamp(12px, calc(${pct}vw), calc(100vw - 12px))` }}
                        transition={{ type: "tween", duration: 0.18 }}
                    >
                        {pct}%
                    </motion.div>
                </div>

                {/* exit curtains */}
                <AnimatePresence>
                    {phase === "exit" && (
                        <>
                            <motion.div
                                className="absolute inset-0 bg-gradient-revzion"
                                initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0.9 }}
                                animate={{ clipPath: "circle(140% at 50% 50%)", opacity: [0.9, 0.5, 0] }}
                                transition={{ duration: isSm ? 0.6 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <motion.div
                                className="absolute inset-x-0 top-0 bg-black"
                                style={{ height: "50vh" }}
                                initial={{ y: 0 }}
                                animate={{ y: "-100%" }}
                                transition={{ duration: isSm ? 0.6 : 0.75, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <motion.div
                                className="absolute inset-x-0 bottom-0 bg-black"
                                style={{ height: "50vh" }}
                                initial={{ y: 0 }}
                                animate={{ y: "100%" }}
                                transition={{ duration: isSm ? 0.6 : 0.75, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    )
}