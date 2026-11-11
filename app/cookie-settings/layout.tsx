import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Cookie settings",
    description: "Manage which non-essential cookies Revzion may use on this site.",
    alternates: { canonical: "/cookie-settings" },
    robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
