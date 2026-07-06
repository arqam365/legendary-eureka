import type { Metadata } from "next"
import { portfolioBreadcrumb, portfolioPageSchema } from "@/lib/schemas/pages"
import { createFAQSchema } from "@/lib/schemas"

export const metadata: Metadata = {
    title: "Portfolio & Case Studies | Revzion — Real Products, Real Results",
    description: "Explore Revzion's portfolio of shipped products and case studies — from Evolwe (AI health wearables) and Rynox (e-commerce) to SaaS platforms and cross-platform mobile apps.",
    keywords: [
        "Revzion portfolio", "software development case studies", "SaaS case study",
        "mobile app case study", "Evolwe health app", "Kotlin Multiplatform case study",
        "AI software case study", "enterprise software portfolio", "Revzion projects"
    ],
    alternates: { canonical: "https://www.revzion.com/portfolio" },
    openGraph: {
        type: "website",
        url: "https://www.revzion.com/portfolio",
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
        answer: "Revzion has shipped SaaS platforms, AI-powered health monitoring apps (Evolwe), e-commerce platforms (Rynox, Mawasim Dates), cross-platform mobile apps using Kotlin Multiplatform, enterprise web applications, and cloud infrastructure solutions for clients across India, the Middle East, and globally."
    },
    {
        question: "Can I see examples of Revzion's previous work?",
        answer: "Yes. Our portfolio includes case studies for Evolwe (smart ring health monitoring), Rynox (motorcycle gear e-commerce), BeeSocial (social platform), Cognivia (AI assistant), Packagefy (logistics SaaS), and Hello Cloud (cloud management). Each case study includes the problem, solution, technology stack, and measurable outcomes."
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
