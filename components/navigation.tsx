"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import {
    AnimatePresence,
    motion,
    useScroll,
    useMotionValueEvent,
} from "framer-motion"

type NavItem = { href: string; label: string }
const CTA_DEST = "/contact"
const MotionLink = motion(Link)

type BarState = "top" | "pinned" | "hidden"

export function Navigation() {
    const pathname = usePathname()
    const router = useRouter()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [state, setState] = useState<BarState>("top")
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)

    const { scrollY, scrollYProgress } = useScroll()
    const lastY = useRef(0)

    const H = 72
    const HIDE_AFTER = 20
    const SHOW_DELTA = 12

    useEffect(() => {
        document.documentElement.style.setProperty("--nav-h", `${H}px`)
    }, [])

    // Scroll logic
    useMotionValueEvent(scrollY, "change", (y) => {
        const prev = lastY.current
        const diff = y - prev
        lastY.current = y

        if (y <= HIDE_AFTER) {
            setState("top")
            return
        }

        if (diff > 0) {
            setState("hidden")
            return
        }

        if (diff < 0 && prev - y > SHOW_DELTA) {
            setState("pinned")
        }
    })

    const navItems: NavItem[] = useMemo(
        () => [
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: "/portfolio", label: "Portfolio" },
            { href: "/labs", label: "Labs" },
            { href: "/about", label: "About" },
            { href: "/blogs", label: "Blogs" },
            { href: "/estimate", label: "Get Estimate" },
        ],
        []
    )

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname?.startsWith(href)

    const currentUnderline = hoveredTab || navItems.find(i => isActive(i.href))?.href

    return (
        <>
            {/* Scroll progress */}
            <motion.div
                className="fixed left-0 right-0 top-0 z-[95] h-[2px] bg-blue-600 origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <motion.nav
                initial={false}
                animate={{
                    y: isMenuOpen ? -10 : state === "hidden" ? -H - 12 : 0,
                    opacity: isMenuOpen ? 0 : 1,
                    backgroundColor:
                        state === "top"
                            ? "rgba(255,255,255,0)"
                            : "rgba(255,255,255,0.92)",
                    backdropFilter:
                        state === "top"
                            ? "blur(0px)"
                            : "saturate(180%) blur(14px)",
                    boxShadow:
                        state === "hidden" || state === "top"
                            ? "0 0 0 rgba(0,0,0,0)"
                            : "0 8px 30px -12px rgba(0,0,0,.12)",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 42 }}
                className="fixed inset-x-0 top-0 z-[90] border-b border-black/5 md:pointer-events-auto"
                style={{
                    pointerEvents: isMenuOpen ? "none" : "auto",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-[72px] flex items-center justify-between">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/logo.svg"
                                alt="Revzion logo"
                                width={34}
                                height={34}
                            />
                            <span className="text-xl font-semibold text-gray-900 tracking-tight">
                Revzion
              </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8 relative">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onMouseEnter={() => setHoveredTab(item.href)}
                                    onMouseLeave={() => setHoveredTab(null)}
                                    className="relative text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {item.label}

                                    {currentUnderline === item.href && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-2 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 35,
                                            }}
                                        />
                                    )}
                                </Link>
                            ))}

                            <Button
                                asChild
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-sm hover:shadow-md transition-all"
                            >
                                <MotionLink
                                    href={CTA_DEST}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Get Started
                                </MotionLink>
                            </Button>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMenuOpen((v) => !v)}
                            >
                                {isMenuOpen ? (
                                    <X className="h-5 w-5 text-gray-900" />
                                ) : (
                                    <Menu className="h-5 w-5 text-gray-900" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 400, damping: 40 }}
                            className="absolute right-0 top-0 h-full w-[85%] bg-white shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Mobile Header FIXED */}
                            <div className="flex items-center justify-between px-6 py-5 border-b">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/logo.svg"
                                        alt="Revzion logo"
                                        width={26}
                                        height={26}
                                    />
                                    <span className="font-semibold text-gray-900">
                    Revzion
                  </span>
                                </div>

                                <X
                                    className="h-5 w-5 text-gray-700 cursor-pointer"
                                    onClick={() => setIsMenuOpen(false)}
                                />
                            </div>

                            <div className="flex flex-col gap-6 px-6 py-8">
                                {navItems.map((item) => {
                                    const active = isActive(item.href)

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`text-lg font-medium transition-colors ${
                                                active
                                                    ? "text-blue-600"
                                                    : "text-gray-700 hover:text-gray-900"
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}

                                <Button
                                    className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl"
                                    onClick={() => {
                                        setIsMenuOpen(false)
                                        router.push(CTA_DEST)
                                    }}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ height: "var(--nav-h, 72px)" }} />
        </>
    )
}