"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, Variants, useReducedMotion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    FileText, BookOpen, Download, Youtube, Sparkles, ArrowRight, Search, Filter,
    Gauge, Shield, Cpu, Smartphone, Workflow, LineChart
} from "lucide-react"

/* ---------------- Motion ---------------- */
const EASE = [0.16, 1, 0.3, 1] as const
const sectionReveal: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, when: "beforeChildren", staggerChildren: 0.06 } },
}
const itemReveal: Variants = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }

/* ---------------- Data ---------------- */
type Resource = {
    id: string
    kind: "Guide" | "Template" | "Case Study" | "Video"
    title: string
    summary: string
    href: string
    tags: string[]
    minutes?: number
    cta?: string
    thumb?: string
}

const FEATURED: Resource[] = [
    {
        id: "r1",
        kind: "Guide",
        title: "Shipping AI Assistants Safely: A Practical Playbook",
        summary: "Design patterns, red-teaming, evals and rollout gates for LLM-powered features.",
        href: "/resources/ai-assistants-playbook",
        tags: ["AI", "Product", "Safety"],
        minutes: 14,
        thumb: "/resources/ai-playbook.jpg",
    },
    {
        id: "r2",
        kind: "Template",
        title: "Lean PRD (Notion template)",
        summary: "One-page spec: problem, KPIs, risks, cutline, and acceptance tests.",
        href: "/resources/lean-prd-template",
        tags: ["Product", "Templates"],
        cta: "Use Template",
        thumb: "/resources/lean-prd.jpg",
    },
]

const LIBRARY: Resource[] = [
    {
        id: "g1",
        kind: "Guide",
        title: "SaaS Multi-Tenant Architecture on Postgres",
        summary: "Schemas, row-level security, and tenancy boundaries that scale.",
        href: "/resources/saas-multitenancy-postgres",
        tags: ["SaaS", "Backend"],
        minutes: 12,
    },
    {
        id: "g2",
        kind: "Guide",
        title: "Designing Performance Budgets",
        summary: "How to pick targets, wire CI checks, and keep them green.",
        href: "/resources/performance-budgets",
        tags: ["Frontend", "Performance"],
        minutes: 8,
    },
    {
        id: "t1",
        kind: "Template",
        title: "Sprint Demo Checklist",
        summary: "A short, high-signal checklist that keeps demos crisp.",
        href: "/resources/sprint-demo-checklist",
        tags: ["Delivery", "Templates"],
    },
    {
        id: "c1",
        kind: "Case Study",
        title: "Fintech App: 0→1 in 12 Weeks",
        summary: "How we shipped KYC, cards, and real-time ledger safely and fast.",
        href: "/portfolio",
        tags: ["Case Study", "Mobile", "Fintech"],
    },
    {
        id: "v1",
        kind: "Video",
        title: "CI/CD for Mobile & Web with Preview Envs",
        summary: "Feature flags, env matrices, and instant links for QA.",
        href: "https://youtube.com",
        tags: ["DevOps", "Delivery"],
    },
    {
        id: "g3",
        kind: "Guide",
        title: "Choosing Your Vector DB",
        summary: "Latency, filtering, hybrid search, and guardrails that matter.",
        href: "/resources/choosing-vector-db",
        tags: ["AI", "Search"],
        minutes: 10,
    },
]

const TAGS = ["All", "AI", "SaaS", "Frontend", "Backend", "Delivery", "Performance", "Templates", "Case Study", "Mobile"]

/* ---------------- Page ---------------- */
export default function ResourcesPage() {
    const prefersReduced = useReducedMotion()
    const [query, setQuery] = useState("")
    const [tag, setTag] = useState<string>("All")

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return LIBRARY.filter(r => {
            const tagOk = tag === "All" || r.tags.includes(tag)
            const qOk = !q || [r.title, r.summary, r.tags.join(" "), r.kind].some(x => x.toLowerCase().includes(q))
            return tagOk && qOk
        })
    }, [query, tag])

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* ================= Hero ================= */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <motion.div variants={itemReveal} className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900">
                            Resources <span className="text-gradient-revzion">for builders</span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-600">
                            Playbooks, templates and case studies to help you ship faster and safer.
                        </p>
                    </motion.div>

                    {/* Search + Tag filter */}
                    <motion.div
                        variants={itemReveal}
                        className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
                    >
                        {/* Search */}
                        <div className="relative w-full sm:w-[420px]">
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search guides, templates, case studies…"
                                aria-label="Search resources"
                                className={[
                                    "h-11 w-full rounded-full",
                                    "border border-gray-200 dark:border-white/15",
                                    "bg-white/90 dark:bg-white/5 backdrop-blur",
                                    "pl-11 pr-4", // left padding for icon
                                    "text-[15px] sm:text-base text-gray-800 dark:text-gray-100 placeholder:text-gray-400",
                                    "shadow-sm",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                ].join(" ")}
                            />

                            {/* icon inside + centered */}
                            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center translate-y-[-19px]">
  <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
