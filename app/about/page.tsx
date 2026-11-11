import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

type Member = { name: string; role: string; bio: string; links?: { label: string; href: string }[] }

const TEAM: Member[] = [
    {
        name: "Arqam Ahmad Siddiqui",
        role: "Founder & CEO",
        bio: "Leads product and engineering — Kotlin Multiplatform, cloud architecture and delivery.",
        links: [
            { label: "Website", href: "https://arqam365.com/" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/arqam365/" },
            { label: "GitHub", href: "https://github.com/arqam365" },
        ],
    },
    {
        name: "Raj Dwivedi",
        role: "Backend Engineer & DevOps",
        bio: "APIs, CI/CD and cloud-native reliability across Node/Ktor and modern infrastructure.",
        links: [
            { label: "Website", href: "https://rajdwivedi.vercel.app/" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/badenforcer/" },
            { label: "GitHub", href: "https://github.com/BadEnforcer" },
        ],
    },
    {
        name: "Bilal Sheikh",
        role: "Full Stack Engineer",
        bio: "Bridges frontend and backend to ship robust, user-centred features.",
        links: [{ label: "Website", href: "https://stunning-waffle-2001.vercel.app/" }],
    },
    { name: "Sneha Sahu", role: "Head of Business Development", bio: "Partnerships and growth aligned with product value." },
    { name: "Saniya Khan", role: "UI/UX Developer", bio: "Designs accessible interfaces and owns their implementation." },
    { name: "Gagandeep Singh", role: "Engineer", bio: "Full-stack and integrations." },
    { name: "Pulkit Shukla", role: "Engineer", bio: "Cloud and backend." },
    { name: "Bharat Agarwal", role: "Engineer", bio: "Architecture and data." },
]

const TIMELINE = [
    { year: "2019", event: "Founded as Next Level Programmers" },
    { year: "2020", event: "First AI pilot shipped" },
    { year: "2021", event: "Kotlin Multiplatform and cross-platform work" },
    { year: "2024", event: "Operating as Revzion" },
]

const VALUES = [
    { title: "Clear before clever", desc: "Plain decisions, written down, visible to the client." },
    { title: "Quality by default", desc: "Reliability, performance and security are not optional extras." },
    { title: "Client partnership", desc: "Weekly demos, honest status and no surprises at invoice time." },
    { title: "Accessible by rule", desc: "Accessibility is part of the definition of done." },
]

const initials = (name: string) =>
    name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <section className="bg-[#EEF1F6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <p className="eyebrow">About us</p>
                    <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#0B1220] max-w-3xl">
                        The team behind Revzion
                    </h1>
                    <p className="mt-6 text-lg text-[#1F2937] leading-relaxed max-w-2xl">
                        A small senior product and engineering team building SaaS, AI and cross-platform products. We keep
                        cycles tight, decisions clear and outcomes visible.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Button asChild size="lg" className="h-12 rounded-full bg-[#0B1220] px-7 text-white hover:bg-[#1F2937]">
                            <Link href="/contact">Start a conversation</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-[#D5DCE8] px-7">
                            <Link href="/portfolio">See our work</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7">
                        <p className="eyebrow mb-3">Our story</p>
                        <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-6">From a small studio to a delivery partner</h2>
                        <div className="space-y-5 text-[#1F2937] leading-relaxed max-w-prose">
                            <p>
                                Revzion — previously <em>Next Level Programmers</em> — began in 2019 with a simple idea:
                                combine modern engineering with business clarity.
                            </p>
                            <p>
                                What started as hands-on consulting has grown into end-to-end product delivery across AI,
                                SaaS and cross-platform apps, for clients in India, Saudi Arabia and the UK.
                            </p>
                        </div>
                        <blockquote className="mt-8 border-l-2 border-[#C9A227] pl-5">
                            <p className="font-display-brand text-2xl leading-snug text-[#0B1220]">
                                “Trust before innovation. Intelligence before complexity. Precision before decoration.”
                            </p>
                            <footer className="mt-2 text-sm text-[#64748B]">— How we work</footer>
                        </blockquote>
                    </div>
                    <div className="lg:col-span-5">
                        <ol className="border-l border-[#D5DCE8] pl-6 space-y-6">
                            {TIMELINE.map((m) => (
                                <li key={m.year}>
                                    <p className="text-sm font-semibold text-[#0B1220]">{m.year}</p>
                                    <p className="text-[#64748B]">{m.event}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-[#F7F9FB]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="eyebrow mb-3">Partnerships</p>
                        <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-6">Regional reach</h2>
                        <div className="space-y-5 text-[#1F2937] leading-relaxed max-w-prose">
                            <p>
                                For clients in the Middle East we collaborate with{" "}
                                <a href="https://www.techxellent.net/" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] underline underline-offset-2">
                                    TechXellent
                                </a>
                                , a Saudi Arabia–based technology company. Revzion keeps ownership of engineering
                                standards, architecture and accountability.
                            </p>
                            <p>
                                Revzion is listed on{" "}
                                <a href="https://www.goodfirms.co/company/revzion" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] underline underline-offset-2">
                                    GoodFirms
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-10">
                        <Image src="/logos/techxellent.svg" alt="TechXellent" width={180} height={60} className="h-12 w-auto" />
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="eyebrow mb-3">Values</p>
                    <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-12">How we think and work</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {VALUES.map((v) => (
                            <li key={v.title} className="border-t border-[#D5DCE8] pt-6">
                                <h3 className="text-base text-[#0B1220] mb-2">{v.title}</h3>
                                <p className="text-[#64748B]">{v.desc}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-20 bg-[#F7F9FB]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="eyebrow mb-3">The team</p>
                    <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-12">The people behind the work</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {TEAM.map((m) => (
                            <li key={m.name} className="rounded-xl border border-[#E4E9F1] bg-white p-6">
                                <div
                                    aria-hidden
                                    className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#0B1220] text-sm font-semibold text-white"
                                >
                                    {initials(m.name)}
                                </div>
                                <h3 className="text-base text-[#0B1220]">{m.name}</h3>
                                <p className="text-sm font-medium text-[#64748B]">{m.role}</p>
                                <p className="mt-3 text-sm text-[#1F2937] leading-relaxed">{m.bio}</p>
                                {m.links && (
                                    <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                        {m.links.map((l) => (
                                            <a
                                                key={l.href}
                                                href={l.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#2563EB] underline underline-offset-2"
                                            >
                                                {l.label}
                                                <span className="sr-only"> — {m.name}</span>
                                            </a>
                                        ))}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-20 bg-[#0B1220]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl text-white mb-4">Ready to work together?</h2>
                    <p className="text-lg text-[#C2CBDC] mb-8 max-w-xl">
                        Tell us what you're building and we'll be straight about whether we're the right fit.
                    </p>
                    <Button asChild size="lg" className="h-12 rounded-full bg-white px-7 text-[#0B1220] hover:bg-[#EEF1F6]">
                        <Link href="/contact">Start a conversation</Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    )
}
