import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const JOBS = [
    {
        role: "Kotlin Multiplatform Developer",
        type: "Full-time · Remote",
        desc: "Work on cross-platform apps with Kotlin, Compose, BLE devices and cloud integrations.",
    },
    {
        role: "Frontend Developer (Next.js + Tailwind)",
        type: "Full-time · Hybrid",
        desc: "Build web experiences with React, Next.js, Tailwind CSS and Framer Motion.",
    },
    {
        role: "AI Engineer",
        type: "Contract · Remote",
        desc: "Prototype and deploy LLM assistants, embeddings search and automation pipelines.",
    },
]

const REASONS = [
    { title: "Small, senior team", desc: "Open communication, direct access to the people making decisions." },
    { title: "Real products", desc: "SaaS, AI and cross-platform work that ships to production." },
    { title: "Room to grow", desc: "Challenging projects, mentorship and clear feedback." },
]

const applyHref = (role: string) =>
    `mailto:connect@revzion.in?subject=${encodeURIComponent(`Application: ${role}`)}&body=${encodeURIComponent(
        "Name:\nLinkedIn / portfolio:\nWhy this role:\n\n(Please attach your CV as a PDF.)",
    )}`

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <section className="bg-[#EEF1F6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <p className="eyebrow mb-4">Careers</p>
                    <h1 className="text-4xl sm:text-5xl text-[#0B1220] mb-6 max-w-3xl">Work with Revzion</h1>
                    <p className="text-xl text-[#1F2937] max-w-2xl">
                        Join a small team building SaaS, AI and cross-platform products for clients in India, the
                        Middle East and beyond.
                    </p>
                    <Button size="lg" className="mt-8 bg-[#0B1220] hover:bg-[#1F2937] text-white" asChild>
                        <Link href="#open-roles">View open roles</Link>
                    </Button>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-12">Why join us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {REASONS.map((r) => (
                            <div key={r.title} className="border-t border-[#D5DCE8] pt-6">
                                <h3 className="text-xl text-[#0B1220] mb-2">{r.title}</h3>
                                <p className="text-[#64748B]">{r.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="open-roles" className="py-20 bg-[#F7F9FB]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-4">Open roles</h2>
                    <p className="text-[#64748B] mb-10 max-w-2xl">
                        Apply by email — include your CV (PDF) and links to work you're proud of.
                    </p>
                    <ul className="space-y-6 max-w-4xl">
                        {JOBS.map((job) => (
                            <li key={job.role} className="rounded-xl bg-white border border-[#E4E9F1] p-6">
                                <h3 className="text-2xl text-[#0B1220]">{job.role}</h3>
                                <p className="text-sm text-[#64748B] mb-3">{job.type}</p>
                                <p className="text-[#1F2937] mb-4">{job.desc}</p>
                                <Button size="sm" asChild className="bg-[#2563EB] hover:bg-[#1D53DE] text-white">
                                    <a href={applyHref(job.role)}>Apply by email</a>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-20 bg-[#0B1220] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl mb-6">Don't see a role that fits?</h2>
                    <p className="text-lg text-[#C2CBDC] mb-8 max-w-2xl">
                        Write to us anyway — we're always glad to meet strong engineers and designers.
                    </p>
                    <Button asChild size="lg" className="bg-white text-[#0B1220] hover:bg-[#EEF1F6]">
                        <a href={applyHref("Open application")}>Send an open application</a>
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    )
}
