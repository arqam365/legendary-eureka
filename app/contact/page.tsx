"use client"

import React, { useMemo, useState } from "react"
import axios from "axios"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle, Globe, Loader2, ArrowRight,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const revealOnce: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}
const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

export default function ContactPage() {
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
    website: "", // honeypot
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const services = useMemo(
    () => [
      "Mobile & Web Apps",
      "Cloud & DevOps",
      "AI & Automation",
      "Wearables & IoT",
      "SaaS Solutions",
      "Custom Integrations",
      "Consulting",
      "Other",
    ],
    []
  )

  const budgetRanges = useMemo(
    () => [
      "Under $10K",
      "$10K – $25K",
      "$25K – $50K",
      "$50K – $100K",
      "$100K – $250K",
      "$250K+",
      "Let's discuss",
    ],
    []
  )

  const validate = () => {
    const next: Record<string, string> = {}
    if (!formData.name.trim()) next.name = "Please enter your full name."
    if (!formData.email.trim()) next.email = "Email is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = "Enter a valid email."
    if (formData.phone && !/^[+()\-\d\s]{7,}$/.test(formData.phone))
      next.phone = "Enter a valid phone number."
    if (!formData.message.trim() || formData.message.trim().length < 20)
      next.message = "Please provide at least 20 characters."
    if (!formData.service) next.service = "Select a service."
    if (!formData.budget) next.budget = "Select a budget range."
    return next
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.website) return // honeypot

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      toast({ title: "Please fix the highlighted fields.", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    try {
      const res = await axios.post("/api/contact", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        budget: formData.budget,
        message: formData.message.trim(),
      })

      if (res.data?.success) {
        setIsSubmitted(true)
        toast({ title: "Message sent", description: "We'll reply within 24 hours." })
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: "", email: "", company: "", phone: "",
            service: "", budget: "", message: "", website: "",
          })
        }, 2500)
      } else {
        throw new Error(res.data?.error || "Failed to submit.")
      }
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error?.response?.data?.error ?? error?.message ?? "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const messageLen = formData.message.trim().length

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-100 py-16 sm:py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={revealOnce}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              Contact
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 leading-tight mb-5">
              Let's talk about{" "}
              <span className="text-gradient-revzion">your project.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Tell us what you're building — scope, goals, timeline. We'll come back within
              24 hours with a clear, practical proposal.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Form + Info */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* ── Form ── */}
            <motion.div variants={revealOnce} className="lg:col-span-7">
              <div className="mb-7">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                  Send us a message
                </h2>
                <p className="text-sm text-gray-500">
                  Fields marked * are required. We read every submission ourselves.
                </p>
              </div>

              {isSubmitted ? (
                <div
                  className="rounded-xl border border-emerald-200 bg-emerald-50 p-10 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">
                    Message received
                  </h3>
                  <p className="text-sm text-gray-600">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  {/* Honeypot */}
                  <Input
                    aria-hidden="true"
                    tabIndex={-1}
                    autoComplete="off"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        placeholder="Jane Smith"
                        className={errors.name ? "border-red-300 focus-visible:ring-red-200" : ""}
                        required
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Work Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        placeholder="jane@company.com"
                        className={errors.email ? "border-red-300 focus-visible:ring-red-200" : ""}
                        required
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        placeholder="+91 98765 43210"
                        className={errors.phone ? "border-red-300 focus-visible:ring-red-200" : ""}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Service *</label>
                      <Select
                        value={formData.service}
                        onValueChange={(v) => {
                          setFormData((p) => ({ ...p, service: v }))
                          if (errors.service) setErrors((p) => ({ ...p, service: "" }))
                        }}
                      >
                        <SelectTrigger
                          aria-invalid={!!errors.service}
                          className={errors.service ? "border-red-300 focus:ring-red-200" : ""}
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Services</SelectLabel>
                            {services.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p id="service-error" className="text-xs text-red-600">{errors.service}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Budget *</label>
                      <Select
                        value={formData.budget}
                        onValueChange={(v) => {
                          setFormData((p) => ({ ...p, budget: v }))
                          if (errors.budget) setErrors((p) => ({ ...p, budget: "" }))
                        }}
                      >
                        <SelectTrigger
                          aria-invalid={!!errors.budget}
                          className={errors.budget ? "border-red-300 focus:ring-red-200" : ""}
                        >
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Budget</SelectLabel>
                            {budgetRanges.map((b) => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.budget && (
                        <p id="budget-error" className="text-xs text-red-600">{errors.budget}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Project Details *
                      </label>
                      <span className={`text-xs tabular-nums ${messageLen >= 20 ? "text-emerald-600" : "text-gray-400"}`}>
                        {messageLen}/20
                      </span>
                    </div>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      placeholder="Describe your scope, goals, rough timeline, and any key integrations or constraints…"
                      className={errors.message ? "border-red-300 focus-visible:ring-red-200" : ""}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-revzion hover:opacity-90 transition-opacity"
                    aria-disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    By submitting you agree to our{" "}
                    <a href="/privacy-policy" className="underline hover:text-gray-600">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              )}
            </motion.div>

            {/* ── Info + What happens next ── */}
            <motion.div variants={revealOnce} className="lg:col-span-5 space-y-8">
              {/* Contact details */}
              <div>
                <h2 className="text-lg font-heading font-semibold text-gray-900 mb-5">
                  Contact details
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Mail className="h-4 w-4" />,
                      label: "Email",
                      value: "connect@revzion.in",
                      href: "mailto:connect@revzion.in",
                      note: "Best for proposals and formal queries",
                    },
                    {
                      icon: <Phone className="h-4 w-4" />,
                      label: "Phone",
                      value: "+91 (638) 716-1020",
                      href: "tel:+916387161020",
                      note: "Mon–Fri, 09:00–19:00 IST",
                    },
                    {
                      icon: <MapPin className="h-4 w-4" />,
                      label: "Location",
                      value: "India — remote-first",
                      href: undefined,
                      note: "Serving India, Middle East & APAC",
                    },
                    {
                      icon: <Clock className="h-4 w-4" />,
                      label: "Hours",
                      value: "Mon–Fri 09:00–19:00 IST",
                      href: undefined,
                      note: "Sat 10:00–14:00 · We adapt for overlaps",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 rounded-lg bg-gray-50 text-gray-500 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium text-gray-900 hover:text-primary transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-gray-900">{item.value}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-0.5">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* What happens next */}
              <div>
                <h2 className="text-lg font-heading font-semibold text-gray-900 mb-5">
                  What happens next
                </h2>
                <div className="space-y-5">
                  {[
                    {
                      step: "1",
                      title: "We review your submission",
                      desc: "A senior member of the team reads every message — usually within a few hours.",
                    },
                    {
                      step: "2",
                      title: "Discovery call (30 min)",
                      desc: "We align on goals, scope, constraints, and ideal timeline.",
                    },
                    {
                      step: "3",
                      title: "Proposal within 48 hours",
                      desc: "You receive a clear scope, team structure, milestone plan, and pricing.",
                    },
                    {
                      step: "4",
                      title: "Kick off",
                      desc: "Once aligned, we start with a structured discovery sprint — no wasted time.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Global presence */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 rounded-lg bg-gray-50 text-gray-500 flex-shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Global reach</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Remote-first across India, Middle East, and APAC. We cover overlapping
                    time zones and have regional partners for local delivery when needed.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl font-heading font-bold text-gray-900">Common questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How long does a typical project take?",
                a: "Most projects run 3–12 months depending on scope. We share a milestone plan during discovery so you know exactly what to expect and when.",
              },
              {
                q: "Do you work with early-stage startups?",
                a: "Yes — our engagement models scale from early-stage to enterprise. We prioritise moving fast and proving value in the first sprint.",
              },
              {
                q: "What does your development process look like?",
                a: "Discovery → iterative sprints with weekly demos → QA & security hardening → launch → post-launch support. Transparent burn-up throughout.",
              },
              {
                q: "Do you offer ongoing support after launch?",
                a: "We offer SLAs covering monitoring, incident response, dependency upgrades, and feature iterations — on a retainer or milestone basis.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Still have questions?{" "}
              <a href="mailto:connect@revzion.in" className="text-primary font-medium hover:underline">
                Email us directly.
              </a>
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