</span>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2 justify-center">
    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
      <Filter className="h-4 w-4" /> Filter
    </span>
                            {TAGS.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTag(t)}
                                    className={[
                                        "rounded-full px-3 py-2 text-sm border transition",
                                        tag === t
                                            ? "bg-primary text-white border-primary"
                                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300",
                                    ].join(" ")}
                                    aria-pressed={tag === t}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ============== Featured ============== */}
            <section className="py-12 bg-white">
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">Featured</h2>
                        <Link href="#library" className="text-primary hover:underline flex items-center">
                            Browse all <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {FEATURED.map((r, i) => (
                            <motion.article
                                key={r.id}
                                variants={itemReveal}
                                whileHover={prefersReduced ? undefined : { y: -4, scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                            >
                                <Card className="overflow-hidden border-0 shadow-md rounded-2xl bg-white/70 backdrop-blur h-full">
                                    {r.thumb ? (
                                        <Image src={r.thumb} alt="" width={1200} height={640} className="h-44 w-full object-cover" />
                                    ) : null}
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-2 text-primary">
                                            <Sparkles className="h-4 w-4" />
                                            <span className="text-xs font-semibold uppercase">{r.kind}</span>
                                        </div>
                                        <h3 className="mt-2 text-xl font-heading font-semibold text-gray-900">{r.title}</h3>
                                        <p className="mt-2 text-gray-600">{r.summary}</p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {r.tags.map(t => (
                                                <span key={t} className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-800">{t}</span>
                                            ))}
                                            {r.minutes ? <span className="rounded-md bg-gray-50 px-2.5 py-1 text-xs text-gray-600">{r.minutes} min</span> : null}
                                        </div>
                                        <div className="mt-5">
                                            <Button asChild className="bg-gradient-revzion hover:opacity-90">
                                                <Link href={r.href}>
                                                    {r.cta ?? "Read Guide"} <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ============== Library ============== */}
            <section id="library" className="py-16 bg-gray-50">
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-6">Library</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((r) => (
                            <motion.article
                                key={r.id}
                                variants={itemReveal}
                                whileHover={prefersReduced ? undefined : { y: -3 }}
                                className="h-full"
                            >
                                <Card className="h-full border-0 shadow-sm rounded-2xl bg-white/70 backdrop-blur">
                                    <CardHeader className="pb-0">
                                        <div className="flex items-center gap-2 text-primary">
                                            {r.kind === "Guide" && <BookOpen className="h-4 w-4" />}
                                            {r.kind === "Template" && <Download className="h-4 w-4" />}
                                            {r.kind === "Case Study" && <FileText className="h-4 w-4" />}
                                            {r.kind === "Video" && <Youtube className="h-4 w-4" />}
                                            <span className="text-xs font-semibold uppercase">{r.kind}</span>
                                        </div>
                                        <h3 className="mt-2 text-lg font-heading font-semibold text-gray-900">{r.title}</h3>
                                        <p className="mt-2 text-gray-600">{r.summary}</p>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <div className="flex flex-wrap gap-2">
                                            {r.tags.map(t => (
                                                <span key={t} className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-800">{t}</span>
                                            ))}
                                            {r.minutes ? <span className="rounded-md bg-gray-50 px-2.5 py-1 text-xs text-gray-600">{r.minutes} min</span> : null}
                                        </div>
                                        <div className="mt-4">
                                            <Button asChild variant="outline" className="text-primary border-primary">
                                                <Link href={r.href}>Open</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.article>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <motion.p variants={itemReveal} className="text-gray-500 mt-6">
                            No results. Try a different tag or search term.
                        </motion.p>
                    )}
                </motion.div>
            </section>

            {/* ============== Tooling / Topic quick-links ============== */}
            <section className="py-16 bg-white">
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">Popular Topics</h2>
                        <p className="mt-3 text-gray-600">Jump into areas we publish on most.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        {[
                            { label: "AI & Copilots", icon: <Cpu className="h-5 w-5" />, href: "/resources?tag=AI" },
                            { label: "SaaS Platform", icon: <Gauge className="h-5 w-5" />, href: "/resources?tag=SaaS" },
                            { label: "Security", icon: <Shield className="h-5 w-5" />, href: "/resources?tag=Security" },
                            { label: "Mobile", icon: <Smartphone className="h-5 w-5" />, href: "/resources?tag=Mobile" },
                            { label: "DevOps", icon: <Workflow className="h-5 w-5" />, href: "/resources?tag=Delivery" },
                            { label: "Analytics", icon: <LineChart className="h-5 w-5" />, href: "/resources?tag=Performance" },
                        ].map((t) => (
                            <Link
                                key={t.label}
                                href={t.href}
                                className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-primary/40 hover:text-primary transition"
                            >
                                {t.icon}{t.label}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </section>

            <Footer />

            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes loadbar { 0% {width: 0%} 100% {width: 100%} }
      `}</style>
        </div>
    )
}