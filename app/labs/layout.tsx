import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Labs — Research & experiments",
    alternates: { canonical: "/labs" },
  description:
    "Revzion Labs is our R&D arm exploring cutting-edge technologies, AI innovations, and experimental solutions. Join our journey in building the future.",
  keywords: [
    "Revzion Labs",
    "Innovation Lab",
    "R&D",
    "Experimental Tech",
    "AI Research",
    "Open Source",
    "Technology Innovation",
  ],
  openGraph: {
    title: "Revzion Labs - Where Ideas Become Reality",
    description: "Our experimental playground for cutting-edge technologies and innovative solutions.",
    url: "https://www.revzion.in/labs",
    type: "website",
  },
}

export default function LabsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
