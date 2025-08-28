"use client"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"

export default function Spotlight() {
    const mx = useMotionValue(-500)
    const my = useMotionValue(-500)
    const x = useSpring(mx, { stiffness: 300, damping: 40, mass: 0.6 })
    const y = useSpring(my, { stiffness: 300, damping: 40, mass: 0.6 })

    useEffect(() => {
        const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY) }
        window.addEventListener("mousemove", move)
        return () => window.removeEventListener("mousemove", move)
    }, [mx, my])

    const bg = useTransform([x, y], ([xv, yv]) =>
        `radial-gradient(200px 200px at ${xv}px ${yv}px, rgba(99,102,241,0.18), transparent 60%)`
    )

    return (
        <motion.div
            aria-hidden
            style={{ backgroundImage: bg }}
            className="pointer-events-none fixed inset-0 z-[1] mix-blend-soft-light"
        />
    )
}