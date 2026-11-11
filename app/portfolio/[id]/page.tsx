import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CASE_STUDIES, getCaseStudyById } from "@/lib/case-studies"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { BrowserFrame, PhoneFrame } from "@/components/brand/DeviceFrame"

type PageProps = { params: Promise<{ id: string }> }

export const dynamicParams = false

export function generateStaticParams() {
    return CASE_STUDIES.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const study = getCaseStudyById(id)
    if (!study) return {}
    const title = `${study.title} — Case study | Revzion`
    const description = study.summary ?? study.results.description
    return {
        title,
        description,
        alternates: { canonical: `/portfolio/${study.id}` },
        openGraph: { title, description, type: "article", images: study.heroImage ? [{ url: study.heroImage }] : undefined },
        twitter: { card: "summary_large_image", title, description, images: study.heroImage ? [study.heroImage] : undefined },
    }
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { id } = await params
    const study = getCaseStudyById(id)
    if (!study) notFound()

    const i = CASE_STUDIES.findIndex((c) => c.id === study.id)
    const next = CASE_STUDIES[(i + 1) % CASE_STUDIES.length]
    const prev = CASE_STUDIES[(i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length]

    const columns = [
        { title: study.problem.title, description: study.problem.description, items: study.problem.challenges },
        { title: study.solution.title, description: study.solution.description, items: study.solution.features },
    ]

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <section className="bg-[#EEF1F6]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-3 text-sm text-[#1F2937]">
                        <Link href="/portfolio" className="inline-flex items-center hover:text-[#0B1220]">
                            <ArrowLeft className="mr-1 h-4 w-4" aria-hidden /> Portfolio
                        </Link>
                        <span aria-hidden>/</span>
                        <span>{study.category}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-7">
                            <h1 className="text-4xl sm:text-5xl text-[#0B1220] leading-tight">{study.title}</h1>
                            <p className="mt-3 text-[#1F2937]">
                                Client: <span className="font-medium text-[#0B1220]">{study.client}</span>
                            </p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {study.technologies.map((t) => (
                                    <li key={t} className="rounded-md border border-[#D5DCE8] bg-white px-2.5 py-1 text-xs text-[#1F2937]">
                                        {t}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-sm text-[#1F2937]">
                                {study.duration}
                                {study.team ? ` · ${study.team}` : ""}
                            </p>
                            {study.liveUrl && (
                                <a
                                    href={study.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center text-sm font-medium text-[#2563EB] underline underline-offset-4"
                                >
                                    Visit live site <ExternalLink className="ml-1.5 h-4 w-4" aria-hidden />
                                </a>
                            )}
                        </div>

                        {study.heroImage && <div className="lg:col-span-5">
                            <div className="rounded-2xl overflow-hidden border border-[#D5DCE8] bg-white">
                                <Image
                                    src={study.heroImage}
                                    alt={`${study.title} — screenshot`}
                                    width={1600}
                                    height={1000}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                            </div>
                        </div>}
                    </div>
                </div>
            </section>

            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {columns.map((col) => (
                        <Card key={col.title} className="p-7 border-[#E4E9F1] shadow-none">
                            <h2 className="font-sans text-lg font-bold text-[#0B1220] mb-3">{col.title}</h2>
                            <p className="text-[#64748B] leading-relaxed mb-4">{col.description}</p>
                            <ul className="space-y-2">
                                {col.items.map((c) => (
                                    <li key={c} className="text-sm text-[#1F2937] flex items-start">
                                        <span className="mt-2 mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B1220]" aria-hidden />
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}

                    <Card className="p-7 border-[#E4E9F1] shadow-none">
                        <h2 className="font-sans text-lg font-bold text-[#0B1220] mb-3">{study.results.title}</h2>
                        <p className="text-[#64748B] leading-relaxed mb-4">{study.results.description}</p>
                        <dl className="grid grid-cols-2 gap-3">
                            {study.results.metrics.map((m) => (
                                <div key={m.label} className="rounded-lg bg-[#EEF1F6] p-3">
                                    <dd className="text-base font-bold text-[#0B1220]">{m.value}</dd>
                                    <dt className="text-xs text-[#1F2937]">{m.label}</dt>
                                </div>
                            ))}
                        </dl>
                    </Card>
                </div>
            </section>

            {study.gallery?.length ? (
                <section aria-labelledby="screens-heading" className="pb-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 id="screens-heading" className="text-3xl text-[#0B1220] mb-8">Screens</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {study.gallery.some((g) => g.device === "desktop") && (
                                <div className="lg:col-span-7 space-y-8">
                                    {study.gallery.filter((g) => g.device === "desktop").map((g) => (
                                        <figure key={g.src}>
                                            <BrowserFrame src={g.src} alt={g.alt} />
                                            <figcaption className="mt-3 text-sm text-[#64748B]">{g.alt}</figcaption>
                                        </figure>
                                    ))}
                                </div>
                            )}
                            <div className={`${study.gallery.some((g) => g.device === "desktop") ? "lg:col-span-5" : "lg:col-span-12"} grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-2`}>
                                {study.gallery.filter((g) => g.device === "mobile").map((g) => (
                                    <figure key={g.src}>
                                        <PhoneFrame src={g.src} alt={g.alt} sizes="(max-width: 640px) 45vw, 240px" />
                                        <figcaption className="mt-3 text-sm text-[#64748B]">{g.alt}</figcaption>
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            <section className="py-16 bg-[#0B1220]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="text-white">
                            <h2 className="text-3xl">Have a similar challenge?</h2>
                            <p className="mt-2 text-[#A5B1C9]">Tell us what you're building and we'll be straight about fit.</p>
                        </div>
                        <Button asChild size="lg" className="bg-white text-[#0B1220] hover:bg-[#EEF1F6]">
                            <Link href="/contact">Start a conversation</Link>
                        </Button>
                    </div>

                    <div className="mt-10 flex items-center justify-between gap-4 text-sm">
                        <Link href={`/portfolio/${prev.id}`} className="inline-flex items-center text-[#C2CBDC] hover:text-white">
                            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
                            {prev.title}
                        </Link>
                        <Link href={`/portfolio/${next.id}`} className="inline-flex items-center text-[#C2CBDC] hover:text-white">
                            {next.title}
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
