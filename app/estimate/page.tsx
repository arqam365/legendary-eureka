"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { track } from "@/lib/track"

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

            <section className="bg-[#EEF1F6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <p className="eyebrow">Project estimation</p>
                    <h1 className="mt-4 text-4xl sm:text-5xl text-[#0B1220] max-w-3xl">Get a clear project estimate</h1>
                    <p className="mt-6 text-lg text-[#1F2937] max-w-2xl leading-relaxed">
                        Before committing to timelines or budgets, start with a transparent estimate. Buildarc gives you a
                        scope outline and cost range in minutes.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                        <Button asChild size="lg" className="h-12 rounded-full bg-[#0B1220] px-7 text-white hover:bg-[#1F2937]">
                            <a
                                href="https://buildarc.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => track("estimate_start_click", { source: "revzion", page: "/estimate", destination: "buildarc" })}
                            >
                                Start your estimate
                                <span className="sr-only"> (opens Buildarc in a new tab)</span>
                            </a>
                        </Button>
                        <p className="text-sm text-[#1F2937]">Takes ~3–5 minutes · No commitment required</p>
                    </div>
                    <p className="mt-10 text-sm text-[#1F2937] max-w-xl">
                        Buildarc is Revzion's estimation and delivery platform. Prefer to talk first?{" "}
                        <Link href="/contact" className="text-[#2563EB] underline underline-offset-2">Start a conversation</Link>.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    )
}