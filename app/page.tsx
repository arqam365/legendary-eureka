"use client"

import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script" // ⬅️ ADDED
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
            id: "beesocial",
            title: "BeeSocial – Social Media App",
            kind: "mobile",
            problem: "Low engagement and high churn.",
            solution: "Rebuilt feed ranking, real-time chat, and creator tools.",
            results: "+42% DAU, 29% session length, 18% retention.",
            images: {
                mobile: "/case-studies/beesocial.png"
            },
            link: "/portfolio/beesocial",
            tags: ["Discovery → MVP → Scale", "Design Systems", "Observability"],
            kpis: [
                { label: "DAU", value: "+42%" },
                { label: "Session", value: "+29%" },
                { label: "Retention", value: "+18%" },
            ],
            clients: [
                { name: "GreenLeaf", logo: "/logos/clients/greenleaf.svg" },
                { name: "Northwave", logo: "/logos/clients/northwave.svg" },
                { name: "Aster", logo: "/logos/clients/aster.svg" },
            ],
        },
        {
            id: "rynox",
            title: "Rynox – Enterprise Billing Platform",
            kind: "web",
            problem: "Disconnected billing systems and limited visibility across franchise locations.",
            solution: "Centralized billing, pricing controls, and real-time analytics for multi-location businesses.",
            results: "3× faster reporting, 40% fewer billing errors, 25% operational cost reduction.",
            images: {
                desktop: "/case-studies/rynox.jpeg"
            },
            link: "/portfolio/rynox",
            tags: ["Enterprise SaaS", "Franchise Ops", "Billing & Analytics"],
            kpis: [
                { label: "Reporting Speed", value: "3× faster" },
                { label: "Billing Errors", value: "−40%" },
                { label: "Operational Cost", value: "−25%" },
            ],
            clients: [
                { name: "Franchise Networks", logo: "/logos/clients/franchise.svg" },
                { name: "Service Brands", logo: "/logos/clients/service.svg" },
                { name: "Retail Chains", logo: "/logos/clients/retail.svg" },
            ],
        },
        {
            id: "evolve-ring",
            title: "Evolve – Smart Ring Companion App",
            kind: "mobile",
            problem: "Health data from wearable devices was fragmented, delayed, and hard for users to understand.",
            solution: "Built a cross-platform companion app with real-time BLE sync, health insights, and device management.",
            results: "2× faster data sync, 35% higher daily engagement, 99.9% device sync reliability.",
            images: {
                mobile: "/case-studies/evolwe.jpeg"
            },
            link: "/portfolio/evolve-ring",
            tags: ["Wearable Tech", "BLE", "Health Analytics", "Kotlin Multiplatform"],
            kpis: [
                { label: "Sync Speed", value: "2× faster" },
                { label: "Daily Engagement", value: "+35%" },
                { label: "Sync Reliability", value: "99.9%" },
            ],
            clients: [
                { name: "Wearable OEMs", logo: "/logos/clients/oem.svg" },
                { name: "Health Tech Brands", logo: "/logos/clients/health.svg" },
                { name: "Consumer Fitness", logo: "/logos/clients/fitness.svg" },
            ],
        },
        {
            id: "hellocloud",
            title: "HelloCloud – Skincare Brand for Indian Skin",
            kind: "web",
            problem: "Generic skincare products failed to suit Indian skin and climate.",
            solution: "Launched dermatologist-tested serums with targeted active ingredients.",
            results: "91% clearer skin in 4 weeks, 88% fewer breakouts, 92% long-lasting hydration. ",
            images: {
                desktop: "/case-studies/hellocloud.jpeg"
            },
            link: "/portfolio/hellocloud",
            tags: ["Dermatologist-Tested", "Skin Balance", "Climate-Smart"],
            kpis: [
                { label: "Clearer Skin", value: "91% users" },
                { label: "Breakouts Reduced", value: "88% users" },
                { label: "Hydration Satisfaction", value: "92% users" },
            ],
            clients: [
                { name: "Young Professionals", logo: "/logos/clients/professionals.svg" },
                { name: "College Goers", logo: "/logos/clients/college.svg" },
                { name: "Skincare Enthusiasts", logo: "/logos/clients/enthusiasts.svg" },
            ],
        }
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
        <section id="case-studies" className="py-16 sm:py-20 bg-gray-50" data-st-section>
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
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">Case Studies</h2>
                        <p className="text-gray-600 text-base sm:text-lg">Proof over promises.</p>
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
    },
    {
        name: "Hello Cloud",
        url: "https://www.hellocloud.co.in",
        description: "E-commerce platform for Skin Care",
    },
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
                className="absolute -top-6 -right-6 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-revzion rounded-full opacity-10 blur-3xl pointer-events-none z-0"
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
            className="pointer-events-none absolute top-0 left-0 z-0 rounded-full bg-gradient-revzion blur-3xl md:blur-[48px] mix-blend-multiply"
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
    const blobShift = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -30])

    const splitRef = useRef<HTMLSpanElement>(null)
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true) // only run after hydration
    }, [])

    useLayoutEffect(() => {
        if (!hydrated) return

        const ctx = gsap.context(() => {
            // 1) Hero headline (SplitText)
            if (splitRef.current) {
                const split = new SplitText(splitRef.current, { type: "words,chars" })
                gsap.set(split.chars, { opacity: 0, y: 60, rotateX: -90 })

                ScrollTrigger.create({
                    trigger: splitRef.current,
                    start: "top 65%",
                    once: true,
                    onEnter: () => {
                        gsap.to(split.chars, {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            stagger: 0.04,
                        })
                    },
                })
            }

            // 2) Fade/slide each section when it scrolls in
            gsap.utils.toArray<HTMLElement>("[data-st-section]").forEach((section) => {
                gsap.set(section, { opacity: 0, y: 24 })

                ScrollTrigger.create({
                    trigger: section,
                    start: "top 75%",
                    once: true,
                    onEnter: () => {
                        gsap.to(section, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
                    },
                })

                // 3) Optional stagger for inner grid/cards
                const container = section.querySelector<HTMLElement>("[data-st-stagger]")
                const items = container ? Array.from(container.children) : []

                if (items.length) {
                    gsap.set(items, { opacity: 0, y: 18 })
                    ScrollTrigger.create({
                        trigger: container!,
                        start: "top 80%",
                        once: true,
                        onEnter: () => {
                            gsap.to(items, {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                ease: "power2.out",
                                stagger: 0.08,
                            })
                        },
                    })
                }
            })
        })

        return () => ctx.revert()
    }, [hydrated])

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

            {/* Hero */}
            <section
                id="hero"
                ref={heroRef}
                className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50"
            >
                <motion.div
                    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* LEFT */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight">
                                    <span ref={splitRef}>Innovating Products</span>{" "}
                                    <span className="text-gradient-revzion">Empowering Businesses.</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                                    Revzion builds scalable SaaS, AI, and cross-platform solutions for startups and enterprises.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center sm:justify-start items-stretch sm:items-center w-full max-w-2xl mx-auto">
                                <ConsultationCTA label="Free Consultation" />
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="text-base sm:text-lg px-6 sm:px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent flex items-center justify-center w-full sm:w-auto"
                                >
                                    <Link href="/services" className="flex items-center">
                                        Explore Services
                                    </Link>
                                </Button>
                            </div>

                            <div className="flex items-center space-x-8 pt-4">
                                {[
                                    { value: "50+", label: "Projects Delivered" },
                                    { value: "100%", label: "Client Satisfaction" },
                                    { value: "24/7", label: "Support" },
                                ].map((m) => (
                                    <motion.div key={m.label} whileHover={prefersReduced ? undefined : hoverCard} className="text-center">
                                        <div className="text-2xl font-heading font-bold text-gray-900">{m.value}</div>
                                        <div className="text-sm text-gray-600">{m.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Interactive mockups */}
                        <div className="relative isolate z-10">
                            <ProductShowcase blobShift={blobShift} />
                        </div>
                    </div>
                </motion.div>

                {/* 👇 brand-themed mouse-follow glow (behind content) */}
                <BrandCursorGlow containerRef={heroRef as React.RefObject<HTMLElement>} size={320} opacity={0.24} />
            </section>

            {/* Client Impact / Trust bar */}
            <TrustSection />
            {/*<section id="trust" className="bg-white">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">*/}
            {/*        <div className="rounded-2xl border border-gray-100 bg-gray-50/60 backdrop-blur-sm px-6 py-5">*/}
            {/*            <div className="flex flex-col md:flex-row items-center justify-between gap-6">*/}
            {/*                <p className="text-sm text-gray-600">*/}
            {/*                    Trusted by teams shipping <span className="font-semibold text-gray-900">50+ projects</span> across{" "}*/}
            {/*                    <span className="font-semibold text-gray-900">5+ countries</span>*/}
            {/*                </p>*/}

            {/*                /!* Client names with links *!/*/}
            {/*                <div className="flex items-center gap-6 transition">*/}
            {/*                    <a*/}
            {/*                        href="https://evolwering.com"*/}
            {/*                        target="_blank"*/}
            {/*                        rel="noopener noreferrer"*/}
            {/*                        className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors"*/}
            {/*                    >*/}
            {/*                        EvolWe*/}
            {/*                    </a>*/}
            {/*                    <a*/}
            {/*                        href="https://hellocloud.co.in"*/}
            {/*                        target="_blank"*/}
            {/*                        rel="noopener noreferrer"*/}
            {/*                        className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors"*/}
            {/*                    >*/}
            {/*                        HelloCloud*/}
            {/*                    </a>*/}
            {/*                    <a*/}
            {/*                        href="https://rynox.io"*/}
            {/*                        target="_blank"*/}
            {/*                        rel="noopener noreferrer"*/}
            {/*                        className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors"*/}
            {/*                    >*/}
            {/*                        Rynox*/}
            {/*                    </a>*/}
            {/*                    <a*/}
            {/*                        href="#"*/}
            {/*                        className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-default pointer-events-none"*/}
            {/*                    >*/}
            {/*                        Packagefy*/}
            {/*                    </a>*/}
            {/*                    <a*/}
            {/*                        href="#"*/}
            {/*                        className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-default pointer-events-none"*/}
            {/*                    >*/}
            {/*                        BeeSocial*/}
            {/*                    </a>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* Services */}
            <section id="services" className="py-20 bg-gray-50" data-st-section>
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">What We Do Best</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From cutting-edge AI solutions to scalable SaaS platforms, we deliver technology that drives your business forward.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-st-stagger>
                        {[
                            {
                                icon: <Code className="h-8 w-8" />,
                                title: "Custom Development",
                                description: "Tailored solutions built with modern technologies to meet your unique business requirements.",
                                stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "React", "GraphQL"],
                            },
                            {
                                icon: <Brain className="h-8 w-8" />,
                                title: "AI & Automation",
                                description: "Intelligent systems that streamline operations and unlock new possibilities for growth.",
                                stack: ["AI SDK", "OpenAI", "Groq", "xAI", "Vector DB", "Embeddings", "Workers", "Queues", "LangChain"],
                            },
                            {
                                icon: <Zap className="h-8 w-8" />,
                                title: "No-Code Solutions",
                                description: "Rapid application development across all global platforms—from Shopify to Salla and beyond. We work with every regional platform, not just a few.",
                                stack: ["Shopify", "WooCommerce", "Salla", "Zid", "Webflow", "Bubble", "Wix", "Squarespace", "Framer", "Airtable", "Make", "Zapier", "n8n", "Glide", "Flutterflow", "All Regions"],
                            },
                            {
                                icon: <TrendingUp className="h-8 w-8" />,
                                title: "Consulting",
                                description: "Strategic guidance to help you make informed technology decisions and accelerate your digital transformation.",
                                stack: ["Architecture", "Tech Stack", "Migrations", "Performance", "Security", "Scalability", "Roadmapping", "Team Building"],
                            },
                            {
                                icon: <Layers className="h-8 w-8" />,
                                title: "SaaS Solutions",
                                description: "Scalable software-as-a-service platforms designed for rapid deployment and growth.",
                                stack: ["Multi-tenant", "RBAC", "Stripe Billing", "Webhooks", "Audit Logs", "Analytics", "API Design", "White-label"],
                            },
                            {
                                icon: <Cloud className="h-8 w-8" />,
                                title: "Cloud & DevOps",
                                description: "Secure, reliable infrastructure that scales with your business needs.",
                                stack: ["Vercel", "AWS", "Neon", "Supabase", "Docker", "CI/CD", "Monitoring", "Observability", "RLS"],
                            },
                            {
                                icon: <Smartphone className="h-8 w-8" />,
                                title: "Mobile & Web Apps",
                                description: "Cross-platform applications that deliver exceptional user experiences on any device.",
                                stack: ["React Native", "Expo", "Kotlin MP", "PWA", "Jetpack Compose", "Offline-first", "App Store", "Play Store"],
                            },
                            {
                                icon: <Database className="h-8 w-8" />,
                                title: "Data & Analytics",
                                description: "Transform raw data into actionable insights with modern data pipelines and visualization tools.",
                                stack: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Drizzle", "Data Pipelines", "Dashboards", "BigQuery"],
                            },
                            {
                                icon: <Shield className="h-8 w-8" />,
                                title: "Security & Compliance",
                                description: "Protect your digital assets with enterprise-grade security implementations and compliance frameworks.",
                                stack: ["Authentication", "OAuth", "JWT", "Encryption", "GDPR", "SOC 2", "Penetration Testing", "Audit Trails"],
                            },
                        ].map((service, index) => (
                            <motion.div
                                key={service.title}
                                whileHover={prefersReduced ? undefined : hoverCard}
                                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                            >
                                <Card className="group border-0 shadow-md hover:shadow-lg transition-shadow h-full">
                                    <CardContent className="p-8 flex flex-col h-full">
                                        {/* Icon */}
                                        <motion.div
                                            className="text-primary mb-4"
                                            whileHover={prefersReduced ? undefined : hoverIcon}
                                        >
                                            {service.icon}
                                        </motion.div>

                                        {/* Title + description */}
                                        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                                            {service.description}
                                        </p>

                                        {/* Accordion stays pinned at bottom */}
                                        <Accordion type="single" collapsible className="mt-auto">
                                            <AccordionItem value={`stack-${index}`}>
                                                <AccordionTrigger className="text-left text-primary font-medium hover:no-underline">
                                                    View Tech Stack
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="flex flex-wrap gap-2">
                                                        {service.stack.map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs"
                                                                aria-label={`Technology ${tech}`}
                                                            >
                {tech}
              </span>
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <BuildarcSection/>

            {/* Why Choose Us */}
            <section id="why" className="py-20 bg-white" data-st-section>
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-8">Why Choose Revzion?</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-st-stagger>
                        {[
                            { title: "Proven Expertise", description: "Years of experience delivering successful projects across various industries and technologies." },
                            { title: "Agile Approach", description: "Fast, iterative development process that adapts to your changing needs and market demands." },
                            { title: "End-to-End Solutions", description: "From concept to deployment and beyond, we handle every aspect of your project lifecycle." },
                            { title: "Future-Ready Technology", description: "We use cutting-edge tools and frameworks to ensure your solutions remain competitive." },
                        ].map((item) => (
                            <motion.div key={item.title} whileHover={prefersReduced ? undefined : hoverCard}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-revzion rounded-full flex items-center justify-center mt-1">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
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
                <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
                    <div className="absolute -top-24 -right-24 w-[38rem] h-[38rem] rounded-full bg-gradient-revzion blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-[32rem] h-[32rem] rounded-full bg-blue-200 blur-3xl" />
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
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-3">
                            Our Tech Stacks
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            We pick tools that are fast, secure, and scalable—then combine them with the right
                            patterns so your product ships reliably and grows safely.
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
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-primary">
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
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-primary">
            ⚡
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
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-primary">
            🎨
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
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-primary">🛠️</span>
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
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-primary">☁️</span>
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
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-primary">🧠</span>
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

            {/* CTA */}
            <section id="cta" className="py-20 bg-gradient-revzion">
                <motion.div
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can help you build innovative solutions that drive growth and success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
                            <Link href="/contact">Start Your Project</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3 bg-transparent"
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