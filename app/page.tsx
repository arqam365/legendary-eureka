"use client"

import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useTransform,
    type MotionValue,
    type Variants, useSpring,
} from "framer-motion"

import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
    ArrowRight,
    Users,
    Code,
    Brain,
    TrendingUp,
    Monitor,
    Smartphone,
    Building2,
    Star, Zap, Layers, Cloud, Database, Shield,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ConsultationCTA } from "@/components/consultation-cta"
import SoundToggle from "@/components/SoundToggle"
import ScrollMilestones, { type Milestone } from "@/components/scroll-milestones"
import TrustSection from "@/components/TrustSection";
import BuildarcSection from "@/components/BuildarcSection";

// gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)

// ============================================
// SCHEMA DATA FOR SEO (Added for GEO optimization)
// ============================================
const homeBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.revzion.com"
        }
    ]
};

const homepageFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What services does Revzion offer?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Revzion offers comprehensive technology services including mobile app development (Kotlin Multiplatform, iOS, Android), SaaS development, AI & automation solutions, web development with Next.js and React, cloud architecture, and DevOps services."
            }
        },
        {
            "@type": "Question",
            "name": "What technologies does Revzion specialize in?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We specialize in Kotlin Multiplatform Mobile, Next.js, React, TypeScript, iOS (Swift/SwiftUI), Android (Kotlin/Jetpack Compose), AI technologies (OpenAI, Groq), cloud platforms (AWS, Firebase, Vercel), and modern DevOps practices."
            }
        },
        {
            "@type": "Question",
            "name": "How long does it take to build a mobile app?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A typical cross-platform mobile app takes 3-6 months from concept to App Store/Play Store launch. This includes discovery, design, development, testing, and submission. Timeline varies based on complexity and features."
            }
        },
        {
            "@type": "Question",
            "name": "Does Revzion work with startups or enterprises?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We work with both startups building MVPs and established enterprises scaling their platforms. We provide tailored solutions based on your stage, budget, and business goals."
            }
        },
        {
            "@type": "Question",
            "name": "Where is Revzion located?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Revzion is headquartered in Meerut, Uttar Pradesh, India. We operate as a remote-first company and serve clients globally across multiple time zones."
            }
        },
        {
            "@type": "Question",
            "name": "What is Kotlin Multiplatform?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Kotlin Multiplatform (KMP) is a technology that allows sharing 60-80% of code between iOS and Android apps while maintaining native UI and performance. It reduces development time and maintenance costs while ensuring high-quality user experience on both platforms."
            }
        }
    ]
};

/* -------------------- Shared minimal motion -------------------- */
const revealOnce: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}
const hoverCard = { scale: 1.02 }
const hoverIcon = { scale: 1.08 }

/* -------------------- Case Studies Carousel -------------------- */
type Study = {
    id: string
    title: string
    problem: string
    solution: string
    results: string
    kind: "web" | "mobile"
    images: {
        desktop?: string
        mobile?: string
    }
    link?: string
    tags?: string[]
    kpis?: { label: string; value: string }[]
    clients?: { name: string; logo: string }[]
}

