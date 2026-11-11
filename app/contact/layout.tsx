import type { Metadata } from "next"
import { contactBreadcrumb, contactPageSchema } from "@/lib/schemas/pages"
import { createFAQSchema, localBusinessSchema } from "@/lib/schemas"

export const metadata: Metadata = {
    title: "Contact — Start a project",
    description: "Get in touch with Revzion to start your next software project. Whether you need a SaaS platform, AI system, mobile app, or cloud infrastructure — we'd love to hear about your requirements.",
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

const contactFAQ = createFAQSchema([
    {
        question: "How quickly does Revzion respond to inquiries?",
        answer: "We reply to every project inquiry within one business day. For urgent requirements, email connect@revzion.in directly and mention your timeline."
    },
    {
        question: "What information should I include when contacting Revzion?",
        answer: "Share a brief description of what you want to build, your approximate timeline, and your budget range. The more context you provide, the more useful our initial response will be. You can also use the Estimate page for a budget range before reaching out."
    },
    {
        question: "Does Revzion sign NDAs before discussing projects?",
        answer: "Yes. We're happy to sign a mutual NDA before discussing sensitive product details, proprietary business logic, or confidential technical requirements. Just mention this in your inquiry."
    },
    {
        question: "Can I schedule a call directly?",
        answer: "Yes. After you submit the contact form or send an email, we'll share a calendar link to schedule a focused 30-minute scope call with our technical lead — no sales team in the middle."
    },
    {
        question: "What is Revzion's email address?",
        answer: "Email connect@revzion.in, or use the contact form at revzion.in/contact."
    },
])

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
