import type { Metadata } from "next"
import { createBreadcrumbSchema, createFAQSchema } from "@/lib/schemas"

export const metadata: Metadata = {
    title: "About Revzion | Arqam Ahmad Siddiqui | Global Engineering Company",
    description: "Revzion is a global software engineering company founded by Arqam Ahmad Siddiqui in 2024. We build enterprise-grade SaaS platforms, AI systems, and cross-platform mobile apps for organisations worldwide.",
    keywords: [
        "Revzion about", "Arqam Ahmad Siddiqui", "arqam365", "Revzion founder",
        "software engineering company India", "Revzion team", "Revzion Technologies",
        "Kotlin Multiplatform company", "SaaS development company India", "AI company India"
    ],
    alternates: { canonical: "https://www.revzion.com/about" },
    openGraph: {
        type: "profile",
        url: "https://www.revzion.com/about",
        title: "About Revzion | Founded by Arqam Ahmad Siddiqui",
        description: "Global software engineering company delivering enterprise SaaS, AI systems, and cross-platform mobile apps.",
        images: [{ url: "/api/og?page=about", width: 1200, height: 630, alt: "About Revzion" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Revzion | Founded by Arqam Ahmad Siddiqui",
        description: "Global software engineering company delivering enterprise SaaS, AI systems, and cross-platform mobile apps.",
        images: ["/api/og?page=about"],
    },
}

const aboutBreadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://www.revzion.com" },
    { name: "About", url: "https://www.revzion.com/about" },
])

const founderPersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://arqam365.com/#person",
    "name": "Arqam Ahmad Siddiqui",
    "alternateName": ["Arqam Ahmed Siddiqui", "Arqam Ahmad", "arqam365", "@arqam365"],
    "url": "https://arqam365.com",
    "jobTitle": "Founder & CEO",
    "worksFor": { "@id": "https://www.revzion.com/#organization" },
    "description": "Founder and CEO of Revzion. Full-stack engineer specialising in SaaS architecture, AI-powered products, and Kotlin Multiplatform mobile development.",
    "sameAs": [
        "https://www.linkedin.com/in/arqam365",
        "https://github.com/arqam365",
        "https://twitter.com/arqam365",
        "https://arqam365.com"
    ],
    "knowsAbout": [
        "SaaS Architecture", "Artificial Intelligence", "Kotlin Multiplatform",
        "Next.js", "Cloud Architecture", "Startup Engineering",
        "Cross-Platform Mobile Development", "Health Technology"
    ],
    "nationality": { "@type": "Country", "name": "India" }
}

const aboutFAQ = createFAQSchema([
    {
        question: "Who founded Revzion?",
        answer: "Revzion was founded by Arqam Ahmad Siddiqui (also known as @arqam365) in January 2024. Arqam is a full-stack engineer with expertise in SaaS architecture, AI systems, and Kotlin Multiplatform mobile development."
    },
    {
        question: "Where is Revzion based?",
        answer: "Revzion is headquartered in Jhansi, Uttar Pradesh, India. We operate as a remote-first company and serve clients across the US, UK, Middle East, Europe, and South Asia."
    },
    {
        question: "How big is the Revzion team?",
        answer: "Revzion is a focused team of senior engineers, designers, and product specialists. We deliberately stay lean to maintain quality and speed — typically 1–10 people per engagement. We scale with trusted partners for larger projects."
    },
    {
        question: "What is Revzion's mission?",
        answer: "To build enterprise-grade software that organisations can actually depend on — mission-critical platforms that scale, AI systems that produce real results, and mobile products that feel native on every device."
    },
])

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderPersonSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutFAQ) }} />
            {children}
        </>
    )
}
