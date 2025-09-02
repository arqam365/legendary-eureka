"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CookieCategoryRow from "@/components/cookies/category-row";

// --- Types
type Consent = {
    essential: true; // always true & locked
    analytics: boolean;
    functional: boolean;
    marketing: boolean;
};

// --- Defaults
const DEFAULT_CONSENT: Consent = {
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
};

const COOKIE_NAME = "revzion_consent";
const COOKIE_MAX_AGE_DAYS = 180;

// --- Helpers
function parseCookie(): Partial<Consent> | null {
    if (typeof document === "undefined") return null;
    const raw = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE_NAME}=`));
    if (!raw) return null;
    try {
        const val = decodeURIComponent(raw.split("=")[1]);
        return JSON.parse(val) as Consent;
    } catch {
        return null;
    }
}

function writeCookie(value: Consent) {
    if (typeof document === "undefined") return;
    const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
    const payload = encodeURIComponent(JSON.stringify(value));
    document.cookie = `${COOKIE_NAME}=${payload}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

export default function CookieSettingsPage() {
    const [consent, setConsent] = useState<Consent>(DEFAULT_CONSENT);
    const [loaded, setLoaded] = useState(false);
    const [savedAt, setSavedAt] = useState<string | null>(null);

    // Load existing preferences (cookie -> localStorage fallback)
    useEffect(() => {
        const fromCookie = parseCookie();
        const fromLS = typeof window !== "undefined" ? window.localStorage.getItem(COOKIE_NAME) : null;

        if (fromCookie) {
            setConsent((c) => ({ ...c, ...fromCookie, essential: true }));
        } else if (fromLS) {
            try {
                const parsed = JSON.parse(fromLS) as Consent;
                setConsent((c) => ({ ...c, ...parsed, essential: true }));
            } catch {
                // ignore
            }
        }
        setLoaded(true);
    }, []);

    function save(next: Consent) {
        writeCookie(next);
        try {
            window.localStorage.setItem(COOKIE_NAME, JSON.stringify(next));
            window.localStorage.setItem(`${COOKIE_NAME}_saved_at`, String(Date.now()));
        } catch {}
        setSavedAt(new Date().toLocaleString());
    }

    const acceptAll = () => {
        const next: Consent = { essential: true, analytics: true, functional: true, marketing: true };
        setConsent(next);
        save(next);
    };

    const rejectNonEssential = () => {
        const next: Consent = { essential: true, analytics: false, functional: false, marketing: false };
        setConsent(next);
        save(next);
    };

    const saveCurrent = () => save(consent);

    const lastSavedText = useMemo(() => {
        if (!savedAt) {
            if (typeof window !== "undefined") {
                const ts = window.localStorage.getItem(`${COOKIE_NAME}_saved_at`);
                if (ts) return new Date(Number(ts)).toLocaleString();
            }
            return null;
        }
        return savedAt;
    }, [savedAt]);

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs text-blue-700 shadow-sm">
                            Cookie preferences
                        </div>
                        <h1 className="mt-4 text-4xl sm:text-5xl font-heading font-bold text-gray-900">Cookie Settings</h1>
                        <p className="mt-4 text-lg text-gray-700">
                            Manage your preferences for different types of cookies. We always use essential cookies to make the site work. You can
                            change non-essential categories anytime.
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                            See our{" "}
                            <Link href="/privacy-policy" className="text-primary hover:underline">
                                Privacy Policy
                            </Link>{" "}
                            for details.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 sm:py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Quick actions */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <div className="text-sm text-gray-600">
                            {lastSavedText ? (
                                <>
                                    Last saved: <span className="font-medium text-gray-800">{lastSavedText}</span>
                                </>
                            ) : (
                                "No saved preferences yet."
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={rejectNonEssential}
                                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                            >
                                Reject non-essential
                            </button>
                            <button
                                onClick={acceptAll}
                                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-95"
                            >
                                Accept all
                            </button>
                        </div>
                    </div>

                    {/* Categories */}
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
                            desc="Helps us understand how our site is used to improve content and performance."
                            checked={consent.analytics}
                            onChange={(v) => setConsent((c) => ({ ...c, analytics: v }))}
                        />

                        <CookieCategoryRow
                            title="Functional"
                            desc="Remembers your preferences (e.g., language, player settings) to provide enhanced features."
                            checked={consent.functional}
                            onChange={(v) => setConsent((c) => ({ ...c, functional: v }))}
                        />

                        <CookieCategoryRow
                            title="Marketing"
                            desc="Used by us or partners to deliver more relevant content, measure campaigns, and reduce repetition."
                            checked={consent.marketing}
                            onChange={(v) => setConsent((c) => ({ ...c, marketing: v }))}
                        />
                    </div>

                    {/* Save */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                        <button
                            onClick={saveCurrent}
                            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95"
                            disabled={!loaded}
                            aria-disabled={!loaded}
                        >
                            Save preferences
                        </button>
                        <button
                            onClick={() => {
                                setConsent(DEFAULT_CONSENT);
                                save(DEFAULT_CONSENT);
                            }}
                            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                            disabled={!loaded}
                            aria-disabled={!loaded}
                        >
                            Reset to defaults
                        </button>
                    </div>

                    {/* Details */}
                    <details className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <summary className="cursor-pointer list-none">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900">What are cookies?</span>
                                <span className="text-sm text-gray-500">Click to expand</span>
                            </div>
                        </summary>
                        <div className="mt-3 text-[15px] leading-relaxed text-gray-700">
                            Cookies are small text files placed on your device to store data. We use them to keep the site secure, remember
                            preferences, measure usage, and personalize where permitted. You can change your consent here at any time; your choice
                            is stored for {COOKIE_MAX_AGE_DAYS} days.
                        </div>
                    </details>
                </div>
            </section>
        </main>
    );
}