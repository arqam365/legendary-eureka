import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ClientSplash from "@/components/ClientSplash";
import SmoothScroll from "@/components/SmoothScroll";
import { Suspense } from "react";
import GtmPageview from "@/app/_components/GtmPageview";
import { Analytics } from "@vercel/analytics/next";
import UpgradeModal from "@/app/UpgradeModal";
import { organizationSchema, websiteSchema } from "@/lib/schemas";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
    // ✅ Enhanced Title
    title: {
        default: "Revzion - Mobile-First SaaS, AI & Cross-Platform Solutions | Founded by Arqam Ahmad Siddiqui",
        template: "%s | Revzion"
    },

    // ✅ Enhanced Description (155-160 characters optimal)
    description: "Revzion builds scalable SaaS, AI solutions, and cross-platform mobile apps using Kotlin Multiplatform, Next.js, and modern tech. Trusted globally since 2024.",

    // ✅ Comprehensive Keywords
    keywords: [
        // Brand
        "Revzion",
        "Revzion Technologies",
        "Next Level Programmers",

        // Services
        "SaaS development",
        "AI solutions",
        "Artificial Intelligence development",
        "Machine Learning solutions",
        "Kotlin Multiplatform development",
        "KMP development",
        "Cross-platform mobile apps",
        "iOS app development",
        "Android app development",
        "React Native development",
        "Next.js development",
        "React development",
        "TypeScript development",

        // Specializations
        "Health tech solutions",
        "Wearable device integration",
        "BLE connectivity",
        "Smart ring integration",
        "E-commerce development",
        "Custom software development",

        // Cloud & DevOps
        "Cloud architecture",
        "AWS development",
        "Firebase development",
        "DevOps services",
        "CI/CD implementation",

        // Technologies
        "Jetpack Compose",
        "SwiftUI",
        "Tailwind CSS",
        "GraphQL",
        "tRPC",
        "PostgreSQL",

        // Business
        "Software consulting",
        "Technical architecture",
        "MVP development",
        "Startup development",
        "Enterprise solutions",

        // Location
        "Software company India",
        "Tech company Meerut",
        "Mobile app development India",

        // Founder
        "Arqam Ahmad Siddiqui",
        "@arqam365",
    ],

    // ✅ Authors & Creator
    authors: [
        { name: "Revzion Team", url: "https://www.revzion.com" },
        { name: "Arqam Ahmad Siddiqui", url: "https://arqam365.com" }
    ],
    creator: "Arqam Ahmad Siddiqui (@arqam365)",
    publisher: "Revzion Technologies",

    // ✅ Metadata Base
    metadataBase: new URL("https://www.revzion.com"),

    // ✅ Alternate URLs
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/",
            "en-GB": "/",
        }
    },

    // ✅ Icons
    icons: {
        icon: "/logo.svg",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png"
    },

    // ✅ Enhanced OpenGraph
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.revzion.com",
        siteName: "Revzion",
        title: "Revzion - Mobile-First SaaS, AI & Cross-Platform Solutions",
        description: "Build scalable SaaS platforms, AI-powered solutions, and cross-platform mobile apps with Revzion. Expert team specializing in Kotlin Multiplatform, Next.js, and modern web/mobile technologies.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Revzion - Innovating Products. Empowering Businesses.",
                type: "image/png"
            }
        ],
    },

    // ✅ Enhanced Twitter Card
    twitter: {
        card: "summary_large_image",
        site: "@revzion",
        creator: "@arqam365",
        title: "Revzion - SaaS, AI & Cross-Platform Development",
        description: "Scalable SaaS, AI solutions, and cross-platform mobile apps built with modern tech stack. Kotlin Multiplatform, Next.js, React.",
        images: ["/og-image.png"],
    },

    // ✅ Robots Configuration
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // ✅ Additional Meta
    themeColor: "#0a0a0a",
    manifest: "/site.webmanifest",
    category: "technology",
    classification: "Business",

    // ✅ App Links (for mobile deep linking if applicable)
    appLinks: {
        // Add if you have mobile apps
    },

    // ✅ Format Detection
    formatDetection: {
        telephone: false,
        address: false,
        email: false
    },

    // ✅ Verification (add after setting up search consoles)
    verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code",
        // yahoo: "your-yahoo-verification-code",
        // other: ["your-other-verification-codes"],
    },

    // ✅ Other Metadata
    referrer: "origin-when-cross-origin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-M8ZCMGDZ";

    return (
        <html lang="en" className="scroll-smooth rvz-splashing">
        <head>
            {/* ========================================
                ADVANCED JSON-LD SCHEMA MARKUP
            ======================================== */}

            {/* Organization Schema */}
            <Script
                id="schema-organization"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />

            {/* Website Schema */}
            <Script
                id="schema-website"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema)
                }}
            />

            {/* ========================================
                CONSENT & ANALYTICS
            ======================================== */}

            {/* Consent defaults */}
            <Script id="rvz-consent-defaults" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("consent", "default", {
                  ad_storage: "denied",
                  analytics_storage: "granted",
                  ad_user_data: "denied",
                  ad_personalization: "denied",
                  wait_for_update: 500
                });
                `}
            </Script>

            {/* GTM */}
            <Script id="rvz-gtm" strategy="afterInteractive">
                {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
                `}
            </Script>
        </head>

        <body
            className={`${inter.variable} antialiased bg-white text-gray-900`}
            style={{ overscrollBehaviorX: "contain" }}
            suppressHydrationWarning
        >
        <UpgradeModal />

        {/* splash init */}
        <Script id="rvz-splash-init" strategy="beforeInteractive">
            {`document.documentElement.classList.add('rvz-splashing');`}
        </Script>

        {/* SSR splash */}
        <div id="rvz-ssr-splash" className="fixed inset-0 z-[9998] bg-black grid place-items-center">
            <img src="/logo.svg" alt="Revzion" width="36" height="36" style={{ opacity: 0.9 }} />
        </div>

        <ClientSplash />

        {/* GTM noscript */}
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
            />
        </noscript>

        <SmoothScroll>
            <div
                id="rvz-app-root"
                data-app-root
                className="min-h-screen px-4 sm:px-6 lg:px-8 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
            >
                {children}
            </div>
        </SmoothScroll>

        <Suspense fallback={null}>
            <GtmPageview />
        </Suspense>

        {/* GSAP + Vercel analytics */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrambleTextPlugin.min.js" strategy="afterInteractive" />
        <Analytics />
        </body>
        </html>
    );
}