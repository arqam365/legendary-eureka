import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ClientSplash from "@/components/ClientSplash";
import SmoothScroll from "@/components/SmoothScroll";
import { Suspense } from "react";                // ✅ add
import GtmPageview from "@/app/_components/GtmPageview";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
    title: { default: "Revzion - Innovating Products. Empowering Businesses.", template: "%s | Revzion" },
    description:
        "Revzion builds scalable SaaS, AI, and cross-platform solutions for startups and enterprises. Trusted globally for AI, Cloud, and modern product engineering.",
    keywords: [
        "Revzion","SaaS development","AI solutions","Kotlin Multiplatform","Next.js","Cloud & DevOps",
        "Mobile Apps","Cross-platform apps","Custom Software Development",
    ],
    authors: [{ name: "Revzion Team", url: "https://www.revzion.com" }],
    creator: "Revzion",
    publisher: "Revzion",
    metadataBase: new URL("https://www.revzion.com"),
    icons: { icon: "/logo.svg", shortcut: "/favicon-16x16.png", apple: "/apple-touch-icon.png" },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.revzion.com",
        siteName: "Revzion",
        title: "Revzion - Innovating Products. Empowering Businesses.",
        description: "We build scalable SaaS, AI, and cross-platform solutions for startups and enterprises worldwide.",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Revzion - Innovating Products. Empowering Businesses." }],
    },
    twitter: {
        card: "summary_large_image",
        site: "@revzion",
        creator: "@arqam365",
        title: "Revzion - Innovating Products. Empowering Businesses.",
        description: "Scalable SaaS, AI, and cross-platform solutions engineered for growth.",
        images: ["/og-image.png"],
    },
    // themeColor is fine in the root metadata, but NOT in not-found.tsx
    themeColor: "#0a0a0a",
    manifest: "/site.webmanifest",
    category: "technology",
    formatDetection: { telephone: false, address: false, email: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-M8ZCMGDZ";

    return (
        <html lang="en" className="scroll-smooth rvz-splashing">
        <head>
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

            {/* JSON-LD */}
            <Script id="rvz-org-ld" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: "Revzion",
                    url: "https://www.revzion.com",
                    logo: "https://www.revzion.com/og/logo.png",
                    sameAs: ["https://www.linkedin.com/company/your-company","https://twitter.com/yourhandle"],
                })}
            </Script>
            <Script id="rvz-website-ld" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    name: "Revzion",
                    url: "https://www.revzion.com",
                    potentialAction: {
                        "@type": "SearchAction",
                        target: "https://www.revzion.com/search?q={search_term_string}",
                        "query-input": "required name=search_term_string",
                    },
                })}
            </Script>
        </head>

        <body
            className={`${inter.variable} antialiased bg-white text-gray-900`}
            style={{ overscrollBehaviorX: "contain" }}
            suppressHydrationWarning
        >
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

        {/* ✅ wrap in Suspense because it uses useSearchParams/usePathname */}
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