"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion, Variants } from "framer-motion"
import {
    Users, Target, NotebookPen, Figma, Rocket, ShieldCheck, Wrench, Zap, TimerReset,
    ClipboardCheck, Gauge, GitBranch, Layers, ArrowRight, LineChart, Bug, ServerCog, Handshake
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

/* ---------------- Motion system ---------------- */
const EASE = [0.16, 1, 0.3, 1] as const

const sectionReveal: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1, y: 0,
        transition: { duration: 0.55, ease: EASE, when: "beforeChildren", staggerChildren: 0.06 }
    },
}
const childReveal: Variants = {
    hidden: { opacity: 0, y: 14 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

/* ---------------- Data ---------------- */
const steps = [
    {
        title: "1) Discovery & Alignment",
        copy: "Stakeholders, goals, risks and success criteria — captured as lean, testable assumptions.",
        icon: <Target className="h-7 w-7" />,
        outputs: ["Problem statement", "North-star & KPIs", "Risk register", "Constraints"],
    },
    {
        title: "2) Solution Design",
        copy: "Flows, wireframes and technical approach with early estimates and a cutline for v1.",
        icon: <NotebookPen className="h-7 w-7" />,
        outputs: ["User flows", "Wireframes", "System design", "v1 scope + estimate"],
    },
    {
        title: "3) Build in Iterations",
        copy: "Weekly demos. We ship vertical slices that prove value end-to-end.",
        icon: <Zap className="h-7 w-7" />,
        outputs: ["Sprint plan", "Demo builds", "Changelog", "Burndown/Burnup"],
    },
    {
        title: "4) Test & Harden",
        copy: "Automated tests, security checks and performance budgets before rollout.",
        icon: <ShieldCheck className="h-7 w-7" />,
        outputs: ["Test suite & coverage", "Perf budget report", "Sec checklist", "UAT sign-off"],
    },
    {
        title: "5) Launch",
        copy: "Feature flags & gradual rollouts with monitoring to de-risk and learn fast.",
        icon: <Rocket className="h-7 w-7" />,
        outputs: ["Release notes", "Runbook", "Monitoring & alerts", "Rollback strategy"],
    },
    {
        title: "6) Operate & Scale",
        copy: "SLOs, roadmap and experiments to keep pushing outcomes after launch.",
        icon: <Gauge className="h-7 w-7" />,
        outputs: ["SLOs/SLA", "Roadmap", "Analytics dashboards", "Experiment backlog"],
    },
]

const tools = [
    { label: "Design System", icon: <Figma className="h-5 w-5" /> },
    { label: "CI/CD", icon: <GitBranch className="h-5 w-5" /> },
    { label: "Observability", icon: <LineChart className="h-5 w-5" /> },
    { label: "QA & Bug Triage", icon: <Bug className="h-5 w-5" /> },
    { label: "Feature Flags", icon: <Layers className="h-5 w-5" /> },
    { label: "Infrastructure as Code", icon: <ServerCog className="h-5 w-5" /> },
]

export default function ProcessPage() {
    const prefersReduced = useReducedMotion()

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* ========================== Hero ========================== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <motion.div variants={childReveal} className="grid gap-8 lg:grid-cols-12 items-center">
                        <div className="lg:col-span-7">
                            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900">
                                A process that ships <span className="text-gradient-revzion">outcomes</span>
                            </h1>
                            <p className="mt-4 text-xl text-gray-600">
                                Lean discovery, fast iterations, measurable impact. We de-risk delivery without slowing it down.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Button className="bg-gradient-revzion hover:opacity-90" asChild>
                                    <Link href="/contact" aria-label="Talk to us about your project">
                                        Start a project <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/portfolio">See recent launches</Link>
                                </Button>
                            </div>
                        </div>
                        <motion.div
                            variants={childReveal}
                            className="lg:col-span-5 hidden md:flex justify-end"
                            aria-hidden
                        >
                            <Image
                                src="/illustrations/process-hero.png"
                                width={520}
                                height={360}
                                alt=""
                                className="rounded-2xl shadow-2xl ring-1 ring-black/5"
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ============== Mobile carousel (snap) ============== */}
            <section className="md:hidden py-10">
                <motion.div
                    className="max-w-7xl mx-auto px-4"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <div className="relative -mx-4 px-4">
                        <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-4 no-scrollbar">
                            {steps.map((s, i) => (
                                <motion.article
                                    key={s.title}
                                    className="snap-center shrink-0 w-[84%] rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                    variants={childReveal}
                                    whileHover={prefersReduced ? undefined : { y: -2, scale: 1.01 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-revzion text-white">{s.icon}</div>
                                        <span className="inline-flex h-7 items-center rounded-full border border-primary/30 px-2 text-xs font-semibold text-primary">
                      {`Step ${i + 1}`}
                    </span>
                                    </div>
                                    <h3 className="mt-3 text-lg font-heading font-semibold text-gray-900">{s.title.replace(/^\d\)\s/, "")}</h3>
                                    <p className="mt-2 text-gray-600">{s.copy}</p>
                                    <ul className="mt-3 space-y-1 text-sm text-gray-600">
                                        {s.outputs.map((o) => (<li key={o} className="flex items-center"><ClipboardCheck className="h-4 w-4 mr-2 text-primary" />{o}</li>))}
                                    </ul>
                                </motion.article>
                            ))}
                        </div>
                        <div className="relative mt-1 h-1 rounded-full bg-gray-200/70">
                            <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-primary/60 [animation:loadbar_8s_linear_infinite]" />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ============== Desktop timeline (alternating) ============== */}
            <section className="hidden md:block py-16 bg-gray-50">
                <motion.div
                    className="max-w-6xl mx-auto px-6"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <div className="relative grid grid-cols-12 gap-8">
                        {/* Spine */}
                        <motion.div
                            aria-hidden
                            className="pointer-events-none absolute left-1/2 top-0 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/40 via-primary/30 to-transparent"
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: "100%", opacity: 1 }}
                            transition={{ duration: 1.1, ease: "easeOut" }}
                        />
                        {steps.map((s, i) => {
                            const left = i % 2 === 0
                            return (
                                <motion.article
                                    key={s.title}
                                    className={[
                                        "col-span-12 md:col-span-6",
                                        left ? "pr-8 justify-self-end" : "pl-8 justify-self-start",
                                    ].join(" ")}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                                    viewport={{ once: true, amount: 0.35 }}
                                >
                                    <motion.div
                                        className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                                        whileHover={prefersReduced ? undefined : { y: -4, boxShadow: "0px 12px 30px -20px rgba(2,6,23,0.25)" }}
                                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                                    >
                                        {/* connector dot */}
                                        <motion.span
                                            aria-hidden
                                            className={[
                                                "absolute top-8 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-primary/90 shadow-md",
                                                left ? "right-[-10px]" : "left-[-10px]",
                                            ].join(" ")}
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 18 }}
                                        />
                                        <div className="flex items-center gap-3">
                                            <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-revzion text-white">{s.icon}</div>
                                            <div className="inline-flex h-7 items-center rounded-full border border-primary/30 px-2 text-xs font-semibold text-primary">
                                                {`Step ${i + 1}`}
                                            </div>
                                        </div>
                                        <h3 className="mt-4 text-xl font-heading font-semibold text-gray-900">{s.title.replace(/^\d\)\s/, "")}</h3>
                                        <p className="mt-2 text-gray-600">{s.copy}</p>
                                        <ul className="mt-3 grid gap-1 text-sm text-gray-600">
                                            {s.outputs.map((o) => (<li key={o} className="flex items-center"><ClipboardCheck className="h-4 w-4 mr-2 text-primary" />{o}</li>))}
                                        </ul>
                                    </motion.div>
                                </motion.article>
                            )
                        })}
                    </div>
                </motion.div>
            </section>

            {/* ============== Working Agreements / Tooling ============== */}
            <section className="py-16 bg-white">
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <motion.div variants={childReveal} className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">How we work</h2>
                        <p className="mt-3 text-lg text-gray-600">Simple rituals that keep quality high and communication calm.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="border-0 shadow-sm rounded-2xl bg-white/70 backdrop-blur">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <TimerReset className="h-5 w-5" /><h3 className="font-heading font-semibold text-gray-900">Weekly rhythm</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="text-gray-600 space-y-2">
                                <p>Short planning on Mondays, async stand-ups, demo & retro at week’s end.</p>
                                <p>Everything recorded — <em>no knowledge trapped in calls</em>.</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm rounded-2xl bg-white/70 backdrop-blur">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Wrench className="h-5 w-5" /><h3 className="font-heading font-semibold text-gray-900">Quality gates</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="text-gray-600 space-y-2">
                                <p>Design reviews, code reviews, CI checks and preview envs on every PR.</p>
                                <p>Perf & accessibility budgets enforced automatically.</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm rounded-2xl bg-white/70 backdrop-blur">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Handshake className="h-5 w-5" /><h3 className="font-heading font-semibold text-gray-900">Transparent metrics</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="text-gray-600 space-y-2">
                                <p>Burn-up charts, release notes and dashboard KPIs tied to your goals.</p>
                                <p>No surprises — just steady, visible progress.</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        {tools.map(t => (
                            <div key={t.label} className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm text-gray-700">
                                {t.icon}{t.label}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ============================== FAQ ============================== */}
            <section className="py-16 bg-gray-50">
                <motion.div
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <motion.div variants={childReveal} className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">Process FAQ</h2>
                        <p className="mt-3 text-lg text-gray-600">What it’s like to ship with us.</p>
                    </motion.div>

                    <motion.div variants={childReveal} className="bg-white/70 rounded-xl backdrop-blur">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="1">
                                <AccordionTrigger>How long is discovery?</AccordionTrigger>
                                <AccordionContent>Usually 1–2 weeks. Enough to map risks, define v1 and build the first prototype plan.</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="2">
                                <AccordionTrigger>Do you handle security & compliance?</AccordionTrigger>
                                <AccordionContent>Yes — we apply OWASP hardening, secret management, SSO and can align with SOC2/GDPR practices.</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="3">
                                <AccordionTrigger>How are changes handled mid-project?</AccordionTrigger>
                                <AccordionContent>We keep a cutline. New work enters the backlog, is sized, and traded against lower-value scope.</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>

                    <motion.div variants={childReveal} className="text-center mt-8">
                        <Button className="bg-gradient-revzion hover:opacity-90" asChild>
                            <Link href="/contact">Ask something specific</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </section>

            {/* =============================== CTA =============================== */}
            <section className="py-20 bg-gradient-revzion">
                <motion.div
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <motion.h2 variants={childReveal} className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
                        Ready to move from idea to impact?
                    </motion.h2>
                    <motion.p variants={childReveal} className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                        Tell us what you’re trying to achieve and we’ll propose the safest, fastest plan.
                    </motion.p>
                    <motion.div variants={childReveal} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100" asChild>
                            <Link href="/contact">Book a free consult</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary" asChild>
                            <Link href="/portfolio">See what we’ve shipped</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </section>

            <Footer />

            {/* utilities */}
            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes loadbar { 0% {width: 0%} 100% {width: 100%} }
      `}</style>
        </div>
    )
}