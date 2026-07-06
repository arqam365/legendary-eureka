import type { Metadata } from "next"
import { createBreadcrumbSchema, createJobPostingSchema } from "@/lib/schemas"

export const metadata: Metadata = {
    title: "Careers at Revzion | Join Our Engineering Team | Remote Jobs",
    description: "Join Revzion's engineering team. We're hiring Kotlin Multiplatform developers, Next.js frontend engineers, and AI engineers. Remote-first, challenging work, senior mentorship.",
    keywords: [
        "Revzion careers", "software engineering jobs", "remote developer jobs India",
        "Kotlin Multiplatform jobs", "Next.js developer jobs", "AI engineer jobs remote",
        "frontend developer jobs India", "software startup jobs", "work at Revzion"
    ],
    alternates: { canonical: "https://www.revzion.com/careers" },
    openGraph: {
        type: "website",
        url: "https://www.revzion.com/careers",
        title: "Careers at Revzion | Remote Engineering Roles",
        description: "Build real products with a senior team. Remote-first, challenging work, fast growth.",
        images: [{ url: "/api/og?page=careers", width: 1200, height: 630, alt: "Careers at Revzion" }],
    },
}

const careersBreadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://www.revzion.com" },
    { name: "Careers", url: "https://www.revzion.com/careers" },
])

const kmpJobPosting = createJobPostingSchema({
    title: "Kotlin Multiplatform Developer",
    description: "Work on next-generation cross-platform mobile applications using Kotlin Multiplatform (KMP), Jetpack Compose, BLE device integration, and cloud backends. You will own features end-to-end across iOS and Android shared modules, write clean architecture, and collaborate with a senior engineering team on real products shipped to thousands of users.",
    employmentType: "FULL_TIME",
    datePosted: "2026-01-01",
    validThrough: "2026-12-31",
    remote: true,
    baseSalary: { currency: "INR", minValue: 600000, maxValue: 1800000 },
})

const frontendJobPosting = createJobPostingSchema({
    title: "Frontend Developer (Next.js + Tailwind)",
    description: "Build high-performance web applications and marketing sites with Next.js 15, React, TypeScript, Tailwind CSS, and Framer Motion. You care about Core Web Vitals, accessibility, and design fidelity. You will work directly with our design system and ship pixel-perfect interfaces for enterprise clients.",
    employmentType: "FULL_TIME",
    datePosted: "2026-01-01",
    validThrough: "2026-12-31",
    remote: true,
    baseSalary: { currency: "INR", minValue: 500000, maxValue: 1500000 },
})

const aiJobPosting = createJobPostingSchema({
    title: "AI Engineer",
    description: "Prototype and deploy production AI systems: LLM-powered assistants, RAG pipelines over private enterprise data, vector search with Pinecone or Weaviate, embeddings workflows, and intelligent automation engines. Experience with OpenAI, Anthropic, Groq, or open-source models required.",
    employmentType: "CONTRACTOR",
    datePosted: "2026-01-01",
    validThrough: "2026-12-31",
    remote: true,
})

export default function CareersLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(careersBreadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(kmpJobPosting) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(frontendJobPosting) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aiJobPosting) }} />
            {children}
        </>
    )
}
