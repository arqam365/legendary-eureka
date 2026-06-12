"use client"

import React from "react"
import Link from "next/link"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Smartphone, Cloud, Brain, Watch, Database, Puzzle, ArrowRight,
  CheckCircle, Zap, Shield, Users, Rocket, BadgeDollarSign, Clock4, Handshake,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EstimateCallout } from "@/components/EstimateCallout"

const EASE = [0.16, 1, 0.3, 1] as const

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: EASE, when: "beforeChildren", staggerChildren: 0.06 },
  },
}

const childReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

/* ======================= Mobile Process Carousel ======================== */
type ProcStep = {
  icon: React.ReactNode
  title: string
  description: string
  duration?: string
  deliverables?: string[]
}

function ProcessCarouselMobile({ steps, autoMs = 8000 }: { steps: ProcStep[]; autoMs?: number }) {
  const prefersReduced = useReducedMotion()
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  const goTo = React.useCallback((idx: number) => {
    setActive(idx)
    const el = scrollerRef.current?.children[idx] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [])

  React.useEffect(() => {
    if (prefersReduced || paused || steps.length <= 1) return
    const id = setTimeout(() => goTo((active + 1) % steps.length), autoMs)
    return () => clearTimeout(id)
  }, [active, paused, prefersReduced, steps.length, autoMs, goTo])

  const onScrollSync = React.useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    let closest = 0
    let min = Infinity
    Array.from(scroller.children).forEach((child, idx) => {
      const rect = (child as HTMLElement).getBoundingClientRect()
      const dist = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2)
      if (dist < min) { min = dist; closest = idx }
    })
    setActive(closest)
  }, [])

  return (
    <div className="md:hidden">
      <div className="relative -mx-4 px-4" aria-label="Process steps">
        <div
          ref={scrollerRef}
          onScroll={onScrollSync}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-3 no-scrollbar"
        >
          {steps.map((step, i) => (
            <article
              key={step.title}
              tabIndex={0}
              aria-label={`Step ${i + 1}: ${step.title}`}
              onClick={() => goTo(i)}
              className="snap-center shrink-0 w-[86%] rounded-xl border border-gray-200 bg-white shadow-sm p-5 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-gray-100 text-gray-700">
                  {step.icon}
                </div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="text-base font-heading font-semibold text-gray-900 mb-1.5">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              {step.duration && (
                <div className="mt-3 text-xs text-gray-400">
                  Duration: <span className="font-medium text-gray-600">{step.duration}</span>
                </div>
              )}
            </article>
          ))}
        </div>
        <div className="relative mt-3 h-0.5 rounded-full bg-gray-200 overflow-hidden">
          <div
            key={active}
            className="absolute inset-y-0 left-0 w-0 rounded-full bg-primary animate-[loadbar_var(--dur)_linear_1_forwards]"
            style={{ ["--dur" as string]: `${autoMs}ms` }}
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes loadbar { from { width: 0% } to { width: 100% } }
        .no-scrollbar::-webkit-scrollbar { display: none }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none }
      `}</style>
    </div>
  )
}

/* ================================= Page ================================= */
export default function ServicesPage() {
  const prefersReduced = useReducedMotion()

  const services = [
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Mobile & Web Apps",
      description: "Cross-platform applications with exceptional UX across every device and screen.",
      features: [
        "React Native & Expo development",
        "Progressive Web Applications (PWA)",
        "Responsive design systems",
        "App Store / Play Store launch & ASO",
      ],
      technologies: ["React", "React Native", "Next.js", "TypeScript", "Expo"],
    },
    {
      icon: <Cloud className="h-5 w-5" />,
      title: "Cloud & DevOps",
      description: "Scalable infrastructure and automated delivery for speed, security, and cost control.",
      features: [
        "AWS / Vercel architecture",
        "CI/CD pipelines",
        "Containers & orchestration",
        "Infrastructure as Code",
      ],
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI & Automation",
      description: "Intelligent systems that streamline operations and unlock new growth channels.",
      features: [
        "LLM apps & copilots",
        "RAG & vector search",
        "Computer vision / NLP",
        "Process automation",
      ],
      technologies: ["Python", "OpenAI", "LangChain", "Vector DBs", "Workers / Queues"],
    },
    {
      icon: <Watch className="h-5 w-5" />,
      title: "Wearables & IoT",
      description: "Connected devices and wearable experiences for real-time data and control.",
      features: [
        "Device SDK integration",
        "BLE & sensor fusion",
        "Edge data processing",
        "Real-time monitoring dashboards",
      ],
      technologies: ["Arduino", "Raspberry Pi", "Bluetooth LE", "Wi-Fi", "Edge Compute"],
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "SaaS Platforms",
      description: "Multi-tenant software with billing, roles, analytics, and robust APIs.",
      features: [
        "Multi-tenant RBAC",
        "Subscription billing (Stripe)",
        "Audit logs & webhooks",
        "Admin analytics",
      ],
      technologies: ["Node.js", "PostgreSQL", "Redis", "Stripe", "tRPC / REST"],
    },
    {
      icon: <Puzzle className="h-5 w-5" />,
      title: "Custom Integrations",
      description: "Make your tools talk to each other with clean, well-tested integrations.",
      features: [
        "Third-party API connectors",
        "Legacy system modernization",
        "ETL & data migration",
        "Custom middleware",
      ],
      technologies: ["REST", "GraphQL", "Webhooks", "ETL", "Microservices"],
    },
  ]

  const processSteps: ProcStep[] = [
    { icon: <Users className="h-5 w-5" />,  title: "Discover",        description: "Align on goals, scope, risks, and KPIs before a line of code is written.", duration: "1–2 weeks" },
    { icon: <Rocket className="h-5 w-5" />, title: "Design & Build",  description: "Iterate fast with weekly demos and a transparent burn-up chart.",            duration: "2–6 weeks" },
    { icon: <Shield className="h-5 w-5" />, title: "Test & Launch",   description: "QA, security review, and a smooth rollout with rollback ready.",              duration: "1–2 weeks" },
    { icon: <Zap className="h-5 w-5" />,    title: "Operate & Scale", description: "SLOs, monitoring, incident response, and a rolling roadmap." },
  ]

  const models = [
    {
      icon: <Handshake className="h-5 w-5" />,
      title: "Product Team",
      copy: "A cross-functional pod (PM + Design + Eng) that owns an outcome end-to-end.",
      bestFor: "New product — 0→1 or 1→10",
      notes: ["Fixed monthly fee", "Clear delivery KPIs"],
    },
    {
      icon: <Clock4 className="h-5 w-5" />,
      title: "Elastic Capacity",
      copy: "Senior engineers and designers added as an extension of your existing team.",
      bestFor: "Velocity boost, crunch timelines",
      notes: ["Time & materials", "Flexible ramp-up / down"],
    },
    {
      icon: <BadgeDollarSign className="h-5 w-5" />,
      title: "Fixed Scope",
      copy: "A well-defined project with a clear brief, milestones, and a hard deadline.",
      bestFor: "POCs, migrations, integrations",
      notes: ["Milestone-based payments", "Predictable budget"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-100 py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={sectionReveal}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={childReveal} className="max-w-3xl">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              Services
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 leading-tight mb-5">
              End-to-end product delivery —
              <br />
              <span className="text-gradient-revzion">from zero to production.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
              We build mobile apps, SaaS platforms, AI systems, and cloud infrastructure. Every
              engagement comes with a defined scope, measurable KPIs, and a team that ships.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-gradient-revzion hover:opacity-90 transition-opacity" asChild>
                <Link href="/contact">
                  Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-white" asChild>
                <Link href="/portfolio">See Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={childReveal}
                whileHover={prefersReduced ? undefined : { y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="group"
              >
                <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="p-2.5 rounded-lg bg-gray-50 text-primary w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                      {service.icon}
                    </div>

                    <h3 className="text-base font-heading font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-5 flex-grow">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start text-sm text-gray-600">
                          <CheckCircle className="h-3.5 w-3.5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1.5">
                        {service.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-gray-50 text-gray-500 text-xs border border-gray-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <EstimateCallout />

      {/* Process */}
      <section className="py-16 sm:py-20 bg-gray-50 border-y border-gray-100" aria-labelledby="process-heading">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={childReveal} className="max-w-2xl mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              How we work
            </p>
            <h2 id="process-heading" className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our process
            </h2>
            <p className="text-lg text-gray-600">
              A transparent, iterative path from brief to production — with weekly demos and no
              surprises at the end.
            </p>
          </motion.div>

          {/* Trust chips */}
          <motion.div variants={childReveal} className="flex flex-wrap gap-2 mb-12">
            {["NDA-first", "Security by default", "C-level comms cadence", "Global time zones", "Fixed-bid options"].map((b) => (
              <span
                key={b}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-600 shadow-sm"
              >
                {b}
              </span>
            ))}
          </motion.div>

          {/* Mobile carousel */}
          <ProcessCarouselMobile steps={processSteps} autoMs={8000} />

          {/* Desktop timeline */}
          <div className="hidden md:grid relative grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-4 hidden w-px -translate-x-1/2 rounded-full bg-gradient-to-b from-gray-300 via-gray-200 to-transparent md:block"
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: "100%", opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />

            {processSteps.map((step, i) => {
              const left = i % 2 === 0
              return (
                <motion.article
                  key={step.title}
                  tabIndex={0}
                  aria-label={`Step ${i + 1}: ${step.title}`}
                  className={[
                    "col-span-12 md:col-span-6 flex",
                    left
                      ? "md:pr-8 lg:pr-12 md:justify-self-end"
                      : "md:pl-8 lg:pl-12 md:justify-self-start",
                  ].join(" ")}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div
                    className={[
                      "relative flex flex-col w-full max-w-[400px]",
                      "min-h-[200px] rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
                      "hover:shadow-md transition-shadow",
                    ].join(" ")}
                  >
                    {/* connector dot */}
                    <span
                      aria-hidden
                      className={[
                        "absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-white bg-gray-400 shadow-sm",
                        left ? "right-[-7px]" : "left-[-7px]",
                      ].join(" ")}
                    />

                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-lg bg-gray-100 text-gray-600">
                        {step.icon}
                      </div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Step {i + 1}
                      </span>
                      {step.duration && (
                        <span className="ml-auto text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                          {step.duration}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>

                    {Array.isArray(step.deliverables) && step.deliverables.length > 0 && (
                      <ul className="mt-3 space-y-1.5 text-sm text-gray-500">
                        {step.deliverables.map((d) => (
                          <li key={d} className="flex items-center">
                            <span className="h-1 w-1 rounded-full bg-gray-400 mr-2" /> {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </div>

          <motion.div
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link href="/process" className="text-primary hover:underline text-sm font-medium">
              See the detailed playbook
            </Link>
            <span className="hidden sm:inline text-gray-300">·</span>
            <Link href="/portfolio" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              View recent case studies
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Engagement Models */}
      <section className="py-16 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={childReveal} className="max-w-2xl mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Engagement models
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
              Pick what fits your stage
            </h2>
            <p className="text-lg text-gray-600">
              We adapt to your budget, timeline, and team structure — not the other way around.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {models.map((m) => (
              <motion.div key={m.title} variants={childReveal} whileHover={prefersReduced ? undefined : { y: -3 }}>
                <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-lg bg-gray-50 text-primary">
                        {m.icon}
                      </div>
                      <h3 className="text-base font-heading font-semibold text-gray-900">{m.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{m.copy}</p>
                    <p className="text-xs text-gray-400 mb-4">
                      <span className="font-medium text-gray-500">Best for:</span> {m.bestFor}
                    </p>
                    <ul className="space-y-1.5 text-sm text-gray-600 pt-4 border-t border-gray-100">
                      {m.notes.map((n) => (
                        <li key={n} className="flex items-center">
                          <CheckCircle className="h-3.5 w-3.5 text-primary mr-2 flex-shrink-0" /> {n}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={childReveal} className="mt-8">
            <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              <Link href="/contact">Compare options with us</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={childReveal} className="mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
              Common questions
            </h2>
          </motion.div>

          <motion.div variants={childReveal}>
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  q: "How do you estimate timeline and cost?",
                  a: "We run a short discovery to map scope, risks, and milestones, then provide a conservative estimate with options (fixed scope vs. elastic capacity). You get weekly burn-up charts and demo builds so nothing surprises you at invoice time.",
                },
                {
                  q: "Can you work with our in-house team?",
                  a: "Most engagements do. We pair our pod with your PM or tech lead, follow your existing rituals and repos, and leave a clean knowledge trail — documentation, comments, and handoff sessions included.",
                },
                {
                  q: "Do you offer post-launch support?",
                  a: "Yes — we offer SLAs with proactive monitoring, incident response, dependency upgrades, and a rolling roadmap so the product keeps improving after go-live.",
                },
                {
                  q: "What's your minimum engagement size?",
                  a: "We don't publish a floor, but our smallest engagements are typically fixed-scope projects over 4–6 weeks. If you have a smaller need, we're happy to refer you to someone better suited.",
                },
              ].map(({ q, a }) => (
                <AccordionItem
                  key={q}
                  value={q}
                  className="rounded-xl border border-gray-200 bg-white px-5 shadow-sm"
                >
                  <AccordionTrigger className="py-4 text-left text-sm font-semibold text-gray-900 hover:no-underline">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm text-gray-600 leading-relaxed">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div variants={childReveal} className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Have a question not listed here?{" "}
              <Link href="/contact" className="text-primary font-medium hover:underline">
                Ask us directly.
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-gray-100">
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 variants={childReveal} className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
            Ready to scope your project?
          </motion.h2>
          <motion.p variants={childReveal} className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Tell us what you're building. We'll come back with a realistic path — scope, timeline,
            and team structure — within 48 hours.
          </motion.p>
          <motion.div variants={childReveal} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-gradient-revzion hover:opacity-90 text-white" asChild>
              <Link href="/contact">
                Get a Free Estimate <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
