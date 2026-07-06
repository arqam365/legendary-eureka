import type { Metadata } from "next"
import { contactBreadcrumb, contactPageSchema } from "@/lib/schemas/pages"
import { createFAQSchema, localBusinessSchema } from "@/lib/schemas"

export const metadata: Metadata = {
    title: "Contact Revzion | Start a Project | Software Engineering Partner",
    description: "Get in touch with Revzion to start your next software project. Whether you need a SaaS platform, AI system, mobile app, or cloud infrastructure — we'd love to hear about your requirements.",
    keywords: [
        "contact Revzion", "hire software development company", "software development inquiry",
        "SaaS development quote", "mobile app development quote", "start a project Revzion",
        "Revzion contact", "software engineering partner", "outsource software development India"
    ],
    alternates: { canonical: "https://www.revzion.com/contact" },
    openGraph: {
        type: "website",
        url: "https://www.revzion.com/contact",
        title: "Contact Revzion | Start Your Project",
        description: "Tell us what you need to build. We'll respond within 24 hours with a focused assessment.",
        images: [{ url: "/api/og?page=contact", width: 1200, height: 630, alt: "Contact Revzion" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Revzion | Start Your Project",
        description: "Tell us what you need to build. We'll respond within 24 hours with a focused assessment.",
        images: ["/api/og?page=contact"],
    },
}

const contactFAQ = createFAQSchema([
    {
        question: "How quickly does Revzion respond to inquiries?",
        answer: "We respond to all project inquiries within 24 hours on business days. For urgent requirements, email contact@revzion.com directly and mention your timeline."
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
        answer: "You can reach Revzion at contact@revzion.com for project inquiries, hello@revzion.com for general questions, or arqam@revzion.com to reach the founder directly."
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
