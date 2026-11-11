import Link from "next/link"
import { Logo } from "@/components/brand/Logo"
import BackToTopFab from "@/components/BackToTopFab"

const COLUMNS = [
    {
        title: "Work",
        items: [
            { href: "/services", label: "Services" },
            { href: "/portfolio", label: "Portfolio" },
            { href: "/process", label: "Process" },
            { href: "/estimate", label: "Project estimate" },
        ],
    },
    {
        title: "Company",
        items: [
            { href: "/about", label: "About" },
            { href: "/labs", label: "Labs" },
            { href: "/blogs", label: "Blog" },
            { href: "/careers", label: "Careers" },
            { href: "/referrals", label: "Referrals" },
        ],
    },
    {
        title: "Legal",
        items: [
            { href: "/privacy-policy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms of Service" },
            { href: "/cookie-settings", label: "Cookie settings" },
        ],
    },
]

const CLIENTS = [
    "Packagefy", "Evolwe", "Techxellent", "Hello Cloud", "Bee Social", "Everyday Fitness",
    "Mazencito", "Beit Al Laymoun", "Cashmere World", "EHP Academy",
]

export function Footer() {
    return (
        <footer id="site-footer" className="bg-[#0B1220] text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10 grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <Link href="/" aria-label="Revzion home" className="inline-block">
                        <Logo className="h-7 w-auto text-white" />
                    </Link>
                    <p className="mt-6 text-2xl font-display-brand leading-snug">
                        Intelligence that drives growth.
                    </p>
                    <p className="mt-3 max-w-md text-[#C2CBDC]">
                        We design and build SaaS platforms, AI-powered systems and cross-platform mobile apps.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-[#0B1220] hover:bg-[#EEF1F6]"
                        >
                            Start a conversation
                        </Link>
                        <a
                            href="mailto:connect@revzion.in"
                            className="inline-flex h-11 items-center rounded-full border border-[#364A75] px-5 text-sm font-medium text-white hover:bg-[#131C33]"
                        >
                            connect@revzion.in
                        </a>
                    </div>
                </div>

                <nav aria-label="Footer" className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#A5B1C9] mb-4">
                                {col.title}
                            </h2>
                            <ul className="space-y-2.5">
                                {col.items.map((l) => (
                                    <li key={l.href}>
                                        <Link href={l.href} className="text-[#E4E9F1] hover:text-white hover:underline underline-offset-4">
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="border-t border-[#1D2A48]">
                <p className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-[#A5B1C9]">
                    <span className="text-[#E4E9F1]">Selected clients:</span> {CLIENTS.join(" · ")}
                </p>
            </div>

            <div className="border-t border-[#1D2A48]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-[#A5B1C9]">
                    <p>© {new Date().getFullYear()} Revzion. All rights reserved.</p>
                    <p>
                        <a href="https://www.linkedin.com/company/revzion" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            LinkedIn
                        </a>
                        <span aria-hidden className="mx-2">·</span>
                        <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
                        <span aria-hidden className="mx-2">·</span>
                        <Link href="/terms" className="hover:text-white">Terms</Link>
                    </p>
                </div>
            </div>

            <BackToTopFab threshold={400} />
        </footer>
    )
}
