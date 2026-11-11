import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const TRACKS = [
    {
        title: "AI in EdTech",
        status: "Experimental",
        description:
            "Adaptive learning for coaching institutes — dropout prediction, automated question generation and engagement analytics.",
        tags: ["AI", "Education", "Adaptive learning"],
    },
    {
        title: "AI in Healthcare",
        status: "Research",
        description:
            "Exploring decision-support and predictive analytics for clinical workflows. Research only — not a medical device and not in clinical use.",
        tags: ["AI", "Healthcare", "Decision support"],
    },
    {
        title: "India's Own AI",
        status: "Research",
        description: "Infrastructure for Indic languages, regional regulatory requirements and India-specific data sovereignty.",
        tags: ["Sovereign AI", "Indic NLP", "Policy"],
    },
]

const FOCUS = [
    { title: "Applied AI systems", description: "Integrating LLMs, embeddings and ML pipelines into production workflows with real reliability constraints." },
    { title: "Domain-specific models", description: "Fine-tuning and evaluating models for vertical markets where general-purpose AI underperforms." },
    { title: "Open-source tools", description: "Developer utilities and internal frameworks we publish when they prove useful beyond our own stack." },
    { title: "Platform infrastructure", description: "Stress-testing multi-tenant SaaS patterns and real-time data pipelines." },
]

const COLLAB_HREF = `mailto:connect@revzion.in?subject=${encodeURIComponent("Revzion Labs collaboration")}&body=${encodeURIComponent(
    "Name:\nOrganisation / role:\nResearch track of interest:\nWhat you'd contribute:\n",
)}`

export default function LabsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <section className="bg-[#EEF1F6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <p className="eyebrow">Revzion Labs</p>
                        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#0B1220]">
                            Where we test what comes next.
                        </h1>
                        <p className="mt-5 text-lg text-[#1F2937] leading-relaxed max-w-lg">
                            Labs is our R&amp;D practice. We prototype high-risk ideas, test them against real constraints,
                            and graduate the ones that hold up into production systems.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Button size="lg" asChild className="bg-[#0B1220] hover:bg-[#1F2937] text-white">
                                <a href={COLLAB_HREF}>Collaborate with us</a>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="border-[#D5DCE8]">
                                <Link href="#tracks">View research tracks</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#D5DCE8] bg-white">
                        <p className="px-6 py-4 border-b border-[#E4E9F1] text-xs font-semibold uppercase tracking-[0.14em] text-[#1F2937]">
                            Research tracks
                        </p>
                        <ul className="divide-y divide-[#E4E9F1]">
                            {TRACKS.map((t) => (
                                <li key={t.title} className="px-6 py-5">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="text-sm font-semibold text-[#0B1220]">{t.title}</span>
                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium border border-[#D5DCE8] text-[#1F2937]">
                                            {t.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#1F2937] leading-relaxed">{t.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="eyebrow mb-3">Research focus</p>
                    <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-12 max-w-2xl">Where we invest our R&amp;D</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {FOCUS.map((f) => (
                            <div key={f.title} className="border-t border-[#D5DCE8] pt-6">
                                <h3 className="text-base text-[#0B1220] mb-2">{f.title}</h3>
                                <p className="text-sm text-[#64748B] leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="tracks" className="py-20 bg-[#F7F9FB]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="eyebrow mb-3">Experiments</p>
                    <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-4">Research tracks</h2>
                    <p className="text-lg text-[#1F2937] mb-12 max-w-2xl">
                        Each track starts with a clear hypothesis. We run structured experiments and either graduate or
                        retire the idea.
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TRACKS.map((t) => (
                            <li key={t.title} className="rounded-xl border border-[#E4E9F1] bg-white p-7">
                                <span className="inline-block mb-4 px-2.5 py-1 rounded-full text-xs font-medium border border-[#D5DCE8] text-[#1F2937]">
                                    {t.status}
                                </span>
                                <h3 className="text-lg text-[#0B1220] mb-3">{t.title}</h3>
                                <p className="text-sm text-[#64748B] leading-relaxed mb-5">{t.description}</p>
                                <ul className="flex flex-wrap gap-1.5">
                                    {t.tags.map((tag) => (
                                        <li key={tag} className="px-2.5 py-1 rounded-md bg-[#EEF1F6] text-[#1F2937] text-xs">
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-4">Interested in collaborating?</h2>
                    <p className="text-lg text-[#1F2937] mb-8 max-w-xl">
                        We work with researchers, domain experts and engineers who bring real-world constraints to open
                        problems.
                    </p>
                    <Button size="lg" asChild className="bg-[#0B1220] hover:bg-[#1F2937] text-white">
                        <a href={COLLAB_HREF}>Email Revzion Labs</a>
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    )
}
