import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Referral programme",
    description: "Introduce a team that needs software built and earn a finder's fee on the first paid invoice.",
    alternates: { canonical: "/referrals" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
