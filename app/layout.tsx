// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ClientSplash from "@/components/ClientSplash";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover", // respects iOS safe areas
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
};

export const metadata: Metadata = {
    title: {
        default: "Revzion - Innovating Products. Empowering Businesses.",
        template: "%s | Revzion",
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
        "Custom Software Development",
    ],
    authors: [{ name: "Revzion Team", url: "https://www.revzion.com" }],
    creator: "Revzion",
    publisher: "Revzion",
    metadataBase: new URL("https://www.revzion.com"),
    icons: {
        icon: "/logo.svg",
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
    themeColor: "#0a0a0a",
    manifest: "/site.webmanifest",
    category: "technology",

    // ✅ Mobile format detection (avoid iOS auto-link styling)
    formatDetection: {
        telephone: false,
        address: false,
        email: false,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth rvz-splashing">
        <body
            className={`${inter.variable} antialiased bg-white text-gray-900`}
            style={{ overscrollBehaviorX: "contain" }}
            suppressHydrationWarning
        >
        {/* 0) Immediately mark document as "splashing" BEFORE any hydration */}
        <Script id="rvz-splash-init" strategy="beforeInteractive">
            {`document.documentElement.classList.add('rvz-splashing');`}
        </Script>

        {/* 1) SSR splash placeholder so there is NO flash before hydration */}
        <div
            id="rvz-ssr-splash"
            className="fixed inset-0 z-[9998] bg-black grid place-items-center"
        >
            <img src="/logo.svg" alt="Revzion" width="36" height="36" style={{ opacity: 0.9 }} />
        </div>

        {/* 2) Client splash handles animation and dispatches the done event */}
        <ClientSplash />
        <SmoothScroll>
        {/* 3) Your app content — hidden until splash clears */}
        <div
            id="rvz-app-root"
            data-app-root
            className="min-h-screen px-4 sm:px-6 lg:px-8 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
            {children}
        </div>
        </SmoothScroll>

        {/* GSAP scripts */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrambleTextPlugin.min.js" strategy="afterInteractive" />
        </body>
        </html>
    );
}