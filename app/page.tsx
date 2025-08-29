"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight, Users, Code, Brain, TrendingUp, Volume2, VolumeX } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

/* -------------------- Shared minimal motion -------------------- */
const revealOnce: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}
const hoverCard = { scale: 1.02 }
const hoverIcon = { scale: 1.08 }

/* -------------------- Ambient Sound Toggle -------------------- */
function SoundToggle() {
  const [enabled, setEnabled] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio("/audio/ambient.mp3")
      a.loop = true
      a.preload = "auto"
      a.volume = 0.12
      audioRef.current = a
    }
    try {
      const saved = typeof window !== "undefined" && localStorage.getItem("ambient-sound")
      if (saved === "on" && !prefersReduced) setEnabled(true)
    } catch {}
  }, [prefersReduced])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    if (enabled && !prefersReduced) {
      a.play().catch(() => {})
      try { localStorage.setItem("ambient-sound", "on") } catch {}
    } else {
      a.pause()
      try { localStorage.setItem("ambient-sound", "off") } catch {}
    }
  }, [enabled, prefersReduced])

  return (
      <div className="fixed bottom-5 right-5 z-50">
        <Button
            variant="outline"
            className="backdrop-blur-md bg-white/70 border-white/60 shadow-sm"
            onClick={() => setEnabled(v => !v)}
            aria-pressed={enabled}
            aria-label={enabled ? "Turn ambient sound off" : "Turn ambient sound on"}
            title={enabled ? "Turn ambient sound off" : "Turn ambient sound on"}
        >
          {enabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
          {enabled ? "Sound on" : "Sound off"}
        </Button>
      </div>
  )
}

/* -------------------- Case Studies Carousel -------------------- */
type Study = {
  id: string
  title: string
  problem: string
  solution: string
  results: string
  image: string
  link?: string
}