function CaseStudiesCarousel() {
    const studies: Study[] = [
        {
            id: "evolwe-ring",
            title: "Evolwe Ring — Smart Ring + Companion App",
            kind: "mobile",
            problem: "Indian health-tech consumers had no premium smart ring with local language support and a one-time pricing model — the market was dominated by Western subscription platforms.",
            solution: "Built a Next.js product site, a React Native BLE companion app, and an on-device ML pipeline (EVO AI) converting raw biometric data into personalised daily health scores.",
            results: "4.7/5 Play Store rating, 15+ biometrics tracked continuously, press coverage in Forbes, WIRED, and TechCrunch. Zero subscription cost vs. competitors charging ₹12K/yr.",
            images: {
                mobile: "/case-studies/evolwe.jpeg"
            },
            link: "/portfolio/evolwe-ring",
            tags: ["Smart Ring + App", "BLE + On-device ML", "No Subscription"],
            kpis: [
                { label: "Play Store", value: "4.7/5" },
                { label: "Biometrics", value: "15+" },
                { label: "Subscription", value: "₹0" },
            ],
        },
        {
            id: "rynox",
            title: "Rynox — Franchise Billing & Command Platform",
            kind: "web",
            problem: "Franchise operators managing hundreds of locations had no unified billing, pricing visibility, or profit-auditing tool — relying on spreadsheets and generic POS software.",
            solution: "Built a multi-tenant SaaS with a centralised pricing engine, real-time P&L analytics across all locations, and automated commission calculations eliminating month-end disputes.",
            results: "500+ locations served, 3-tool stack replaced with one platform. Integrated Stripe, PayPal, Square, QuickBooks, and Xero in a single command centre.",
            images: {
                desktop: "/case-studies/rynox.jpeg"
            },
            link: "/portfolio/rynox",
            tags: ["Franchise SaaS", "Multi-tenant", "Billing & Analytics"],
            kpis: [
                { label: "Locations", value: "500+" },
                { label: "Tools Replaced", value: "3 → 1" },
                { label: "Gateways", value: "3" },
            ],
        },
        {
            id: "cognivia",
            title: "Cognivia — AI-First LMS for Educators",
            kind: "web",
            problem: "Coaching institutes juggled 4–6 disconnected tools for admissions, course delivery, and fee collection — leaking revenue through missed follow-ups and zero dropout analytics.",
            solution: "Engineered a vertically integrated EdTech platform with AI question generation, ML dropout prediction 14 days in advance, automated fee collection, and white-label mobile apps.",
            results: "SOC 2, GDPR & ISO 27001 certified, 99.7% uptime, dropout risk flagged 14 days early, 80%+ admin hours saved vs. manual workflows.",
            images: {
                desktop: "/screenshots/cognivia.jpg"
            },
            link: "/portfolio/cognivia",
            tags: ["EdTech SaaS", "AI + ML", "SOC 2 Certified"],
            kpis: [
                { label: "Uptime", value: "99.7%" },
                { label: "Dropout Warn", value: "14 days" },
                { label: "Admin Saved", value: "80%+" },
            ],
        },
    ]

    const [active, setActive] = React.useState(0)
    const [hovering, setHovering] = React.useState(false)
    const prefersReduced = useReducedMotion()

    React.useEffect(() => {
        if (prefersReduced || hovering) return
        const id = setInterval(() => setActive(i => (i + 1) % studies.length), 7000)
        return () => clearInterval(id)
    }, [prefersReduced, hovering, studies.length])

    const next = () => setActive(i => (i + 1) % studies.length)
    const prev = () => setActive(i => (i - 1 + studies.length) % studies.length)

    const s = studies[active]

    return (
        <section id="case-studies" className="py-16 sm:py-20 bg-[#EEF1F6]" data-st-section>
            <motion.div
                className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
                variants={revealOnce}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
            >
                {/* Header row */}
                <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="text-center sm:text-left">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] mb-2">Work</p>
                        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#0B1220]">Case Studies</h2>
                        <p className="text-[#64748B] text-base sm:text-lg">Proof over promises.</p>
                    </div>
                    <div className="hidden md:flex gap-3">
                        <Button variant="outline" onClick={prev} aria-label="Previous case study" title="Previous">←</Button>
                        <Button onClick={next} aria-label="Next case study" title="Next">→</Button>
                    </div>
                </div>

                {/* Slide */}
                <div
                    className="relative"
                    aria-roledescription="carousel"
                    aria-label="Case studies"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.article
                            key={s.id}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -18 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className={[
                                "mx-auto w-full rounded-3xl overflow-hidden",
                                "border border-white/70 bg-white/70 backdrop-blur-xl",
                                "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]",
                            ].join(" ")}
                        >
                            {/* On mobile, stack; on lg+, split 2/3 */}
                            <motion.div
                                drag={prefersReduced ? false : "x"}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x > 80) prev()
                                    else if (info.offset.x < -80) next()
                                }}
                                className="grid grid-cols-1 lg:grid-cols-5"
                            >
                                {/* Visual */}
                                <div className="relative lg:col-span-2 flex items-center px-4 sm:px-6 lg:px-8 py-6">
                                    {/* WEB / SAAS */}
                                    {s.kind === "web" && s.images.desktop && (
                                        <div className="w-full flex justify-center">
                                            <div className="relative w-full max-w-[520px] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border bg-white">
                                                <Image
                                                    src={s.images.desktop}
                                                    alt={`${s.title} desktop mockup`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 1024px) 90vw, 520px"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* MOBILE APP */}
                                    {s.kind === "mobile" && s.images.mobile && (
                                        <div className="w-full flex justify-center">
                                            <div className="relative w-[240px] aspect-[9/19.5] rounded-3xl overflow-hidden shadow-2xl border bg-white">
                                                <Image
                                                    src={s.images.mobile}
                                                    alt={`${s.title} mobile mockup`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="240px"
                                                    priority
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10">
                                    <div className="mb-3 flex items-center gap-2 text-primary">
                                        <TrendingUp className="h-5 w-5" />
                                        <span className="text-sm font-medium">Case Study</span>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-gray-900">
                                        {s.title}
                                    </h3>

                                    <div className="mt-4 sm:mt-5 space-y-3 text-gray-700 leading-relaxed">
                                        <p><span className="font-semibold text-gray-900">Problem:</span> {s.problem}</p>
                                        <p><span className="font-semibold text-gray-900">Solution:</span> {s.solution}</p>
                                        <p><span className="font-semibold text-gray-900">Results:</span> {s.results}</p>
                                    </div>

                                    <Link
                                        href={s.link || "/portfolio"}
                                        className="mt-5 inline-flex items-center text-primary font-medium hover:underline"
                                    >
                                        View case study <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>

                                    {/* Detail bar */}
                                    <div className="relative mt-6 sm:mt-8 rounded-2xl border border-white/60 bg-white/60 backdrop-blur-xl overflow-hidden">
                                        <div className="grid grid-cols-1 gap-4 p-4 sm:p-5 lg:grid-cols-5">
                                            {/* Clients */}
                                            {s.clients?.length ? (
                                                <div className="lg:col-span-2">
                                                    <div className="mb-2 flex items-center gap-2 text-gray-700">
                                                        <Building2 className="h-4 w-4 text-primary" />
                                                        <span className="text-xs font-medium uppercase tracking-wide">Trusted by</span>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="flex gap-5 overflow-hidden group">
                                                            <div className="flex gap-5 animate-[marquee_18s_linear_infinite] group-hover:[animation-play-state:paused]">
                                                                {s.clients.concat(s.clients).map((c, i) => (
                                                                    <div
                                                                        key={c.name + i}
                                                                        className="flex items-center gap-2 opacity-80 hover:opacity-100 transition"
                                                                    >
                                                                        <Image
                                                                            src={c.logo}
                                                                            alt={c.name}
                                                                            width={84}
                                                                            height={24}
                                                                            className="h-5 w-auto object-contain"
                                                                        />
                                                                        <span className="sr-only">{c.name}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}

                                            {/* Tags */}
                                            {s.tags?.length ? (
                                                <div className="lg:col-span-2">
                                                    <div className="mb-2 flex items-center gap-2 text-gray-700">
                                                        <Star className="h-4 w-4 text-primary" />
                                                        <span className="text-xs font-medium uppercase tracking-wide">Highlights</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {s.tags.map(tag => (
                                                            <span
                                                                key={tag}
                                                                className="rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs text-gray-800"
                                                            >
                                {tag}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null}

                                            {/* KPIs */}
                                            {s.kpis?.length ? (
                                                <div className="lg:col-span-1">
                                                    <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-700">
                                                        Impact
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                                                        {s.kpis.map(kpi => (
                                                            <div
                                                                key={kpi.label}
                                                                className="rounded-xl border border-white/70 bg-white/70 px-3 py-2 text-center shadow-sm"
                                                            >
                                                                <div className="text-sm font-semibold text-gray-900">{kpi.value}</div>
                                                                <div className="text-[10px] text-gray-500">{kpi.label}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.article>
                    </AnimatePresence>

                    {/* Arrows – show on md+; larger touch targets */}
                    <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 hidden md:flex justify-between px-2 lg:px-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prev}
                            aria-label="Previous slide"
                            title="Previous"
                            className="pointer-events-auto h-10 w-10 sm:h-11 sm:w-11"
                        >
                            ←
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={next}
                            aria-label="Next slide"
                            title="Next"
                            className="pointer-events-auto h-10 w-10 sm:h-11 sm:w-11"
                        >
                            →
                        </Button>
                    </div>
                </div>

                {/* Dots */}
                <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2" aria-live="polite">
                    {studies.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2.5 rounded-full transition-all ${i === active ? "bg-primary w-6" : "bg-gray-300 w-2.5 hover:bg-gray-400"}`}
                        />
                    ))}
                </div>

                <div className="mt-5 sm:mt-6 flex items-center justify-center">
                    <Button asChild size="lg" variant="outline" className="px-6 py-3">
                        <Link href="/portfolio">View More</Link>
                    </Button>
                </div>
            </motion.div>

            {/* marquee keyframes */}
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0) }
                    100% { transform: translateX(-50%) }
                }
            `}</style>
        </section>
    )
}

/* -------------------- Interactive Product Mockups (Hero) -------------------- */
function useCarousel(length: number, autoMs = 6000) {
    const [i, setI] = useState(0)
    const [hovering, setHover] = useState(false)
    const prefersReduced = useReducedMotion()

    useEffect(() => {
        if (prefersReduced || hovering || length <= 1) return
        const id = setInterval(() => setI(v => (v + 1) % length), autoMs)
        return () => clearInterval(id)
    }, [length, autoMs, hovering, prefersReduced])

    const next = () => setI(v => (v + 1) % length)
    const prev = () => setI(v => (v - 1 + length) % length)
    return { i, setI, next, prev, setHover }
}

type ShowcaseProps = { blobShift: MotionValue<number> };

type WebItem = {
    name: string;
    url: string;
    description?: string;
};

type AppItem = {
    name: string;
    image: string; // path under /public
    description?: string;
    link?: string | null;
};

// ---------- Web config (desktop) ----------
const WEBSITES: WebItem[] = [
    {
        name: "Packagefy",
        url: "https://test-app-packagefy.vercel.app",
        description: "Package tracking solution",
    }
];

// ---------- App config (mobile) ----------
const APPS: AppItem[] = [
    {
        name: "Bee Social",
        image: "/case-studies/beesocial.png",
        description: "Package tracking solution",
        link: null,
    },
    {
        name: "Evolwe App",
        image: "/case-studies/evolwe.png",
        description: "E-commerce platform",
        link: null,
    },
];

export function ProductShowcase({ blobShift }: ShowcaseProps) {
    const websites = useMemo(() => WEBSITES, []);
    const apps = useMemo(() => APPS, []);

    const desk = useCarousel(websites.length, 5000);
    const mob = useCarousel(apps.length, 5000);
    const prefersReduced = useReducedMotion();

    // tilt only on non-touch + reducedMotion=false
    const [canTilt, setCanTilt] = useState(false);
    useEffect(() => {
        const isTouch =
            typeof window !== "undefined" &&
            ("ontouchstart" in window || navigator.maxTouchPoints > 0);
        setCanTilt(!isTouch && !prefersReduced);
    }, [prefersReduced]);

    // which frame is on top (desktop vs phone) for sm+ layout
    const [topView, setTopView] = useState<"desktop" | "mobile">("desktop");
    useEffect(() => {
        const id = setInterval(
            () => setTopView((v) => (v === "desktop" ? "mobile" : "desktop")),
            5000
        );
        return () => clearInterval(id);
    }, []);

    // tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotX = useTransform(y, [-50, 50], [6, -6]);
    const rotY = useTransform(x, [-80, 80], [-8, 8]);
    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!canTilt) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (r.left + r.width / 2));
        y.set(e.clientY - (r.top + r.height / 2));
    };
    const onDragEnd = (offsetX: number, next: () => void, prev: () => void) => {
        if (offsetX > 80) prev();
        else if (offsetX < -80) next();
    };

    const desktopOnTop = topView === "desktop";

    return (
        <div className="relative isolate w-full">
            {/* soft blobs (pointer-events disabled so nothing blocks clicks) */}
            <motion.div
                aria-hidden
                style={{ y: blobShift }}
                className="absolute -top-6 -right-6 w-56 h-56 sm:w-72 sm:h-72 bg-[#2563EB] rounded-full opacity-10 blur-3xl pointer-events-none z-0"
            />
            <motion.div
                aria-hidden
                style={{ y: blobShift }}
                className="absolute -bottom-10 -left-10 w-48 h-48 sm:w-64 sm:h-64 bg-blue-200 rounded-full opacity-20 blur-2xl pointer-events-none z-0"
            />

            {/* ---------- DESKTOP CARD (web) ---------- */}
            <motion.div
                className={[
                    "relative w-full max-w-[640px] mx-auto rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 overflow-hidden shadow-lg",
                    "sm:transition-all sm:duration-500 sm:will-change-transform",
                    desktopOnTop
                        ? "sm:z-40 sm:scale-100"
                        : "sm:z-10 sm:scale-[0.92] sm:pointer-events-none",
                ].join(" ")}
                style={canTilt ? { rotateX: rotX, rotateY: rotY } : undefined}
                onMouseMove={onMove}
                onMouseLeave={() => {
                    x.set(0);
                    y.set(0);
                }}
                onPointerEnter={() => desk.setHover(true)}
                onPointerLeave={() => desk.setHover(false)}  // ⬅️ FIX: This should have () => not just =>
            >
            <motion.div
                drag={prefersReduced ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => onDragEnd(info.offset.x, desk.next, desk.prev)}
            >
                <div className="relative rounded-xl bg-neutral-900 overflow-hidden">
                    {/* Browser chrome */}
                    <div className="absolute inset-x-0 top-0 h-8 bg-neutral-900/95 rounded-t-xl flex items-center px-3 gap-2 z-10">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 mx-2 h-5 rounded bg-neutral-800/50 flex items-center px-2">
                <span className="text-[9px] text-gray-400 truncate">
                  {websites[desk.i].url}
                </span>
                        </div>
                    </div>
                    {/* Live website preview */}
                    <div className="relative w-full aspect-[16/10] pt-8">
                        <iframe
                            key={websites[desk.i].url}
                            src={websites[desk.i].url}
                            className="w-full h-full border-0"
                            title={`${websites[desk.i].name} desktop preview`}
                            sandbox="allow-scripts allow-same-origin"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                        />
                    </div>
                </div>
            </motion.div>

            {/* controls: mobile -> below; sm+ -> overlay */}
            <div className="hidden sm:flex absolute bottom-3 left-0 right-0 items-center justify-between px-3">
                <Button size="sm" variant="outline" onClick={desk.prev} aria-label="Previous website">
                    ←
                </Button>
                <div className="flex gap-1.5">
                    {websites.map((w, idx) => (
                        <button
                            key={w.name}
                            onClick={() => desk.setI(idx)}
                            aria-label={`Go to website ${idx + 1}`}
                            className={`h-2 rounded-full transition-all ${
                                idx === desk.i ? "bg-primary w-6" : "bg-white/70 w-2.5"
                            }`}
                        />
                    ))}
                </div>
                <Button size="sm" onClick={desk.next} aria-label="Next website">
                    →
                </Button>
            </div>
        </motion.div>

    {/* mobile-only controls under the desktop card */}
    <div className="mt-3 sm:hidden flex items-center justify-center gap-3">
        <Button size="sm" variant="outline" onClick={desk.prev} aria-label="Previous website">
            ←
        </Button>
        <div className="flex gap-1.5">
            {websites.map((w, idx) => (
                <button
                    key={w.name}
                    onClick={() => desk.setI(idx)}
                    aria-label={`Go to website ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                        idx === desk.i ? "bg-primary w-6" : "bg-gray-300 w-2.5"
                    }`}
                />
            ))}
        </div>
        <Button size="sm" onClick={desk.next} aria-label="Next website">
            →
        </Button>
    </div>

    {/* ---------- PHONE CARD (apps) ---------- */}
    <motion.div
        className={[
            "relative mt-6 mx-auto w-[220px] rounded-3xl bg-white border border-white/60 overflow-hidden shadow-2xl",
            "sm:absolute sm:-bottom-6 sm:-right-6 sm:origin-bottom-right sm:w-[140px] md:w-[160px] lg:w-[180px] sm:transition-all sm:duration-500 sm:will-change-transform",
            desktopOnTop
                ? "sm:z-10 sm:scale-[0.92] sm:pointer-events-none"
                : "sm:z-40 sm:scale-100 sm:pointer-events-auto",
        ].join(" ")}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onPointerEnter={() => mob.setHover(true)}
        onPointerLeave={() => mob.setHover(false)}
    >
        <motion.div
            drag={prefersReduced ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => onDragEnd(info.offset.x, mob.next, mob.prev)}
            className="relative bg-neutral-950 overflow-hidden"
        >
            {/* Mobile app preview: image, not iframe */}
            <div className="relative w-full aspect-[9/19.5] bg-neutral-950">
                <img
                    key={apps[mob.i].image}
                    src={apps[mob.i].image}
                    alt={`${apps[mob.i].name} mobile mockup`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </motion.div>

        {/* phone dots: inside for sm+, below for mobile */}
        <div className="hidden sm:flex absolute bottom-2 left-0 right-0 justify-center gap-1.5 z-10">
            {apps.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => mob.setI(idx)}
                    aria-label={`Go to app ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${idx === mob.i ? "bg-primary w-5" : "bg-gray-300 w-2.5"}`}
                />
            ))}
        </div>
    </motion.div>

    {/* mobile-only phone dots under the phone mock (map APPS, not WEBSITES) */}
    <div className="sm:hidden mt-2 flex justify-center gap-1.5">
        {apps.map((a, idx) => (
            <button
                key={a.name}
                onClick={() => mob.setI(idx)}
                aria-label={`Go to app ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                    idx === mob.i ? "bg-primary w-5" : "bg-gray-300 w-2.5"
                }`}
            />
        ))}
    </div>

    {/* manual top/bottom toggles: hide on mobile (stacked) */}
    <div className="hidden sm:flex mt-6 gap-3 justify-center">
        <Button
            size="icon"
            variant={desktopOnTop ? "default" : "outline"}
            className={desktopOnTop ? "bg-primary text-white" : ""}
            onClick={() => setTopView("desktop")}
            aria-pressed={desktopOnTop}
            title="Desktop on top"
        >
            <Monitor className="h-5 w-5" />
            <span className="sr-only">Desktop on top</span>
        </Button>

        <Button
            size="icon"
            variant={!desktopOnTop ? "default" : "outline"}
            className={!desktopOnTop ? "bg-primary text-white" : ""}
            onClick={() => setTopView("mobile")}
            aria-pressed={!desktopOnTop}
            title="Mobile on top"
        >
            <Smartphone className="h-5 w-5" />
            <span className="sr-only">Mobile on top</span>
        </Button>
    </div>
</div>
);
}

function BrandCursorGlow({
                             containerRef,
                             size = 280,
                             opacity = 0.22,
                         }: {
    containerRef: React.RefObject<HTMLElement | HTMLDivElement>
    size?: number
    opacity?: number
}) {
    const prefersReduced = useReducedMotion()
    const x = useMotionValue(-9999)
    const y = useMotionValue(-9999)
    const sx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.4 })
    const sy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.4 })
    const [visible, setVisible] = React.useState(false)

    React.useEffect(() => {
        if (prefersReduced) return
        const el = containerRef.current
        if (!el) return

        const onMove: EventListener = (evt) => {
            const e = evt as PointerEvent
            if (e.pointerType === "touch") return
            const rect = el.getBoundingClientRect()
            const nx = e.clientX - rect.left - size / 2
            const ny = e.clientY - rect.top - size / 2
            x.set(nx)
            y.set(ny)
            setVisible(true)
        }
        const onLeave = () => {
            setVisible(false)
            x.set(-9999)
            y.set(-9999)
        }

        el.addEventListener("pointermove", onMove, { passive: true })
        el.addEventListener("pointerleave", onLeave, { passive: true })
        return () => {
            el.removeEventListener("pointermove", onMove)
            el.removeEventListener("pointerleave", onLeave)
        }
    }, [containerRef, prefersReduced, size, x, y])

    if (prefersReduced) return null

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-0 rounded-full bg-[#2563EB] blur-3xl md:blur-[48px] mix-blend-multiply"
            style={{
                width: size,
                height: size,
                x: sx,
                y: sy,
                opacity: visible ? opacity : 0,
                transition: "opacity 220ms ease",
            }}
        />
    )
}

/* ----------------------------------- Page ----------------------------------- */
export default function HomePage() {
    const prefersReduced = useReducedMotion()
    const heroRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
    const heroParallax = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 60])

    // Hero animation refs — each element gets its own ref for sequenced GSAP timeline
    const eyebrowRef   = useRef<HTMLParagraphElement>(null)
    const headlineRef  = useRef<HTMLDivElement>(null)
    const headlineBlueRef = useRef<HTMLDivElement>(null)
    const goldRuleRef  = useRef<HTMLDivElement>(null)
    const subtextRef   = useRef<HTMLParagraphElement>(null)
    const ctaRowRef    = useRef<HTMLDivElement>(null)
    const statsRef     = useRef<HTMLDivElement>(null)

    const [hydrated, setHydrated] = useState(false)

    useEffect(() => { setHydrated(true) }, [])

    useLayoutEffect(() => {
        if (!hydrated) return

        const ctx = gsap.context(() => {

            // ── Hero entrance timeline ──────────────────────────────────────
            // Runs once on mount — not scroll-triggered — so the hero lands immediately
            if (headlineRef.current) {
                // Hide everything first
                gsap.set([eyebrowRef.current, headlineRef.current, headlineBlueRef.current, goldRuleRef.current, subtextRef.current, ctaRowRef.current, statsRef.current], {
                    opacity: 0, y: 28,
                })

                const tl = gsap.timeline({ delay: prefersReduced ? 0 : 0.3 })

                // 1) Eyebrow
                tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", clearProps: "all" })
                // 2) Line 1
                tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", clearProps: "all" }, "-=0.2")
                // 3) Line 2 (slight overlap)
                tl.to(headlineBlueRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", clearProps: "all" }, "-=0.35")

                // 3) Aurum Gold rule draws in left→right
                tl.fromTo(goldRuleRef.current,
                    { scaleX: 0, transformOrigin: "left center" },
                    { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.inOut", clearProps: "transform" },
                    "-=0.35"
                )

                // 4) Subtext fades up
                tl.to(subtextRef.current, {
                    opacity: 1, y: 0,
                    duration: 0.5, ease: "power2.out",
                    clearProps: "all",
                }, "-=0.25")

                // 5) CTA row
                tl.to(ctaRowRef.current, {
                    opacity: 1, y: 0,
                    duration: 0.45, ease: "power2.out",
                    clearProps: "all",
                }, "-=0.3")

                // 6) Stats
                tl.to(statsRef.current, {
                    opacity: 1,
                    duration: 0.4, ease: "power1.out",
                    clearProps: "all",
                }, "-=0.2")
            }

            // ── Section reveals — bi-directional, pre-created tweens (no alloc on scroll) ──
            gsap.utils.toArray<HTMLElement>("[data-st-section]").forEach((section) => {
                // Create tween once — play() / reverse() are near-zero cost
                const tl = gsap.fromTo(section,
                    { opacity: 0, y: 22 },
                    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", paused: true }
                )
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 8%",
                    onEnter:      () => tl.play(),
                    onLeave:      () => tl.reverse(),
                    onEnterBack:  () => tl.play(),
                    onLeaveBack:  () => tl.reverse(),
                })

                // Stagger children once — play/reverse only
                const staggerEl = section.querySelector<HTMLElement>("[data-st-stagger]")
                if (staggerEl) {
                    const items = Array.from(staggerEl.children) as HTMLElement[]
                    const stl = gsap.fromTo(items,
                        { opacity: 0, y: 18 },
                        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out",
                          stagger: { amount: 0.35, from: "start" }, paused: true }
                    )
                    ScrollTrigger.create({
                        trigger: staggerEl,
                        start: "top 84%",
                        onEnter:     () => stl.play(),
                        onLeaveBack: () => stl.reverse(),
                        onEnterBack: () => stl.play(),
                    })
                }
            })

            // ── Gold bars — pre-created, play/reverse ─────────────────────────
            gsap.utils.toArray<HTMLElement>("[data-gold-bar]").forEach((bar, i) => {
                const btl = gsap.fromTo(bar,
                    { scaleY: 0, transformOrigin: "top center" },
                    { scaleY: 1, duration: 0.45, ease: "power2.out", delay: i * 0.05, paused: true }
                )
                ScrollTrigger.create({
                    trigger: bar,
                    start: "top 88%",
                    onEnter:     () => btl.play(),
                    onLeaveBack: () => btl.reverse(),
                    onEnterBack: () => btl.play(),
                })
            })

            // ── Case Studies card ─────────────────────────────────────────────
            const caseCard = document.querySelector<HTMLElement>("#case-studies article")
            if (caseCard) {
                const ctl = gsap.fromTo(caseCard,
                    { opacity: 0, scale: 0.97 },
                    { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", paused: true }
                )
                ScrollTrigger.create({
                    trigger: caseCard,
                    start: "top 82%",
                    end: "bottom 8%",
                    onEnter:     () => ctl.play(),
                    onLeave:     () => ctl.reverse(),
                    onEnterBack: () => ctl.play(),
                    onLeaveBack: () => ctl.reverse(),
                })
            }

        })

        // Re-measure after all DOM is settled (Lenis may not be ready on first run)
        const tid = setTimeout(() => ScrollTrigger.refresh(), 400)

        return () => {
            clearTimeout(tid)
            ctx.revert()
        }
    }, [hydrated, prefersReduced])

    // left tracker sections (IDs must exist below)
    const sectionsList: Milestone[] = [
        { id: "hero", label: "Hero" },
        { id: "trust", label: "Trusted By" },
        { id: "services", label: "Services" },
        { id: "why", label: "Why Revzion" },
        { id: "case-studies", label: "Case Studies" },
        { id: "stacks", label: "Tech Stacks" },
        { id: "cta", label: "Get Started" },
    ]

    // just under other hooks in HomePage()
    const [open, setOpen] = useState<null | string>(null);
// helpers to feed each column
    const leftValue  = open?.startsWith("L:") ? open.slice(2) : undefined;
    const rightValue = open?.startsWith("R:") ? open.slice(2) : undefined;

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Left milestone tracker (lg+) */}
            <ScrollMilestones sections={sectionsList} hideWhenInView="#site-footer" disableBelow={1024} topOffsetPx={96} />

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section
                id="hero"
                ref={heroRef}
                className="relative overflow-hidden bg-white min-h-screen flex items-center -mt-[72px] -mx-4 sm:-mx-6 lg:-mx-8"
            >
                {/* CSS mesh background for light hero */}
                <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Subtle dot grid */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: "radial-gradient(circle, rgba(11,18,32,0.055) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }} />
                    {/* Blue glow center */}
                    <div className="absolute inset-0" style={{
                        background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(37,99,235,0.06) 0%, transparent 70%)",
                    }} />
                    {/* Gold accent orb top-right */}
                    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)" }} />
                </div>

                {/* Hero content — parallax on scroll */}
                <motion.div
                    className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-44 text-center"
                    style={{ y: heroParallax }}
                >
                    {/* Eyebrow */}
                    <p
                        ref={eyebrowRef}
                        className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C9A227] mb-7"
                    >
                        Enterprise Technology Partner
                    </p>

                    {/* Headline — two separate refs so SplitText doesn't fight <br/> + <span> */}
                    <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-display font-semibold leading-[1.08] mb-5">
                        <div ref={headlineRef} className="block text-[#0B1220]">Enterprise platforms,</div>
                        <div ref={headlineBlueRef} className="block text-[#0B1220]">engineered to last.</div>
                    </h1>

                    {/* Aurum Gold rule — GSAP draws this in */}
                    <div
                        ref={goldRuleRef}
                        className="mx-auto mb-7 h-[2px] w-10 rounded-full bg-[#C9A227]"
                        aria-hidden
                    />

                    {/* Subtext */}
                    <p
                        ref={subtextRef}
                        className="text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto mb-10"
                    >
                        We design and build mission-critical software, AI systems, and cloud infrastructure
                        for organizations that can't afford to compromise on reliability.
                    </p>

                    {/* CTAs */}
                    <div ref={ctaRowRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <ConsultationCTA label="Start a Conversation" />
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="text-base px-8 py-3 border border-[#0B1220]/30 text-[#0B1220] hover:bg-[#0B1220]/5 bg-transparent transition-colors"
                        >
                            <Link href="/portfolio">See Our Work</Link>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div
                        ref={statsRef}
                        className="inline-flex items-center divide-x divide-[#0B1220]/10"
                    >
                        {[
                            { value: "50+",   label: "Projects Delivered" },
                            { value: "5.0",   label: "Client Rating" },
                            { value: "99.9%", label: "Uptime SLA" },
                        ].map((m) => (
                            <div key={m.label} className="px-8 text-center">
                                <div className="text-2xl font-sans font-bold text-[#0B1220]">{m.value}</div>
                                <div className="text-xs text-[#64748B] mt-1 tracking-wide">{m.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Single-row scrolling client ticker */}
                <div className="absolute bottom-8 inset-x-0" aria-hidden>
                    <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#64748B]/70 mb-4 font-semibold">
                        Trusted by teams at
                    </p>
                    <div className="ticker-wrap overflow-hidden">
                        <div className="flex w-max animate-ticker-l items-center">
                            {[0, 1].map((copy) => (
                                <div key={copy} className="flex items-center">
                                    {([
                                        { name: "EvolWe Ring", logo: "/case-studies/evolwe.png" },
                                        { name: "Rynox",       logo: "/case-studies/rynox.png" },
                                        { name: "Packagefy",   logo: null },
                                        { name: "BeeSocial",   logo: "/case-studies/beesocial.png" },
                                        { name: "Cognivia",    logo: "/case-studies/cognivia.png" },
                                        { name: "GrowthFuse",  logo: null },
                                        { name: "TechXellent", logo: "/logos/techxellent.svg" },
                                        { name: "HealthArc",   logo: null },
                                        { name: "Buildarc",    logo: null },
                                        { name: "Jetshift",    logo: null },
                                    ] as { name: string; logo: string | null }[]).map(({ name, logo }) => (
                                        <span key={name} className="flex items-center gap-8 px-2">
                                            <span className="flex items-center gap-2.5 cursor-default select-none group">
                                                {logo ? (
                                                    <Image
                                                        src={logo}
                                                        alt={name}
                                                        width={90}
                                                        height={36}
                                                        className="h-8 w-auto object-contain grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <span className="text-[16px] font-semibold text-[#0B1220]/60 whitespace-nowrap tracking-tight group-hover:text-[#2563EB] transition-colors duration-300">
                                                        {name}
                                                    </span>
                                                )}
                                            </span>
                                            <span className="text-[#C9A227]/70 text-[8px] shrink-0">◆</span>
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fade to paper at bottom — seamless transition to next section */}
                <div
                    aria-hidden
                    className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,1) 80%)" }}
                />
            </section>

            {/* Client Impact / Trust bar */}
            <TrustSection />
            {/* Services */}
            <section id="services" className="py-24 sm:py-32 bg-[#EEF1F6]" data-st-section>
                <motion.div
                    className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0 }}
                >
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227] mb-4">Capabilities</p>
                            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#0B1220] leading-tight">
                                What We Build
                            </h2>
                            <p className="text-[#64748B] mt-3 text-lg max-w-md">
                                Six core disciplines. Delivered end-to-end.
                            </p>
                        </div>
                        <Button asChild variant="outline" className="shrink-0 border-[#0B1220]/20 text-[#0B1220] hover:bg-[#0B1220] hover:text-white bg-white self-start sm:self-auto">
                            <Link href="/services">View all <ArrowRight className="h-4 w-4 ml-1" /></Link>
                        </Button>
                    </div>

                    {/* Bento grid — varying card sizes for visual rhythm */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3" data-st-stagger>
                        {/* Row 1: large (2-col) + small */}
                        <Link href="/services" className="md:col-span-2 bg-[#0B1220] rounded-2xl p-8 flex flex-col justify-between min-h-[220px] no-underline">
                            <div className="flex items-start justify-between">
                                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-[#2563EB]">
                                    <Code className="h-6 w-6" />
                                </div>
                                <span className="text-[11px] font-mono text-white/20 select-none">01</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Enterprise Software</h3>
                                <p className="text-sm text-white/50 leading-relaxed max-w-lg">Custom platforms built around your workflows — ERP, CRM, HRMS, procurement, and internal tooling built to run critical operations.</p>
                            </div>
                        </Link>

                        <Link href="/services" className="bg-white rounded-2xl p-8 flex flex-col justify-between min-h-[220px] no-underline border border-[#D4D9E1]">
                            <div className="flex items-start justify-between">
                                <div className="w-12 h-12 rounded-xl bg-[#EEF1F6] flex items-center justify-center text-[#2563EB]">
                                    <Brain className="h-6 w-6" />
                                </div>
                                <span className="text-[11px] font-mono text-[#0B1220]/20 select-none">02</span>
                            </div>
                            <div>
                                <h3 className="text-[16px] font-semibold text-[#0B1220] mb-2">AI & Automation</h3>
                                <p className="text-sm text-[#64748B] leading-relaxed">Assistants, knowledge systems, predictive analytics, and intelligent workflow engines.</p>
                            </div>
                        </Link>

                        {/* Row 2: small + large (2-col) */}
                        <Link href="/services" className="bg-[#2563EB] rounded-2xl p-8 flex flex-col justify-between min-h-[220px] no-underline">
                            <div className="flex items-start justify-between">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                                    <Layers className="h-6 w-6" />
                                </div>
                                <span className="text-[11px] font-mono text-white/30 select-none">03</span>
                            </div>
                            <div>
                                <h3 className="text-[16px] font-semibold text-white mb-2">SaaS Platforms</h3>
                                <p className="text-sm text-white/70 leading-relaxed">Multi-tenant SaaS with RBAC, billing, audit logs, and white-labelling.</p>
                            </div>
                        </Link>

                        <Link href="/services" className="md:col-span-2 bg-white rounded-2xl p-8 flex flex-col justify-between min-h-[220px] no-underline border border-[#D4D9E1]">
                            <div className="flex items-start justify-between">
                                <div className="w-12 h-12 rounded-xl bg-[#EEF1F6] flex items-center justify-center text-[#2563EB]">
                                    <Cloud className="h-6 w-6" />
                                </div>
                                <span className="text-[11px] font-mono text-[#0B1220]/20 select-none">04</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#0B1220] mb-2">Cloud & Infrastructure</h3>
                                <p className="text-sm text-[#64748B] leading-relaxed max-w-lg">Cloud-native architecture for reliability and scale — Kubernetes, CI/CD, IaC, platform modernization, and DevOps that your team can own.</p>
                            </div>
                        </Link>

                        {/* Row 3: two equal cards */}
                        <Link href="/services" className="bg-white rounded-2xl p-8 flex flex-col justify-between min-h-[200px] no-underline border border-[#D4D9E1]">
                            <div className="flex items-start justify-between">
                                <div className="w-12 h-12 rounded-xl bg-[#EEF1F6] flex items-center justify-center text-[#2563EB]">
                                    <Smartphone className="h-6 w-6" />
                                </div>
                                <span className="text-[11px] font-mono text-[#0B1220]/20 select-none">05</span>
                            </div>
                            <div>
                                <h3 className="text-[16px] font-semibold text-[#0B1220] mb-2">Mobile & Cross-Platform</h3>
                                <p className="text-sm text-[#64748B] leading-relaxed">Native-quality iOS and Android — React Native, Expo, and Kotlin Multiplatform.</p>
                            </div>
                        </Link>

                        <Link href="/services" className="md:col-span-2 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-2xl p-8 flex flex-col justify-between min-h-[200px] no-underline">
                            <div className="flex items-start justify-between">
                                <div className="w-12 h-12 rounded-xl bg-[#C9A227]/15 flex items-center justify-center text-[#C9A227]">
                                    <Database className="h-6 w-6" />
                                </div>
                                <span className="text-[11px] font-mono text-[#C9A227]/40 select-none">06</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#0B1220] mb-2">Data & Intelligence</h3>
                                <p className="text-sm text-[#64748B] leading-relaxed max-w-lg">Turn operational data into decisions — executive dashboards, data warehouses, KPI reporting, and forecasting platforms.</p>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </section>

            <BuildarcSection/>

            {/* Why Choose Us */}
            <section id="why" className="py-20 sm:py-28 bg-white" data-st-section>
                <motion.div
                    className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <div className="mb-14">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] mb-4">Our Approach</p>
                        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#0B1220] max-w-lg">Why organizations choose Revzion</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12" data-st-stagger>
                        {[
                            {
                                title: "Engineering-led from day one",
                                description: "Every engagement is run under senior engineering oversight. Your architecture isn't reviewed after the fact — it's built right the first time."
                            },
                            {
                                title: "We architect for years, not quarters",
                                description: "Our platforms are designed to grow with your operations. Security, scalability, and extensibility are built in — never bolted on later."
                            },
                            {
                                title: "AI embedded in workflows, not added as a feature",
                                description: "We integrate intelligence at the system level so your platform improves with every transaction, decision, and data point your organization generates."
                            },
                            {
                                title: "Security and compliance by design",
                                description: "SOC 2, GDPR, ZATCA, ISO 27001 — enterprise compliance requirements are part of our delivery process from the first commit, not a final audit."
                            },
                        ].map((item) => (
                            <motion.div key={item.title} whileHover={prefersReduced ? undefined : hoverCard}>
                                <div className="flex items-start space-x-4">
                                    <div data-gold-bar className="flex-shrink-0 w-1 h-12 bg-[#C9A227] rounded-full mt-1" />
                                    <div>
                                        <h3 className="text-lg font-sans font-semibold text-[#0B1220] mb-2">{item.title}</h3>
                                        <p className="text-[#64748B]">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Case Studies */}
            <CaseStudiesCarousel />

            {/* Tech Stacks */}
            <section id="stacks" className="py-20 relative overflow-hidden">
                {/* soft background */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
                    <div className="absolute -top-24 -right-24 w-[38rem] h-[38rem] rounded-full bg-[#2563EB] blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-[32rem] h-[32rem] rounded-full bg-[#EEF1F6] blur-3xl" />
                </div>

                <motion.div
                    className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    {/* header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] mb-3">Engineering Stack</p>
                        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#0B1220] mb-3">
                            How We Build
                        </h2>
                        <p className="text-lg sm:text-xl text-[#64748B] max-w-3xl mx-auto">
                            We select tools that are fast, secure, and proven at enterprise scale — combined with the patterns that make them reliable in production.
                        </p>

                        {/* category badges */}
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                            {["Performance-first", "Security & Compliance", "DX that scales", "Cloud-native"].map((b) => (
                                <span key={b} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
            {b}
          </span>
                            ))}
                        </div>
                    </div>

                    {/* two-column accordions */}
                    {/* two-column accordions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* LEFT */}
                        <Accordion
                            type="single"
                            collapsible
                            value={leftValue}
                            onValueChange={(v) => setOpen(v ? `L:${v}` : null)}
                            className="w-full rounded-2xl shadow-sm border border-gray-100 bg-white/70 backdrop-blur"
                        >
                            {/* Frontend Technologies */}
                            <AccordionItem value="frontend">
                                <AccordionTrigger className="px-6 text-left">
                                    <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF1F6] text-[#2563EB]">
            {"</>"}
          </span>
                                        <span className="font-semibold">Frontend Technologies</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Component-driven UIs with accessibility and performance baked in. Ship SSR/SSG/ISR
                                        with great Core Web Vitals and minimal bundles.
                                    </p>

                                    {/* We use it for */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">We use it for</h4>
                                        <ul className="space-y-1.5 text-sm text-gray-600">
                                            {[
                                                "Design systems & theming",
                                                "App Router SSR/ISR + edge streaming",
                                                "Animations & micro-interactions",
                                            ].map((li) => (
                                                <li key={li} className="flex items-center">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" /> {li}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Primary stack */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Primary stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "React",
                                                "Next.js (App Router)",
                                                "TypeScript",
                                                "Tailwind CSS",
                                                "React Native",
                                                "Expo",
                                                "Vite",
                                            ].map((t) => (
                                                <motion.span
                                                    key={t}
                                                    whileHover={{ scale: 1.04 }}
                                                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium"
                                                >
                                                    {t}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Often paired with */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Often paired with</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Zustand / Redux", "React Query", "Next Image/CDN", "Framer Motion", "shadcn/ui"].map(
                                                (t) => (
                                                    <span
                                                        key={t}
                                                        className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs border border-gray-200"
                                                    >
                  {t}
                </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Confidence */}
                                    <div>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                            <span>Confidence</span>
                                            <span>Expert</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                                            <div className="h-full w-[92%] bg-gradient-revzion" />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Mobile, PWA & Performance */}
                            <AccordionItem value="mobile-webperf">
                                <AccordionTrigger className="px-6 text-left">
                                    <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF1F6] text-[#2563EB]">
            <Zap className="h-4 w-4" />
          </span>
                                        <span className="font-semibold">Mobile, PWA & Performance</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Cross-platform reach with offline-first patterns and Lighthouse-friendly builds.
                                    </p>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">We use it for</h4>
                                        <ul className="space-y-1.5 text-sm text-gray-600">
                                            {["Add-to-Home PWA", "Background sync", "Perf budgets & RUM"].map((li) => (
                                                <li key={li} className="flex items-center">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" /> {li}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Primary tools</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["PWA", "Workbox", "Web Animations", "Framer Motion", "Lighthouse CI", "React Query"].map(
                                                (t) => (
                                                    <motion.span
                                                        key={t}
                                                        whileHover={{ scale: 1.04 }}
                                                        className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium"
                                                    >
                                                        {t}
                                                    </motion.span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                            <span>Confidence</span>
                                            <span>Advanced</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                                            <div className="h-full w-[88%] bg-gradient-revzion" />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Design Systems & Accessibility */}
                            <AccordionItem value="design-accessibility">
                                <AccordionTrigger className="px-6 text-left">
                                    <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF1F6] text-[#2563EB]">
            <Layers className="h-4 w-4" />
          </span>
                                        <span className="font-semibold">Design Systems & Accessibility</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Maintainable component libraries with tokens, dark mode, and WCAG-compliant UX.
                                    </p>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">We use it for</h4>
                                        <ul className="space-y-1.5 text-sm text-gray-600">
                                            {["Theming & tokens", "A11y audits (WCAG 2.2)", "Docs & Storybook"].map((li) => (
                                                <li key={li} className="flex items-center">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" /> {li}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Primary stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Tailwind CSS", "shadcn/ui", "Radix Primitives", "Storybook", "Figma"].map((t) => (
                                                <motion.span
                                                    key={t}
                                                    whileHover={{ scale: 1.04 }}
                                                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium"
                                                >
                                                    {t}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                            <span>Confidence</span>
                                            <span>Advanced</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                                            <div className="h-full w-[87%] bg-gradient-revzion" />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* RIGHT */}
                        <Accordion
                            type="single"
                            collapsible
                            value={rightValue}
                            onValueChange={(v) => setOpen(v ? `R:${v}` : null)}
                            className="w-full rounded-2xl shadow-sm border border-gray-100 bg-white/70 backdrop-blur"
                        >
                            <AccordionItem value="backend">
                                <AccordionTrigger className="px-6 text-left">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF1F6] text-[#2563EB]"><Code className="h-4 w-4" /></span>
                                        <span className="font-semibold">Backend & APIs</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Reliable services with clean contracts, validations, and strong observability.
                                    </p>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">We use it for</h4>
                                        <ul className="space-y-1.5 text-sm text-gray-600">
                                            {["Multi-tenant SaaS", "Billing & webhooks", "Auth (JWT/OAuth)"].map((li) => (
                                                <li key={li} className="flex items-center">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" /> {li}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Primary stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Node.js", "tRPC / REST", "Webhooks", "GraphQL", "Zod", "JWT/OAuth", "Rate limiting"].map((t) => (
                                                <motion.span key={t} whileHover={{ scale: 1.04 }} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                                                    {t}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                            <span>Confidence</span>
                                            <span>Expert</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                                            <div className="h-full w-[93%] bg-gradient-revzion" />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="data-cloud">
                                <AccordionTrigger className="px-6 text-left">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF1F6] text-[#2563EB]"><Cloud className="h-4 w-4" /></span>
                                        <span className="font-semibold">Data, Cloud & DevOps</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Scale safely with IaC, observability, cost controls, and zero-downtime deploys.
                                    </p>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Primary stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["PostgreSQL", "Redis", "Neon/Supabase", "S3", "CI/CD (GH Actions)", "Docker", "Kubernetes", "Terraform", "OpenTelemetry"].map((t) => (
                                                <motion.span key={t} whileHover={{ scale: 1.04 }} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                                                    {t}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">We monitor</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["Error Budget", "P95 latency", "Throughput", "Cost per tenant"].map((m) => (
                                                <span key={m} className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs border border-gray-200">
                {m}
              </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                            <span>Confidence</span>
                                            <span>Advanced</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                                            <div className="h-full w-[89%] bg-gradient-revzion" />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="ai">
                                <AccordionTrigger className="px-6 text-left">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF1F6] text-[#2563EB]"><Brain className="h-4 w-4" /></span>
                                        <span className="font-semibold">AI & Automation</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Practical AI that ships: copilots, RAG pipelines, and workflow automation.
                                    </p>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Primary stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["OpenAI / Groq / xAI", "Embeddings", "Vector DB", "RAG", "LangChain", "Workers/Queues"].map((t) => (
                                                <motion.span key={t} whileHover={{ scale: 1.04 }} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                                                    {t}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                            <span>Confidence</span>
                                            <span>Advanced</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                                            <div className="h-full w-[86%] bg-gradient-revzion" />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* tool strip */}
                    <div className="mt-12">
                        <div className="rounded-2xl border border-gray-100 bg-white/60 backdrop-blur px-5 py-4">
                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                                {[
                                    "Next.js", "TypeScript", "Tailwind", "React Query", "tRPC", "GraphQL",
                                    "PostgreSQL", "Redis", "Neon", "S3", "Docker", "Terraform", "Kubernetes",
                                ].map((t) => (
                                    <span key={t} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        {t}
            </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-10 text-center">
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                            See how we pick the right stack for your use case
                            <span className="ml-2">→</span>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-24 sm:py-32 bg-white" data-st-section>
                <motion.div
                    className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    <div className="text-center mb-14">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227] mb-4">FAQ</p>
                        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[#0B1220] mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[#64748B]">Everything you need to know before we start building together.</p>
                    </div>

                    <Accordion type="single" collapsible className="w-full divide-y divide-[#EEF1F6]">
                        {[
                            {
                                q: "What services does Revzion offer?",
                                a: "Revzion delivers enterprise software engineering across six disciplines: SaaS platform development, AI & automation systems, mobile & cross-platform apps (Kotlin Multiplatform, React Native), cloud & DevOps infrastructure, data & intelligence platforms, and custom enterprise software (ERP, CRM, HRMS).",
                            },
                            {
                                q: "How long does it take to build a software product?",
                                a: "A typical MVP takes 8–14 weeks from signed scope to production. A full-featured platform is 4–6 months. We ship in weekly vertical slices with working demos each sprint, so you see real progress from week one.",
                            },
                            {
                                q: "Do you work with startups or enterprises?",
                                a: "Both. Startups get a senior team that moves fast, keeps scope tight, and builds for scale from day one. Enterprises get structured delivery, compliance-aware architecture, and deep integration experience. We adapt our process to your stage.",
                            },
                            {
                                q: "What does a typical engagement look like?",
                                a: "We start with a focused Discovery session (1–2 weeks) to lock in scope, risks, and success metrics. Then we build in weekly sprints with demos, changelogs, and a burndown you can watch in real time. After launch, we stay on for operate & scale.",
                            },
                            {
                                q: "What technologies does Revzion specialise in?",
                                a: "Our core stack: Next.js, React, TypeScript, Node.js on the web; Kotlin Multiplatform (KMP), Swift/SwiftUI, Jetpack Compose for mobile; AWS, GCP, Vercel, Kubernetes for cloud; PostgreSQL, Redis, vector databases for data. We also build with LLMs (OpenAI, Anthropic, Groq) and agentic pipelines.",
                            },
                            {
                                q: "How does pricing work?",
                                a: "We work on fixed-scope projects and retainer-based engagements. Fixed scope gives you a locked estimate after Discovery. Retainers give you a dedicated team at a monthly rate with flexible priorities. Use the Estimate page for a rough range, or contact us directly for a detailed quote.",
                            },
                            {
                                q: "Where is Revzion located and which time zones do you cover?",
                                a: "Headquartered in Jhansi, Uttar Pradesh, India. We serve clients across the US, UK, Europe, Middle East, and South Asia. Our team is distributed and structured for async-first collaboration, with overlap windows for real-time calls across most time zones.",
                            },
                            {
                                q: "What is Kotlin Multiplatform and why does Revzion use it?",
                                a: "Kotlin Multiplatform (KMP) lets us share 60–80% of business logic, networking, and data layers between iOS and Android, while keeping fully native UI on each platform. The result: faster development, cheaper maintenance, native performance — no compromises.",
                            },
                        ].map(({ q, a }, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border-0 py-1">
                                <AccordionTrigger className="text-left text-[15px] font-semibold text-[#0B1220] hover:text-[#2563EB] hover:no-underline py-5 transition-colors duration-200 [&[data-state=open]]:text-[#2563EB]">
                                    {q}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#64748B] leading-relaxed pb-5 text-[15px]">
                                    {a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="mt-10 text-center">
                        <p className="text-sm text-[#64748B]">
                            Still have questions?{" "}
                            <Link href="/contact" className="text-[#2563EB] font-semibold hover:underline">
                                Talk to our team →
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* CTA */}
            <section id="cta" className="py-20 bg-[#0B1220]">
                <motion.div
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227] mb-6">Start a conversation</p>
                    <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white mb-6">
                        Let's build the platform your operations depend on.
                    </h2>
                    <p className="text-lg text-[#64748B] mb-8 max-w-2xl mx-auto">
                        Talk directly with our team about your technical requirements. No discovery calls, no sales decks — just a focused conversation about what you need to build.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" variant="secondary" className="bg-white text-[#0B1220] hover:bg-[#EEF1F6] text-lg px-8 py-3 font-semibold">
                            <Link href="/contact">Start the Conversation</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border border-white/20 text-white hover:bg-white/10 text-lg px-8 py-3 bg-transparent"
                        >
                            <Link href="/portfolio">View Our Work</Link>
                        </Button>
                    </div>
                </motion.div>
            </section>

            <Footer />
            <SoundToggle />
        </div>
    )
}