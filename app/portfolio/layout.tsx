import type { Metadata } from "next"


export const metadata: Metadata = {
    title: "Portfolio & case studies",
    description: "Case studies from Revzion: Evolwe (smart ring companion app), Cognivia (AI-first LMS), and e-commerce and web projects in the UK, Saudi Arabia and India.",
    keywords: [
        "Revzion portfolio", "software development case studies", "SaaS case study",
        "mobile app case study", "Evolwe health app", "Kotlin Multiplatform case study",
        "AI software case study", "enterprise software portfolio", "Revzion projects"
    ],
    alternates: { canonical: "/portfolio" },
    openGraph: {
        type: "website",
        url: "https://www.revzion.in/portfolio",
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

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return children
}
