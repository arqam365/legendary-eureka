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

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter"
});

export const metadata: Metadata = {
    // =========================================================
    // GLOBAL, TRUST-FIRST TITLE
    // =========================================================
    title: {
        default: "Revzion | Global SaaS, AI & Cross-Platform Engineering Company",
        template: "%s | Revzion"
    },

    // =========================================================
    // DESCRIPTION (ENTERPRISE-GRADE, WORLDWIDE)
    // =========================================================
    description:
        "Revzion is a global software engineering company delivering scalable SaaS platforms, AI-driven systems, and cross-platform mobile applications for startups and enterprises worldwide.",

    // =========================================================
    // HIGH-SIGNAL KEYWORDS (NO SPAM)
    // =========================================================
    keywords: [
        // Brand
        "Revzion",
        "Revzion Technologies",
        "Global software development company",
        "SaaS development company",
        "AI software development",
        "Artificial Intelligence solutions",
        "Cross-platform app development",
        "Kotlin Multiplatform development",
        "Enterprise software engineering",
        "Startup MVP development",
        "Mobile app development company",
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
        "Software consulting company",
        "Offshore development partner",
        "Software company India",
        "Tech company Meerut",
        "Mobile app development India",

        // Founder & Brand Association
        "Arqam Ahmad Siddiqui",
        "Arqam Ahmed Siddiqui",
        "Arqam Ahmad",
        "Arqam Ahmed",
        "Arqam Siddiqui",
        "@arqam365",

        // First-name misspellings
        "arqam",
        "arkam",
        "akram",
        "arquam",
        "aqram",
        "aqruam",
        "arqham",
        "arkaam",
        "arqaam",

        // Middle-name variations
        "ahmad",
        "ahmed",
        "ahmd",
        "ahamed",
        "ahamad",

        // Full-name misspellings
        "Arkam Ahmad Siddiqui",
        "Arkam Ahmed Siddiqui",
        "Akram Ahmad Siddiqui",
        "Akram Ahmed Siddiqui",
        "Arquam Siddiqui",
        "Aqram Siddique",

        // Username / handle intent
        "arqam365",
        "arqam_365",
        "arqam365dev",
        "arqam founder",
        "arqam developer",
        "arqam software engineer",
        "arqam ceo",

        // Brand association
        "Revzion founder",
        "Revzion Arqam",
        "Revzion Arqam Ahmad",
        "Revzion Arqam Ahmed",
        "Next Level Programmers founder",
        "Arqam Next Level Programmers"
    ],

    // =========================================================
    // AUTHORSHIP & BRAND AUTHORITY
    // =========================================================
    authors: [
        { name: "Revzion", url: "https://www.revzion.com" },
        { name: "Arqam Ahmad Siddiqui", url: "https://arqam365.com" }
    ],
    creator: "Arqam Ahmad Siddiqui",
    publisher: "Revzion Technologies",

    // =========================================================
    // CANONICAL BASE
    // =========================================================
    metadataBase: new URL("https://www.revzion.com"),

    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/",
            "en-GB": "/"
        }
    },

    // =========================================================
    // ICONS
    // =========================================================
    icons: {
        icon: "/logo.svg",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png"
    },

    // =========================================================
    // OPEN GRAPH (GLOBAL TRUST SIGNAL)
    // =========================================================
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.revzion.com",
        siteName: "Revzion",
        title: "Revzion | Global SaaS, AI & Cross-Platform Engineering",
        description:
            "Trusted global partner for SaaS platforms, AI-powered products, and cross-platform mobile applications.",
        images: [
            {
                url: "/og-global.png",
                width: 1200,
                height: 630,
                alt: "Revzion - Global Software Engineering Company",
                type: "image/png"
            }
        ]
    },

    // =========================================================
    // TWITTER (CONSISTENT WITH OG)
    // =========================================================
    twitter: {
        card: "summary_large_image",
        site: "@revzion",
        creator: "@arqam365",
        title: "Revzion | Global Software Engineering",
        description:
            "SaaS platforms, AI systems, and cross-platform mobile apps built for global scale.",
        images: ["/og-global.png"]
    },

    // =========================================================
    // ROBOTS
    // =========================================================
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },

    // =========================================================
    // MISC
    // =========================================================
    themeColor: "#0a0a0a",
    manifest: "/site.webmanifest",
    category: "technology",
    classification: "Business",
    referrer: "origin-when-cross-origin",

    formatDetection: {
        telephone: false,
        address: false,
        email: false
    },

    verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code"
    }
};

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode;
}) {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-M8ZCMGDZ";

    return (
        <html lang="en" className="scroll-smooth rvz-splashing">
        <head>
            {/* ================= JSON-LD SCHEMAS ================= */}
            <Script
                id="schema-organization"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />

            <Script
                id="schema-website"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema)
                }}
            />

            {/* ================= CONSENT ================= */}
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

            {/* ================= GTM ================= */}
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

        <Script id="rvz-splash-init" strategy="beforeInteractive">
            {`document.documentElement.classList.add('rvz-splashing');`}
        </Script>

        <div className="fixed inset-0 z-[9998] bg-black grid place-items-center">
            <img src="/logo.svg" alt="Revzion" width="36" height="36" />
        </div>

        <ClientSplash />

        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
            />
        </noscript>

        <SmoothScroll>
            <div className="min-h-screen px-4 sm:px-6 lg:px-8">
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