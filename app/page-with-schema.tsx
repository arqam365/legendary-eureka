import { Metadata } from "next";
import { homepageFAQ } from "@/lib/schemas/pages";
import { createBreadcrumbSchema } from "@/lib/schemas";
import HomePage from "@/app/page";

// ============================================
// METADATA FOR HOMEPAGE
// ============================================
export const metadata: Metadata = {
    title: "Revzion - Mobile-First SaaS, AI & Cross-Platform Solutions | Founded by Arqam Ahmad Siddiqui",
    description: "Build scalable SaaS platforms, AI-powered solutions, and cross-platform mobile apps with Revzion. Expert team specializing in Kotlin Multiplatform, Next.js, React, and modern technologies.",
    keywords: [
        "Revzion",
        "SaaS development",
        "AI solutions",
        "Kotlin Multiplatform",
        "Cross-platform apps",
        "Mobile app development",
        "Next.js development",
        "Arqam Ahmad Siddiqui",
        "@arqam365",
    ],
    alternates: {
        canonical: "https://www.revzion.com",
    },
    openGraph: {
        type: "website",
        url: "https://www.revzion.com",
        title: "Revzion - Mobile-First SaaS, AI & Cross-Platform Solutions",
        description: "Build scalable SaaS platforms, AI-powered solutions, and cross-platform mobile apps with Revzion.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Revzion - Innovating Products. Empowering Businesses.",
            },
        ],
    },
};

// ============================================
// SCHEMA MARKUP (will be injected into layout)
// ============================================
const homeBreadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://www.revzion.com" }
]);

// Server component that wraps the client component
export default function HomePageWrapper() {
    return (
        <>
            {/* JSON-LD Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(homeBreadcrumb)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(homepageFAQ)
                }}
            />

            {/* Render the actual client component */}
            <HomePage />
        </>
    );
}