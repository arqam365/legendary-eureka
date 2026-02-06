"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  Heart,
  Zap,
  Globe,
  Award,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";

/* ---------------- GSAP ---------------- */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ---------------- Motion (kept lightweight) ---------------- */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const revealOnce: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

/* md+ detector: animate immediately on small screens (iOS Safari fixes) */
const useIsMdUp = () => {
  const [mdUp, setMdUp] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMdUp(mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return mdUp;
};

export default function AboutPage() {
  const mdUp = useIsMdUp();

  /* ---------------- Data ---------------- */
  const teamMembers = [
    {
      name: "Arqam Ahmad Siddiqui",
      role: "Founder & CEO",
      bio: "Driving Revzion's vision with hands-on KMP, scalable cloud, and product leadership.",
      image: "/team/arqam.jpg",
      linkedin: "https://www.linkedin.com/in/arqam365/",
      twitter: "https://x.com/arqam365",
      github: "https://github.com/arqam365",
    },
    { name: "Sharad Pratap Singh Sengar", role: "Mobile Developer", bio: "Kotlin Multiplatform developer building fast, reliable Android & iOS apps.", image: "/team/sharad.jpg", linkedin: "#", twitter: "#", github: "#" },
    { name: "Raj Dwivedi", role: "Backend Engineer & DevOps Specialist", bio: "APIs, CI/CD, and cloud-native reliability across Node/Ktor and modern infra.", image: "/team/raj.jpg", linkedin: "#", twitter: "#", github: "#" },
    { name: "Bilal Sheikh", role: "Full Stack Engineer", bio: "Bridging frontend and backend to ship robust, user-centric features.", image: "/team/bilal.jpg", linkedin: "#", twitter: "#", github: "#" },
    { name: "Sneha Sahu", role: "Head of Business Development", bio: "Building partnerships and growth pipelines aligned with product value.", image: "/team/sneha.jpg", linkedin: "#", twitter: "#", github: "#" },
    { name: "Aanya Agrawal", role: "Mobile Developer", bio: "Compose & KMP enthusiast focused on smooth UX and performance.", image: "/team/aanya.jpg", linkedin: "#", twitter: "#", github: "#" },
    { name: "Saniya Khan", role: "UI/UX Developer", bio: "Designs intuitive, accessible interfaces with implementation ownership.", image: "/team/saniya.jpg", linkedin: "#", twitter: "#", github: "#" },
    { name: "Khushi Chaturvedi", role: "UI/UX Expert", bio: "Crafts delightful, user-first experiences grounded in research.", image: "/team/khushi.jpg", linkedin: "#", twitter: "#", github: "#" },
  ];

  const extendedTeam = [
    { name: "Gagandeep Singh", role: "Engineer", bio: "Full-stack & integrations." },
    { name: "Pulkit Shukla", role: "Engineer", bio: "Cloud & backend solutions." },
    { name: "Ankit Bose", role: "Engineer", bio: "APIs & reliability." },
    { name: "Prateek Singh", role: "Engineer", bio: "Frontend/Backend agility." },
    { name: "Jay Bhavsar", role: "Engineer", bio: "Mobile & frontend." },
    { name: "Yash Soni", role: "Engineer", bio: "Performance-minded full-stack." },
    { name: "Bharat Agarwal", role: "Engineer", bio: "Architecture & data." },
    { name: "Harshit Savita", role: "Engineer", bio: "Frontend/UI clean builds." },
    { name: "Prabar Gupta", role: "Designer", bio: "UI/UX clean designs." },
  ];

  const values = [
    { icon: <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7" />, title: "Innovation First", description: "We ship ahead of the curve—R&D → prototypes → outcomes." },
    { icon: <Users className="h-6 w-6 sm:h-7 sm:w-7" />, title: "Client Partnership", description: "We co-own the mission. Cadence, clarity, candor." },
    { icon: <Target className="h-6 w-6 sm:h-7 sm:w-7" />, title: "Quality Excellence", description: "Reliability, perf, and security by default." },
    { icon: <Heart className="h-6 w-6 sm:h-7 sm:w-7" />, title: "People-Centric", description: "Empathy in design. Accessibility as a rule." },
    { icon: <Zap className="h-6 w-6 sm:h-7 sm:w-7" />, title: "Agile Delivery", description: "Weekly demos, visible burn-up, zero surprises." },
    { icon: <Globe className="h-6 w-6 sm:h-7 sm:w-7" />, title: "Global Impact", description: "Built to scale and localize—any market, any region." },
  ];

  const stats = [
    { value: "2019", label: "Founded" },
    { value: "15+ ", label: "Core & Extended Team" },
    { value: "50+", label: "Projects Delivered" },
    { value: "5+", label: "Countries Served" },
  ];

  const awards = [
    { title: "Innovation Excellence", organization: "Global Tech Summit" },
    { title: "Best Workplace Culture", organization: "Great Place to Work" },
  ];

  const logos = [
    "/logos/stripe.svg",
    "/logos/aws.svg",
    "/logos/azure.svg",
    "/logos/vercel.svg",
    "/logos/postgresql.svg",
    "/logos/kubernetes.svg",
    "/logos/razorpay.svg",
    "/logos/mongodb.svg",
    "/logos/google.svg"
  ];

  const [showMore, setShowMore] = useState(false);

  /* ---------------- GSAP hooks & refs ---------------- */
  const heroRef = useRef<HTMLElement | null>(null);
  const logosRowRef = useRef<HTMLDivElement | null>(null);
  const valuesRef = useRef<HTMLElement | null>(null);
  const teamRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Hero headline & paragraph intro
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".gsap-hero-title", { y: 24, opacity: 0, duration: 0.6 })
          .from(".gsap-hero-copy", { y: 16, opacity: 0, duration: 0.5 }, "-=0.35")
          .from(".gsap-hero-stats > div", { y: 16, opacity: 0, stagger: 0.08, duration: 0.45 }, "-=0.25");

      // Parallax aurora blobs
      gsap.to(".gsap-aurora-1", {
        yPercent: 8,
        xPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".gsap-aurora-2", {
        yPercent: -6,
        xPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!logosRowRef.current) return;

    const row = logosRowRef.current;

    // Simple, bulletproof approach
    let animationId: number;
    let position = 0;
    const singleSetWidth = row.scrollWidth / 3;
    let speed = 0.5; // pixels per frame

    const animate = () => {
      position -= speed;

      // Reset when we've scrolled one full set
      if (Math.abs(position) >= singleSetWidth) {
        position = 0;
      }

      row.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    // Start after DOM is ready
    const startTimeout = setTimeout(() => {
      animate();
    }, 100);

    // Hover interactions
    const onEnter = () => { speed = 0.15; };
    const onLeave = () => { speed = 0.5; };

    row.addEventListener("mouseenter", onEnter);
    row.addEventListener("mouseleave", onLeave);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationId);
      row.removeEventListener("mouseenter", onEnter);
      row.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    // Values grid reveal
    if (!valuesRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".gsap-value-card", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
        },
      });
    }, valuesRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Team grid reveal
    if (!teamRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".gsap-team-card", {
        y: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
        },
      });
    }, teamRef);
    return () => ctx.revert();
  }, []);

  // Spotlight hover for value cards (updates --mx/--my used by your radial bg)
  useEffect(() => {
    const container = valuesRef.current;
    if (!container) return;
    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".rvz-spotlight")) return;
      const card = (target.closest(".rvz-spotlight") as HTMLElement)!;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    container.addEventListener("mousemove", onMove);
    return () => container.removeEventListener("mousemove", onMove);
  }, []);

  return (
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* ============== HERO (Aurora + Mesh + Grid) ============== */}
        <section ref={heroRef} className="relative overflow-hidden">
          {/* soft grid */}
          <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,23,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,6,23,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(80%_60%_at_50%_40%,#000_60%,transparent)]"
          />
          {/* brand aurora */}
          <div
              aria-hidden
              className="gsap-aurora-1 absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-primary/60 via-fuchsia-400/40 to-sky-400/40"
          />
          <div
              aria-hidden
              className="gsap-aurora-2 absolute -bottom-24 -right-24 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-40 bg-gradient-to-tl from-sky-400/40 via-violet-400/40 to-primary/60"
          />
          {/* mesh shimmer */}
          <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.12)_0%,transparent_70%)]"
          />

          <motion.div
              className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* LEFT */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="gsap-hero-title text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight text-gray-900">
                    About <span className="text-gradient-revzion">Revzion</span>
                  </h1>
                  <p className="gsap-hero-copy text-xl text-gray-600 leading-relaxed max-w-2xl">
                    A senior product & engineering studio building AI, SaaS, and cross-platform experiences that feel one step into the future.
                  </p>
                </div>

                {/* Stats pills */}
                <div className="gsap-hero-stats grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-2xl">
                  {stats.map((s) => (
                      <div
                          key={s.label}
                          className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm px-4 py-3 shadow-[0_8px_30px_-12px_rgba(2,6,23,0.12)]"
                      >
                        <div className="text-2xl font-heading font-bold text-gray-900">{s.value}</div>
                        <div className="text-xs text-gray-600">{s.label}</div>
                      </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                      asChild
                      size="lg"
                      className="bg-gradient-revzion hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
                  >
                    <Link href="/contact" className="flex items-center">
                      Join Our Journey
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Link href="/portfolio">See Our Work</Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT */}
              <div className="relative">
                <img
                    src="/modern-tech-team.png"
                    alt="Revzion team working together"
                    className="rounded-2xl shadow-2xl w-full h-auto"
                    loading="lazy"
                />
                {/* Glassy award badge */}
                <div className="absolute -bottom-6 -left-6 rounded-xl border bg-white/70 backdrop-blur p-6 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Award className="h-8 w-8 text-primary" />
                    <div>
                      <div className="font-semibold text-gray-900">Award Winning</div>
                      <div className="text-sm text-gray-600">Tech Innovation 2023</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ============== PREMIUM TRUST STRIP / CREDIBILITY MARQUEE ============== */}
          <div className="relative z-10 border-t border-gray-100/70 bg-white/60 backdrop-blur overflow-hidden">
            {/* Soft edge fade masks */}
            <div
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-white/60 to-transparent z-10 pointer-events-none"
            />
            <div
                aria-hidden
                className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-white/60 to-transparent z-10 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div
                  ref={logosRowRef}
                  className="flex items-center gap-8 sm:gap-12 no-scrollbar"
                  style={{ willChange: "transform" }}
              >
                {/* Render logos 3 times for seamless infinite loop */}
                {[...logos, ...logos, ...logos].map((src, i) => (
                    <div
                        key={i}
                        className="shrink-0 h-7 sm:h-8 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    >
                      <Image
                          src={src}
                          alt="Technology partner logo"
                          width={110}
                          height={32}
                          className="h-7 sm:h-8 w-auto object-contain"
                      />
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============== STORY (brand-backed, milestones, quote) ============== */}
        <section className="relative overflow-hidden py-18 sm:py-20">
          {/* soft brand grid + aurora wash */}
          <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,23,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,6,23,0.035)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000_70%,transparent)]"
          />
          <div
              aria-hidden
              className="absolute -top-24 left-1/2 -translate-x-1/2 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-primary/40 via-fuchsia-400/30 to-sky-400/30"
          />

          <motion.div
              className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
                Our Story
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                From a small studio to a global delivery partner—still obsessed with outcomes.
              </p>
              <div className="mt-5 h-[3px] w-28 mx-auto rounded-full bg-gradient-revzion/90" />
            </div>

            {/* Content: text + visual card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Copy */}
              <div className="lg:col-span-7">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Revzion (previously <em>Next Level Programmers</em>) began in 2019 with a simple idea:
                    combine modern engineering with business clarity. No fluff, just measurable impact.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-5">
                    What started as hands-on consulting has grown into end-to-end product delivery across
                    AI, SaaS, and cross-platform experiences. We move fast, but never break trust:
                    weekly demos, transparent burn-up, and security by default.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-5">
                    Today we've shipped <span className="font-semibold text-gray-900">100+ projects</span> across
                    <span className="font-semibold text-gray-900"> 5+ countries</span>—and we're just getting started.
                  </p>
                </div>

                {/* Milestone chips */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {[
                    "2019 — Founded",
                    "First AI Pilot (2020)",
                    "KMP Expansion (2021)",
                    "Global Pods (2022)",
                    "100+ Launches (2023)",
                    "AI Copilots @ Scale (2024→)",
                  ].map((m) => (
                      <span
                          key={m}
                          className="inline-flex items-center rounded-full border border-white/70 bg-white/80 backdrop-blur px-3 py-1.5 text-[13px] text-gray-700 shadow-[0_8px_24px_-12px_rgba(2,6,23,0.14)]"
                      >
              {m}
            </span>
                  ))}
                </div>

                {/* Quote card */}
                <div className="mt-8">
                  <div className="rounded-2xl p-[1px] bg-gradient-to-br from-primary/40 via-fuchsia-400/30 to-sky-400/30">
                    <div className="rounded-[14px] bg-white/90 backdrop-blur p-5 sm:p-6 border border-white/70 shadow-[0_16px_48px_-20px_rgba(2,6,23,0.18)]">
                      <figure>
                        <blockquote className="text-gray-800 leading-relaxed">
                          "Our best work happens when product, design, and engineering sit at the same table.
                          We keep cycles tight, decisions clear, and outcomes visible."
                        </blockquote>
                        <figcaption className="mt-3 text-sm text-gray-500">
                          — Revzion Delivery Playbook
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual / proof card */}
              <div className="lg:col-span-5">
                <div className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-primary/40 via-fuchsia-400/30 to-sky-400/30">
                  <div className="rounded-[14px] overflow-hidden bg-white/90 backdrop-blur border border-white/70 shadow-[0_22px_60px_-24px_rgba(2,6,23,0.22)]">
                    <div className="aspect-[4/3] bg-gray-100 relative">
                      <img
                          src="/about/collage.jpg"
                          alt="Revzion product snapshots & moments"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                      />
                      {/* subtle corner badge */}
                      <div className="absolute bottom-3 right-3 rounded-full border border-white/70 bg-white/90 backdrop-blur px-3 py-1.5 text-xs text-gray-700 shadow">
                        Trusted by teams in 5+ countries
                      </div>
                    </div>

                    {/* Credibility bar */}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        {[
                          { k: "NPS", v: "72" },
                          { k: "On-Time", v: "96%" },
                          { k: "Launches", v: "100+" },
                        ].map((it) => (
                            <div key={it.k} className="text-center flex-1">
                              <div className="font-heading text-xl text-gray-900">{it.v}</div>
                              <div className="text-xs text-gray-500">{it.k}</div>
                            </div>
                        ))}
                      </div>
                      <div className="mt-4 h-1.5 w-full rounded-full bg-gray-200/70 overflow-hidden">
                        <div className="h-full w-2/3 bg-gradient-revzion rounded-full" />
                      </div>
                      <p className="mt-3 text-xs text-gray-500">
                        Delivery confidence grows with every weekly demo and decision log.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ============== RECOGNITION & PARTNERSHIPS ============== */}
        <section className="py-18 sm:py-20 bg-white">
          <motion.div
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
                Recognition & Global Partnerships
              </h2>
              <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
                External validation and regional collaboration that strengthen delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Copy */}
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Revzion is recognized on <strong>GoodFirms</strong> as a verified
                  software development and consulting company, acknowledged for
                  delivering reliable, scalable, and high-quality digital solutions.
                </p>

                <p>
                  To support clients across the Middle East with local alignment and
                  faster execution, we collaborate with <strong>TechXellent</strong>, a
                  Saudi Arabia–based technology company. This partnership enables
                  region-specific delivery while Revzion retains full ownership of
                  engineering standards, architecture, and accountability.
                </p>
              </div>

              {/* Logos */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">

                {/* GoodFirms Partner Badge (PRIMARY) */}
                <div className="flex justify-center">
                  <Image
                      src="/logos/goodfirms_partner.svg"
                      alt="GoodFirms Partner Badge"
                      width={260}
                      height={260}
                      priority
                      className="
        w-[200px]
        sm:w-[240px]
        md:w-[280px]
        lg:w-[300px]
        h-auto
        object-contain
        drop-shadow-md
      "
                  />
                </div>

                {/* TechXellent Logo (SECONDARY) */}
                <div className="flex justify-center">
                  <Image
                      src="/logos/techxellent.svg"
                      alt="TechXellent Saudi Arabia"
                      width={260}
                      height={80}
                      className="
        w-[160px]
        sm:w-[200px]
        md:w-[240px]
        h-auto
        object-contain
        opacity-90
      "
                  />
                </div>

              </div>
            </div>
          </motion.div>
        </section>

        {/* ============== VALUES (bento glass) ============== */}
        <section ref={valuesRef} className="py-18 sm:py-20 bg-gray-50">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              {...(mdUp ? { whileInView: "show", viewport: { once: true, amount: 0.25 } } : { animate: "show" })}
          >
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Principles that keep us fast, thoughtful, and reliable.
              </p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
                variants={staggerParent}
                initial="hidden"
                {...(mdUp ? { whileInView: "show", viewport: { once: true, amount: 0.22, margin: "-10% 0px" } } : { animate: "show" })}
            >
              {values.map((v) => (
                  <motion.div key={v.title} variants={revealOnce}>
                    <Card className="rvz-spotlight group border-0 shadow-md hover:shadow-xl transition-shadow rounded-2xl bg-white/70 backdrop-blur h-full relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(120px_120px_at_var(--mx,50%)_var(--my,50%),rgba(59,130,246,0.08),transparent_70%)]" />
                      <div className="p-6 sm:p-7 gsap-value-card">
                        <div className="inline-flex items-center justify-center rounded-xl bg-gradient-revzion text-white h-11 w-11 sm:h-12 sm:w-12 mb-4">
                          {v.icon}
                        </div>
                        <h3 className="text-lg sm:text-xl font-heading font-semibold text-gray-900 mb-2">{v.title}</h3>
                        <p className="text-gray-600">{v.description}</p>
                      </div>
                    </Card>
                  </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ============== TEAM ============== */}
        <section ref={teamRef} className="py-18 sm:py-20 bg-white">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              {...(mdUp ? { whileInView: "show", viewport: { once: true, amount: 0.25 } } : { animate: "show" })}
          >
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                A compact senior team shipping at startup speed with enterprise discipline.
              </p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                variants={staggerParent}
                initial="hidden"
                {...(mdUp ? { whileInView: "show", viewport: { once: true, amount: 0.22, margin: "-10% 0px" } } : { animate: "show" })}
            >
              {teamMembers.map((m) => (
                  <motion.div key={m.name} variants={revealOnce}>
                    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-primary/40 via-fuchsia-400/30 to-sky-400/30 gsap-team-card">
                      <Card className="overflow-hidden rounded-[15px] border border-white/60 bg-white/80 backdrop-blur shadow-[0_18px_50px_-20px_rgba(2,6,23,0.22)]">
                        <div className="aspect-square overflow-hidden bg-gray-100">
                          <Image
                              src={m.image || "/placeholder.svg"}
                              alt={m.name}
                              width={640}
                              height={640}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-heading font-semibold text-gray-900">{m.name}</h3>
                          <p className="text-primary font-medium mb-2">{m.role}</p>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">{m.bio}</p>
                          <div className="flex space-x-3">
                            {m.linkedin && (
                                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label={`${m.name} on LinkedIn`}>
                                  <Linkedin className="h-5 w-5" />
                                </a>
                            )}
                            {m.twitter && (
                                <a href={m.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label={`${m.name} on Twitter/X`}>
                                  <Twitter className="h-5 w-5" />
                                </a>
                            )}
                            {m.github && (
                                <a href={m.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label={`${m.name} on GitHub`}>
                                  <Github className="h-5 w-5" />
                                </a>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
              ))}
            </motion.div>

            {/* Extended Team */}
            <div className="text-center mt-10">
              <div className="inline-flex rounded-full p-[1.5px] bg-gradient-to-r from-primary via-fuchsia-400 to-sky-400 shadow-[0_10px_40px_-12px_rgba(2,6,23,0.35)]">
                <Button
                    onClick={() => setShowMore(v => !v)}
                    className="px-6 h-11 rounded-full bg-white/90 backdrop-blur text-gray-900"
                    variant="ghost"
                >
                  {showMore ? "Hide Extended Team" : `See More Team (${extendedTeam.length})`}
                </Button>
              </div>
            </div>

            {showMore && (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10"
                    variants={staggerParent}
                    initial="hidden"
                    animate="show"
                >
                  {extendedTeam.map((m) => (
                      <motion.div key={m.name} variants={revealOnce}>
                        <Card className="overflow-hidden border-0 bg-white/80 backdrop-blur shadow-[0_14px_42px_-20px_rgba(2,6,23,0.2)]">
                          <div className="p-5">
                            <h3 className="text-lg font-heading font-semibold text-gray-900">{m.name}</h3>
                            <p className="text-primary text-sm mb-1">{m.role}</p>
                            <p className="text-gray-600 text-xs">{m.bio}</p>
                          </div>
                        </Card>
                      </motion.div>
                  ))}
                </motion.div>
            )}
          </motion.div>
        </section>

        {/* ============== AWARDS (snap carousel) ============== */}
        <section className="py-18 sm:py-20 bg-gray-50">
          <motion.div
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              {...(mdUp ? { whileInView: "show", viewport: { once: true, amount: 0.25 } } : { animate: "show" })}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-3">Awards & Recognition</h2>
              <p className="text-lg sm:text-xl text-gray-600">Honored by industry leaders for innovation and excellence.</p>
            </div>

            <div className="-mx-4 px-4">
              <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-2 no-scrollbar [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                {awards.map((a) => (
                    <div key={a.title} className="snap-center shrink-0 w-[86%] sm:w-[46%] lg:w-[32%]">
                      <Card className="p-6 text-left border border-white/70 bg-white/85 backdrop-blur hover:shadow-xl transition-shadow">
                        <div className="flex items-start space-x-4">
                          <Award className="h-7 w-7 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-heading font-semibold text-gray-900 mb-1">{a.title}</h3>
                            <p className="text-gray-600">{a.organization}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-revzion">
          <motion.div
              className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
              variants={revealOnce}
              initial="hidden"
              {...(mdUp ? { whileInView: "show", viewport: { once: true, amount: 0.25 } } : { animate: "show" })}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with thoughtful design and solid engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
                <Link href="/contact">Get In Touch</Link>
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

        {/* small helper: hide scrollbars on snap rows */}
        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
  );
}