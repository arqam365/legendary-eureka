"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  TrendingUp,
  Zap,
  Target,
  CheckCircle,
  ExternalLink,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CASE_STUDIES } from "@/lib/case-studies"

const revealOnce: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function PortfolioPage() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(CASE_STUDIES.map((c) => c.category)))],
    []
  )
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered =
    activeCategory === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-100 py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={revealOnce}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              Selected Work
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 leading-tight mb-5">
              Problems we've solved.
              <br />
              Products we've shipped.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Each project below starts with a real constraint — a deadline, a budget, a technical
              debt — and ends with something in production. We document both the decisions and the
              outcomes.
            </p>
          </div>

          {/* Filter */}
          <div className="mt-10 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-400 mr-1">Filter:</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3.5 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                  activeCategory === c
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                }`}
                aria-pressed={activeCategory === c}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-16">
            {filtered.map((study, index) => {
              const imageLeft = index % 2 === 0
              return (
                <motion.div
                  key={study.id}
                  variants={revealOnce}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow bg-white"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 ${
                      imageLeft ? "" : "lg:[&>*:first-child]:order-2"
                    }`}
                  >
                    {/* Image */}
                    <div className="lg:col-span-5 relative">
                      <div className="relative w-full overflow-hidden lg:h-full min-h-[240px] bg-gray-100">
                        <Image
                          src={study.heroImage || "/placeholder.svg"}
                          alt={`${study.title} case study`}
                          width={1280}
                          height={960}
                          className="w-full h-auto lg:h-full lg:object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/90 border border-gray-200 text-xs font-medium text-gray-700 backdrop-blur-sm">
                            {study.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12">
                      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-gray-400">
                        <span className="font-medium text-gray-500">{study.client}</span>
                        <span>·</span>
                        <span>{study.duration}</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 tracking-tight mb-2">
                        {study.title}
                      </h2>
                      {study.summary && (
                        <p className="text-gray-500 text-sm leading-relaxed mb-5">
                          {study.summary}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {study.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Mobile: accordion */}
                      <div className="md:hidden">
                        <Accordion type="single" collapsible>
                          <AccordionItem value="prob">
                            <AccordionTrigger className="text-left text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-red-400 flex-shrink-0" />
                                {study.problem.title}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                {study.problem.description}
                              </p>
                              <ul className="space-y-1.5">
                                {study.problem.challenges.map((c) => (
                                  <li key={c} className="text-sm text-gray-600 flex items-start">
                                    <div className="w-1.5 h-1.5 bg-red-300 rounded-full mt-2 mr-3 flex-shrink-0" />
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="sol">
                            <AccordionTrigger className="text-left text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-blue-400 flex-shrink-0" />
                                {study.solution.title}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                {study.solution.description}
                              </p>
                              <ul className="space-y-1.5">
                                {study.solution.features.map((f) => (
                                  <li key={f} className="text-sm text-gray-600 flex items-start">
                                    <CheckCircle className="h-3.5 w-3.5 text-blue-400 mt-0.5 mr-2.5 flex-shrink-0" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="res">
                            <AccordionTrigger className="text-left text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                {study.results.title}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {study.results.description}
                              </p>
                              <div className="grid grid-cols-2 gap-2">
                                {study.results.metrics.map((m) => (
                                  <div
                                    key={m.label}
                                    className="rounded-lg border border-gray-100 bg-gray-50 py-3 px-2 text-center"
                                  >
                                    <div className="text-base font-heading font-bold text-gray-900">
                                      {m.value}
                                    </div>
                                    <div className="text-[11px] text-gray-500 mt-0.5">{m.label}</div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* Desktop: 3-column */}
                      <div className="hidden md:grid md:grid-cols-3 divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-sm font-semibold text-gray-900 mb-2.5 flex items-center gap-2">
                            <Target className="h-4 w-4 text-red-400 flex-shrink-0" />
                            {study.problem.title}
                          </h3>
                          <p className="text-gray-500 text-xs leading-relaxed mb-3">
                            {study.problem.description}
                          </p>
                          <ul className="space-y-1.5">
                            {study.problem.challenges.slice(0, 3).map((c) => (
                              <li key={c} className="text-xs text-gray-500 flex items-start">
                                <div className="w-1 h-1 bg-red-300 rounded-full mt-1.5 mr-2.5 flex-shrink-0" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-6">
                          <h3 className="text-sm font-semibold text-gray-900 mb-2.5 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-blue-400 flex-shrink-0" />
                            {study.solution.title}
                          </h3>
                          <p className="text-gray-500 text-xs leading-relaxed mb-3">
                            {study.solution.description}
                          </p>
                          <ul className="space-y-1.5">
                            {study.solution.features.slice(0, 3).map((f) => (
                              <li key={f} className="text-xs text-gray-500 flex items-start">
                                <CheckCircle className="h-3 w-3 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-6">
                          <h3 className="text-sm font-semibold text-gray-900 mb-2.5 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            {study.results.title}
                          </h3>
                          <p className="text-gray-500 text-xs leading-relaxed mb-3">
                            {study.results.description}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {study.results.metrics.map((m) => (
                              <div
                                key={m.label}
                                className="rounded-lg border border-gray-100 bg-gray-50 py-2.5 px-2 text-center"
                              >
                                <div className="text-sm font-heading font-bold text-gray-900">
                                  {m.value}
                                </div>
                                <div className="text-[10px] text-gray-500 mt-0.5">{m.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="mt-7 flex flex-wrap gap-3">
                        <Button
                          asChild
                          className="bg-gradient-revzion hover:opacity-90 transition-opacity"
                        >
                          <Link href={`/portfolio/${study.id}`}>
                            Full Case Study
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        {study.liveUrl && (
                          <Button asChild variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                            <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                              Live Site
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
            Have a project in mind?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            We take on a small number of new projects each quarter. Tell us what you're building and
            we'll be straight with you about whether we're a good fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-gradient-revzion hover:opacity-90 text-white"
              asChild
            >
              <Link href="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-white"
              asChild
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
