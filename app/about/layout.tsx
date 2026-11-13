import type { Metadata } from "next"
import { ABOUT_FAQ, faqJsonLd } from "@/lib/faqs"
import { createBreadcrumbSchema } from "@/lib/schemas"

export const metadata: Metadata = {
    title: "About us",
    description: "Revzion is a small senior software team in Jhansi, India. Founded as Next Level Programmers in 2019, we build SaaS, AI and mobile products.",
    keywords: [
        "Revzion about", "Arqam Ahmad Siddiqui", "arqam365", "Revzion founder",
        "software engineering company India", "Revzion team", "Revzion Technologies",
        "Kotlin Multiplatform company", "SaaS development company India", "AI company India"
    ],
    alternates: { canonical: "/about" },
    openGraph: {
        type: "profile",
        url: "https://www.revzion.in/about",
        title: "About Revzion | Founded by Arqam Ahmad Siddiqui",
        description: "A small senior software team building SaaS, AI and cross-platform products.",
        images: [{ url: "/api/og?page=about", width: 1200, height: 630, alt: "About Revzion" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Revzion | Founded by Arqam Ahmad Siddiqui",
        description: "A small senior software team building SaaS, AI and cross-platform products.",
        images: ["/api/og?page=about"],
    },
}

const aboutBreadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://www.revzion.in" },
    { name: "About", url: "https://www.revzion.in/about" },
])

const founderPersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://arqam365.com/#person",
    "name": "Arqam Ahmad Siddiqui",
    "alternateName": ["Arqam Ahmed Siddiqui"],
    "url": "https://arqam365.com",
    "jobTitle": "Founder & CEO",
    "worksFor": { "@id": "https://www.revzion.in/#organization" },
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

const aboutFAQ = faqJsonLd(ABOUT_FAQ)

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
