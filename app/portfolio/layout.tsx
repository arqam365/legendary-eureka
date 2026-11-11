import type { Metadata } from "next"
import { portfolioBreadcrumb, portfolioPageSchema } from "@/lib/schemas/pages"
import { createFAQSchema } from "@/lib/schemas"

export const metadata: Metadata = {
    title: "Portfolio & case studies",
    description: "Case studies from Revzion: Evolwe (smart ring companion app), Cognivia (AI-first LMS), and e-commerce and web projects in the UK, Saudi Arabia and India.",
    keywords: [
        "Revzion portfolio", "software development case studies", "SaaS case study",
        "mobile app case study", "Evolwe health app", "Kotlin Multiplatform case study",
        "AI software case study", "enterprise software portfolio", "Revzion projects"
    ],
    alternates: { canonical: "/portfolio" },
    openGraph: {
        type: "website",
        url: "https://www.revzion.in/portfolio",
        title: "Portfolio & Case Studies | Revzion",
        description: "Real products shipped for real clients — SaaS platforms, AI systems, and cross-platform mobile apps.",
        images: [{ url: "/api/og?page=portfolio", width: 1200, height: 630, alt: "Revzion Portfolio" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Portfolio & Case Studies | Revzion",
        description: "Real products shipped for real clients — SaaS platforms, AI systems, and cross-platform mobile apps.",
        images: ["/api/og?page=portfolio"],
    },
}

const portfolioFAQ = createFAQSchema([
    {
        question: "What kind of projects has Revzion built?",
        answer: "An AI-first LMS (Cognivia), a smart ring companion app and product site (Evolwe), an e-commerce store (Scottish Home Bargains) and websites (Mazencito, Everyday Fitness)."
    },
    {
        question: "Can I see examples of Revzion's previous work?",
        answer: "Yes. The portfolio has case studies for Evolwe, Cognivia, Scottish Home Bargains, Mazencito and Everyday Fitness — each covering the problem, our approach, the stack and the outcome."
    },
    {
        question: "Does Revzion share source code or technical details in case studies?",
        answer: "We share architectural decisions, technology choices, performance metrics, and business outcomes in our case studies. Source code remains confidential per NDA, but we discuss the technical approach in detail during consultation calls."
    },
    {
        question: "Has Revzion worked with funded startups or enterprises?",
        answer: "Yes. We work with early-stage startups building their first product, growth-stage companies scaling their platforms, and established enterprises modernising legacy systems. Our process adapts to your stage, timeline, and budget."
    },
])

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioBreadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioFAQ) }} />
            {children}
        </>
    )
}
