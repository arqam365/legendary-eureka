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
                    <Button
                        className="px-6 py-3 h-12"
                        onClick={() => router.push("/estimate")}
                    >
                        Get Instant Estimate
                    </Button>

                    <Button
                        variant="outline"
                        className="px-6 py-3 h-12"
                        asChild
                    >
                        <a
                            href="https://buildarc.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Buildarc
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}