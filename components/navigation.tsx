"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion"

type NavItem = { href: string; label: string }
const CTA_DEST = "/contact"
const MotionLink = motion(Link)

type BarState = "top" | "pinned" | "hidden"

export function Navigation() {
    const pathname = usePathname()
    const router = useRouter()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [state, setState] = useState<BarState>("top")
    const [scrolled, setScrolled] = useState(false)

    const { scrollY, scrollYProgress } = useScroll()
    const lastY = useRef(0)

    // ── NEW: refs for hot-edge reveal + hover + auto-hide timer
    const hotRevealRef = useRef(false)
    const hoveredRef = useRef(false)
    const autoHideT = useRef<number | null>(null)
    const AUTOHIDE_MS = 1000

    const H = 64
    const HIDE_AFTER = 20
    const SHOW_DELTA = 12
    const HOTZONE = 14

    useEffect(() => {
        document.documentElement.style.setProperty("--nav-h", `${H}px`)
    }, [])

    // scroll-based hide/pin
    useMotionValueEvent(scrollY, "change", (y) => {
        const prev = lastY.current
        const diff = y - prev
        lastY.current = y
        setScrolled(y > 2)

        if (y <= HIDE_AFTER) {
            setState("top")
            return
        }
        if (diff > 0) {
            setState("hidden")
            return
        }
        if (diff < 0 && prev - y > SHOW_DELTA) {
            // scrolling up – this is not a hot-edge reveal
            hotRevealRef.current = false
            setState("pinned")
        }
    })

    // Hot-edge reveal (mouse + touch)
    useEffect(() => {
        let frame = 0

        const onEdge = (y: number) => {
            if (state === "hidden" && y <= HOTZONE) {
                hotRevealRef.current = true // mark as hot-edge reveal
                setState("pinned")
            }
        }

        const onMouseMove = (e: MouseEvent) => {
            if (frame) return
            frame = requestAnimationFrame(() => {
                frame = 0
                onEdge(e.clientY)
            })
        }

        const onTouchStart = (e: TouchEvent) => {
            const y = e.touches?.[0]?.clientY ?? 9999
            onEdge(y)
        }

        window.addEventListener("mousemove", onMouseMove, { passive: true })
        window.addEventListener("touchstart", onTouchStart, { passive: true })
        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("touchstart", onTouchStart)
            if (frame) cancelAnimationFrame(frame)
        }
    }, [state])

    // ── NEW: auto-hide after hot-edge reveal (1s), unless hovered or menu is open
    useEffect(() => {
        // clear old timer
        if (autoHideT.current) {
            window.clearTimeout(autoHideT.current)
            autoHideT.current = null
        }

        // only schedule if it was a hot-edge reveal
        if (state === "pinned" && hotRevealRef.current && !isMenuOpen && !hoveredRef.current) {
            autoHideT.current = window.setTimeout(() => {
                // hide only if still pinned and still flagged as hot reveal
                if (hotRevealRef.current) {
                    setState("hidden")
                    hotRevealRef.current = false // consume the flag
                }
            }, AUTOHIDE_MS) as unknown as number
        }

        // cleanup on unmount
        return () => {
            if (autoHideT.current) window.clearTimeout(autoHideT.current)
        }
    }, [state, isMenuOpen])

    // ── NEW: hover cancels auto-hide; leaving may re-arm it if still hot reveal
    const onPointerEnter = () => {
        hoveredRef.current = true
        if (autoHideT.current) {
            window.clearTimeout(autoHideT.current)
            autoHideT.current = null
        }
    }
    const onPointerLeave = () => {
        hoveredRef.current = false
        // if it's a hot-edge reveal and menu not open, re-arm timer
        if (state === "pinned" && hotRevealRef.current && !isMenuOpen) {
            if (autoHideT.current) window.clearTimeout(autoHideT.current)
            autoHideT.current = window.setTimeout(() => {
                if (hotRevealRef.current) {
                    setState("hidden")
                    hotRevealRef.current = false
                }
            }, AUTOHIDE_MS) as unknown as number
        }
    }

    const navItems: NavItem[] = useMemo(
        () => [
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: "/portfolio", label: "Portfolio" },
            { href: "/labs", label: "Labs" },
            { href: "/about", label: "About" },
            { href: "/blogs", label: "Blogs" },
            { href: "/contact", label: "Contact" },
        ],
        []
    )

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname?.startsWith(href)

    return (
        <>
            {/* progress bar */}
            <motion.div
                className="fixed left-0 right-0 top-0 z-[95] h-[2px] bg-primary origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <motion.nav
                role="navigation"
                aria-label="Main"
                initial={false}
                animate={{
                    y: state === "hidden" ? -H - 12 : 0,
                    backgroundColor:
                        state === "top" ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.72)",
                    backdropFilter:
                        state === "top" ? "blur(0px)" : "saturate(180%) blur(12px)",
                    boxShadow:
                        state === "hidden" || state === "top"
                            ? "0 0 0 rgba(0,0,0,0)"
                            : "0 8px 30px -18px rgba(2,6,23,.24)",
                }}
                transition={{ type: "spring", stiffness: 520, damping: 44 }}
                className={[
                    "fixed inset-x-0 top-0 z-[90]",
                    "border-b",
                    state === "top" ? "border-transparent" : "border-gray-100/70",
                ].join(" ")}
                // ── NEW: hover listeners
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-[64px] flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group" aria-label="Revzion home">
                            <Image src="/logo.svg" alt="Revzion logo" width={36} height={36} className="rounded-lg" />
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
                                            aria-hidden
                                            className={[
                                                "absolute -bottom-1 left-0 h-0.5 rounded-full transition-all",
                                                active ? "w-full bg-primary" : "w-0 bg-transparent group-hover:w-full",
                                            ].join(" ")}
                                        />
                                    </Link>
                                )
                            })}

                            <Button asChild className="relative overflow-hidden bg-gradient-revzion">
                                <MotionLink
                                    href={CTA_DEST}
                                    aria-label="Get started with a free consultation"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-4 py-2"
                                >
                                    <span className="relative z-10">Get Started</span>
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
                                {isMenuOpen ? <Menu className="h-5 w-5 rotate-90 transition" /> : <Menu className="h-5 w-5" />}
                                {isMenuOpen && <X className="sr-only" />} {/* a11y */}
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
                                className="md:hidden overflow-hidden border-t border-gray-100 bg-white backdrop-blur"
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
                                                    active ? "text-gray-900 bg-gray-100" : "text-gray-700 hover:text-primary hover:bg-gray-50",
                                                ].join(" ")}
                                            >
                                                {item.label}
                                            </Link>
                                        )
                                    })}
                                    <Button
                                        className="mt-2 relative overflow-hidden bg-gradient-revzion"
                                        onClick={() => {
                                            setIsMenuOpen(false)
                                            router.push(CTA_DEST)
                                        }}
                                    >
                                        <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10">
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
            </motion.nav>

            <div style={{ height: "var(--nav-h, 64px)" }} />
        </>
    )
}