import type { Metadata } from "next"
import { createBreadcrumbSchema } from "@/lib/schemas"

export const metadata: Metadata = {
    title: "Careers",
    description: "Revzion isn't hiring right now. Check back here or follow us on LinkedIn for future openings.",
    alternates: { canonical: "/careers" },
    openGraph: {
        type: "website",
        url: "https://www.revzion.in/careers",
        title: "Careers at Revzion",
        description: "We're not hiring right now. Future openings will be posted here.",
        images: [{ url: "/api/og?page=careers", width: 1200, height: 630, alt: "Careers at Revzion" }],
    },
}

const careersBreadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://www.revzion.in" },
    { name: "Careers", url: "https://www.revzion.in/careers" },
])

export default function CareersLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(careersBreadcrumb) }} />
            {children}
        </>
    )
}
