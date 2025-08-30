"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Linkedin, MessageCircle, ArrowRight, ChevronUp } from "lucide-react"
import {motion, TargetAndTransition, Variants} from "framer-motion"
import {ConsultationCTA} from "@/components/consultation-cta";

const colVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (custom: number): TargetAndTransition => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.1 + custom * 0.08,
      ease: [0.16, 1, 0.3, 1], // cubic-bezier
    },
  }),
}

// simple variant (no resolver)
const linkUnderline: Variants = {
  initial: { scaleX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
      <footer className="relative">
        {/* CTA band */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/15 dark:via-primary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-primary/10 bg-white/60 dark:bg-white/5 backdrop-blur p-6"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 dark:text-white">
                  Let’s build something people love
                </h2>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Book a free consultation and get a tailored plan in 48 hours.
                </p>
              </div>
              <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-white font-medium shadow-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                Get in touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Main footer */}
        <div className="bg-gray-50/90 dark:bg-neutral-950 border-t border-gray-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              {/* Brand / About */}
              <motion.div
                  variants={colVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={0}
                  className="md:col-span-5"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Image src="/logo.svg" alt="Revzion logo" width={32} height={32} priority />
                  <span className="font-heading font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
                  Revzion
                </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                  Innovating Products. Empowering Businesses. We build scalable SaaS, AI, and cross-platform
                  solutions for startups and enterprises.
                </p>

                {/* Socials */}
                <div className="mt-6 flex items-center gap-3">
                  <motion.a
                      href="mailto:contact@revzion.com"
                      aria-label="Email Revzion"
                      whileHover={{ scale: 1.08, rotate: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16 }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Mail className="h-5 w-5" />
                  </motion.a>

                  <motion.a
                      href="https://www.linkedin.com/company/revzion"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Revzion on LinkedIn"
                      whileHover={{ scale: 1.08, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16 }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>

                  <motion.a
                      href="https://t.me/yourhandle"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat with Revzion on Telegram"
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16 }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </motion.a>
                </div>

                {/* “Trusted by” row */}
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Trusted by teams at
                  </p>
                  <div className="flex flex-wrap items-center gap-6 opacity-80">
                    {/* Replace with real client logos */}
                    <Image src="/logos/client-1.png" alt="Client 1" width={96} height={24} className="grayscale" />
                    <Image src="/logos/client-2.png" alt="Client 2" width={96} height={24} className="grayscale" />
                    <Image src="/logos/client-3.png" alt="Client 3" width={96} height={24} className="grayscale" />
                    <Image src="/logos/client-4.png" alt="Client 4" width={96} height={24} className="grayscale" />
                  </div>
                </div>
              </motion.div>

              {/* Link columns */}
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Quick Links */}
                <motion.div
                    variants={colVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={1}
                    className="flex flex-col"
                >
                  <motion.h3
                      whileHover={{ y: -2, color: "var(--color-primary, #2563eb)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="font-heading font-semibold text-gray-900 dark:text-white mb-4"
                  >
                    Quick Links
                  </motion.h3>

                  <ul className="flex-1 space-y-2">
                    {[
                      { href: "/services", label: "Services" },
                      { href: "/portfolio", label: "Portfolio" },
                      { href: "/about", label: "About" },
                      { href: "/careers", label: "Work With Us" },
                    ].map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="group relative inline-block text-gray-600 dark:text-gray-300 hover:text-primary">
                            <span>{l.label}</span>
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

                {/* Contact */}
                <motion.div
                    variants={colVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={2}
                    className="flex flex-col"
                >
                  <motion.h3
                      whileHover={{ y: -2, color: "var(--color-primary, #2563eb)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="font-heading font-semibold text-gray-900 dark:text-white mb-4"
                  >
                    Contact
                  </motion.h3>

                  <ul className="flex-1 space-y-2">
                    <li>
                      <Link href="/contact" className="group relative inline-block text-gray-600 dark:text-gray-300 hover:text-primary">
                        <span>Get in Touch</span>
                        <motion.span
                            className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-primary origin-left"
                            variants={linkUnderline}
                            initial="initial"
                            whileHover="hover"
                        />
                      </Link>
                    </li>
                    <li>
                      <a
                          href="mailto:contact@revzion.com"
                          className="group relative inline-block text-gray-600 dark:text-gray-300 hover:text-primary"
                      >
                        <span>contact@revzion.com</span>
                        <motion.span
                            className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-primary origin-left"
                            variants={linkUnderline}
                            initial="initial"
                            whileHover="hover"
                        />
                      </a>
                    </li>
                    <li>
                      <ConsultationCTA appearance="link" className="text-gray-600 dark:text-gray-300" />
                    </li>
                  </ul>
                </motion.div>

                {/* Legal */}
                <motion.div
                    variants={colVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={3}
                    className="flex flex-col"
                >
                  <motion.h3
                      whileHover={{ y: -2, color: "var(--color-primary, #2563eb)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="font-heading font-semibold text-gray-900 dark:text-white mb-4"
                  >
                    Legal
                  </motion.h3>

                  <ul className="flex-1 space-y-2">
                    {[
                      { href: "/privacy-policy", label: "Privacy Policy" },
                      { href: "/terms", label: "Terms of Service" },
                    ].map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="group relative inline-block text-gray-600 dark:text-gray-300 hover:text-primary">
                            <span>{l.label}</span>
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
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                © {year} Revzion. All rights reserved.
              </p>

              <div className="flex items-center gap-2">
                {/* use <a> so we don't attach handlers to <Link> */}
                <a
                    href="#top"
                    className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-primary underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full px-2 py-1"
                >
                  <ChevronUp className="h-4 w-4" />
                  Back to top
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* soft radial glow */}
        <div
            aria-hidden
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-[40rem] rounded-full bg-primary/10 blur-3xl dark:bg-primary/20"
        />
      </footer>
  )
}