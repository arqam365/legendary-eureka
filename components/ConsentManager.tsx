"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { CONSENT_EVENT, DEFAULT_CONSENT, applyConsent, readConsent, saveConsent, type Consent } from "@/lib/consent"

export default function ConsentManager() {
    const [consent, setConsent] = useState<Consent | null>(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const saved = readConsent()
        if (saved) applyConsent(saved)
        setConsent(saved)
        setReady(true)
        const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail)
        window.addEventListener(CONSENT_EVENT, onChange)
        return () => window.removeEventListener(CONSENT_EVENT, onChange)
    }, [])

    if (!ready) return null

    return (
        <>
            {consent?.analytics && (
                <>
                    <Analytics />
                    <SpeedInsights />
                </>
            )}

            {!consent && (
                <div
                    role="region"
                    aria-label="Cookie consent"
                    className="fixed inset-x-0 bottom-0 z-[95] border-t border-[#E4E9F1] bg-white"
                >
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                        <p className="max-w-2xl text-sm text-[#1F2937]">
                            We use essential cookies to run this site. With your permission we'd also use analytics
                            cookies to understand how it's used.{" "}
                            <Link href="/cookie-settings" className="text-[#2563EB] underline underline-offset-2">
                                Manage preferences
                            </Link>
                        </p>
                        <div className="flex shrink-0 gap-2">
                            <button
                                type="button"
                                onClick={() => saveConsent(DEFAULT_CONSENT)}
                                className="h-10 rounded-full border border-[#D5DCE8] px-4 text-sm font-medium text-[#0B1220] hover:bg-[#EEF1F6]"
                            >
                                Reject non-essential
                            </button>
                            <button
                                type="button"
                                onClick={() => saveConsent({ essential: true, analytics: true, functional: true, marketing: true })}
                                className="h-10 rounded-full bg-[#0B1220] px-4 text-sm font-medium text-white hover:bg-[#1F2937]"
                            >
                                Accept all
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
