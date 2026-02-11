"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Phase = "loading" | "exit" | "done";

export default function SplashScreen({
                                         minDuration = 2200,
                                         brandName = "REVZION",
                                         logoSrc = "/logo.svg",
                                     }: {
    minDuration?: number;
    brandName?: string;
    logoSrc?: string;
}) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<Phase>("loading");

    const startRef = useRef<number>(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        // Remove SSR splash immediately (prevents black stacking)
        const ssr = document.getElementById("rvz-ssr-splash");
        if (ssr?.parentNode) {
            ssr.parentNode.removeChild(ssr);
        }

        startRef.current = performance.now();
        setProgress(0);

        const animate = () => {
            const now = performance.now();
            const elapsed = now - startRef.current;
            const pct = Math.min(100, (elapsed / minDuration) * 100);

            setProgress(pct);

            if (pct < 100) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                setTimeout(() => setPhase("exit"), 300);
            }
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [minDuration]);

    if (phase === "done") return null;

    const pct = Math.round(progress);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] bg-black"
                initial={{ opacity: 1 }}
                animate={{ opacity: phase === "exit" ? 0 : 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onAnimationComplete={() => {
                    if (phase === "exit") {
                        setPhase("done");
                        document.documentElement.classList.remove("rvz-splashing");
                    }
                }}
            >
                {/* CENTER */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src={logoSrc}
                            alt="Revzion"
                            width={120}
                            height={120}
                            priority
                        />
                    </motion.div>

                    <motion.div
                        className="mt-8 text-white font-semibold tracking-[0.3em]"
                        style={{ fontSize: "clamp(22px, 4vw, 34px)" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {brandName}
                    </motion.div>
                </div>

                {/* PROGRESS BAR */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/15">
                    <div
                        className="h-full bg-white transition-all duration-75 linear"
                        style={{ width: `${pct}%` }}
                    />
                </div>

                {/* LARGE TRAILING PERCENT */}
                <div
                    className="absolute bottom-12 text-white/10 font-extrabold select-none pointer-events-none"
                    style={{
                        fontSize: "clamp(60px, 15vw, 220px)",
                        transform: "translateX(-100%)",
                        left: `${pct}%`,
                        lineHeight: 1,
                    }}
                >
                    {pct}%
                </div>
            </motion.div>
        </AnimatePresence>
    );
}