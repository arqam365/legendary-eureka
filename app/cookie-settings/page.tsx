"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import CookieCategoryRow from "@/components/cookies/category-row"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CONSENT_COOKIE, DEFAULT_CONSENT, readConsent, saveConsent, type Consent } from "@/lib/consent"

const ALL: Consent = { essential: true, analytics: true, functional: true, marketing: true }

export default function CookieSettingsPage() {
    const [consent, setConsent] = useState<Consent>(DEFAULT_CONSENT)
    const [loaded, setLoaded] = useState(false)
    const [savedAt, setSavedAt] = useState<string | null>(null)

    useEffect(() => {
        const saved = readConsent()
        if (saved) setConsent(saved)
        const ts = localStorage.getItem(`${CONSENT_COOKIE}_saved_at`)
        if (ts) setSavedAt(new Date(Number(ts)).toLocaleString())
        setLoaded(true)
    }, [])

    function save(next: Consent) {
        setConsent(next)
        saveConsent(next)
        setSavedAt(new Date().toLocaleString())
    }

    const secondary =
        "inline-flex h-10 items-center justify-center rounded-full border border-[#D5DCE8] bg-white px-4 text-sm font-medium text-[#0B1220] hover:bg-[#EEF1F6]"
    const primary =
        "inline-flex h-10 items-center justify-center rounded-full bg-[#0B1220] px-5 text-sm font-semibold text-white hover:bg-[#1F2937]"

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <section className="bg-[#EEF1F6]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-3xl">
                    <p className="eyebrow">Cookie preferences</p>
                    <h1 className="mt-4 text-4xl sm:text-5xl text-[#0B1220]">Cookie settings</h1>
                    <p className="mt-4 text-lg text-[#1F2937]">
                        Essential cookies keep the site working and are always on. Analytics and marketing cookies stay off
                        unless you turn them on here.
                    </p>
                    <p className="mt-4 text-sm text-[#1F2937]">
                        See our{" "}
                        <Link href="/privacy-policy" className="text-[#2563EB] underline underline-offset-2">
                            Privacy Policy
                        </Link>{" "}
                        for details.
                    </p>
                </div>
            </section>

            <section className="py-12 sm:py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <p className="text-sm text-[#64748B]" aria-live="polite">
                            {savedAt ? (
                                <>
                                    Last saved: <span className="font-medium text-[#1F2937]">{savedAt}</span>
                                </>
                            ) : (
                                "No saved preferences yet."
                            )}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <button type="button" onClick={() => save(DEFAULT_CONSENT)} className={secondary}>
                                Reject non-essential
                            </button>
                            <button type="button" onClick={() => save(ALL)} className={primary}>
                                Accept all
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <CookieCategoryRow
                            title="Essential"
                            desc="Required for core functionality like security, network management, and accessibility. You cannot disable these."
                            checked
                            locked
                            onChange={() => {}}
                        />
                        <CookieCategoryRow
                            title="Analytics"
                            desc="Google Analytics (via Google Tag Manager) and Vercel Analytics help us understand how the site is used."
                            checked={consent.analytics}
                            onChange={(v) => setConsent((c) => ({ ...c, analytics: v }))}
                        />
                        <CookieCategoryRow
                            title="Functional"
                            desc="Remembers your preferences to provide enhanced features."
                            checked={consent.functional}
                            onChange={(v) => setConsent((c) => ({ ...c, functional: v }))}
                        />
                        <CookieCategoryRow
                            title="Marketing"
                            desc="Used to measure campaigns and deliver more relevant content."
                            checked={consent.marketing}
                            onChange={(v) => setConsent((c) => ({ ...c, marketing: v }))}
                        />
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
                        <button type="button" onClick={() => save(consent)} className={primary} disabled={!loaded}>
                            Save preferences
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
