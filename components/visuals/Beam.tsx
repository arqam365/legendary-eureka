"use client"
import { motion, useReducedMotion } from "framer-motion"

export default function Beam() {
    const reduce = useReducedMotion()
    return (
        <motion.div
            aria-hidden
            className="absolute -inset-x-10 top-1/2 -translate-y-1/2 h-20 rounded-full blur-2xl"
            style={{
                background:
                    "linear-gradient(90deg, rgba(59,130,246,.0), rgba(99,102,241,.12), rgba(59,130,246,.0))",
            }}
            animate={reduce ? undefined : { x: ["-10%", "10%", "-10%"] }}
            transition={reduce ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
    )
}