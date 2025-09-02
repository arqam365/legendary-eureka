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
  type Variants,
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
  Star,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ConsultationCTA } from "@/components/consultation-cta"
import SoundToggle from "@/components/SoundToggle"
import ScrollMilestones, { type Milestone } from "@/components/scroll-milestones"

// gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)

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
  image: string
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
      problem: "Low engagement and high churn.",
      solution: "Rebuilt feed ranking, real-time chat, and creator tools.",
      results: "+42% DAU, 29% session length, 18% retention.",
      image: "/case-studies/beesocial.jpg",
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
      id: "finlytics",
      title: "Finlytics – Analytics SaaS",
      problem: "Complex reporting slowed decisions.",
      solution: "Built multi-tenant dashboards, alerts, and ETL pipelines.",
      results: "3× faster insights, 35% conversion lift, NPS +14.",
      image: "/case-studies/finlytics.jpg",
      link: "/portfolio/finlytics",
      tags: ["Multi-tenant", "Dashboards", "ETL Pipelines"],
      kpis: [
        { label: "Insights", value: "3× faster" },
        { label: "Conversion", value: "+35%" },
        { label: "NPS", value: "+14" },
      ],
      clients: [
        { name: "Fiscus", logo: "/logos/clients/fiscus.svg" },
        { name: "BlueRock", logo: "/logos/clients/bluerock.svg" },
        { name: "Helios", logo: "/logos/clients/helios.svg" },
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
      <section id="case-studies" className="py-20 bg-gray-50" data-st-section>
        <motion.div
            className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8"
            variants={revealOnce}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
        >
          {/* header */}
          <div className="flex items-end justify-between mb-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">Case Studies</h2>
              <p className="text-gray-600 text-lg">Proof over promises.</p>
            </div>
            <div className="hidden md:flex gap-3">
              <Button variant="outline" onClick={prev} aria-label="Previous" title="Previous case study">←</Button>
              <Button onClick={next} aria-label="Next" title="Next case study">→</Button>
            </div>
          </div>

          {/* slide */}
          <div
              className="relative h-[560px] flex items-center justify-center"
              aria-roledescription="carousel"
              aria-label="Case studies"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
          >
            <AnimatePresence mode="wait">
              <motion.article
                  key={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute w-full max-w-5xl rounded-3xl border border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* visual */}
                  <div className="relative lg:col-span-2">
                    <motion.img
                        src={s.image}
                        alt={s.title}
                        className="h-full w-full object-cover lg:min-h-[560px]"
                        whileHover={prefersReduced ? undefined : hoverIcon}
                        transition={{ duration: 0.35 }}
                    />
                    {/* soft fade at edge */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/80 to-transparent" />
                  </div>

                  {/* content */}
                  <div className="lg:col-span-3 p-8 lg:p-10">
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-sm font-medium">Case Study</span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-gray-900">
                      {s.title}
                    </h3>

                    <div className="mt-5 space-y-3 text-gray-700 leading-relaxed">
                      <p><span className="font-semibold text-gray-900">Problem:</span> {s.problem}</p>
                      <p><span className="font-semibold text-gray-900">Solution:</span> {s.solution}</p>
                      <p><span className="font-semibold text-gray-900">Results:</span> {s.results}</p>
                    </div>

                    <Link
                        href={s.link || "/portfolio"}
                        className="inline-flex items-center text-primary font-medium hover:underline mt-6"
                    >
                      View case study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>

                    {/* enhanced detail bar */}
                    <div className="relative mt-8 rounded-2xl border border-white/60 bg-white/50 backdrop-blur-xl overflow-hidden">
                      {/* animated shine on hover */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute -inset-x-20 -top-1/2 h-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-5">
                        {/* clients */}
                        {s.clients?.length ? (
                            <div className="lg:col-span-2">
                              <div className="flex items-center gap-2 text-gray-700 mb-2">
                                <Building2 className="h-4 w-4 text-primary" />
                                <span className="text-xs font-medium uppercase tracking-wide">Trusted by</span>
                              </div>

                              <div className="relative">
                                <div className="flex gap-5 overflow-hidden group">
                                  <div className="flex gap-5 animate-[marquee_18s_linear_infinite] group-hover:[animation-play-state:paused]">
                                    {s.clients.concat(s.clients).map((c, i) => (
                                        <div key={c.name + i} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition">
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

                        {/* tags */}
                        {s.tags?.length ? (
                            <div className="lg:col-span-2">
                              <div className="flex items-center gap-2 text-gray-700 mb-2">
                                <Star className="h-4 w-4 text-primary" />
                                <span className="text-xs font-medium uppercase tracking-wide">Highlights</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {s.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs border border-gray-200"
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
                              <div className="text-xs font-medium uppercase tracking-wide text-gray-700 mb-2">Impact</div>
                              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
                                {s.kpis.map(kpi => (
                                    <div
                                        key={kpi.label}
                                        className="rounded-xl bg-white/70 border border-white/70 px-3 py-2 text-center shadow-sm"
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
                </div>
              </motion.article>
            </AnimatePresence>

            {/* arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 lg:px-4">
              <Button variant="outline" size="icon" onClick={prev} aria-label="Previous slide" title="Previous slide">←</Button>
              <Button variant="outline" size="icon" onClick={next} aria-label="Next slide" title="Next slide">→</Button>
            </div>
          </div>

          {/* dots */}
          <div className="mt-8 flex items-center justify-center gap-2" aria-live="polite">
            {studies.map((_, i) => (
                <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all ${i === active ? "bg-primary w-6" : "bg-gray-300 w-2.5 hover:bg-gray-400"}`}
                />
            ))}
          </div>

          <div className="flex items-center justify-center mt-6">
            <Button asChild size="lg" variant="outline" className="px-6 py-3">
              <Link href="/portfolio">View More</Link>
            </Button>
          </div>
        </motion.div>

        {/* marquee keyframes (Tailwind inline) */}
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

type ShowcaseProps = { blobShift: MotionValue<number> }

function ProductShowcase({ blobShift }: ShowcaseProps) {
  const desktopShots = useMemo(
      () => [
        { src: "/shots/dashboard-dark.png", alt: "SaaS dashboard" },
        { src: "/shots/analytics.png", alt: "Analytics & reports" },
        { src: "/shots/settings.png", alt: "Admin & settings" },
      ],
      []
  )
  const mobileShots = useMemo(
      () => [
        { src: "/shots/mobile-chat.png", alt: "Chat & realtime" },
        { src: "/shots/mobile-feed.png", alt: "Social feed" },
        { src: "/shots/mobile-profile.png", alt: "Profile" },
      ],
      []
  )

  const desk = useCarousel(desktopShots.length, 5000)
  const mob = useCarousel(mobileShots.length, 5000)
  const prefersReduced = useReducedMotion()

  // tilt only on non-touch + reducedMotion=false
  const [canTilt, setCanTilt] = useState(false)
  useEffect(() => {
    const isTouch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    setCanTilt(!isTouch && !prefersReduced)
  }, [prefersReduced])

  // which frame is on top (desktop vs phone) for sm+ layout
  const [topView, setTopView] = useState<"desktop" | "mobile">("desktop")
  useEffect(() => {
    const id = setInterval(
        () => setTopView(v => (v === "desktop" ? "mobile" : "desktop")),
        5000
    )
    return () => clearInterval(id)
  }, [])

  // tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useTransform(y, [-50, 50], [6, -6])
  const rotY = useTransform(x, [-80, 80], [-8, 8])
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - (r.left + r.width / 2))
    y.set(e.clientY - (r.top + r.height / 2))
  }
  const onDragEnd = (offsetX: number, next: () => void, prev: () => void) => {
    if (offsetX > 80) prev()
    else if (offsetX < -80) next()
  }

  const desktopOnTop = topView === "desktop"

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

        {/* ---------- DESKTOP CARD ---------- */}
        <motion.div
            className={[
              "relative w-full max-w-[640px] mx-auto rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 overflow-hidden shadow-lg",
              "sm:transition-all sm:duration-500 sm:will-change-transform",
              desktopOnTop ? "sm:z-40 sm:scale-100" : "sm:z-10 sm:scale-[0.92] sm:pointer-events-none",
            ].join(" ")}
            style={canTilt ? { rotateX: rotX, rotateY: rotY } : undefined}
            onMouseMove={onMove}
            onMouseLeave={() => {
              x.set(0)
              y.set(0)
            }}
            onPointerEnter={() => desk.setHover(true)}
            onPointerLeave={() => desk.setHover(false)}
        >
          <motion.div
              drag={prefersReduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => onDragEnd(info.offset.x, desk.next, desk.prev)}
          >
            <div className="relative rounded-xl bg-neutral-900">
              <div className="absolute inset-x-0 top-0 h-6 bg-neutral-900/90 rounded-t-xl" />
              <Image
                  key={desktopShots[desk.i].src}
                  src={desktopShots[desk.i].src}
                  alt={desktopShots[desk.i].alt}
                  width={1200}
                  height={750}
                  sizes="(max-width: 640px) 100vw, 600px"
                  className="w-full h-auto rounded-xl select-none pointer-events-none"
                  priority
              />
            </div>
          </motion.div>

          {/* controls: mobile -> below; sm+ -> overlay */}
          <div className="hidden sm:flex absolute bottom-3 left-0 right-0 items-center justify-between px-3">
            <Button size="sm" variant="outline" onClick={desk.prev} aria-label="Previous desktop shot">
              ←
            </Button>
            <div className="flex gap-1.5">
              {desktopShots.map((_, idx) => (
                  <button
                      key={idx}
                      onClick={() => desk.setI(idx)}
                      aria-label={`Go to desktop shot ${idx + 1}`}
                      className={`h-2 rounded-full transition-all ${idx === desk.i ? "bg-primary w-6" : "bg-white/70 w-2.5"}`}
                  />
              ))}
            </div>
            <Button size="sm" onClick={desk.next} aria-label="Next desktop shot">
              →
            </Button>
          </div>
        </motion.div>

        {/* mobile-only controls under the desktop card */}
        <div className="mt-3 sm:hidden flex items-center justify-center gap-3">
          <Button size="sm" variant="outline" onClick={desk.prev} aria-label="Previous desktop shot">
            ←
          </Button>
          <div className="flex gap-1.5">
            {desktopShots.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => desk.setI(idx)}
                    aria-label={`Go to desktop shot ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${idx === desk.i ? "bg-primary w-6" : "bg-gray-300 w-2.5"}`}
                />
            ))}
          </div>
          <Button size="sm" onClick={desk.next} aria-label="Next desktop shot">
            →
          </Button>
        </div>

        {/* ---------- PHONE CARD ---------- */}
        <motion.div
            className={[
              "relative mt-6 mx-auto w-[220px] rounded-3xl bg-white border border-white/60 overflow-hidden shadow-2xl",
              "sm:absolute sm:-bottom-6 sm:-right-6 sm:origin-bottom-right sm:w-[140px] md:w-[160px] lg:w-[180px] sm:transition-all sm:duration-500 sm:will-change-transform",
              desktopOnTop ? "sm:z-10 sm:scale-[0.92] sm:pointer-events-none" : "sm:z-40 sm:scale-100 sm:pointer-events-auto",
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
              className="relative bg-neutral-950"
          >
            {/* notch */}
            <div className="absolute inset-x-12 -top-2 h-5 rounded-b-2xl bg-neutral-950" />
            <Image
                key={mobileShots[mob.i].src}
                src={mobileShots[mob.i].src}
                alt={mobileShots[mob.i].alt}
                width={380}
                height={760}
                sizes="(max-width: 640px) 220px, 180px"
                className="w-full h-auto select-none pointer-events-none"
                priority
            />
          </motion.div>

          {/* phone dots: inside for sm+, below for mobile */}
          <div className="hidden sm:flex absolute bottom-2 left-0 right-0 justify-center gap-1.5">
            {mobileShots.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => mob.setI(idx)}
                    aria-label={`Go to mobile shot ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${idx === mob.i ? "bg-primary w-5" : "bg-gray-300 w-2.5"}`}
                />
            ))}
          </div>
        </motion.div>

        {/* mobile-only phone dots under the phone mock */}
        <div className="sm:hidden mt-2 flex justify-center gap-1.5">
          {mobileShots.map((_, idx) => (
              <button
                  key={idx}
                  onClick={() => mob.setI(idx)}
                  aria-label={`Go to mobile shot ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${idx === mob.i ? "bg-primary w-5" : "bg-gray-300 w-2.5"}`}
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
        <section id="hero" ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

                <div
                    className="
    flex flex-col sm:flex-row
    gap-4 sm:gap-6 lg:gap-8
    justify-center sm:justify-start
    items-stretch sm:items-center
    w-full
    max-w-2xl mx-auto
  "
                >
                  {/* CTA button */}
                  <ConsultationCTA label="Free Consultation" />

                  {/* Explore button */}
                  <Button
                      size="lg"
                      variant="outline"
                      className="
      text-base sm:text-lg
      px-6 sm:px-8 py-3
      border-2 border-primary text-primary
      hover:bg-primary hover:text-white
      bg-transparent
      flex items-center justify-center
      w-full sm:w-auto
    "
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
                  ].map(m => (
                      <motion.div key={m.label} whileHover={prefersReduced ? undefined : hoverCard} className="text-center">
                        <div className="text-2xl font-heading font-bold text-gray-900">{m.value}</div>
                        <div className="text-sm text-gray-600">{m.label}</div>
                      </motion.div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Interactive mockups */}
              <div className="relative isolate">
                <ProductShowcase blobShift={blobShift} />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Client Impact / Trust bar */}
        <section id="trust" className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 backdrop-blur-sm px-6 py-5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-sm text-gray-600">
                  Trusted by teams shipping <span className="font-semibold text-gray-900">50+ projects</span> across{" "}
                  <span className="font-semibold text-gray-900">25+ countries</span>
                </p>
                {/* replace with your client logos */}
                <div className="flex items-center gap-6 grayscale opacity-80 hover:opacity-100 transition">
                  <Image src="/logos/client-1.png" alt="Client 1" width={96} height={24} />
                  <Image src="/logos/client-2.png" alt="Client 2" width={96} height={24} />
                  <Image src="/logos/client-3.png" alt="Client 3" width={96} height={24} />
                  <Image src="/logos/client-4.png" alt="Client 4" width={96} height={24} />
                </div>
              </div>
            </div>
          </div>
        </section>

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
                  stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
                },
                {
                  icon: <Brain className="h-8 w-8" />,
                  title: "AI & Automation",
                  description: "Intelligent systems that streamline operations and unlock new possibilities for growth.",
                  stack: ["AI SDK", "OpenAI/Groq/xAI", "Vector DB", "Embeddings", "Workers/Queues"],
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Consulting",
                  description: "Strategic guidance to help you make informed technology decisions.",
                  stack: ["Architecture", "Migrations", "Performance", "Security", "Roadmapping"],
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "SaaS Solutions",
                  description: "Scalable software-as-a-service platforms designed for rapid deployment and growth.",
                  stack: ["Multi-tenant", "RBAC", "Billing", "Webhooks", "Audit Logs"],
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Cloud & DevOps",
                  description: "Secure, reliable infrastructure that scales with your business needs.",
                  stack: ["Vercel", "Neon/Supabase", "CI/CD", "Observability", "RLS/Policies"],
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Mobile & Web Apps",
                  description: "Cross-platform applications that deliver exceptional user experiences.",
                  stack: ["React Native", "Expo", "PWA", "Offline-first", "App Store/Play"],
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