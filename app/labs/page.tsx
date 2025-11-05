"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  Beaker,
  Zap,
  Code,
  Sparkles,
  Rocket,
  Cpu,
  Binary,
  BrainCircuit,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Select} from "react-day-picker";
import {SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

gsap.registerPlugin(ScrollTrigger)

const revealOnce: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

const hoverCard = { scale: 1.02, rotateY: 2 }
const glowPulse = {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
        duration: 3,
        repeat: Infinity as number,
        ease: "easeInOut" as const
    }
}

// Animated grid background component
function CyberGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />
    </div>
  )
}

export default function LabsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const blobShift = useTransform(scrollYProgress, [0, 1], [0, -30])
  const [hydrated, setHydrated] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setHydrated(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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
            description: "Personalized learning experiences powered by adaptive AI that understands each student's pace and style.",
            status: "Experimental",
            tags: ["AI", "Education", "Adaptive Learning"],
            icon: <BrainCircuit className="h-12 w-12" />,
            gradient: "from-cyan-500/20 to-blue-500/20",
        },
        {
            title: "AI in Healthcare",
            description: "Intelligent diagnostic systems and predictive health analytics for early disease detection and treatment.",
            status: "Research",
            tags: ["AI", "Healthcare", "Diagnostics"],
            icon: <Binary className="h-12 w-12" />,
            gradient: "from-purple-500/20 to-pink-500/20",
        },
        {
            title: "India's Own AI",
            description: "Building sovereign AI capabilities tailored for Indian languages, culture, and unique technological needs.",
            status: "Research",
            tags: ["AI", "Sovereign Tech", "Indic"],
            icon: <Cpu className="h-12 w-12" />,
            gradient: "from-emerald-500/20 to-teal-500/20",
        },
    ]

  const focusAreas = [
    {
      icon: <Beaker className="h-8 w-8" />,
      title: "Quantum Computing",
      description: "Exploring quantum algorithms for optimization and cryptography.",
      color: "from-cyan-400 to-blue-600",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Neural Performance",
      description: "AI-driven optimizations that predict bottlenecks before impact.",
      color: "from-purple-400 to-pink-600",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Open Source Innovation",
      description: "Breakthrough tools pushing boundaries of what's possible.",
      color: "from-emerald-400 to-teal-600",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Immersive Interfaces",
      description: "Next-gen UX with AR/VR and spatial computing integration.",
      color: "from-orange-400 to-red-600",
    },
  ]

  const stats = [
    { value: "15+", label: "Active Experiments", icon: <Beaker className="h-5 w-5" /> },
    { value: "8", label: "Open Source", icon: <Code className="h-5 w-5" /> },
    { value: "5", label: "Research Papers", icon: <Sparkles className="h-5 w-5" /> },
    { value: "100+", label: "Contributors", icon: <Rocket className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navigation />

      {/* Cursor glow effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
        }}
      />

      {/* Hero */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50"
      >
        <CyberGrid />
        
        {/* Floating orbs */}
          <motion.div
              animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-revzion opacity-10 rounded-full blur-3xl"
          />
        <motion.div
          animate={{ ...glowPulse, transition: { ...glowPulse.transition, delay: 1.5 } }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-200 opacity-20 rounded-full blur-3xl"
        />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-xl"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-primary text-sm font-medium">Innovation Lab</span>
              </motion.div>

              {/* Title */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight">
                  <span className="text-gradient-revzion">
                    Revzion Labs
                  </span>
                  <br />
                  <span className="text-gray-900">The Future,</span>
                  <br />
                  <span className="text-gray-600">Built Today</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Our experimental playground where bleeding-edge technologies become tomorrow's production standards.
                </p>
              </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        size="lg"
                        className="relative overflow-hidden bg-gradient-revzion hover:opacity-90 transition-opacity group"
                        asChild
                    >
                        <Link href="#experiments">
      <span className="relative z-10 flex items-center">
        Explore Experiments
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </span>
                        </Link>
                    </Button>

                    <Dialog modal={true}>
                        <DialogTrigger asChild>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
                            >
                                Join the Lab
                            </Button>
                        </DialogTrigger>
                        <DialogContent
                            className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto"
                            onPointerDownOutside={(e) => e.preventDefault()}
                        >
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-heading text-gradient-revzion">
                                    Join Revzion Labs
                                </DialogTitle>
                                <DialogDescription>
                                    Fill out the form below to collaborate with us on cutting-edge experiments.
                                </DialogDescription>
                            </DialogHeader>

                            <form className="space-y-4 py-4">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                        Full Name *
                                    </label>
                                    <input
                                        id="name"
                                        placeholder="John Doe"
                                        required
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                {/* Organization */}
                                <div className="space-y-2">
                                    <label htmlFor="organization" className="text-sm font-medium text-gray-700">
                                        Organization/Institution
                                    </label>
                                    <input
                                        id="organization"
                                        placeholder="Your company or university"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                {/* Role */}
                                <div className="space-y-2">
                                    <label htmlFor="role" className="text-sm font-medium text-gray-700">
                                        Your Role *
                                    </label>
                                    <select
                                        id="role"
                                        required
                                        defaultValue=""
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option value="" disabled>Select your role</option>
                                        <option value="developer">Developer</option>
                                        <option value="researcher">Researcher</option>
                                        <option value="student">Student</option>
                                        <option value="entrepreneur">Entrepreneur</option>
                                        <option value="designer">Designer</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Area of Interest */}
                                <div className="space-y-2">
                                    <label htmlFor="interest" className="text-sm font-medium text-gray-700">
                                        Area of Interest *
                                    </label>
                                    <select
                                        id="interest"
                                        required
                                        defaultValue=""
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option value="" disabled>Select area of interest</option>
                                        <option value="ai-edtech">AI in EdTech</option>
                                        <option value="ai-healthcare">AI in Healthcare</option>
                                        <option value="india-ai">India's Own AI</option>
                                        <option value="quantum">Quantum Computing</option>
                                        <option value="open-source">Open Source Innovation</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Expertise */}
                                <div className="space-y-2">
                                    <label htmlFor="expertise" className="text-sm font-medium text-gray-700">
                                        Your Expertise/Skills
                                    </label>
                                    <input
                                        id="expertise"
                                        placeholder="e.g., Machine Learning, React, Python"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                                        Why do you want to join? *
                                    </label>
                                    <textarea
                                        id="message"
                                        placeholder="Tell us about your interest in joining Revzion Labs..."
                                        rows={4}
                                        required
                                        className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-revzion hover:opacity-90 text-white"
                                    size="lg"
                                >
                                    Submit Application
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 + 0.5 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group cursor-pointer h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-revzion rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                            <div className="relative p-4 rounded-xl border border-white/60 bg-white/80 backdrop-blur-xl hover:border-primary/50 transition-all shadow-sm hover:shadow-md h-full flex flex-col">
                                <div className="flex items-center gap-2 text-primary mb-1">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl font-heading font-bold text-gray-900">{stat.value}</div>
                                <div className="text-xs text-gray-600">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right side - Futuristic visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-primary/10 via-blue-100 to-purple-100 border border-white/60 rounded-2xl backdrop-blur-xl flex items-center justify-center">
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Beaker className="h-40 w-40 text-primary/40" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white relative" data-st-section>
        <CyberGrid />
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-gradient-revzion">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Revzion Labs is our R&D arm dedicated to exploring tomorrow's technologies today.
              We prototype, experiment, and validate approaches before production.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-gray-50 relative" data-st-section>
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-gradient-revzion">
              Focus Areas
            </h2>
            <p className="text-xl text-gray-600">Where we invest our R&D efforts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <CardContent className="relative p-6 flex flex-col h-full">
                    <motion.div 
                      className="text-primary mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {area.icon}
                    </motion.div>
                    <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Active Experiments */}
      <section id="experiments" className="py-20 bg-white relative" data-st-section>
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-gradient-revzion">
              Active Experiments
            </h2>
            <p className="text-xl text-gray-600">Current projects in our innovation pipeline</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Card className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all h-full cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <CardContent className="relative p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className="text-primary"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                      >
                        {exp.icon}
                      </motion.div>
                      <motion.span 
                        className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        {exp.status}
                      </motion.span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.1 }}
                          className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs border border-gray-200"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Collaboration CTA */}
      <section className="py-20 bg-gradient-revzion relative overflow-hidden">
        <CyberGrid />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            animate={
                {
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }
            }
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="p-4 rounded-full bg-white/20 border border-white/30">
              <Rocket className="h-12 w-12 text-white" />
            </div>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
            Want to Collaborate?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for partners, contributors, and innovators to join our experiments.
            Let's build the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
                asChild
              >
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3 bg-transparent"
                asChild
              >
                <Link href="/about">Meet Our Team</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
