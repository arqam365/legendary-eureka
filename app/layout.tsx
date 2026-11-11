import type { Metadata, Viewport } from "next"
import { Inter, Fraunces } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import SmoothScroll from "@/components/SmoothScroll"
import { Suspense } from "react"
import GtmPageview from "@/app/_components/GtmPageview"
import ConsentManager from "@/components/ConsentManager"
import { organizationSchema, websiteSchema } from "@/lib/schemas"
import { SITE_URL } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })

const fraunces = Fraunces({
    subsets: ["latin"],
    display: "swap",
    weight: ["500", "600"],
    variable: "--font-fraunces",
})

export const viewport: Viewport = { themeColor: "#0B1220" }

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Revzion — Intelligence That Drives Growth",
        template: "%s | Revzion",
    },
    description:
        "Revzion designs and builds SaaS platforms, AI-powered systems and cross-platform mobile apps for startups and growing businesses.",
    keywords: [
        "Revzion",
        "SaaS development",
        "AI software development",
        "Kotlin Multiplatform development",
        "React Native development",
        "Next.js development",
        "Mobile app development India",
        "Software company Jhansi",
    ],
    authors: [{ name: "Revzion", url: SITE_URL }],
    creator: "Revzion",
    publisher: "Revzion",
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "Revzion",
        title: "Revzion — Intelligence That Drives Growth",
        description: "SaaS platforms, AI-powered systems and cross-platform mobile apps, engineered to last.",
        images: [{ url: "/api/og", width: 1200, height: 630, alt: "Revzion", type: "image/png" }],
    },
    twitter: {
        card: "summary_large_image",
        site: "@revzion",
        creator: "@arqam365",
        title: "Revzion — Intelligence That Drives Growth",
        description: "SaaS platforms, AI-powered systems and cross-platform mobile apps, engineered to last.",
        images: ["/api/og"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    category: "technology",
    formatDetection: { telephone: false, address: false, email: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-M8ZCMGDZ"

    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

                {/* Consent mode defaults: nothing non-essential until the visitor opts in. */}
                <Script id="rvz-consent-defaults" strategy="beforeInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag("consent", "default", {
              ad_storage: "denied",
              analytics_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
              wait_for_update: 500
            });
          `}
                </Script>
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
                className={`${inter.variable} ${fraunces.variable} antialiased bg-white text-[#0B1220]`}
                style={{ overscrollBehaviorX: "contain" }}
                suppressHydrationWarning
            >
                <a href="#main" className="skip-link">
                    Skip to content
                </a>

                <SmoothScroll>
                    <main id="main" className="min-h-screen">
                        {children}
                    </main>
                </SmoothScroll>

                <Suspense fallback={null}>
                    <GtmPageview />
                </Suspense>
                <ConsentManager />
            </body>
        </html>
    )
}
