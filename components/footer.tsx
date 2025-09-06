"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Linkedin, MessageCircle, ArrowRight, ChevronUp } from "lucide-react"
import { motion, useScroll, useTransform, Variants, TargetAndTransition } from "framer-motion"
import { ConsultationCTA } from "@/components/consultation-cta"
import BackToTopFab from "@/components/BackToTopFab";

const colVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number): TargetAndTransition => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
}

const linkUnderline: Variants = {
  initial: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.28, ease: "easeOut" } },
}

export function Footer() {
  const year = new Date().getFullYear()
  const { scrollY } = useScroll()
  const showFab = useTransform(scrollY, [120, 300], [0, 1])

  return (
      <footer id="site-footer" className="relative isolate">
        {/* ===== Brand Card ===== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/70 dark:border-white/10 bg-white/70 dark:bg-neutral-950/60 shadow-[0_20px_70px_-20px_rgba(10,37,64,0.25)] backdrop-blur-xl">

            {/* subtle frame */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl [mask:linear-gradient(white,transparent_92%)] ring-1 ring-inset ring-primary/10" />

            {/* mesh glows */}
            <div aria-hidden className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-primary/30 via-sky-400/20 to-indigo-400/10 blur-3xl" />
            <div aria-hidden className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-300/20 via-teal-300/10 to-primary/10 blur-3xl" />

            {/* watermark – adaptive sizing */}
            <div
                aria-hidden
                className={`
    pointer-events-none absolute select-none font-black tracking-tight
    text-primary/5 dark:text-primary/10
    bottom-[-8%] left-1/2 -translate-x-1/2  /* center horizontally */
    text-[28vw] sm:text-[18vw] md:text-[12vw] lg:text-[10vw]
    leading-none
    max-[420px]:opacity-35
  `}
                style={{ fontFamily: "var(--font-heading, ui-sans-serif)" }}
            >
              REVZION
            </div>

            {/* content */}
            <div className="relative z-10 grid gap-8 p-5 sm:p-8 lg:p-12 lg:grid-cols-12 min-w-0">
              {/* Left: brand + actions */}
              <motion.div
                  variants={colVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  custom={0}
                  className="lg:col-span-6 lg:pr-10 min-w-0"
              >
                  <div className="flex items-center gap-2 min-w-0">
                      <Link href="/" className="flex items-center gap-2 group" aria-label="Go to Revzion home">
                          <Image
                              src="/logo.svg"
                              alt="Revzion"
                              width={34}
                              height={34}
                              priority
                              className="transition-transform group-hover:scale-105"
                          />
                          <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white group-hover:opacity-90">
      Revzion
    </span>
                      </Link>
                  </div>

                <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2.25rem)] sm:text-4xl font-heading font-extrabold leading-tight text-gray-900 dark:text-white">
                  Imaginative tech for ambitious brands.
                </h2>

                {/* paragraph: clamped size & line-length; zero overflow on 360px */}
                <p className="mt-3 text-[clamp(0.95rem,1.2vw,1.125rem)] leading-relaxed text-gray-600 dark:text-gray-300 max-w-[66ch]">
                  We design and ship SaaS, AI, and cross-platform products with a performance-first mindset.
                </p>

                {/* Actions row */}
                <div className="mt-6 w-full">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 lg:gap-5 min-w-0">
                    {/* Gradient CTA — full width on mobile */}
                    <div className="w-auto min-w-0">
                      <ConsultationCTA
                          appearance="pill"
                          /* don’t force full width on phones */
                          mobileFullWidth={false}
                          label="Free Consultation"
                          className="
      w-[clamp(180px,62vw,260px)]  /* tidy mobile width */
      sm:w-auto                   /* natural size on sm+ */
      max-w-full h-11 sm:h-12 rounded-full
      px-5 sm:px-6
      mx-auto sm:mx-0            /* center on mobile only */
    "
                      />
                    </div>

                    {/* Outlined pill secondary CTA */}
                    <Link
                        href="/services"
                        aria-label="Explore Services"
                        className={[
                          // sizing & shrink rules
                          "w-full sm:w-auto max-w-full box-border",
                          "group inline-flex items-center justify-center",
                          "h-11 sm:h-12 rounded-full px-5 sm:px-6",
                          // theme
                          "border border-primary text-primary bg-white/70 dark:bg-white/5 backdrop-blur",
                          // type
                          "text-[15px] sm:text-base font-medium",
                          // behavior
                          "shadow-sm transition-all duration-200 hover:bg-primary hover:text-white",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        ].join(" ")}
                    >
                      <span className="truncate">Explore Services</span>
                      <ArrowRight
                          className="ml-2 -mr-1 h-4 w-4 sm:h-[18px] sm:w-[18px] transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>

                {/* Social */}
                <div className="mt-6 flex items-center gap-3">
                  {[
                    { href: "mailto:contact@revzion.com", Icon: Mail, label: "Email" },
                    { href: "https://www.linkedin.com/company/revzion", Icon: Linkedin, label: "LinkedIn" },
                    { href: "https://t.me/yourhandle", Icon: MessageCircle, label: "Telegram" },
                  ].map(({ href, Icon, label }) => (
                      <motion.a
                          key={label}
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          aria-label={label}
                          whileHover={{ y: -2, scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 350, damping: 20 }}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-white/15 bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-primary"
                      >
                        <Icon className="h-5 w-5" />
                      </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Right: newsletter + columns (1/2/3 layout) */}
              <div className="lg:col-span-6 lg:pl-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8 min-w-0">
                {/* Newsletter spans all at ≤ md */}
                <motion.div
                    variants={colVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    custom={1}
                    className="sm:col-span-2 md:col-span-3 min-w-0"
                >
                  <form
                      onSubmit={(e) => e.preventDefault()}
                      className={[
                        // layout: stack on mobile, pill row from sm+
                        "flex flex-col sm:flex-row items-stretch",
                        "gap-3.5 sm:gap-0",

                        // container styling
                        "rounded-2xl sm:rounded-full",
                        "border border-gray-200 dark:border-white/15",
                        "bg-white/80 dark:bg-white/5",
                        "pl-3 sm:pl-4 pr-2 py-2",
                        "shadow-sm",

                        // fix any flex overflow
                        "min-w-0",
                      ].join(" ")}
                  >
                    <input
                        type="email"
                        placeholder="Your email address"
                        aria-label="Email address"
                        required
                        className={[
                          // sizing
                          "h-11 sm:h-auto",

                          // grow + never overflow text
                          "flex-1 min-w-0",

                          // typography
                          "text-[15px] sm:text-base",
                          "text-gray-800 dark:text-gray-100 placeholder:text-gray-400",

                          // visuals
                          "bg-transparent outline-none",

                          // better hit target on mobile
                          "px-2 sm:px-0",
                        ].join(" ")}
                    />

                    <button
                        aria-label="Subscribe"
                        className={[
                          // on mobile: full width; on sm+: auto
                          "w-full sm:w-auto",
                          "h-11 sm:h-auto",
                          "flex-none inline-flex items-center justify-center",

                          // spacing when row
                          "sm:ml-2",

                          // visuals
                          "rounded-full bg-primary px-4 py-2 text-white",
                          "text-sm font-medium",
                          "hover:opacity-95",

                          // accessibility
                          "focus:outline-none focus-visible:ring-2",
                          "focus-visible:ring-primary focus-visible:ring-offset-2",
                        ].join(" ")}
                    >
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </form>
                </motion.div>

                {[
                  {
                    title: "Our services",
                    items: [
                      { href: "/services", label: "Capabilities" },
                      { href: "/portfolio", label: "Projects" },
                      { href: "/process", label: "Process" },
                      { href: "/referrals", label: "Referral Program" },
                    ],
                  },
                  {
                    title: "Company",
                    items: [
                      { href: "/about", label: "About us" },
                      { href: "/resources", label: "Resources" },
                      { href: "/careers", label: "Careers" },
                      { href: "/contact", label: "Contact" },
                    ],
                  },
                  {
                    title: "Legal",
                    items: [
                      { href: "/privacy-policy", label: "Privacy Policy" },
                      { href: "/terms", label: "Terms of Service" },
                      { href: "/cookie-settings", label: "Cookie Settings" },
                    ],
                  },
                ].map((col, i) => (
                    <motion.div
                        key={col.title}
                        variants={colVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        custom={i + 2}
                        className="flex flex-col min-w-[12rem]"
                    >
                      <h3 className="mb-3 font-heading text-gray-900 dark:text-white font-semibold">{col.title}</h3>
                      <ul className="space-y-2 sm:space-y-2.5">
                        {col.items.map((l) => (
                            <li key={l.href}>
                              <Link
                                  href={l.href}
                                  className="group relative block leading-relaxed text-gray-600 dark:text-gray-300 hover:text-primary"
                              >
                                <span className="break-words">{l.label}</span>
                                <motion.span
                                    className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-primary origin-left"
                                    variants={linkUnderline}
                                    initial="initial"
                                    whileHover="hover"
                                />
                              </Link>
                            </li>
                        ))}
                      </ul>
                    </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== Client strip ===== */}
        <div className="border-t border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-neutral-950/70 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="whitespace-nowrap">
              We’ve helped over <strong className="text-gray-800 dark:text-gray-200">200+</strong> companies including
            </span>
              <div className="relative min-w-0 flex-1 overflow-hidden">
                <div className="marquee flex gap-8">
                  {[
                    "whatsapp",
                    "amazon",
                    "dropbox",
                    "shopify",
                    "youtube",
                    "whatsapp",
                    "amazon",
                    "dropbox",
                    "shopify",
                    "youtube",
                  ].map((n, i) => (
                      <Image
                          key={`${n}-${i}`}
                          src={`/logos/${n}.svg`}
                          alt={n}
                          width={104}
                          height={24}
                          className="opacity-70 hover:opacity-100 transition"
                      />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bottom bar & FAB ===== */}
        <div className="bg-gray-50/90 dark:bg-neutral-950 border-t border-gray-200/80 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 dark:text-gray-400 text-sm">© {year} Revzion. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-primary">
                Privacy
              </Link>
              <span aria-hidden className="text-gray-300">•</span>
              <Link href="/terms" className="text-gray-500 hover:text-primary">
                Terms
              </Link>
            </div>
          </div>

          {/* FAB — shares axis with SoundToggle (which sits at right:1rem, bottom:1rem) */}
            <BackToTopFab threshold={400} />
        </div>

        {/* marquee & reduced motion */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .marquee {
            width: max-content;
            animation: marquee 26s linear infinite;
          }
          .marquee:hover {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee {
              animation: none;
              transform: none;
            }
          }
        `}</style>
      </footer>
  )
}