import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import BuildarcSection from "@/components/BuildarcSection"
import { CASE_STUDIES } from "@/lib/case-studies"
import { createFAQSchema } from "@/lib/schemas"

const CLIENTS = ["Evolwe", "Scottish Home Bargains", "Mazencito", "Everyday Fitness", "Techxellent", "EHP Academy"]

const CAPABILITIES = [
    { n: "01", title: "Enterprise software", desc: "Custom platforms built around your workflows — ERP, CRM, HRMS, procurement and internal tooling.", wide: true, dark: true },
    { n: "02", title: "AI & automation", desc: "Assistants, knowledge systems, predictive analytics and workflow automation." },
    { n: "03", title: "SaaS platforms", desc: "Multi-tenant SaaS with RBAC, billing, audit logs and white-labelling." },
    { n: "04", title: "Cloud & infrastructure", desc: "Cloud-native architecture — Kubernetes, CI/CD, IaC and DevOps your team can own.", wide: true },
    { n: "05", title: "Mobile & cross-platform", desc: "iOS and Android with React Native, Expo and Kotlin Multiplatform." },
    { n: "06", title: "Data & intelligence", desc: "Dashboards, data warehouses, KPI reporting and forecasting.", wide: true },
]

const APPROACH = [
    { title: "Engineering-led from day one", desc: "Every engagement runs under senior engineering oversight, so architecture is decided up front, not reviewed after the fact." },
    { title: "Built for years, not quarters", desc: "Security, scalability and extensibility are designed in from the start rather than bolted on later." },
    { title: "AI where it earns its place", desc: "We add intelligence at the system level when it measurably improves a workflow — not as a feature checkbox." },
    { title: "Security in the delivery process", desc: "Access control, audit logging and dependency hygiene are part of every sprint, not a final-week audit." },
]

