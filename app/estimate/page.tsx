"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { track } from "@/lib/track"

const reveal: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
}

export default function EstimatePage() {
    useEffect(() => {
        track("estimate_page_view", {
            source: "revzion",
            page: "/estimate",
        })
    }, [])

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <section className="relative overflow-hidden">
                <motion.div
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
                    variants={reveal}
                    initial="hidden"
                    animate="show"
                >
                    <div className="text-center">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">
              Project Estimation
            </span>

                        <h1 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-gray-900">
                            Get a Clear Project Estimate
                        </h1>

                        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Before committing to timelines or budgets, start with a transparent
                            estimate. Buildarc helps you understand scope and cost ranges in
                            minutes — not weeks.
                        </p>

                        {/* Primary action */}
                        <div className="mt-10 flex flex-col items-center gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="px-10 py-3 bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                <a
                                    href="https://buildarc.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                        track("estimate_start_click", {
                                            source: "revzion",
                                            page: "/estimate",
                                            destination: "buildarc",
                                        })
                                    }}
                                >
                                    Start Your Estimate
                                </a>
                            </Button>

                            {/* Micro reassurance */}
                            <p className="text-sm text-gray-500">
                                Takes ~3–5 minutes · No commitment required
                            </p>

                            {/* Secondary path */}
                            <Link
                                href="/services"
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                Or explore our services first
                            </Link>
                        </div>

                        <p className="mt-8 text-sm text-gray-500 max-w-xl mx-auto">
                            Buildarc is Revzion’s internal estimation and delivery orchestration
                            platform. Starting with an estimate leads to faster decisions and
                            higher-confidence execution.
                        </p>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    )
}