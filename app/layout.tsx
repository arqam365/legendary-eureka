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
  title: "Revzion - Innovating Products. Empowering Businesses.",
  description: "Revzion builds scalable SaaS, AI, and cross-platform solutions for startups and enterprises."
}


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
