import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Project estimate",
    description: "Get a scope and cost range for your project before committing to timelines or budgets.",
    alternates: { canonical: "/estimate" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children
}
