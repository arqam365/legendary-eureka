"use client"

import {motion, useReducedMotion, Variants} from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Smartphone,
  Cloud,
  Brain,
  Watch,
  Database,
  Puzzle,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users,
  Rocket,
  BadgeDollarSign,
  Clock4,
  Handshake,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

/* ---------- shared minimal variants ---------- */
const revealOnce: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  },
}
const hoverCard = { scale: 1.02 }
const hoverIcon = { scale: 1.08 }

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

  const processSteps = [
    { icon: <Users className="h-8 w-8" />, title: "Discover", description: "Align on goals, scope, risks and KPIs." },
    { icon: <Rocket className="h-8 w-8" />, title: "Design & Build", description: "Iterate fast with weekly demos." },
    { icon: <Shield className="h-8 w-8" />, title: "Test & Launch", description: "QA, security and smooth rollout." },
    { icon: <Zap className="h-8 w-8" />, title: "Operate & Scale", description: "SLOs, monitoring and roadmap." },
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

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
                Our <span className="text-gradient-revzion">Services</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                From AI copilots to multi-tenant SaaS and mobile, we build systems that are fast to ship and easy to scale.
              </p>
              <Button size="lg" className="bg-gradient-revzion hover:opacity-90 transition-opacity">
                <Link href="/contact">Get Started Today</Link>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                  <motion.div
                      key={service.title}
                      whileHover={prefersReduced ? undefined : hoverCard}
                      transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  >
                    <Card className="group border-0 shadow-md hover:shadow-xl transition-shadow rounded-2xl bg-white/70 backdrop-blur">
                      <CardHeader className="pb-4">
                        <motion.div className="text-primary mb-4" whileHover={prefersReduced ? undefined : hoverIcon}>
                          {service.icon}
                        </motion.div>
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-heading font-semibold text-gray-900 mb-3">Key Features</h4>
                            <ul className="space-y-2">
                              {service.features.map((f) => (
                                  <li key={f} className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                    {f}
                                  </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-heading font-semibold text-gray-900 mb-3">Tech We Love</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((t) => (
                                  <span key={t} className="px-3 py-1 bg-blue-50 text-primary text-xs font-medium rounded-full">
                              {t}
                            </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Process (clean timeline) */}
        <section className="py-16 bg-gray-50">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
          >
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">Our Process</h2>
              <p className="text-lg text-gray-600">
                A proven path from idea to impact — transparent, iterative, measurable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                  <div key={step.title} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-revzion rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Engagement Models */}
        <section className="py-16 bg-white">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-3">Engagement Models</h2>
              <p className="text-lg text-gray-600">Pick what fits your stage, budget and speed.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {models.map((m) => (
                  <Card key={m.title} className="border-0 shadow-md rounded-2xl bg-white/70 backdrop-blur">
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
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button asChild size="lg" variant="outline" className="text-primary border-primary">
                <Link href="/contact">Compare options with us</Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <motion.div
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-3">FAQ</h2>
              <p className="text-lg text-gray-600">Short answers to the questions we hear most.</p>
            </div>

            <Accordion type="single" collapsible className="bg-white/70 rounded-xl backdrop-blur">
              <AccordionItem value="q1">
                <AccordionTrigger>How do you estimate timeline and cost?</AccordionTrigger>
                <AccordionContent>
                  We run a short discovery to map scope, risks and milestones, then provide a conservative estimate with
                  options (fixed scope vs. elastic capacity). You get weekly burn-up charts and demo builds.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Can you work with our in-house team?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Most engagements pair our pod with your PM/tech lead. We follow your rituals, repos and CI,
                  and leave a clean knowledge trail.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Do you provide post-launch support?</AccordionTrigger>
                <AccordionContent>
                  Yes — we offer SLAs with monitoring, incident response, upgrades and a rolling roadmap to keep shipping
                  value.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-center mt-8">
              <Button asChild className="bg-gradient-revzion hover:opacity-90">
                <Link href="/contact">Ask a different question</Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-revzion">
          <motion.div
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Tell us about your goals — we’ll suggest the fastest, safest path to impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
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
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
  )
}