"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  TrendingUp,
  Zap,
  Target,
  CheckCircle,
  Filter,
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

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "2M+", label: "Users Impacted" },
  { value: "99.9%", label: "Uptime Achieved" },
]

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
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
            Our <span className="text-gradient-revzion">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Explore how we've helped teams ship faster, scale confidently, and delight users.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-heading font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <span className="inline-flex items-center gap-2 text-sm text-gray-500 mr-2">
              <Filter className="h-4 w-4" /> Filter by
            </span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1.5 rounded-full border text-sm transition ${
                  activeCategory === c
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-20">
            {filtered.map((study, index) => {
              const imageLeft = index % 2 === 0
              return (
                <motion.div
                  key={study.id}
                  variants={revealOnce}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Card className="overflow-hidden shadow-xl border-0">
                    <div
                      className={`grid grid-cols-12 gap-y-0 ${
                        imageLeft ? "" : "lg:[&>*:first-child]:order-2"
                      }`}
                    >
                      {/* Media */}
                      <div className="col-span-12 lg:col-span-5 relative">
                        <div className="relative w-full overflow-hidden lg:h-full min-h-[240px] bg-gray-100">
                          <Image
                            src={study.heroImage || "/placeholder.svg"}
                            alt={`${study.title} case study`}
                            width={1280}
                            height={960}
                            className="w-full h-auto lg:h-full lg:object-cover rounded-none"
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/20 backdrop-blur-[1px]" />
                          <div className="absolute left-0 top-0 m-4">
                            <Badge variant="secondary" className="bg-white/85 backdrop-blur px-3 py-1 text-xs">
                              {study.category}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="col-span-12 lg:col-span-7 p-8 lg:p-12">
                        <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-500">
                          <span>{study.duration}</span>
                          <span className="text-gray-300">•</span>
                          <span>{study.client}</span>
                        </div>

                        <h2 className="text-[28px] sm:text-[32px] font-heading font-bold text-gray-900 tracking-tight">
                          {study.title}
                        </h2>
                        {study.summary && (
                          <p className="text-gray-500 mt-1 text-sm leading-relaxed">{study.summary}</p>
                        )}

                        <div className="flex flex-wrap gap-2 mt-4">
                          {study.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-[13px] rounded-full border border-gray-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* MOBILE: accordion */}
                        <div className="mt-8 md:hidden">
                          <Accordion type="single" collapsible>
                            <AccordionItem value="prob">
                              <AccordionTrigger className="text-left">
                                <div className="flex items-center">
                                  <Target className="h-4 w-4 text-red-500 mr-2" />
                                  {study.problem.title}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3 max-w-prose">
                                  {study.problem.description}
                                </p>
                                <ul className="space-y-2">
                                  {study.problem.challenges.map((c) => (
                                    <li key={c} className="text-sm text-gray-600 flex items-start">
                                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                                      {c}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="sol">
                              <AccordionTrigger className="text-left">
                                <div className="flex items-center">
                                  <Zap className="h-4 w-4 text-blue-500 mr-2" />
                                  {study.solution.title}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3 max-w-prose">
                                  {study.solution.description}
                                </p>
                                <ul className="space-y-2">
                                  {study.solution.features.map((f) => (
                                    <li key={f} className="text-sm text-gray-600 flex items-start">
                                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                                      {f}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="res">
                              <AccordionTrigger className="text-left">
                                <div className="flex items-center">
                                  <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                                  {study.results.title}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-prose">
                                  {study.results.description}
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                  {study.results.metrics.map((m) => (
                                    <div key={m.label} className="text-center rounded-lg bg-gray-50 py-3 px-2">
                                      <div className="text-base font-heading font-bold text-gray-900">{m.value}</div>
                                      <div className="text-[11px] text-gray-600">{m.label}</div>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>

                        {/* DESKTOP: 3-column */}
                        <div className="mt-8 hidden md:grid md:grid-cols-3 md:divide-x md:divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                          <div className="p-7">
                            <h3 className="text-base font-heading font-semibold text-gray-900 mb-3 flex items-center">
                              <Target className="h-5 w-5 text-red-500 mr-2" />
                              {study.problem.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3 max-w-prose">
                              {study.problem.description}
                            </p>
                            <ul className="space-y-2">
                              {study.problem.challenges.slice(0, 3).map((c) => (
                                <li key={c} className="text-sm text-gray-600 flex items-start">
                                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-7">
                            <h3 className="text-base font-heading font-semibold text-gray-900 mb-3 flex items-center">
                              <Zap className="h-5 w-5 text-blue-500 mr-2" />
                              {study.solution.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3 max-w-prose">
                              {study.solution.description}
                            </p>
                            <ul className="space-y-2">
                              {study.solution.features.slice(0, 3).map((f) => (
                                <li key={f} className="text-sm text-gray-600 flex items-start">
                                  <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-7">
                            <h3 className="text-base font-heading font-semibold text-gray-900 mb-3 flex items-center">
                              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                              {study.results.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-prose">
                              {study.results.description}
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                              {study.results.metrics.map((m) => (
                                <div key={m.label} className="text-center rounded-lg bg-gray-50 py-3 px-2">
                                  <div className="text-base font-heading font-bold text-gray-900">{m.value}</div>
                                  <div className="text-[11px] text-gray-600">{m.label}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* CTAs */}
                        <div className="mt-8 flex flex-wrap gap-3">
                          <Button asChild className="bg-gradient-revzion hover:opacity-90 transition-opacity">
                            <Link href={`/portfolio/${study.id}`}>
                              View Case Study
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          {study.liveUrl && (
                            <Button asChild variant="outline">
                              <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                                Live Site
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-revzion">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's create something your users will love — and your metrics will prove.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3 bg-transparent"
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