function CaseStudiesCarousel() {
  const studies: Study[] = useMemo(
      () => [
        {
          id: "beesocial",
          title: "BeeSocial – Social Media App",
          problem: "Low engagement and high churn.",
          solution: "Rebuilt feed ranking, real-time chat, and creator tools.",
          results: "+42% DAU, 29% session length, 18% retention.",
          image: "/case-studies/beesocial.jpg",
          link: "/portfolio/beesocial",
        },
        {
          id: "finlytics",
          title: "Finlytics – Analytics SaaS",
          problem: "Complex reporting slowed decisions.",
          solution: "Built multi-tenant dashboards, alerts, and ETL pipelines.",
          results: "3× faster insights, 35% conversion lift, NPS +14.",
          image: "/case-studies/finlytics.jpg",
          link: "/portfolio/finlytics",
        },
      ],
      []
  )

  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced || hovering) return
    const id = setInterval(() => setActive(i => (i + 1) % studies.length), 7000)
    return () => clearInterval(id)
  }, [prefersReduced, hovering, studies.length])

  const next = () => setActive(i => (i + 1) % studies.length)
  const prev = () => setActive(i => (i - 1 + studies.length) % studies.length)

  return (
      <section className="py-20 bg-gray-50">
        <motion.div
            className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8"
            variants={revealOnce}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
        >
          <div className="flex items-end justify-between mb-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">Case Studies</h2>
              <p className="text-gray-600 text-lg">Learn from others.</p>
            </div>
            <div className="hidden md:flex gap-3">
              <Button variant="outline" onClick={prev} aria-label="Previous" title="Previous case study">←</Button>
              <Button onClick={next} aria-label="Next" title="Next case study">→</Button>
            </div>
          </div>

          <div
              className="relative h-[520px] lg:h-[560px] flex items-center justify-center"
              aria-roledescription="carousel"
              aria-label="Case studies"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
          >
            <AnimatePresence mode="wait">
              <motion.article
                  key={studies[active].id}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute w-full max-w-5xl rounded-3xl border border-white/60 bg-white/60 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  {/* Visual */}
                  <div className="relative lg:col-span-2">
                    <motion.img
                        src={studies[active].image}
                        alt={studies[active].title}
                        className="h-full w-full object-cover lg:min-h-[560px]"
                        whileHover={prefersReduced ? undefined : hoverIcon}
                        transition={{ duration: 0.35 }}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/70 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 p-8 lg:p-10">
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-sm font-medium">Case Study</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-gray-900">
                      {studies[active].title}
                    </h3>
                    <div className="mt-5 space-y-3 text-gray-700 leading-relaxed">
                      <p><span className="font-semibold text-gray-900">Problem:</span> {studies[active].problem}</p>
                      <p><span className="font-semibold text-gray-900">Solution:</span> {studies[active].solution}</p>
                      <p><span className="font-semibold text-gray-900">Results:</span> {studies[active].results}</p>
                    </div>
                    <Link
                        href={studies[active].link || "/portfolio"}
                        className="inline-flex items-center text-primary font-medium hover:underline mt-6"
                    >
                      View case study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>

                    {/* Transparent detail bar */}
                    <div className="relative mt-8 rounded-2xl border border-white/60 bg-white/40 backdrop-blur-xl px-5 py-3 text-sm text-gray-700 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex flex-wrap gap-3">
                        <span className="px-2.5 py-1 rounded-md bg-white/70 text-gray-800">Discovery → MVP → Scale</span>
                        <span className="px-2.5 py-1 rounded-md bg-white/70 text-gray-800">Design Systems</span>
                        <span className="px-2.5 py-1 rounded-md bg-white/70 text-gray-800">Observability</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Arrows (mobile + desktop) */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 lg:px-4">
              <Button variant="outline" size="icon" onClick={prev} aria-label="Previous slide" title="Previous slide">←</Button>
              <Button variant="outline" size="icon" onClick={next} aria-label="Next slide" title="Next slide">→</Button>
            </div>
          </div>

          {/* Dots */}
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

  // which frame is on top (auto flip every 5s)
  const [topView, setTopView] = useState<"desktop" | "mobile">("desktop")
  useEffect(() => {
    const id = setInterval(() => setTopView(v => (v === "desktop" ? "mobile" : "desktop")), 5000)
    return () => clearInterval(id)
  }, [])

  // tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotX = useTransform(y, [-50, 50], [6, -6])
  const rotY = useTransform(x, [-80, 80], [-8, 8])
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return
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
      <div className="relative isolate">
        {/* glow blobs */}
        <motion.div aria-hidden style={{ y: blobShift }} className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-revzion rounded-full opacity-10 blur-3xl pointer-events-none z-0" />
        <motion.div aria-hidden style={{ y: blobShift }} className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-2xl pointer-events-none z-0" />

        {/* DESKTOP (always positioned so z-index works) */}
        <motion.div
            className={`relative transition-all duration-500 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 overflow-hidden shadow-lg will-change-transform
          ${desktopOnTop ? "z-40 scale-100" : "z-10 scale-[0.92] pointer-events-none"}`}
            style={prefersReduced ? undefined : { rotateX: rotX, rotateY: rotY }}
            onMouseMove={onMove}
            onMouseLeave={() => { x.set(0); y.set(0) }}
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
                  className="w-full h-auto rounded-xl select-none pointer-events-none"
              />
            </div>
          </motion.div>

          {/* desktop pills */}
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-3">
            <Button size="sm" variant="outline" onClick={desk.prev} aria-label="Previous desktop shot">←</Button>
            <div className="flex gap-1.5">
              {desktopShots.map((_, idx) => (
                  <button
                      key={idx}
                      onClick={() => desk.setI(idx)}
                      aria-label={`Go to desktop shot ${idx + 1}`}
                      className={`h-2 rounded-full transition-all ${
                          idx === desk.i ? "bg-primary w-6" : "bg-white/70 w-2.5"
                      }`}
                  />
              ))}
            </div>
            <Button size="sm" onClick={desk.next} aria-label="Next desktop shot">→</Button>
          </div>
        </motion.div>

        {/* MOBILE (absolute in the corner) */}
        <motion.div
            className={`absolute -bottom-6 -right-6 transition-all duration-500 rounded-3xl bg-white border border-white/60 overflow-hidden shadow-2xl w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] origin-bottom-right will-change-transform ${desktopOnTop
                ? "z-10 scale-[0.92] pointer-events-none"
                : "z-40 scale-100 pointer-events-auto"}`}
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
                // width={480}
                // height={960}
                width={190}
                height={380}
                className="w-full h-auto select-none pointer-events-none"
                priority
            />
          </motion.div>

          {/* mobile pills */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {mobileShots.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => mob.setI(idx)}
                    aria-label={`Go to mobile shot ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                        idx === mob.i ? "bg-primary w-5" : "bg-gray-300 w-2.5"
                    }`}
                />
            ))}
          </div>
        </motion.div>

        {/* Manual top/bottom toggle pills */}
        <div className="mt-6 flex gap-3 justify-center">
          <button
              onClick={() => setTopView("desktop")}
              className={`px-4 py-1.5 rounded-full text-sm ${desktopOnTop ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}
          >
            Desktop on top
          </button>
          <button
              onClick={() => setTopView("mobile")}
              className={`px-4 py-1.5 rounded-full text-sm ${!desktopOnTop ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}
          >
            Mobile on top
          </button>
        </div>
      </div>
  )
}

