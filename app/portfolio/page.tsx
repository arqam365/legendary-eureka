"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  TrendingUp,
  Users,
  Zap,
  Clock,
  DollarSign,
  Target,
  CheckCircle,
  Filter,
} from "lucide-react"
import Link from "next/link"

/* ---------- minimal reveal variants ---------- */
const revealOnce = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

export default function PortfolioPage() {
  const caseStudies = useMemo(
      () => [
        {
          id: "beesocial",
          title: "BeeSocial – Social Media App",
          client: "BeeSocial Inc.",
          category: "Mobile App Development",
          duration: "6 months",
          team: "8 developers",
          image: "/beesocial-case-study.png",
          technologies: ["React Native", "Node.js", "MongoDB", "AWS", "Socket.io"],
          problem: {
            title: "The Challenge",
            description:
                "BeeSocial needed a cross-platform social app with real-time chat, sharing, and a scalable recommendation engine.",
            challenges: [
              "Real-time messaging at scale",
              "Complex recommendation algorithms",
              "Cross-platform compatibility",
              "High-performance media handling",
            ],
          },
          solution: {
            title: "Our Approach",
            description:
                "Built with React Native for cross-platform parity, Socket.io for realtime, and an AI-driven feed ranking.",
            features: [
              "Real-time messaging system",
              "AI-powered content recommendations",
              "Advanced media compression",
              "Scalable cloud infrastructure",
            ],
          },
          results: {
            title: "The Impact",
            description: "Successful launch with strong engagement metrics and retention.",
            metrics: [
              { label: "User Growth", value: "500K+", icon: <Users className="h-5 w-5" /> },
              { label: "Engagement Rate", value: "85%", icon: <TrendingUp className="h-5 w-5" /> },
              { label: "App Store Rating", value: "4.8/5", icon: <Target className="h-5 w-5" /> },
              { label: "Load Time", value: "<2s", icon: <Zap className="h-5 w-5" /> },
            ],
          },
        },
        {
          id: "fintech-platform",
          title: "FinanceFlow – Banking Platform",
          client: "Regional Bank Corp",
          category: "FinTech Solution",
          duration: "8 months",
          team: "12 developers",
          image: "/financeflow-case-study.png",
          technologies: ["React", "Python", "PostgreSQL", "Kubernetes", "Stripe"],
          problem: {
            title: "The Challenge",
            description:
                "Modernize legacy systems to deliver a secure digital banking experience with strict compliance.",
            challenges: [
              "Legacy system integration",
              "Regulatory compliance requirements",
              "Real-time transaction processing",
              "Multi-factor authentication",
            ],
          },
          solution: {
            title: "Our Approach",
            description:
                "Built a secure, scalable platform with microservices, secure API gateway, and biometric auth.",
            features: [
              "Secure API gateway",
              "Biometric authentication",
              "Real-time fraud detection",
              "Microservices architecture",
            ],
          },
          results: {
            title: "The Impact",
            description: "Increased CSAT and reduced operating costs.",
            metrics: [
              { label: "Customer Satisfaction", value: "95%", icon: <Users className="h-5 w-5" /> },
              { label: "Transaction Speed", value: "3x faster", icon: <Zap className="h-5 w-5" /> },
              { label: "Cost Reduction", value: "40%", icon: <DollarSign className="h-5 w-5" /> },
              { label: "Security Score", value: "99.9%", icon: <Target className="h-5 w-5" /> },
            ],
          },
        },
        {
          id: "ecommerce-ai",
          title: "ShopSmart – AI-Powered E-commerce",
          client: "RetailTech Solutions",
          category: "AI & E-commerce",
          duration: "10 months",
          team: "15 developers",
          image: "/shopsmart-case-study.png",
          technologies: ["Next.js", "Python", "TensorFlow", "Redis", "Shopify API"],
          problem: {
            title: "The Challenge",
            description:
                "Deliver personalization at scale, optimize inventory, and drive a multi-vendor marketplace.",
            challenges: [
              "Personalization at scale",
              "Inventory optimization",
              "Real-time recommendations",
              "Multi-vendor marketplace",
            ],
          },
          solution: {
            title: "Our Approach",
            description:
                "Implemented ML models for personalization, predictive analytics, and dynamic pricing.",
            features: [
              "ML-powered recommendations",
              "Automated inventory management",
              "Dynamic pricing algorithms",
              "Advanced analytics dashboard",
            ],
          },
          results: {
            title: "The Impact",
            description: "Strong lift in conversion and retention.",
            metrics: [
              { label: "Conversion Rate", value: "+65%", icon: <TrendingUp className="h-5 w-5" /> },
              { label: "Customer Retention", value: "+45%", icon: <Users className="h-5 w-5" /> },
              { label: "Revenue Growth", value: "+120%", icon: <DollarSign className="h-5 w-5" /> },
              { label: "Page Load Speed", value: "1.2s", icon: <Clock className="h-5 w-5" /> },
            ],
          },
        },
        {
          id: "healthcare-iot",
          title: "HealthMonitor – IoT Healthcare System",
          client: "MedTech Innovations",
          category: "IoT & Healthcare",
          duration: "12 months",
          team: "10 developers",
          image: "/healthmonitor-case-study.png",
          technologies: ["React", "Python", "IoT Sensors", "AWS IoT", "Machine Learning"],
          problem: {
            title: "The Challenge",
            description:
                "Remote patient monitoring with secure, realtime data and HIPAA compliance.",
            challenges: [
              "Real-time data processing",
              "Medical device integration",
              "HIPAA compliance",
              "Predictive health analytics",
            ],
          },
          solution: {
            title: "Our Approach",
            description:
                "Wearable integration, realtime alerts, and AI-driven risk predictions on a compliant stack.",
            features: [
              "Wearable device integration",
              "Real-time health monitoring",
              "AI health predictions",
              "HIPAA-compliant infrastructure",
            ],
          },
          results: {
            title: "The Impact",
            description: "Better outcomes and lower costs via early intervention.",
            metrics: [
              { label: "Patient Satisfaction", value: "92%", icon: <Users className="h-5 w-5" /> },
              { label: "Early Detection", value: "+80%", icon: <Target className="h-5 w-5" /> },
              { label: "Cost Savings", value: "35%", icon: <DollarSign className="h-5 w-5" /> },
              { label: "Response Time", value: "<30s", icon: <Clock className="h-5 w-5" /> },
            ],
          },
        },
      ],
      []
  )

  const stats = [
    { value: "50+", label: "Projects Completed" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "2M+", label: "Users Impacted" },
    { value: "99.9%", label: "Uptime Achieved" },
  ]

  /* ---------- category filter ---------- */
  const categories = useMemo(
      () => ["All", ...Array.from(new Set(caseStudies.map((c) => c.category)))],
      [caseStudies]
  )
  const [activeCategory, setActiveCategory] = useState("All")
  const filtered = activeCategory === "All" ? caseStudies : caseStudies.filter((c) => c.category === activeCategory)

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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Explore how we’ve helped teams ship faster, scale confidently, and delight users.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-heading font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
              ))}
            </div>

            {/* Filters */}
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
            <div className="space-y-20">
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
                            className={`grid grid-cols-1 lg:grid-cols-2 ${
                                imageLeft ? "" : "lg:[&>*:first-child]:order-2"
                            }`}
                        >
                          {/* Media */}
                          <div className="relative h-64 lg:h-auto">
                            <img
                                src={study.image || "/placeholder.svg"}
                                alt={`${study.title} case study`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            {/* glass overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/0 to-white/30 backdrop-blur-[2px]" />
                            <div className="absolute left-0 top-0 m-4">
                              <Badge variant="secondary" className="bg-white/80 backdrop-blur px-3 py-1 text-xs">
                                {study.category}
                              </Badge>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-8 lg:p-12">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <span className="text-sm text-gray-500">{study.duration}</span>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{study.team}</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">
                              {study.title}
                            </h2>
                            <p className="text-gray-600 mt-2">Client: {study.client}</p>

                            {/* Tech chips */}
                            <div className="flex flex-wrap gap-2 mt-4">
                              {study.technologies.map((t) => (
                                  <span key={t} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                              {t}
                            </span>
                              ))}
                            </div>

                            {/* Problem • Solution • Results (condensed row on lg) */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 border border-gray-100 rounded-xl overflow-hidden">
                              {/* Problem */}
                              <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
                                <h3 className="text-base font-heading font-semibold text-gray-900 mb-3 flex items-center">
                                  <Target className="h-5 w-5 text-red-500 mr-2" />
                                  {study.problem.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
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

                              {/* Solution */}
                              <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
                                <h3 className="text-base font-heading font-semibold text-gray-900 mb-3 flex items-center">
                                  <Zap className="h-5 w-5 text-blue-500 mr-2" />
                                  {study.solution.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
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

                              {/* Results */}
                              <div className="p-6">
                                <h3 className="text-base font-heading font-semibold text-gray-900 mb-3 flex items-center">
                                  <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                                  {study.results.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                  {study.results.description}
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                  {study.results.metrics.map((m) => (
                                      <div key={m.label} className="text-center rounded-lg bg-gray-50 py-3">
                                        <div className="text-green-600 mb-1 flex justify-center">{m.icon}</div>
                                        <div className="text-base font-heading font-bold text-gray-900">{m.value}</div>
                                        <div className="text-[11px] text-gray-600">{m.label}</div>
                                      </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-8">
                              <Button asChild className="bg-gradient-revzion hover:opacity-90 transition-opacity">
                                <Link href={`/portfolio/${study.id}`}>
                                  View Full Case Study
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
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
              Let’s create something your users will love—and your metrics will prove.
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