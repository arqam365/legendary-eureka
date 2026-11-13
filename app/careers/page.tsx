import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const REASONS = [
    { title: "Small, senior team", desc: "Open communication, direct access to the people making decisions." },
    { title: "Real products", desc: "SaaS, AI and cross-platform work that ships to production." },
    { title: "Room to grow", desc: "Challenging projects, mentorship and clear feedback." },
]

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <section className="bg-[#EEF1F6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <p className="eyebrow mb-4">Careers</p>
                    <h1 className="text-4xl sm:text-5xl text-[#0B1220] mb-6 max-w-3xl">We're not hiring right now</h1>
                    <p className="text-xl text-[#1F2937] max-w-2xl">
                        We don't have any open roles at the moment. When that changes, new openings will be posted on
                        this page and on LinkedIn.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Button size="lg" asChild className="bg-[#0B1220] hover:bg-[#1F2937] text-white">
                            <a href="https://www.linkedin.com/company/revzion" target="_blank" rel="noopener noreferrer">
                                Follow Revzion on LinkedIn
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="border-[#D5DCE8]">
                            <Link href="/about">Meet the team</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-12">What working here is like</h2>
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

            <Footer />
        </div>
    )
}
