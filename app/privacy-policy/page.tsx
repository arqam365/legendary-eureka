// app/privacy-policy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ShieldCheck, ChevronDown, ArrowLeft } from "lucide-react";
import QuickActions from "./QuickActions"; // client-only actions (print, etc.)

export const metadata: Metadata = {
    title: "Privacy Policy | Revzion",
    description:
        "How Revzion collects, uses, and protects your information. Learn about cookies, analytics, data sharing, retention, and your rights.",
    robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
    const lastUpdated = "August 31, 2025"; // keep this current

    const sections = [
        { id: "info-we-collect", label: "Information We Collect" },
        { id: "how-we-use", label: "How We Use Information" },
        { id: "legal-bases", label: "Legal Bases (EEA/UK)" },
        { id: "sharing", label: "Sharing & Disclosures" },
        { id: "retention", label: "Data Retention" },
        { id: "rights", label: "Your Rights" },
        { id: "transfers", label: "International Transfers" },
        { id: "security", label: "Security" },
        { id: "children", label: "Children" },
        { id: "cookies", label: "Cookies" },
        { id: "contact", label: "Contact Us" },
    ];

    return (
        <main className="bg-white text-gray-900">
            {/* anchor for “Back to top” */}
            <span id="top" className="block h-0 w-0" aria-hidden />

            {/* Hero */}
            <section className="relative overflow-hidden border-b">
                {/* Decorative gradient — does not intercept clicks */}
                <div
                    className="absolute -inset-40 -z-10 pointer-events-none bg-gradient-revzion opacity-10 blur-3xl"
                    aria-hidden
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-20">
                    <div className="flex items-start justify-between gap-6">
                        <div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
                                Privacy Policy
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl">
                                How we collect, use, and protect your data across our website, products, and services.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                  <CalendarDays className="h-4 w-4" />
                  Last updated: <strong className="ml-1 font-semibold">{lastUpdated}</strong>
                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                  <ShieldCheck className="h-4 w-4" />
                  GDPR / CPRA-aligned
                </span>
                            </div>

                            {/* Back to Home */}
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

                        {/* Quick actions (client-only; print, ask a question, etc.) */}
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
                        </nav>
                    </details>

                    {/* Desktop sticky TOC */}
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
                            </nav>
                        </div>
                    </aside>

                    {/* Main content */}
                    <article className="prose prose-gray max-w-none prose-headings:scroll-mt-28">
                        <p>
                            This Privacy Policy explains how <strong>Revzion</strong> (“we”, “us”, “our”) collects, uses, discloses,
                            and safeguards information when you use our website, products, and services (collectively, the “Services”).
                        </p>

                        <h2 id="info-we-collect">Information We Collect</h2>
                        <ul>
                            <li>
                                <strong>Information you provide:</strong> contact details, messages, files you upload.
                            </li>
                            <li>
                                <strong>Usage data:</strong> pages viewed, links clicked, approximate location, device &amp; browser data.
                            </li>
                            <li>
                                <strong>Cookies &amp; similar tech:</strong> to remember preferences and measure performance.
                            </li>
                        </ul>

                        <h2 id="how-we-use">How We Use Information</h2>
                        <ul>
                            <li>Provide, maintain, and improve the Services</li>
                            <li>Respond to inquiries and provide support</li>
                            <li>Analyze usage to improve performance and features</li>
                            <li>Security, fraud prevention, and compliance</li>
                            <li>With your consent, send updates and marketing communications</li>
                        </ul>

                        <h2 id="legal-bases">Legal Bases (EEA/UK)</h2>
                        <p>
                            We process personal data based on: performance of a contract, legitimate interests, consent (where required),
                            and compliance with legal obligations.
                        </p>

                        <h2 id="sharing">Sharing &amp; Disclosures</h2>
                        <ul>
                            <li>
                                <strong>Vendors/Processors:</strong> cloud hosting, analytics, email and payment providers.
                            </li>
                            <li>
                                <strong>Legal:</strong> to comply with laws or protect rights, safety, and property.
                            </li>
                            <li>
                                <strong>Business transfers:</strong> in connection with a merger, acquisition, or asset sale.
                            </li>
                        </ul>

                        <h2 id="retention">Data Retention</h2>
                        <p>
                            We keep data only as long as necessary for the purposes above, then delete or anonymize it unless longer
                            retention is required by law.
                        </p>

                        <h2 id="rights">Your Rights</h2>
                        <p>
                            Depending on your location, you may have rights to access, correct, delete, or export your data, and to
                            object or restrict certain processing. To exercise a right, contact us at
                            <a href="mailto:privacy@revzion.com"> privacy@revzion.com</a>.
                        </p>

                        <h2 id="transfers">International Transfers</h2>
                        <p>
                            If we transfer data internationally, we use appropriate safeguards (e.g., SCCs) where required.
                        </p>

                        <h2 id="security">Security</h2>
                        <p>
                            We use technical and organizational measures to protect data. No method is 100% secure; report issues to{" "}
                            <a href="mailto:security@revzion.com">security@revzion.com</a>.
                        </p>

                        <h2 id="children">Children</h2>
                        <p>Our Services are not directed to children under 13 (or as defined by local law), and we don’t knowingly collect their data.</p>

                        <h2 id="cookies">Cookies</h2>
                        <p>You can control cookies via your browser settings. Where required, we’ll request consent via a banner.</p>

                        {/* Contact card */}
                        <div
                            id="contact"
                            className="not-prose mt-10 rounded-2xl border bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">Contact our Privacy Team</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Email{" "}
                                    <a className="underline decoration-dotted" href="mailto:privacy@revzion.com">
                                        privacy@revzion.com
                                    </a>
                                    . We typically respond within 2 business days.
                                </p>
                            </div>
                            <a
                                href="mailto:privacy@revzion.com"
                                className="mt-4 sm:mt-0 inline-flex items-center justify-center rounded-xl bg-gradient-revzion px-4 py-2.5 font-semibold text-white shadow-sm hover:opacity-90"
                            >
                                Email privacy@revzion.com
                            </a>
                        </div>

                        <hr className="my-10" />
                        <p className="text-sm text-gray-500">
                            This page is informational and not legal advice. Review with your counsel, especially for GDPR/CCPA/CPRA compliance.
                        </p>

                        <div className="mt-8">
                            <a href="#top" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                                ↑ Back to top
                            </a>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}