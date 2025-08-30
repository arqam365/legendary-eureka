"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

type NavItem = { href: string; label: string }
const CTA_DEST = "/contact"

const MotionLink = motion(Link)

export function Navigation() {
    const pathname = usePathname()
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const navItems: NavItem[] = useMemo(
        () => [
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: "/portfolio", label: "Portfolio" },
            { href: "/about", label: "About" },
            { href: "/blogs", label: "Blogs" },
            { href: "/contact", label: "Contact" },
        ],
        []
    )

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname?.startsWith(href)

    return (
        <nav
            className={[
                "sticky top-0 z-50 border-b border-gray-100/70",
                "bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70",
                scrolled ? "shadow-[0_6px_24px_-18px_rgba(0,0,0,0.25)]" : "shadow-none",
            ].join(" ")}
            role="navigation"
            aria-label="Main"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" aria-label="Revzion home">
                        <img src="/logo.svg" alt="Revzion logo" className="h-9 w-9 rounded-lg" />
                        <span className="font-heading font-bold text-xl text-gray-900 group-hover:opacity-90">
              Revzion
            </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => {
                            const active = isActive(item.href)
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={[
                                        "relative font-medium transition-colors",
                                        active ? "text-gray-900" : "text-gray-600 hover:text-primary",
                                    ].join(" ")}
                                >
                                    {item.label}
                                    <span
                                        className={[
                                            "absolute -bottom-1 left-0 h-0.5 rounded-full transition-all",
                                            active ? "w-full bg-primary" : "w-0 bg-transparent group-hover:w-full",
                                        ].join(" ")}
                                    />
                                </Link>
                            )
                        })}

                        {/* ✅ CTA as a real Link with micro-interactions */}
                        <Button asChild className="relative overflow-hidden bg-gradient-revzion">
                            <MotionLink
                                href={CTA_DEST}
                                aria-label="Get started with a free consultation"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-4 py-2"
                            >
                                <span className="relative z-10">Get Started</span>
                                {/* sheen */}
                                <motion.span
                                    aria-hidden
                                    initial={{ x: "-120%" }}
                                    whileHover={{ x: "120%" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-20deg] bg-white/30"
                                />
                            </MotionLink>
                        </Button>
                    </div>

                    {/* Mobile toggle */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMenuOpen((v) => !v)}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-nav"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile drawer */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            id="mobile-nav"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="md:hidden overflow-hidden border-t border-gray-100"
                        >
                            <div className="py-4 flex flex-col gap-2">
                                {navItems.map((item) => {
                                    const active = isActive(item.href)
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={[
                                                "px-1 py-2 rounded-md font-medium transition-colors",
                                                active
                                                    ? "text-gray-900 bg-gray-100"
                                                    : "text-gray-700 hover:text-primary hover:bg-gray-50",
                                            ].join(" ")}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}

                                {/* ✅ Mobile CTA navigates programmatically + closes drawer */}
                                <Button
                                    className="mt-2 relative overflow-hidden bg-gradient-revzion"
                                    onClick={() => {
                                        setIsMenuOpen(false)
                                        router.push(CTA_DEST)
                                    }}
                                >
                                    <motion.span
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative z-10"
                                    >
                                        Get Started
                                    </motion.span>
                                    <motion.span
                                        aria-hidden
                                        initial={{ x: "-120%" }}
                                        whileHover={{ x: "120%" }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-20deg] bg-white/30"
                                    />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}