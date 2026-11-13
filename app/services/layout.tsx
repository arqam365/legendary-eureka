import type { Metadata } from "next"
import { SERVICES_FAQ, faqJsonLd } from "@/lib/faqs"
import { servicesBreadcrumb, servicesPageSchema } from "@/lib/schemas/pages"


export const metadata: Metadata = {
    title: "Services — SaaS, AI, mobile & cloud",
    description: "SaaS platforms, AI and automation, cross-platform mobile apps, cloud and custom enterprise software — designed and built by Revzion.",
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

const servicesFAQ = faqJsonLd(SERVICES_FAQ)

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