// function ProductShowcase({ blobShift }: { blobShift: MotionValue<number> }) {
//   const desktopShots = useMemo(
//       () => [
//         { src: "/shots/dashboard-dark.png", alt: "SaaS dashboard" },
//         { src: "/shots/analytics.png", alt: "Analytics & reports" },
//         { src: "/shots/settings.png", alt: "Admin & settings" },
//       ],
//       []
//   )
//   const mobileShots = useMemo(
//       () => [
//         { src: "/shots/mobile-chat.png", alt: "Chat & realtime" },
//         { src: "/shots/mobile-feed.png", alt: "Social feed" },
//         { src: "/shots/mobile-profile.png", alt: "Profile" },
//       ],
//       []
//   )
//
//   const desk = useCarousel(desktopShots.length, 7000)
//   const mob = useCarousel(mobileShots.length, 6500)
//   const prefersReduced = useReducedMotion()
//
//   // tilt
//   const x = useMotionValue(0)
//   const y = useMotionValue(0)
//   const rotX = useTransform(y, [-50, 50], [6, -6])
//   const rotY = useTransform(x, [-80, 80], [-8, 8])
//
//   const onDragEnd = (offsetX: number, next: () => void, prev: () => void) => {
//     if (offsetX > 80) prev()
//     else if (offsetX < -80) next()
//   }
//
//   return (
//       <div className="relative">
//         {/* glow blobs */}
//         <motion.div aria-hidden style={{ y: blobShift }} className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-revzion rounded-full opacity-10 blur-3xl" />
//         <motion.div aria-hidden style={{ y: blobShift }} className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-2xl" />
//
//         {/* laptop frame */}
//         <motion.div
//             className="relative z-10 rounded-2xl bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] border border-white/60 overflow-hidden"
//             style={prefersReduced ? undefined : { rotateX: rotX, rotateY: rotY }}
//             onMouseMove={e => {
//               const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
//               x.set(e.clientX - (rect.left + rect.width / 2))
//               y.set(e.clientY - (rect.top + rect.height / 2))
//             }}
//             onMouseLeave={() => { x.set(0); y.set(0) }}
//             onPointerEnter={() => desk.setHover(true)}
//             onPointerLeave={() => desk.setHover(false)}
//         >
//           <motion.div
//               drag="x"
//               dragConstraints={{ left: 0, right: 0 }}
//               dragElastic={0.2}
//               onDragEnd={(_, info) => onDragEnd(info.offset.x, desk.next, desk.prev)}
//               className="relative"
//           >
//             <div className="relative rounded-xl bg-neutral-900">
//               <div className="absolute inset-x-0 top-0 h-6 bg-neutral-900/90 rounded-t-xl" />
//               <Image
//                   key={desktopShots[desk.i].src}
//                   src={desktopShots[desk.i].src}
//                   alt={desktopShots[desk.i].alt}
//                   width={1200}
//                   height={750}
//                   priority
//                   className="w-full h-auto rounded-xl select-none pointer-events-none"
//               />
//             </div>
//           </motion.div>
//
//           {/* desktop controls */}
//           <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-3">
//             <Button size="sm" variant="outline" onClick={desk.prev} aria-label="Previous desktop shot">←</Button>
//             <div className="flex gap-1.5">
//               {desktopShots.map((_, idx) => (
//                   <button
//                       key={idx}
//                       onClick={() => desk.setI(idx)}
//                       aria-label={`Go to desktop shot ${idx + 1}`}
//                       className={`h-2 rounded-full transition-all ${idx === desk.i ? "bg-primary w-6" : "bg-white/60 w-2.5"}`}
//                   />
//               ))}
//             </div>
//             <Button size="sm" onClick={desk.next} aria-label="Next desktop shot">→</Button>
//           </div>
//         </motion.div>
//
//         {/* phone frame */}
//         <motion.div
//             className="absolute -bottom-6 -right-6 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] rounded-3xl bg-white shadow-xl border border-white/60 overflow-hidden"
//             initial={{ y: 16, opacity: 0, rotate: 6 }}
//             animate={{ y: 0, opacity: 1, rotate: 0 }}
//             transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
//             onPointerEnter={() => mob.setHover(true)}
//             onPointerLeave={() => mob.setHover(false)}
//         >
//           <motion.div
//               drag="x"
//               dragConstraints={{ left: 0, right: 0 }}
//               dragElastic={0.25}
//               onDragEnd={(_, info) => onDragEnd(info.offset.x, mob.next, mob.prev)}
//               className="relative bg-neutral-950"
//           >
//             <div className="absolute inset-x-12 -top-2 h-5 rounded-b-2xl bg-neutral-950" />
//             <Image
//                 key={mobileShots[mob.i].src}
//                 src={mobileShots[mob.i].src}
//                 alt={mobileShots[mob.i].alt}
//                 width={480}
//                 height={960}
//                 className="w-full h-auto select-none pointer-events-none"
//             />
//           </motion.div>
//
//           <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
//             {mobileShots.map((_, idx) => (
//                 <button
//                     key={idx}
//                     onClick={() => mob.setI(idx)}
//                     aria-label={`Go to mobile shot ${idx + 1}`}
//                     className={`h-1.5 rounded-full transition-all ${idx === mob.i ? "bg-primary w-5" : "bg-gray-300 w-2.5"}`}
//                 />
//             ))}
//           </div>
//         </motion.div>
//       </div>
//   )
// }

