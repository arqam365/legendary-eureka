import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ScrollProgress from "@/components/visuals/ScrollProgress";
import Spotlight from "@/components/visuals/Spotlight";
import NoiseOverlay from "@/components/visuals/NoiseOverlay";
// @ts-ignore
import SplashScreen from "@/components/splash-screen";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
    title: {
        default: "Revzion - Innovating Products. Empowering Businesses.",
        template: "%s | Revzion"
    },
    description:
        "Revzion builds scalable SaaS, AI, and cross-platform solutions for startups and enterprises. Trusted globally for AI, Cloud, and modern product engineering.",
    keywords: [
        "Revzion",
        "SaaS development",
        "AI solutions",
        "Kotlin Multiplatform",
        "Next.js",
        "Cloud & DevOps",
        "Mobile Apps",
        "Cross-platform apps",
        "Custom Software Development"
    ],
    authors: [{ name: "Revzion Team", url: "https://www.revzion.com" }],
    creator: "Revzion",
    publisher: "Revzion",
    metadataBase: new URL("https://www.revzion.com"),

    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },

    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.revzion.com",
        siteName: "Revzion",
        title: "Revzion - Innovating Products. Empowering Businesses.",
        description:
            "We build scalable SaaS, AI, and cross-platform solutions for startups and enterprises worldwide.",
        images: [
            {
                url: "/og-image.png", // Place this in /public (1200x630 recommended)
                width: 1200,
                height: 630,
                alt: "Revzion - Innovating Products. Empowering Businesses."
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        site: "@revzion", // update with your handle
        creator: "@arqam365", // your personal handle
        title: "Revzion - Innovating Products. Empowering Businesses.",
        description:
            "Scalable SaaS, AI, and cross-platform solutions engineered for growth.",
        images: ["/og-image.png"]
    },

    themeColor: "#0a0a0a",
    manifest: "/site.webmanifest",
    category: "technology",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <SplashScreen
            minDuration={2500}
            // onReady={async (resolve) => {
            //     // Example: wait for fonts & a tiny delay
            //     await document.fonts?.ready
            //     // await someOtherPrep()
            //     resolve() // tell splash it can complete to 100%
            // }}
        />
        {children}
        </body>
        </html>
    )
}
