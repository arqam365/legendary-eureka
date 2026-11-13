"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/brand/Logo"

const NAV = [
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/process", label: "Process" },
    { href: "/about", label: "About" },
]

export function Navigation() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    useEffect(() => setOpen(false), [pathname])

    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open])

    const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`)

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-[90] border-b border-[#E4E9F1] bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
                    <Link href="/" aria-label="Revzion home" className="shrink-0">
                        <Logo className="h-6 w-auto text-[#0B1220]" />
                    </Link>

                    <nav aria-label="Main" className="hidden md:flex items-center gap-8">
                        {NAV.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive(item.href) ? "page" : undefined}
                                className={`text-[15px] font-medium transition-colors ${
                                    isActive(item.href)
                                        ? "text-[#0B1220] underline decoration-[#2563EB] decoration-2 underline-offset-[10px]"
                                        : "text-[#64748B] hover:text-[#0B1220]"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="inline-flex h-10 items-center rounded-full bg-[#2563EB] px-5 text-sm font-semibold text-white hover:bg-[#1D53DE]"
                        >
                            Talk to us
                        </Link>
                    </nav>

                    <button
                        type="button"
                        className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#0B1220] hover:bg-[#EEF1F6]"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? "Close menu" : "Open menu"}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
                    </button>
                </div>

                {open && (
                    <nav id="mobile-menu" aria-label="Mobile" className="md:hidden border-t border-[#E4E9F1] bg-white">
                        <ul className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                            {NAV.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={isActive(item.href) ? "page" : undefined}
                                        className={`block py-3 text-lg font-medium ${
                                            isActive(item.href) ? "text-[#0B1220]" : "text-[#64748B]"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-4">
                                <Link
                                    href="/contact"
                                    className="flex h-12 items-center justify-center rounded-full bg-[#2563EB] text-base font-semibold text-white"
                                >
                                    Talk to us
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </header>

            <div aria-hidden style={{ height: 72 }} />
        </>
    )
}
