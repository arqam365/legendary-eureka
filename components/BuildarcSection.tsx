"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function BuildarcSection() {
    const router = useRouter()

    return (
        <section
            className="py-20 bg-muted/30"
            aria-labelledby="buildarc-heading"
        >
            <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="text-sm uppercase tracking-wider text-muted-foreground">
          Platform Layer
        </span>

                <h2
                    id="buildarc-heading"
                    className="text-3xl font-heading font-bold mt-3 text-gray-900"
                >
                    Powered by Buildarc
                </h2>

                <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Buildarc is Revzion’s AI-powered estimation and delivery orchestration
                    platform. Most Revzion projects now begin on Buildarc to ensure faster
                    estimates, clearer scope, and higher-confidence execution.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    {/* Internal navigation */}
                    <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3"
                        onClick={() => router.push("/estimate")}
                    >
                        Get Instant Estimate
                    </Button>

                    {/* External navigation */}
                    <a
                        href="https://buildarc.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center border border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition"
                    >
                        Visit Buildarc
                    </a>
                </div>
            </div>
        </section>
    )
}