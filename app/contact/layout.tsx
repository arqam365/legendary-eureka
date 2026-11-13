import type { Metadata } from "next"
import { CONTACT_FAQ, faqJsonLd } from "@/lib/faqs"
import { contactBreadcrumb, contactPageSchema } from "@/lib/schemas/pages"
import { localBusinessSchema } from "@/lib/schemas"

export const metadata: Metadata = {
    title: "Contact — Start a project",
    description: "Tell us what you're building. Revzion replies to every project inquiry within one business day.",
    keywords: [
        "contact Revzion", "hire software development company", "software development inquiry",
        "SaaS development quote", "mobile app development quote", "start a project Revzion",
        "Revzion contact", "software engineering partner", "outsource software development India"
    ],
    alternates: { canonical: "/contact" },
    openGraph: {
        type: "website",
        url: "https://www.revzion.in/contact",
        title: "Contact Revzion | Start Your Project",
        description: "Tell us what you need to build. We reply within one business day.",
        images: [{ url: "/api/og?page=contact", width: 1200, height: 630, alt: "Contact Revzion" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Revzion | Start Your Project",
        description: "Tell us what you need to build. We reply within one business day.",
        images: ["/api/og?page=contact"],
    },
}

const contactFAQ = faqJsonLd(CONTACT_FAQ)

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFAQ) }} />
            {children}
        </>
    )
}
