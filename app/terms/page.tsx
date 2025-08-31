// app/terms-of-service/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { CalendarDays, ShieldCheck, ChevronDown, ArrowLeft } from "lucide-react"
import QuickActions from "../privacy-policy/QuickActions" // client component (no handlers passed in)

export const metadata: Metadata = {
    title: "Terms of Service | Revzion",
    description: "The rules and terms for using Revzion’s services.",
    robots: { index: true, follow: true },
}

export default function TermsPage() {
    const lastUpdated = "August 31, 2025"

    const sections = [
        { id: "agreement", label: "Agreement to Terms" },
        { id: "eligibility", label: "Eligibility" },
        { id: "accounts", label: "Accounts & Security" },
        { id: "use", label: "Acceptable Use" },
        { id: "payments", label: "Payments & Billing" },
        { id: "intellectual", label: "Intellectual Property" },
        { id: "termination", label: "Termination" },
        { id: "liability", label: "Disclaimer & Limitation of Liability" },
        { id: "governing-law", label: "Governing Law" },
        { id: "contact", label: "Contact Us" },
    ]

    return (
        <main className="bg-white text-gray-900">
            {/* anchor for back-to-top */}
            <span id="top" className="block h-0 w-0" aria-hidden />

            {/* Hero */}
            <section className="relative overflow-hidden border-b">
                {/* decorative gradient behind, doesn’t block clicks */}
                <div
                    aria-hidden
                    className="absolute -inset-40 -z-10 pointer-events-none bg-gradient-revzion opacity-10 blur-3xl"
                />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-20">
                    <div className="flex items-start justify-between gap-6">
                        <div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
                                Terms of Service
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl">
                                The rules and terms for using Revzion’s website, products, and services.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
            <CalendarDays className="h-4 w-4" />
            Last updated: <strong className="ml-1 font-semibold">{lastUpdated}</strong>
          </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
            <ShieldCheck className="h-4 w-4" />
            Fair use & compliance
          </span>
                            </div>

                            {/* Back to Home in hero */}
                            <div className="mt-6">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-sm font-medium shadow-sm hover:bg-gray-50"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Home
                                </Link>
                            </div>
                        </div>

                        {/* client-only quick actions (print, ask a question) */}
                        <QuickActions />
                    </div>
                </div>
            </section>

            {/* Content + TOC */}
            <section className="py-10 sm:py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 px-4 sm:px-6 lg:px-8">
                    {/* Mobile TOC */}
                    <details className="lg:hidden rounded-xl border bg-white/70 px-4 py-3 shadow-sm">
                        <summary className="flex items-center justify-between cursor-pointer select-none text-sm font-semibold">
                            On this page
                            <ChevronDown className="h-4 w-4" />
                        </summary>
                        <nav className="mt-3 space-y-1.5 text-sm">
                            {sections.map((s) => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="block rounded-md px-2 py-1.5 text-gray-700 hover:bg-gray-100"
                                >
                                    {s.label}
                                </a>
                            ))}
                            {/* Back to Home (mobile TOC) */}
                            <Link
                                href="/"
                                className="mt-2 inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-gray-700 hover:bg-gray-100"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Link>
                        </nav>
                    </details>

                    {/* Desktop TOC */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 rounded-2xl border bg-white/70 p-4 shadow-sm">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                On this page
                            </p>
                            <nav className="space-y-1.5 text-sm">
                                {sections.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        className="block rounded-md px-2 py-1.5 text-gray-700 hover:bg-gray-100"
                                    >
                                        {s.label}
                                    </a>
                                ))}
                                <div className="pt-3 mt-3 border-t">
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-gray-700 hover:bg-gray-100"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to Home
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    {/* Main content */}
                    <article className="prose prose-gray max-w-none prose-headings:scroll-mt-28">
                        <p>
                            These Terms of Service (“Terms”) form a binding agreement between <strong>Revzion</strong> (“Company”,
                            “we”, “us”) and you (“User”, “you”). By accessing or using our Services, you agree to comply with these
                            Terms.
                        </p>

                        <h2 id="agreement">Agreement to Terms</h2>
                        <p>
                            By using our Services, you confirm that you have read, understood, and agree to these Terms. If you do not
                            agree, you must not use our Services.
                        </p>

                        <h2 id="eligibility">Eligibility</h2>
                        <p>
                            You must be at least 13 years old (or the age of majority in your jurisdiction) to use our Services.
                        </p>

                        <h2 id="accounts">Accounts &amp; Security</h2>
                        <p>
                            You are responsible for maintaining the confidentiality of your account credentials and for all activities
                            under your account.
                        </p>

                        <h2 id="use">Acceptable Use</h2>
                        <ul>
                            <li>No unlawful, harmful, or abusive activity</li>
                            <li>No reverse-engineering or unauthorized access</li>
                            <li>No infringement of intellectual property rights</li>
                        </ul>

                        <h2 id="payments">Payments &amp; Billing</h2>
                        <p>Fees, if applicable, will be disclosed before purchase. All payments are final unless required by law.</p>

                        <h2 id="intellectual">Intellectual Property</h2>
                        <p>
                            All content, trademarks, and technology are owned by Revzion or its licensors. You receive a limited
                            license to use the Services.
                        </p>

                        <h2 id="termination">Termination</h2>
                        <p>We may suspend or terminate your access if you violate these Terms, without notice or liability.</p>

                        <h2 id="liability">Disclaimer &amp; Limitation of Liability</h2>
                        <p>
                            Services are provided “as is”. Revzion disclaims warranties to the maximum extent permitted by law. Our
                            liability is limited to the maximum extent permitted.
                        </p>

                        <h2 id="governing-law">Governing Law</h2>
                        <p>These Terms are governed by the laws of India, without regard to conflict-of-law rules.</p>

                        {/* Contact */}
                        <div
                            id="contact"
                            className="not-prose mt-10 rounded-2xl border bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">Contact our Legal Team</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Email{" "}
                                    <a className="underline decoration-dotted" href="mailto:legal@revzion.com">
                                        legal@revzion.com
                                    </a>{" "}
                                    with questions about these Terms.
                                </p>
                            </div>
                            <a
                                href="mailto:legal@revzion.com"
                                className="mt-4 sm:mt-0 inline-flex items-center justify-center rounded-xl bg-gradient-revzion px-4 py-2.5 font-semibold text-white shadow-sm hover:opacity-90"
                            >
                                Email legal@revzion.com
                            </a>
                        </div>

                        <hr className="my-10" />
                        <p className="text-sm text-gray-500">
                            This page is informational and not legal advice. Review with your counsel before relying on these Terms.
                        </p>

                        <div className="mt-8 flex items-center gap-6">
                            <a href="#top" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                                ↑ Back to top
                            </a>
                            <Link
                                href="/"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 inline-flex items-center gap-1"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Link>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    )
}