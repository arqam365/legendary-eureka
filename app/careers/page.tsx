"use client"

import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Users, Briefcase, Sparkles } from "lucide-react"

// shadcn/ui form bits
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const revealOnce: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

type Job = {
    role: string
    type: string
    desc: string
}

export default function CareersPage() {
    const [open, setOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const jobs: Job[] = [
        {
            role: "Kotlin Multiplatform Developer",
            type: "Full-time · Remote",
            desc: "Work on next-gen cross-platform apps with Kotlin, Compose, BLE devices, and cloud integrations.",
        },
        {
            role: "Frontend Developer (Next.js + Tailwind)",
            type: "Full-time · Hybrid",
            desc: "Build delightful web experiences with React, Next.js, Tailwind CSS, and Framer Motion.",
        },
        {
            role: "AI Engineer",
            type: "Contract · Remote",
            desc: "Prototype and deploy LLM copilots, embeddings search, and automation pipelines.",
        },
    ]

    function openForm(role: string) {
        setSelectedRole(role)
        setError(null)
        setSuccess(false)
        setOpen(true)
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSubmitting(true)
        setError(null)
        setSuccess(false)

        const form = new FormData(e.currentTarget)
        // basic required checks
        if (!form.get("name") || !form.get("email")) {
            setSubmitting(false)
            setError("Please fill your name and email.")
            return
        }

        try {
            // POST to your API route (create /app/api/apply/route.ts later)
            await fetch("/api/apply", { method: "POST", body: form })
            setSuccess(true)
            // optional: close after a moment
            // setTimeout(() => setOpen(false), 1200)
            e.currentTarget.reset()
        } catch (err) {
            setError("Something went wrong. Please try again or email contact@revzion.com.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <motion.div
                    className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
                    variants={revealOnce}
                    initial="hidden"
                    animate="show"
                >
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
                        Work With <span className="text-gradient-revzion">Revzion</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join a passionate team building scalable SaaS, AI, and cross-platform solutions that make an impact worldwide.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" className="bg-gradient-revzion text-white" asChild>
                            <Link href="#open-roles">View Open Roles</Link>
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* Why Join */}
            <section className="py-20 bg-white">
                <motion.div
                    className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-12 text-center">Why Join Us?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Users className="h-10 w-10 text-primary" />,
                                title: "Collaborative Culture",
                                desc: "Work alongside ambitious teammates, open communication, and supportive leadership.",
                            },
                            {
                                icon: <Sparkles className="h-10 w-10 text-primary" />,
                                title: "Cutting-Edge Projects",
                                desc: "Build AI, SaaS, and cross-platform solutions that push industries forward.",
                            },
                            {
                                icon: <Briefcase className="h-10 w-10 text-primary" />,
                                title: "Growth Opportunities",
                                desc: "Upskill with challenging projects, mentorship, and career advancement support.",
                            },
                        ].map((item) => (
                            <div key={item.title} className="text-center p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
                                <div className="flex justify-center mb-4">{item.icon}</div>
                                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Open Roles */}
            <section id="open-roles" className="py-20 bg-gray-50">
                <motion.div
                    className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-12 text-center">Open Roles</h2>

                    <div className="space-y-6">
                        {jobs.map((job) => (
                            <div
                                key={job.role}
                                className="rounded-xl bg-white shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
                            >
                                <h3 className="text-2xl font-heading font-bold text-gray-900">{job.role}</h3>
                                <p className="text-sm text-gray-500 mb-3">{job.type}</p>
                                <p className="text-gray-600 mb-4">{job.desc}</p>
                                <Button size="sm" className="bg-gradient-revzion" onClick={() => openForm(job.role)}>
                                    Apply Now
                                </Button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-revzion text-white text-center">
                <motion.div
                    className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">Let’s Build the Future Together</h2>
                    <p className="text-lg text-blue-100 mb-8">
                        Not seeing a role that fits? Reach out anyway — we’re always excited to meet ambitious talent.
                    </p>
                    <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                        <Link href="/contact">Work With Us</Link>
                    </Button>
                </motion.div>
            </section>

            <Footer />

            {/* ---------- Application Modal ---------- */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Apply for {selectedRole ?? "a role"}</DialogTitle>
                        <DialogDescription>Tell us a little about you. We’ll get back to you quickly.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit} className="space-y-4">
                        {/* hidden role field so it reaches the API */}
                        <input type="hidden" name="role" value={selectedRole ?? ""} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input id="name" name="name" required placeholder="Jane Doe" />
                            </div>
                            <div>
                                <Label htmlFor="email">Email *</Label>
                                <Input id="email" name="email" type="email" required placeholder="you@company.com" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="portfolio">Portfolio / Website</Label>
                                <Input id="portfolio" name="portfolio" placeholder="https://…" />
                            </div>
                            <div>
                                <Label htmlFor="linkedin">LinkedIn</Label>
                                <Input id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/…" />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="resume">Resume (PDF)</Label>
                            <Input id="resume" name="resume" type="file" accept="application/pdf" />
                        </div>

                        <div>
                            <Label htmlFor="cover">Brief Cover Note</Label>
                            <Textarea id="cover" name="cover" placeholder="A few lines about why you’re a great fit…" rows={5} />
                        </div>

                        {error && <p className="text-sm text-red-600">{error}</p>}
                        {success && <p className="text-sm text-green-700">Thanks! Your application was submitted.</p>}

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-gradient-revzion" disabled={submitting}>
                                {submitting ? "Submitting…" : "Submit Application"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}