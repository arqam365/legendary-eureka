"use client"

import React from "react"
import Link from "next/link"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Smartphone, Cloud, Brain, Watch, Database, Puzzle, ArrowRight,
  CheckCircle, Zap, Shield, Users, Rocket, BadgeDollarSign, Clock4, Handshake,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

/* ----------------------- Motion system (consistent) ----------------------- */
const EASE = [0.16, 1, 0.3, 1] as const

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: EASE, when: "beforeChildren", staggerChildren: 0.06 }
  },
}

const childReveal: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: EASE } },
}

/* ======================= Mobile Process Carousel ======================== */
type ProcStep = {
  icon: React.ReactNode
  title: string
  description: string
  duration?: string
  deliverables?: string[]
}

function ProcessCarouselMobile({
                                 steps,
                                 autoMs = 8000,
                               }: {
  steps: ProcStep[]
  autoMs?: number
}) {
  const prefersReduced = useReducedMotion()
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  const goTo = React.useCallback((idx: number) => {
    const scroller = scrollerRef.current
    setActive(idx)
    const el = scroller?.children[idx] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [])

  // auto-advance
  React.useEffect(() => {
    if (prefersReduced || paused || steps.length <= 1) return
    const id = setTimeout(() => goTo((active + 1) % steps.length), autoMs)
    return () => clearTimeout(id)
  }, [active, paused, prefersReduced, steps.length, autoMs, goTo])

  // sync active with manual scroll
  const onScrollSync = React.useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    let closest = 0
    let min = Infinity
    Array.from(scroller.children).forEach((child, idx) => {
      const rect = (child as HTMLElement).getBoundingClientRect()
      const center = rect.left + rect.width / 2
      const viewportCenter = window.innerWidth / 2
      const dist = Math.abs(center - viewportCenter)
      if (dist < min) { min = dist; closest = idx }
    })
    setActive(closest)
  }, [])

  return (
      <div className="md:hidden">
        <div className="relative -mx-4 px-4" aria-label="Process steps (horizontally scrollable)">
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
                <motion.article
                    key={step.title}
                    tabIndex={0}
                    aria-label={`Step ${i + 1}: ${step.title}`}
                    className="
            snap-center shrink-0 w-[86%]
            rounded-2xl
            border border-primary/20
            bg-white/80 backdrop-blur-xl
            shadow-[0_12px_40px_-12px_rgba(37,99,235,0.25)]
            p-5
            transition-all duration-300
          "
                    variants={childReveal}
                    whileHover={!prefersReduced ? { y: -3, scale: 1.01, boxShadow: "0 18px 48px -12px rgba(37,99,235,0.3)" } : undefined}
                    whileTap={{ scale: 0.99 }}
                    viewport={{ once: true, amount: 0.4 }}
                    onClick={() => goTo(i)}
                >
                  <div className="flex items-center justify-between">
                    {/* Icon bubble */}
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-revzion text-white shadow-md">
                      {step.icon}
                    </div>

                    {/* Step badge */}
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-2 text-[11px] font-semibold text-primary">
              {`Step ${i + 1}`}
            </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-lg font-heading font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-[15px] text-gray-700 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Optional duration */}
                  {step.duration ? (
                      <div className="mt-3 text-xs text-gray-500">
                        Duration:{" "}
                        <span className="font-medium text-gray-700">{step.duration}</span>
                      </div>
                  ) : null}
                </motion.article>
            ))}
          </div>

          {/* Progress rail (themed) */}
          <div className="relative mt-3 h-1 rounded-full bg-primary/10 overflow-hidden">
            <div
                key={active}
                className="absolute inset-y-0 left-0 w-0 rounded-full bg-gradient-revzion animate-[loadbar_var(--dur)_linear_1_forwards]"
                style={{ ["--dur" as any]: `${autoMs}ms` }}
            />
          </div>
        </div>

        <style jsx>{`
          @keyframes loadbar {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
  )
}

/* ================================= Page ================================= */
export default function ServicesPage() {
  const prefersReduced = useReducedMotion()

  const services = [
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: "Mobile & Web Apps",
      description: "Cross-platform applications that deliver exceptional user experiences across all devices.",
      features: [
        "React Native & Flutter development",
        "Progressive Web Applications (PWA)",
        "Responsive design systems",
        "App Store / Play launch & ASO",
      ],
      technologies: ["React", "React Native", "Flutter", "Next.js", "TypeScript"],
    },
    {
      icon: <Cloud className="h-12 w-12" />,
      title: "Cloud & DevOps",
      description: "Scalable cloud infra and automated delivery for speed, security and cost control.",
      features: ["AWS/Azure architecture", "CI/CD pipelines", "Containers & orchestration", "Infrastructure as Code"],
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    },
    {
      icon: <Brain className="h-12 w-12" />,
      title: "AI & Automation",
      description: "Intelligent systems that streamline operations and unlock new growth channels.",
      features: ["LLM apps & copilots", "RAG & vector search", "Computer vision/NLP", "Process automation"],
      technologies: ["Python", "OpenAI", "LangChain", "Vector DBs", "Workers/Queues"],
    },
    {
      icon: <Watch className="h-12 w-12" />,
      title: "Wearables & IoT",
      description: "Connected devices and wearable experiences for real-time data and control.",
      features: ["Device SDK integration", "BLE & sensors", "Edge data processing", "Realtime monitoring"],
      technologies: ["Arduino", "Raspberry Pi", "Bluetooth LE", "Wi-Fi", "Edge Compute"],
    },
    {
      icon: <Database className="h-12 w-12" />,
      title: "SaaS Platforms",
      description: "Multi-tenant software with billing, roles, analytics and robust APIs.",
      features: ["Multi-tenant RBAC", "Subscription billing", "Audit logs & webhooks", "Admin analytics"],
      technologies: ["Node.js", "PostgreSQL", "Redis", "Stripe", "tRPC/REST"],
    },
    {
      icon: <Puzzle className="h-12 w-12" />,
      title: "Custom Integrations",
      description: "Make your tools talk to each other with clean, well-tested integrations.",
      features: ["3rd-party APIs", "Legacy modernization", "ETL & data migration", "Custom middleware"],
      technologies: ["REST", "GraphQL", "Webhooks", "ETL", "Microservices"],
    },
  ]

  const processSteps: ProcStep[] = [
    { icon: <Users className="h-8 w-8" />,  title: "Discover",       description: "Align on goals, scope, risks and KPIs.", duration: "1–2 weeks" },
    { icon: <Rocket className="h-8 w-8" />, title: "Design & Build",  description: "Iterate fast with weekly demos.",        duration: "2–6 weeks" },
    { icon: <Shield className="h-8 w-8" />, title: "Test & Launch",   description: "QA, security and smooth rollout.",       duration: "1–2 weeks" },
    { icon: <Zap className="h-8 w-8" />,    title: "Operate & Scale", description: "SLOs, monitoring and roadmap." },
  ]

  const models = [
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Product Team",
      copy: "Cross-functional pod (PM + Design + Eng) to own an outcome end-to-end.",
      bestFor: "New product, 0→1 or 1→10",
      notes: ["Fixed monthly fee", "Clear delivery KPIs"],
    },
    {
      icon: <Clock4 className="h-6 w-6" />,
      title: "Elastic Capacity",
      copy: "Add senior engineers/designers as an extension of your team.",
      bestFor: "Velocity boost, crunch timelines",
      notes: ["Time & materials", "Flexible ramp-up/down"],
    },
    {
      icon: <BadgeDollarSign className="h-6 w-6" />,
      title: "Fixed Scope",
      copy: "Well-defined project with a clear brief and deadlines.",
      bestFor: "POCs, migrations, integrations",
      notes: ["Milestone payments", "Predictable budget"],
    },
  ]

  return (
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* =========================== Hero =========================== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={childReveal} className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
                Our <span className="text-gradient-revzion">Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                From AI copilots to multi-tenant SaaS and mobile, we build systems that are fast to ship and easy to scale.
              </p>
              <Button size="lg" className="bg-gradient-revzion hover:opacity-90 transition-opacity" asChild>
                <Link href="/contact" aria-label="Get started with a project">
                  Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* ======================= Services Grid ======================= */}
        <section className="py-16 bg-white">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                  <motion.div
                      key={service.title}
                      variants={childReveal}
                      whileHover={prefersReduced ? undefined : { y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  >
                    <Card className="group border-0 shadow-md hover:shadow-xl transition-shadow rounded-2xl bg-white/70 backdrop-blur h-full">
                      <div className="flex flex-col h-full">
                        {/* Header */}
                        <CardHeader className="pb-0">
                          <motion.div
                              className="text-primary mb-4"
                              whileHover={prefersReduced ? undefined : { scale: 1.08 }}
                          >
                            {service.icon}
                          </motion.div>
                          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {service.description}
                          </p>
                        </CardHeader>

                        {/* Content */}
                        <CardContent className="flex flex-col flex-grow">
                          <div className="space-y-5 flex-grow">
                            <div>
                              <h4 className="font-heading font-medium text-gray-900 mb-3">Key Features</h4>
                              <ul className="space-y-2">
                                {service.features.map((f) => (
                                    <li key={f} className="flex items-center text-sm text-gray-600">
                                      <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                      {f}
                                    </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-auto">
                              <h4 className="font-heading font-medium text-gray-900 mb-3">Tech We Love</h4>
                              <div className="flex flex-wrap gap-2">
                                {service.technologies.map((t) => (
                                    <span key={t} className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs">
                                {t}
                              </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ================== Process (timeline + carousel) ================== */}
        <section
            className="py-14 sm:py-20 lg:py-28 bg-[linear-gradient(180deg,#f8fafc,rgba(248,250,252,0))]"
            aria-labelledby="process-heading"
        >
          <motion.div
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            {/* Header */}
            <motion.div variants={childReveal} className="text-center mb-10 sm:mb-14 lg:mb-16">
              <h2
                  id="process-heading"
                  className="text-[28px] sm:text-4xl lg:text-[42px] font-heading font-bold tracking-tight text-gray-900"
              >
                Our Process
              </h2>
              <p className="mt-3 text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                A proven path from idea to impact — transparent, iterative, and measurable.
              </p>

              {/* trust chips */}
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {[
                  "NDA-first engagements",
                  "Security-by-default",
                  "C-level comms cadence",
                  "Global time zones",
                  "Fixed-bid options",
                ].map((b) => (
                    <span
                        key={b}
                        className="px-2.5 py-1 sm:px-3 rounded-full text-[11px] sm:text-xs font-medium bg-white border border-gray-200 text-gray-800 shadow-sm"
                    >
                  {b}
                </span>
                ))}
              </div>
            </motion.div>

            {/* Mobile: snap carousel with auto-advance */}
            <ProcessCarouselMobile steps={processSteps} autoMs={8000} />

            {/* Tablet/Desktop: alternating timeline with equal-height cards */}
            <div className="hidden md:grid relative grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* center spine */}
              <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-4 hidden w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/40 via-primary/25 to-transparent md:block"
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
                          left ? "md:pr-6 lg:pr-10 md:justify-self-end" : "md:pl-6 lg:pl-10 md:justify-self-start",
                        ].join(" ")}
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                        viewport={{ once: true, amount: 0.35 }}
                    >
                      <motion.div
                          className="
                      relative flex flex-col justify-between
                      h-full w-90
                      min-h-[240px] sm:min-h-[260px] lg:min-h-[280px]
                      rounded-2xl
                      border border-white/70
                      bg-white/90
                      backdrop-blur-xl
                      p-6 sm:p-7 lg:p-8
                      shadow-[0_16px_48px_-20px_rgba(2,6,23,0.18)]
                      transition-all duration-300
                    "
                          whileHover={!prefersReduced ? { y: -4, boxShadow: "0px 22px 62px -28px rgba(2,6,23,0.28)" } : undefined}
                          transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      >
                        {/* node connector */}
                        <motion.span
                            aria-hidden
                            className={[
                              "absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white bg-primary/90 shadow-md",
                              left ? "right-[-10px]" : "left-[-10px]",
                            ].join(" ")}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.05 }}
                        />

                        {/* top row */}
                        <div className="flex items-center gap-3">
                          <motion.div
                              className="grid h-12 w-12 place-items-center rounded-full bg-gradient-revzion text-white"
                              initial={{ rotate: -6, opacity: 0 }}
                              whileInView={{ rotate: 0, opacity: 1 }}
                              transition={{ duration: 0.45, ease: EASE }}
                          >
                            {step.icon}
                          </motion.div>
                          <div className="inline-flex h-7 items-center rounded-full border border-primary/30 px-2 text-xs font-semibold text-primary">
                            {`Step ${i + 1}`}
                          </div>
                        </div>

                        {/* body */}
                        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                          <h3 className="text-lg sm:text-xl font-heading font-semibold text-gray-900">
                            {step.title}
                          </h3>
                          {step.duration ? (
                              <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 border border-gray-200">
                          {step.duration}
                        </span>
                          ) : null}
                        </div>

                        <p className="mt-2 text-[15px] sm:text-base text-gray-700 leading-relaxed">
                          {step.description}
                        </p>

                        {/* optional list */}
                        {Array.isArray(step.deliverables) && step.deliverables.length ? (
                            <ul className="mt-3 grid gap-1.5 text-sm text-gray-600">
                              {step.deliverables.map((d) => (
                                  <li key={d} className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" /> {d}
                                  </li>
                              ))}
                            </ul>
                        ) : null}
                      </motion.div>
                    </motion.article>
                )
              })}
            </div>

            {/* CTA / footer */}
            <motion.div
                className="mt-10 sm:mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                viewport={{ once: true, amount: 0.3 }}
            >
              <Link
                  href="/process"
                  className="text-primary hover:underline font-medium"
                  aria-label="Read our detailed delivery playbook"
              >
                See the detailed playbook
              </Link>
              <span className="hidden sm:inline text-gray-300">•</span>
              <Link
                  href="/portfolio"
                  className="text-gray-700 hover:text-primary font-medium"
                  aria-label="Explore recent case studies"
              >
                View recent case studies
              </Link>
            </motion.div>
          </motion.div>

          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </section>

        {/* ===================== Engagement Models ===================== */}
        <section className="py-16 bg-white">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={childReveal} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-3">Engagement Models</h2>
              <p className="text-lg text-gray-600">Pick what fits your stage, budget and speed.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {models.map((m) => (
                  <motion.div key={m.title} variants={childReveal} whileHover={prefersReduced ? undefined : { y: -4 }}>
                    <Card className="border-0 shadow-md rounded-2xl bg-white/70 backdrop-blur">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2 text-primary">
                          {m.icon}
                          <h3 className="text-lg font-heading font-semibold text-gray-900">{m.title}</h3>
                        </div>
                        <p className="text-gray-700 mb-2">{m.copy}</p>
                        <p className="text-sm text-gray-500 mb-4">
                          <span className="font-medium text-gray-700">Best for:</span> {m.bestFor}
                        </p>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {m.notes.map((n) => (
                              <li key={n} className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-primary mr-2" /> {n}
                              </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
              ))}
            </div>

            <motion.div variants={childReveal} className="mt-8 text-center">
              <Button asChild size="lg" variant="outline" className="text-primary border-primary">
                <Link href="/contact">Compare options with us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* ============================= FAQ ============================= */}
        <section className="py-20 bg-gray-50">
          <motion.div
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
          >
            {/* Heading */}
            <motion.div variants={childReveal} className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-3">
                FAQ
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Short answers to the questions we hear most often.
              </p>
            </motion.div>

            {/* Accordion container */}
            <motion.div
                variants={childReveal}
                className="bg-white/80 rounded-2xl shadow-sm border border-gray-200 backdrop-blur-sm p-6 sm:p-8"
            >
              <Accordion type="single" collapsible className="divide-y divide-gray-200">
                <AccordionItem value="q1">
                  <AccordionTrigger className="py-4 text-left text-gray-900 font-medium">
                    How do you estimate timeline and cost?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-gray-700 leading-relaxed">
                    We run a short discovery to map scope, risks and milestones, then
                    provide a conservative estimate with options (fixed scope vs. elastic
                    capacity). You get weekly burn-up charts and demo builds.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2">
                  <AccordionTrigger className="py-4 text-left text-gray-900 font-medium">
                    Can you work with our in-house team?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-gray-700 leading-relaxed">
                    Absolutely. Most engagements pair our pod with your PM/tech lead. We
                    follow your rituals, repos and CI, and leave a clean knowledge trail.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3">
                  <AccordionTrigger className="py-4 text-left text-gray-900 font-medium">
                    Do you provide post-launch support?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-gray-700 leading-relaxed">
                    Yes — we offer SLAs with monitoring, incident response, upgrades and
                    a rolling roadmap to keep shipping value.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* CTA */}
            <motion.div variants={childReveal} className="text-center mt-12">
              <Button
                  asChild
                  size="lg"
                  className="bg-gradient-revzion hover:opacity-90 rounded-full px-6 py-3"
              >
                <Link href="/contact">Ask a different question</Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* ============================== CTA ============================== */}
        <section className="py-20 bg-gradient-revzion">
          <motion.div
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h2 variants={childReveal} className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
              Ready to Get Started?
            </motion.h2>
            <motion.p variants={childReveal} className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Tell us about your goals — we’ll suggest the fastest, safest path to impact.
            </motion.p>
            <motion.div variants={childReveal} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3" asChild>
                <Link href="/contact">Request a Quote</Link>
              </Button>
              <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3 bg-transparent"
                  asChild
              >
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <Footer />
      </div>
  )
}