/* ----------------------------------- Page ----------------------------------- */
export default function HomePage() {
  const prefersReduced = useReducedMotion()
  const heroRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const blobShift = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -30])

  return (
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero */}
        <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
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
                    Innovating Products. <span className="text-gradient-revzion">Empowering Businesses.</span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                    Revzion builds scalable SaaS, AI, and cross-platform solutions for startups and enterprises.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-revzion hover:opacity-90 transition-opacity text-lg px-8 py-3">
                    Get a Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    <Link href="/services" className="flex items-center">Explore Services</Link>
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
        <section className="bg-white">
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
        <section className="py-20 bg-gray-50">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <Card className="group border-0 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-8">
                        <motion.div className="text-primary mb-4" whileHover={prefersReduced ? undefined : hoverIcon}>
                          {service.icon}
                        </motion.div>
                        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                        <Accordion type="single" collapsible>
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
        <section className="py-20 bg-white">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-8">Why Choose Revzion?</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
        <section className="py-20 bg-gray-50">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">Our Tech Stacks</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The modern tools we use to build fast, secure, and scalable products.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border-0">
                <AccordionItem value="frontend">
                  <AccordionTrigger className="px-6 text-left">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-primary">{"</>"}</span>
                      <span className="font-semibold">Frontend Technologies</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed mb-4">Component-driven UIs with performance and accessibility built in.</p>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "React Native", "Expo", "Vite"].map(t => (
                          <motion.span key={t} whileHover={{ scale: 1.04 }} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                            {t}
                          </motion.span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="mobile-webperf">
                  <AccordionTrigger className="px-6 text-left">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-primary">⚡</span>
                      <span className="font-semibold">Mobile, PWA & Performance</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed mb-4">Cross-platform reach with offline-first and lighthouse-friendly builds.</p>
                    <div className="flex flex-wrap gap-2">
                      {["PWA", "Workbox", "Web Animations", "Framer Motion", "Lighthouse CI", "React Query"].map(t => (
                          <motion.span key={t} whileHover={{ scale: 1.04 }} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                            {t}
                          </motion.span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border-0">
                <AccordionItem value="backend">
                  <AccordionTrigger className="px-6 text-left">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-primary">🛠️</span>
                      <span className="font-semibold">Backend & APIs</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed mb-4">Reliable services with clean contracts and strong observability.</p>
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "tRPC / REST", "Webhooks", "GraphQL", "Zod", "JWT/OAuth", "Rate limiting"].map(t => (
                          <motion.span key={t} whileHover={{ scale: 1.04 }} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                            {t}
                          </motion.span>
                      ))}
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
                    <p className="text-gray-600 leading-relaxed mb-4">Scale safely with IaC, observability, and cost-aware architectures.</p>
                    <div className="flex flex-wrap gap-2">
                      {["PostgreSQL", "Redis", "Neon/Supabase", "S3", "CI/CD (GH Actions)", "Docker", "Kubernetes", "Terraform", "OpenTelemetry"].map(t => (
                          <motion.span key={t} whileHover={{ scale: 1.04 }} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                            {t}
                          </motion.span>
                      ))}
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
                    <p className="text-gray-600 leading-relaxed mb-4">Practical AI: copilots, RAG, and workflow automation that ship.</p>
                    <div className="flex flex-wrap gap-2">
                      {["OpenAI / Groq / xAI", "Embeddings", "Vector DB", "RAG", "LangChain", "Workers/Queues"].map(t => (
                          <motion.span key={t} whileHover={{ scale: 1.04 }} className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                            {t}
                          </motion.span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-revzion">
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