import type { Metadata } from "next"
import { servicesBreadcrumb, servicesPageSchema } from "@/lib/schemas/pages"
import { createFAQSchema } from "@/lib/schemas"

export const metadata: Metadata = {
    title: "Services — SaaS, AI, mobile & cloud",
    description: "Revzion delivers enterprise-grade SaaS development, AI & automation systems, cross-platform mobile apps (Kotlin Multiplatform), cloud infrastructure, and custom software for startups and enterprises worldwide.",
    keywords: [
        "SaaS development company", "AI software development", "Kotlin Multiplatform development",
        "cross-platform mobile app development", "cloud infrastructure services", "enterprise software engineering",
        "Next.js development company", "React development", "DevOps services India",
        "software development company", "custom software development", "mobile app development India",
        "startup software development", "enterprise platform development", "Revzion services"
    ],
    alternates: { canonical: "/services" },
    openGraph: {
        type: "website",
        url: "https://www.revzion.in/services",
        title: "Software Engineering Services | Revzion",
        description: "SaaS platforms, AI systems, cross-platform mobile apps, and cloud infrastructure — engineered to last.",
        images: [{ url: "/api/og?page=services", width: 1200, height: 630, alt: "Revzion Services" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Software Engineering Services | Revzion",
        description: "SaaS platforms, AI systems, cross-platform mobile apps, and cloud infrastructure — engineered to last.",
        images: ["/api/og?page=services"],
    },
}

const servicesFAQ = createFAQSchema([
    {
        question: "What software development services does Revzion offer?",
        answer: "Revzion offers six core engineering services: SaaS platform development, AI & automation systems, cross-platform mobile apps (Kotlin Multiplatform, React Native), cloud & DevOps infrastructure, data & intelligence platforms, and custom enterprise software (ERP, CRM, HRMS)."
    },
    {
        question: "Does Revzion develop iOS and Android apps?",
        answer: "Yes. We build native-quality iOS and Android applications using Kotlin Multiplatform (KMP), React Native, Expo, Swift/SwiftUI, and Jetpack Compose. KMP allows 60–80% code sharing while maintaining full native performance and UI on both platforms."
    },
    {
        question: "Can Revzion build a SaaS product from scratch?",
        answer: "Absolutely. We architect and build multi-tenant SaaS platforms with RBAC, Stripe billing, audit logs, white-labelling, analytics dashboards, and API-first design — ready to onboard thousands of organisations from day one."
    },
    {
        question: "What AI services does Revzion provide?",
        answer: "We build production AI systems: LLM-powered assistants, RAG pipelines over private data, vector search with Pinecone/Weaviate, intelligent workflow automation, and predictive analytics engines. We work with OpenAI, Anthropic, Groq, and open-source models."
    },
    {
        question: "How much does custom software development cost?",
        answer: "An MVP typically ranges from $15,000–$50,000 depending on scope and team size. A full-featured platform is $50,000–$200,000+. Use our Estimate page for a range, or contact us directly for a detailed proposal after a free 30-minute scope call."
    },
    {
        question: "Does Revzion provide ongoing maintenance after launch?",
        answer: "Yes. We offer post-launch retainer engagements covering SLO monitoring, feature development, security patches, performance optimisation, and infrastructure management. Most clients stay on a monthly retainer after the initial build."
    },
])

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesBreadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFAQ) }} />
            {children}
        </>
    )
}
