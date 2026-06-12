"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  Beaker,
  Cpu,
  Binary,
  BrainCircuit,
  GitBranch,
  Layers,
  Zap,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

gsap.registerPlugin(ScrollTrigger)

const revealOnce: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

export default function LabsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-st-section]").forEach((section) => {
        gsap.set(section, { opacity: 0, y: 24 })
        ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(section, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
          },
        })
      })
    })

    return () => ctx.revert()
  }, [hydrated])

  const experiments = [
    {
      title: "AI in EdTech",
      description:
        "Personalized learning experiences powered by adaptive AI — dropout prediction, automated question generation, and engagement analytics for coaching institutes.",
      status: "Experimental",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      tags: ["AI", "Education", "Adaptive Learning"],
      icon: <BrainCircuit className="h-5 w-5" />,
    },
    {
      title: "AI in Healthcare",
      description:
        "Intelligent diagnostic support and predictive health analytics designed to flag early-stage risk and reduce clinical overhead without replacing physician judgement.",
      status: "Research",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200",
      tags: ["AI", "Healthcare", "Diagnostics"],
      icon: <Binary className="h-5 w-5" />,
    },
    {
      title: "India's Own AI",
      description:
        "Sovereign AI infrastructure built for Indic languages, regional regulatory requirements, and India-specific data sovereignty needs.",
      status: "Research",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200",
      tags: ["Sovereign AI", "Indic NLP", "Policy"],
      icon: <Cpu className="h-5 w-5" />,
    },
  ]

  const focusAreas = [
    {
      icon: <BrainCircuit className="h-5 w-5" />,
      title: "Applied AI Systems",
      description:
        "Moving beyond demos — integrating LLMs, embeddings, and ML pipelines into production-grade workflows with real reliability constraints.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Domain-Specific Models",
      description:
        "Fine-tuning and evaluating models for vertical markets where general-purpose AI consistently underperforms against bespoke alternatives.",
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      title: "Open Source Tools",
      description:
        "Building developer utilities and internal frameworks that we publish when they prove useful beyond our own stack.",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Platform Infrastructure",
      description:
        "Stress-testing multi-tenant SaaS patterns, edge delivery, and real-time data pipelines at the scale where assumptions break.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center bg-gray-50 border-b border-gray-100"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
          variants={revealOnce}
          initial="hidden"
          animate="show"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 shadow-sm">
                <Beaker className="h-3.5 w-3.5 text-primary" />
                Revzion Labs
              </div>

              <div className="space-y-5">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight text-gray-900">
                  Where we test
                  <br />
                  <span className="text-gradient-revzion">what comes next.</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Labs is our structured R&D practice. We prototype high-risk ideas, validate them
                  against real constraints, and graduate the ones that hold up into production systems.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-gradient-revzion hover:opacity-90 transition-opacity"
                  asChild
                >
                  <Link href="#experiments">
                    View Research Tracks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Dialog modal={true}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Collaborate with Us
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto"
                    onPointerDownOutside={(e) => e.preventDefault()}
                  >
                    <DialogHeader>
                      <DialogTitle className="text-xl font-heading text-gray-900">
                        Collaborate with Revzion Labs
                      </DialogTitle>
                      <DialogDescription className="text-gray-500">
                        Tell us about your background and which research track interests you.
                      </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-4 py-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          placeholder="Jane Smith"
                          required
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Work Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="jane@company.com"
                          required
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="organization" className="text-sm font-medium text-gray-700">
                          Organization
                        </label>
                        <input
                          id="organization"
                          placeholder="Company or institution"
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="role" className="text-sm font-medium text-gray-700">
                          Role *
                        </label>
                        <select
                          id="role"
                          required
                          defaultValue=""
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="" disabled>Select role</option>
                          <option value="engineer">Engineer</option>
                          <option value="researcher">Researcher</option>
                          <option value="founder">Founder / Executive</option>
                          <option value="student">Student / Academic</option>
                          <option value="designer">Designer</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="interest" className="text-sm font-medium text-gray-700">
                          Research Track *
                        </label>
                        <select
                          id="interest"
                          required
                          defaultValue=""
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="" disabled>Select track</option>
                          <option value="ai-edtech">AI in EdTech</option>
                          <option value="ai-healthcare">AI in Healthcare</option>
                          <option value="india-ai">India's Own AI</option>
                          <option value="open-source">Open Source Tools</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                          What would you contribute? *
                        </label>
                        <textarea
                          id="message"
                          placeholder="Describe your background, the problem you care about, or how you'd like to collaborate..."
                          rows={4}
                          required
                          className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-revzion hover:opacity-90 text-white"
                        size="lg"
                      >
                        Send Application
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Right — Current Research panel */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  Current Research Tracks
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {experiments.map((exp) => (
                  <div
                    key={exp.title}
                    className="flex items-start gap-4 px-6 py-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="mt-0.5 flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                      {exp.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900">{exp.title}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium border ${exp.statusColor}`}
                        >
                          {exp.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Tracks graduate to production when validated against real-world constraints. Last updated June 2025.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-white" data-st-section>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
        >
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Research Focus
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
              Where we invest our R&D
            </h2>
            <p className="text-lg text-gray-600">
              We don't chase every trend. These are the four areas where we see compounding returns
              from sustained, disciplined experimentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="p-2.5 rounded-lg bg-gray-50 text-primary w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                  {area.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Active Experiments */}
      <section id="experiments" className="py-20 bg-gray-50 border-y border-gray-100" data-st-section>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
        >
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Experiments
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
              Active research tracks
            </h2>
            <p className="text-lg text-gray-600">
              Each track starts with a clear hypothesis. We run structured experiments, measure real
              outcomes, and either graduate or retire the idea — no zombie projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiments.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="group"
              >
                <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all h-full bg-white">
                  <CardContent className="p-7 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-5">
                      <div className="p-2.5 rounded-lg bg-gray-50 text-primary group-hover:bg-primary/10 transition-colors">
                        {exp.icon}
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${exp.statusColor}`}
                      >
                        {exp.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-grow">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white" data-st-section>
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
            Interested in collaborating?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            We work with researchers, domain experts, and engineers who bring real-world constraints
            to open problems. If that sounds like you, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-gradient-revzion hover:opacity-90 text-white" asChild>
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              asChild
            >
              <Link href="/about">Meet the Team</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
