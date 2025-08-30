"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw, Mail } from "lucide-react"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Hook your logger here (Sentry/PostHog/LogRocket/etc.)
        // console.error(error)
    }, [error])

    return (
        <html lang="en">
        <body className="min-h-dvh bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
            {/* header */}
            <div className="inline-flex items-center gap-3 rounded-xl bg-white/70 backdrop-blur border border-white/60 px-4 py-2 text-sm text-blue-600 shadow-sm mb-6">
                <AlertTriangle className="h-4 w-4" />
                Unexpected error
            </div>

            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900">
                Something broke on our side
            </h1>
            <p className="mt-3 text-gray-600">
                We’ve logged the issue. You can try again, or head back to safety.
            </p>

            {/* actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button onClick={() => reset()} className="bg-gradient-revzion">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try again
                </Button>
                <Button asChild variant="outline">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Go home
                    </Link>
                </Button>
                <Button asChild variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                    <a href="mailto:hello@yourdomain.com?subject=Bug%20report">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact support
                    </a>
                </Button>
            </div>

            {/* details (only show to devs) */}
            {process.env.NODE_ENV === "development" && (
                <details className="mt-10 mx-auto w-full text-left rounded-xl bg-white/80 backdrop-blur border border-white/60 p-4 text-sm text-gray-700 whitespace-pre-wrap">
                    <summary className="cursor-pointer font-medium">Error details</summary>
                    <div className="mt-3">
                        <div className="font-mono break-words">{String(error?.message || error)}</div>
                        {error?.digest && <div className="mt-2 text-xs opacity-70">digest: {error.digest}</div>}
                    </div>
                </details>
            )}
        </main>
        </body>
        </html>
    )
}