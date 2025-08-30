// app/portfolio/[id]/page.tsx
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CASE_STUDIES, getCaseStudyById } from "@/lib/case-studies"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, ArrowRight, TrendingUp, Zap, Target, Users } from "lucide-react"

type PageProps = { params: { id: string } }

export function generateStaticParams() {
    return CASE_STUDIES.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const study = getCaseStudyById(params.id)
    if (!study) return {}
    const title = `${study.title} — Case Study`
    const description = study.summary ?? study.results?.description ?? "Case Study"
    const ogImg = study.heroImage

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: ogImg ? [{ url: ogImg }] : undefined,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImg ? [ogImg] : undefined,
        },
    }
}

export default function CaseStudyPage({ params }: PageProps) {
    const study = getCaseStudyById(params.id)
    if (!study) notFound()

    const next = CASE_STUDIES[(CASE_STUDIES.findIndex((c) => c.id === study!.id) + 1) % CASE_STUDIES.length]
    const prev = CASE_STUDIES[(CASE_STUDIES.findIndex((c) => c.id === study!.id) - 1 + CASE_STUDIES.length) % CASE_STUDIES.length]

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                    <div className="mb-6 flex items-center gap-3 text-sm text-gray-600">
                        <Link href="/portfolio" className="inline-flex items-center hover:underline">
                            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Portfolio
                        </Link>
                        <span className="text-gray-300">/</span>
                        <span>{study.category}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-7">
                            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-gray-900 leading-tight tracking-tight">
                                {study.title}
                            </h1>
                            <p className="mt-3 text-gray-600">
                                Client: <span className="font-medium text-gray-900">{study.client}</span>
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                {study.technologies.map((t) => (
                                    <Badge key={t} variant="secondary" className="bg-white border border-gray-200 text-gray-700">
                                        {t}
                                    </Badge>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                <span>{study.duration}</span>
                                <span className="text-gray-300">•</span>
                                <span>{study.team}</span>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="rounded-2xl overflow-hidden shadow-lg border border-white/60 bg-white/60 backdrop-blur">
                                <Image
                                    src={study.heroImage}
                                    alt={`${study.title} hero`}
                                    width={1600}
                                    height={1000}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem / Solution / Impact */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Problem */}
                        <Card className="p-7">
                            <h2 className="text-lg font-heading font-semibold text-gray-900 mb-3 flex items-center">
                                <Target className="h-5 w-5 text-red-500 mr-2" />
                                {study.problem.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">{study.problem.description}</p>
                            <ul className="space-y-2">
                                {study.problem.challenges.map((c) => (
                                    <li key={c} className="text-sm text-gray-700 flex items-start">
                                        <span className="mt-2 mr-3 h-1.5 w-1.5 rounded-full bg-red-400" />
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Solution */}
                        <Card className="p-7">
                            <h2 className="text-lg font-heading font-semibold text-gray-900 mb-3 flex items-center">
                                <Zap className="h-5 w-5 text-blue-600 mr-2" />
                                {study.solution.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">{study.solution.description}</p>
                            <ul className="space-y-2">
                                {study.solution.features.map((f) => (
                                    <li key={f} className="text-sm text-gray-700 flex items-start">
                                        <svg className="h-4 w-4 text-blue-600 mr-3 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Impact */}
                        <Card className="p-7">
                            <h2 className="text-lg font-heading font-semibold text-gray-900 mb-3 flex items-center">
                                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                                {study.results.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">{study.results.description}</p>
                            <div className="grid grid-cols-2 gap-3">
                                {study.results.metrics.map((m) => (
                                    <div key={m.label} className="text-center rounded-lg bg-gray-50 p-3">
                                        <div className="mb-1 flex justify-center text-green-600">{m.icon ?? <Users className="h-5 w-5" />}</div>
                                        <div className="text-base font-heading font-bold text-gray-900">{m.value}</div>
                                        <div className="text-[11px] text-gray-600">{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Gallery (optional) */}
            {study.gallery?.length ? (
                <section className="py-6 pb-14 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-5">Screens & Visuals</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {study.gallery.map((src) => (
                                <div key={src} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white">
                                    <Image src={src} alt="" width={1200} height={800} className="w-full h-auto object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* CTA + pagination */}
            <section className="py-16 bg-gradient-revzion">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="text-white">
                            <h3 className="text-2xl font-heading font-bold">Have a similar challenge?</h3>
                            <p className="text-blue-100">Let’s discuss how we can get you results like these.</p>
                        </div>
                        <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                            <Link href="/contact">Start Your Project</Link>
                        </Button>
                    </div>

                    {/* Prev / Next */}
                    <div className="mt-10 flex items-center justify-between">
                        <Link
                            href={`/portfolio/${prev.id}`}
                            className="inline-flex items-center text-white/90 hover:text-white"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {prev.title}
                        </Link>
                        <Link
                            href={`/portfolio/${next.id}`}
                            className="inline-flex items-center text-white/90 hover:text-white"
                        >
                            {next.title}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}