const STACKS = [
    { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { title: "Mobile", items: ["React Native", "Expo", "Kotlin Multiplatform", "SwiftUI", "Jetpack Compose"] },
    { title: "Backend & APIs", items: ["Node.js", "tRPC / REST", "GraphQL", "Zod", "OAuth / JWT"] },
    { title: "Data & cloud", items: ["PostgreSQL", "Redis", "AWS", "Vercel", "Docker", "Terraform"] },
    { title: "AI", items: ["OpenAI / Anthropic / Groq", "Embeddings", "Vector databases", "RAG"] },
    { title: "Design systems", items: ["shadcn/ui", "Radix", "Storybook", "Figma"] },
]

const FAQ = [
    {
        q: "What services does Revzion offer?",
        a: "Six disciplines: SaaS platforms, AI & automation, mobile & cross-platform apps (React Native, Kotlin Multiplatform), cloud & DevOps, data & intelligence, and custom enterprise software (ERP, CRM, HRMS).",
    },
    {
        q: "How long does it take to build a software product?",
        a: "A typical MVP takes 8–14 weeks from signed scope to production; a full platform 4–6 months. We ship in weekly slices with working demos each sprint.",
    },
    {
        q: "Do you work with startups or enterprises?",
        a: "Both. We adapt the process to your stage — tight scope and speed for startups, structured delivery and integration depth for established businesses.",
    },
    {
        q: "What does a typical engagement look like?",
        a: "A 1–2 week discovery to lock scope, risks and success metrics, then weekly sprints with demos and changelogs. After launch we can stay on to operate and extend the platform.",
    },
    {
        q: "How does pricing work?",
        a: "Fixed-scope projects with a locked estimate after discovery, or monthly retainers for a dedicated team. The Estimate page gives a rough range; contact us for a detailed quote.",
    },
    {
        q: "Where is Revzion based?",
        a: "Jhansi, Uttar Pradesh, India. We work remotely with clients in India, the Middle East and the UK, with overlap windows for live calls.",
    },
]

const faqSchema = createFAQSchema(FAQ.map(({ q, a }) => ({ question: q, answer: a })))

export default function HomePage() {
    const featured = CASE_STUDIES.filter((c) => c.featured)

    return (
        <div className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Navigation />

            {/* Hero */}
            <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
                <p className="eyebrow mb-6">Software engineering partner</p>
                <h1 className="max-w-4xl text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.06] text-[#0B1220]">
                    Platforms engineered to last.
                </h1>
                <div aria-hidden className="mt-7 h-[2px] w-12 bg-[#C9A227]" />
                <p className="mt-7 max-w-2xl text-lg sm:text-xl leading-relaxed text-[#1F2937]">
                    We design and build SaaS platforms, AI systems and cross-platform apps for organisations that can't
                    afford to compromise on reliability.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="h-12 rounded-full bg-[#0B1220] px-7 text-base text-white hover:bg-[#1F2937]">
                        <Link href="/contact">Start a conversation</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-[#D5DCE8] px-7 text-base text-[#0B1220]">
                        <Link href="/portfolio">See our work</Link>
                    </Button>
                </div>

                <div className="mt-16 border-t border-[#E4E9F1] pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">Selected clients</p>
                    <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-[15px] font-medium text-[#1F2937]">
                        {CLIENTS.map((c) => (
                            <li key={c}>{c}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Capabilities */}
            <section id="services" className="bg-[#EEF1F6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
                        <div>
                            <p className="eyebrow mb-4">Capabilities</p>
                            <h2 className="text-3xl sm:text-4xl text-[#0B1220]">What we build</h2>
                        </div>
                        <Link href="/services" className="inline-flex items-center text-[#2563EB] font-medium underline underline-offset-4">
                            All services <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                        </Link>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {CAPABILITIES.map((c) => (
                            <li
                                key={c.n}
                                className={`rounded-2xl p-8 min-h-[200px] flex flex-col justify-between ${c.wide ? "md:col-span-2" : ""} ${
                                    c.dark ? "bg-[#0B1220] text-white" : "bg-white border border-[#D5DCE8]"
                                }`}
                            >
                                <span className={`text-xs font-mono ${c.dark ? "text-[#A5B1C9]" : "text-[#64748B]"}`}>{c.n}</span>
                                <div>
                                    <h3 className={`text-xl mb-2 ${c.dark ? "text-white" : "text-[#0B1220]"}`}>{c.title}</h3>
                                    <p className={`max-w-lg ${c.dark ? "text-[#C2CBDC]" : "text-[#64748B]"}`}>{c.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <BuildarcSection />

            {/* Approach */}
            <section id="why" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <p className="eyebrow mb-4">Our approach</p>
                <h2 className="text-3xl sm:text-4xl text-[#0B1220] max-w-lg mb-14">Why teams choose Revzion</h2>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
                    {APPROACH.map((a) => (
                        <li key={a.title} className="border-l-2 border-[#0B1220] pl-6">
                            <h3 className="text-lg text-[#0B1220] mb-2">{a.title}</h3>
                            <p className="text-[#64748B] max-w-prose">{a.desc}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Featured work */}
            <section id="case-studies" className="bg-[#F7F9FB]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
                        <div>
                            <p className="eyebrow mb-4">Work</p>
                            <h2 className="text-3xl sm:text-4xl text-[#0B1220]">Selected case studies</h2>
                        </div>
                        <Link href="/portfolio" className="inline-flex items-center text-[#2563EB] font-medium underline underline-offset-4">
                            All work <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                        </Link>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featured.map((s) => (
                            <li key={s.id} className="rounded-2xl border border-[#E4E9F1] bg-white overflow-hidden flex flex-col">
                                {s.heroImage && (
                                    <Image
                                        src={s.heroImage}
                                        alt={`${s.title} — screenshot`}
                                        width={800}
                                        height={500}
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="aspect-[16/10] w-full object-cover object-top border-b border-[#E4E9F1]"
                                    />
                                )}
                                <div className="p-6 flex flex-col flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">{s.category}</p>
                                    <h3 className="mt-2 text-xl text-[#0B1220]">{s.title}</h3>
                                    <p className="mt-2 text-[#64748B] flex-1">{s.summary}</p>
                                    <Link
                                        href={`/portfolio/${s.id}`}
                                        className="mt-5 inline-flex items-center text-[#2563EB] font-medium underline underline-offset-4"
                                    >
                                        Read case study <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Stack */}
            <section id="stacks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <p className="eyebrow mb-4">Engineering stack</p>
                <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-4">How we build</h2>
                <p className="text-lg text-[#64748B] max-w-2xl mb-12">
                    Proven tools, chosen per project — combined with the patterns that keep them reliable in production.
                </p>
                <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                    {STACKS.map((s) => (
                        <div key={s.title} className="border-t border-[#D5DCE8] pt-5">
                            <dt className="font-semibold text-[#0B1220]">{s.title}</dt>
                            <dd className="mt-2 text-[#64748B]">{s.items.join(" · ")}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* FAQ */}
            <section id="faq" className="border-t border-[#E4E9F1]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <p className="eyebrow mb-4">FAQ</p>
                        <h2 className="text-3xl sm:text-4xl text-[#0B1220]">Frequently asked questions</h2>
                    </div>
                    <Accordion type="single" collapsible className="lg:col-span-8 divide-y divide-[#E4E9F1]">
                        {FAQ.map(({ q, a }, i) => (
                            <AccordionItem key={q} value={`faq-${i}`} className="border-0">
                                <AccordionTrigger className="text-left text-base font-semibold text-[#0B1220] hover:no-underline py-5">
                                    {q}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#1F2937] leading-relaxed pb-5 text-base max-w-prose">
                                    {a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* CTA */}
            <section id="cta" className="bg-[#0B1220]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <h2 className="text-3xl sm:text-4xl text-white max-w-2xl">Let's build the platform your operations depend on.</h2>
                    <p className="mt-5 text-lg text-[#C2CBDC] max-w-2xl">
                        Talk directly with the engineers who'll build it. We reply within one business day.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Button asChild size="lg" className="h-12 rounded-full bg-white px-7 text-base text-[#0B1220] hover:bg-[#EEF1F6]">
                            <Link href="/contact">Start a conversation</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-[#364A75] bg-transparent px-7 text-base text-white hover:bg-[#131C33] hover:text-white">
                            <Link href="/portfolio">See our work</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
