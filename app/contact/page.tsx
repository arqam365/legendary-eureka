"use client"

import React, { useMemo, useState } from "react"
import axios from "axios"
import {motion, Variants} from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare,
  Users, Briefcase, Globe, Loader2
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

/* ---- minimal motion ---- */
const revealOnce: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  },
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
    // honeypot
    website: "",
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
        "$10K - $25K",
        "$25K - $50K",
        "$50K - $100K",
        "$100K - $250K",
        "$250K+",
        "Let's discuss",
      ],
      []
  )

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Most projects range from 3–12 months depending on scope. We’ll share a milestone plan during discovery.",
    },
    {
      question: "Do you work with startups?",
      answer: "Yes—our engagement models fit early-stage startups to enterprises. We prioritize value and speed.",
    },
    {
      question: "What’s your development process?",
      answer:
          "Lean discovery → iterative sprints → demos & feedback → production hardening → launch → post-launch support.",
    },
    {
      question: "Do you provide ongoing support?",
      answer: "We offer SLAs and maintenance plans for upgrades, monitoring, and feature iterations.",
    },
  ]

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: ["connect@revzion.in"],
      description: "Best for proposals, SOWs, and formal queries.",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["+91 (638) 716-1020"],
      description: "Talk to our solutions team (Mon–Fri).",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: ["Revzion Studio", "India • Remote-first"],
      description: "We operate globally with remote collaboration.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: ["Mon–Fri: 09:00–19:00 IST", "Sat: 10:00–14:00 IST"],
      description: "We adapt for overlapping time zones.",
    },
  ]

  const validate = () => {
    const next: Record<string, string> = {}
    if (!formData.name.trim()) next.name = "Please enter your full name."
    if (!formData.email.trim()) next.email = "Email is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = "Enter a valid email."
    if (formData.phone && !/^[+()\-\d\s]{7,}$/.test(formData.phone)) next.phone = "Enter a valid phone number."
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
        toast({ title: "Message sent 👌", description: "We’ll reply within 24 hours." })
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            service: "",
            budget: "",
            message: "",
            website: "",
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
  const messageHelp = `${messageLen}/20`

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
              Get In <span className="text-gradient-revzion">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Ready to transform your business with innovative technology? Tell us about your goals—we’ll propose a clear, practical plan.
            </p>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
              {[
                { icon: <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />, title: "Free Consultation", desc: "30-minute strategy session" },
                { icon: <Users className="h-12 w-12 text-primary mx-auto mb-4" />, title: "Expert Team", desc: "Work with senior engineers/designers" },
                { icon: <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />, title: "Custom Solutions", desc: "Fit to your stack and timelines" },
              ].map((b) => (
                  <motion.div key={b.title} variants={revealOnce}>
                    <div className="text-center">
                      {b.icon}
                      <h3 className="font-heading font-semibold text-gray-900 mb-2">{b.title}</h3>
                      <p className="text-gray-600 text-sm">{b.desc}</p>
                    </div>
                  </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Form & Info */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
              {/* FORM */}
              <motion.div variants={revealOnce}>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Start Your Project</h2>
                <p className="text-gray-600 mb-8">Fill the form and we’ll respond within 24 hours with next steps.</p>

                {isSubmitted ? (
                    <Card className="p-8 text-center border-green-200 bg-green-50" role="status" aria-live="polite">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">Thanks—we’ll get back to you shortly.</p>
                    </Card>
                ) : (
                    <Card className="p-8 border-0 shadow-lg">
                      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {/* honeypot field (hidden) */}
                        <Input
                            aria-hidden="true"
                            tabIndex={-1}
                            autoComplete="off"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="hidden"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                                placeholder="John Doe"
                                required
                            />
                            {errors.name && (
                                <p id="name-error" className="mt-1 text-sm text-red-600">
                                  {errors.name}
                                </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? "email-error" : undefined}
                                placeholder="john@company.com"
                                required
                            />
                            {errors.email && (
                                <p id="email-error" className="mt-1 text-sm text-red-600">
                                  {errors.email}
                                </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                              Company
                            </label>
                            <Input
                                id="company"
                                name="company"
                                type="text"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder="Your Company"
                            />
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
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
                            />
                            {errors.phone && (
                                <p id="phone-error" className="mt-1 text-sm text-red-600">
                                  {errors.phone}
                                </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Service Needed *</label>
                            <Select
                                value={formData.service}
                                onValueChange={(v) => {
                                  setFormData((p) => ({ ...p, service: v }))
                                  if (errors.service) setErrors((p) => ({ ...p, service: "" }))
                                }}
                            >
                              <SelectTrigger
                                  aria-invalid={!!errors.service}
                                  aria-describedby={errors.service ? "service-error" : undefined}
                              >
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Services</SelectLabel>
                                  {services.map((s) => (
                                      <SelectItem key={s} value={s}>
                                        {s}
                                      </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {errors.service && (
                                <p id="service-error" className="mt-1 text-sm text-red-600">
                                  {errors.service}
                                </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Budget *</label>
                            <Select
                                value={formData.budget}
                                onValueChange={(v) => {
                                  setFormData((p) => ({ ...p, budget: v }))
                                  if (errors.budget) setErrors((p) => ({ ...p, budget: "" }))
                                }}
                            >
                              <SelectTrigger
                                  aria-invalid={!!errors.budget}
                                  aria-describedby={errors.budget ? "budget-error" : undefined}
                              >
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Budget</SelectLabel>
                                  {budgetRanges.map((b) => (
                                      <SelectItem key={b} value={b}>
                                        {b}
                                      </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {errors.budget && (
                                <p id="budget-error" className="mt-1 text-sm text-red-600">
                                  {errors.budget}
                                </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-end justify-between mb-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                              Project Details * <span className="text-gray-400">(min 20 chars)</span>
                            </label>
                            <span className={`text-xs ${messageLen < 20 ? "text-gray-400" : "text-green-600"}`}>
                          {messageHelp}
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
                              placeholder="Tell us about scope, goals, rough timeline, success criteria, and integrations…"
                          />
                          {errors.message && (
                              <p id="message-error" className="mt-1 text-sm text-red-600">
                                {errors.message}
                              </p>
                          )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-revzion hover:opacity-90 transition-opacity text-lg py-3"
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

                        <p className="text-xs text-gray-500 text-center">
                          By submitting, you agree to our{" "}
                          <a href="/privacy-policy" className="underline hover:text-primary">
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </form>
                    </Card>
                )}
              </motion.div>

              {/* INFO */}
              <motion.div variants={revealOnce}>
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-gray-600 mb-8">Prefer a direct line? Here are all the ways to reach us.</p>

                <motion.div className="space-y-6" variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  {contactInfo.map((info) => (
                      <motion.div key={info.title} variants={revealOnce}>
                        <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                          <div className="flex items-start space-x-4">
                            <div className="text-primary flex-shrink-0">{info.icon}</div>
                            <div>
                              <h3 className="font-heading font-semibold text-gray-900 mb-2">{info.title}</h3>
                              {info.details.map((detail, i) => {
                                const isEmail = detail.includes("@")
                                const isPhone = /^\+?[\d\s()\-]+$/.test(detail)
                                const href = isEmail ? `mailto:${detail}` : isPhone ? `tel:${detail.replace(/\s/g, "")}` : undefined
                                return href ? (
                                    <a key={i} href={href} className="text-gray-900 font-medium hover:underline block">
                                      {detail}
                                    </a>
                                ) : (
                                    <p key={i} className="text-gray-900 font-medium">
                                      {detail}
                                    </p>
                                )
                              })}
                              <p className="text-gray-600 text-sm mt-1">{info.description}</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                  ))}
                </motion.div>

                {/* Presence */}
                <Card className="p-6 mt-8 border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start space-x-4">
                    <Globe className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-heading font-semibold text-gray-900 mb-2">Global Presence</h3>
                      <p className="text-gray-600 text-sm">
                        Remote-first across India, Middle East, and APAC; we collaborate worldwide with timezone overlap.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <motion.div
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Quick answers about our services and process.</p>
            </div>

            <motion.div className="space-y-6" variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {faqs.map((faq) => (
                  <motion.div key={faq.question} variants={revealOnce}>
                    <Card className="p-6 border-0 bg-white">
                      <h3 className="font-heading font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </Card>
                  </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <Footer />
      </div>
  )
}