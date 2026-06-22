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
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const revealOnce: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export default function AboutPage() {
  const getAvatarUrl = (name: string, gender: "male" | "female") => {
    const seed = encodeURIComponent(name);
    const backgrounds = "b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf";
    const beardParams =
      gender === "male"
        ? "&beard=variant01,variant02&beardProbability=100"
        : "&beardProbability=0";
    return `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}&backgroundColor=${backgrounds}${beardParams}`;
  };

  const teamMembers = [
    {
      name: "Arqam Ahmad Siddiqui",
      role: "Founder & CEO",
      bio: "Driving Revzion's vision with hands-on KMP, scalable cloud, and product leadership.",
      image: getAvatarUrl("Arqam Ahmad Siddiqui", "male"),
      linkedin: "https://www.linkedin.com/in/arqam365/",
      twitter: "https://x.com/arqam365",
      github: "https://github.com/arqam365",
      portfolio: "https://arqam365.com/",
    },
    {
      name: "Raj Dwivedi",
      role: "Backend Engineer & DevOps",
      bio: "APIs, CI/CD, and cloud-native reliability across Node/Ktor and modern infra.",
      image: getAvatarUrl("Raj Dwivedi", "male"),
      linkedin: "https://www.linkedin.com/in/badenforcer/",
      twitter: "",
      github: "https://github.com/BadEnforcer",
      portfolio: "https://rajdwivedi.vercel.app/",
    },
    {
      name: "Bilal Sheikh",
      role: "Full Stack Engineer",
      bio: "Bridging frontend and backend to ship robust, user-centric features.",
      image: getAvatarUrl("Bilal Sheikh", "male"),
      linkedin: "",
      twitter: "",
      github: "",
      portfolio: "https://stunning-waffle-2001.vercel.app/",
    },
    {
      name: "Sneha Sahu",
      role: "Head of Business Development",
      bio: "Building partnerships and growth pipelines aligned with product value.",
      image: getAvatarUrl("Sneha Sahu", "female"),
      linkedin: "",
      twitter: "",
      github: "",
      portfolio: "",
    },
    {
      name: "Saniya Khan",
      role: "UI/UX Developer",
      bio: "Designs intuitive, accessible interfaces with full implementation ownership.",
      image: getAvatarUrl("Saniya Khan", "female"),
      linkedin: "",
      twitter: "",
      github: "",
      portfolio: "",
    },
  ];

  const extendedTeam = [
    { name: "Gagandeep Singh", role: "Engineer", bio: "Full-stack & integrations." },
    { name: "Pulkit Shukla", role: "Engineer", bio: "Cloud & backend solutions." },
    { name: "Bharat Agarwal", role: "Engineer", bio: "Architecture & data." },
  ];

  const values = [
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Innovation First",
      description: "We ship ahead of the curve — R&D → prototypes → outcomes.",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Client Partnership",
      description: "We co-own the mission. Cadence, clarity, candor.",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Quality by Default",
      description: "Reliability, performance, and security are non-negotiable.",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "People-Centric",
      description: "Empathy in design. Accessibility as a rule, not an afterthought.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Agile Delivery",
      description: "Weekly demos, visible burn-up, and zero surprises at invoice time.",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Global Reach",
      description: "Built to scale and localize — any market, any region.",
    },
  ];

  const stats = [
    { value: "2019", label: "Founded" },
    { value: "15+", label: "Core & Extended Team" },
    { value: "50+", label: "Projects Delivered" },
    { value: "5+", label: "Countries Served" },
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
    "/logos/google.svg",
  ];

  const [showMore, setShowMore] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const logosRowRef = useRef<HTMLDivElement | null>(null);
  const valuesRef = useRef<HTMLElement | null>(null);

  /* GSAP — hero entrance + parallax */
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".gsap-hero-title", { y: 24, opacity: 0, duration: 0.6 })
        .from(".gsap-hero-copy", { y: 16, opacity: 0, duration: 0.5 }, "-=0.35")
        .from(".gsap-hero-stats > div", { y: 16, opacity: 0, stagger: 0.08, duration: 0.45 }, "-=0.25");

      gsap.to(".gsap-aurora-1", {
        yPercent: 8, xPercent: -6, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".gsap-aurora-2", {
        yPercent: -6, xPercent: 8, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* Logo marquee */
  useEffect(() => {
    if (!logosRowRef.current) return;
    const row = logosRowRef.current;
    let animationId: number;
    let position = 0;
    const singleSetWidth = row.scrollWidth / 3;
    let speed = 0.5;

    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= singleSetWidth) position = 0;
      row.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    const t = setTimeout(() => animate(), 100);
    const onEnter = () => { speed = 0.15; };
    const onLeave = () => { speed = 0.5; };
    row.addEventListener("mouseenter", onEnter);
    row.addEventListener("mouseleave", onLeave);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(animationId);
      row.removeEventListener("mouseenter", onEnter);
      row.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* Values spotlight */
  useEffect(() => {
    const container = valuesRef.current;
    if (!container) return;
    const onMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest(".rvz-spotlight") as HTMLElement | null;
      if (!card) return;
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

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden bg-gray-50 border-b border-gray-100">
        {/* Subtle dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Toned-down aurora blobs */}
        <div
          aria-hidden
          className="gsap-aurora-1 absolute -top-16 -left-16 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-primary/60 via-fuchsia-400/40 to-sky-400/40"
        />
        <div
          aria-hidden
          className="gsap-aurora-2 absolute -bottom-16 -right-16 h-[24rem] w-[24rem] rounded-full blur-3xl opacity-20 bg-gradient-to-tl from-sky-400/40 via-violet-400/40 to-primary/60"
        />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
          variants={revealOnce}
          initial="hidden"
          animate="show"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-8">
              <div className="space-y-5">
                <p className="text-xs font-semibold text-primary uppercase tracking-widest">About Us</p>
                <h1 className="gsap-hero-title text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight text-gray-900">
                  The team behind{" "}
                  <span className="text-gradient-revzion">Revzion</span>
                </h1>
                <p className="gsap-hero-copy text-lg text-gray-600 leading-relaxed max-w-xl">
                  A senior product & engineering studio building AI, SaaS, and cross-platform
                  experiences. We keep cycles tight, decisions clear, and outcomes visible.
                </p>
              </div>

              {/* Stats */}
              <div className="gsap-hero-stats grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                  >
                    <div className="text-2xl font-heading font-bold text-gray-900">{s.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-revzion hover:opacity-90 transition-opacity"
                >
                  <Link href="/contact">
                    Work With Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-white"
                >
                  <Link href="/portfolio">See Our Work</Link>
                </Button>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <img
                src="/modern-tech-team.png"
                alt="Revzion team"
                className="rounded-2xl shadow-lg w-full h-auto"
                loading="lazy"
              />
              {/* Credibility badge — GoodFirms verified */}
              <div className="absolute -bottom-5 -left-5 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">GoodFirms Verified</div>
                    <div className="text-xs text-gray-500">Certified Software Studio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Logo marquee */}
        <div className="relative z-10 border-t border-gray-200/70 bg-white/80 overflow-hidden">
          <div aria-hidden className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div aria-hidden className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div
              ref={logosRowRef}
              className="flex items-center gap-10 no-scrollbar"
              style={{ willChange: "transform" }}
            >
              {[...logos, ...logos, ...logos].map((src, i) => (
                <div key={i} className="shrink-0 h-7 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                  <Image src={src} alt="Technology partner" width={110} height={28} className="h-7 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-20 bg-white">
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="max-w-xl mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
              From a small studio to a global delivery partner.
            </h2>
            <p className="text-lg text-gray-600">Still obsessed with outcomes.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Copy */}
            <div className="lg:col-span-7 space-y-5">
              <p className="text-gray-600 leading-relaxed">
                Revzion (previously <em>Next Level Programmers</em>) began in 2019 with a simple
                idea: combine modern engineering with business clarity. No fluff — just measurable
                impact.
              </p>
              <p className="text-gray-600 leading-relaxed">
                What started as hands-on consulting has grown into end-to-end product delivery
                across AI, SaaS, and cross-platform experiences. We move fast but never break
                trust — weekly demos, transparent burn-up, and security by default.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today we've shipped{" "}
                <span className="font-semibold text-gray-900">50+ projects</span> across{" "}
                <span className="font-semibold text-gray-900">5+ countries</span> — and we're
                just getting started.
              </p>

              {/* Milestone timeline */}
              <div className="pt-4 space-y-3">
                {[
                  { year: "2019", event: "Founded as Next Level Programmers" },
                  { year: "2020", event: "First AI pilot shipped" },
                  { year: "2021", event: "KMP & cross-platform expansion" },
                  { year: "2022", event: "Global delivery pods established" },
                  { year: "2023", event: "50+ launches milestone" },
                  { year: "2024→", event: "AI copilots at scale" },
                ].map((m) => (
                  <div key={m.year} className="flex items-start gap-4">
                    <span className="text-xs font-semibold text-primary w-14 shrink-0 mt-0.5">
                      {m.year}
                    </span>
                    <span className="text-sm text-gray-600">{m.event}</span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-2 pl-4 border-l-2 border-primary/40">
                <p className="text-gray-700 leading-relaxed italic">
                  "Our best work happens when product, design, and engineering sit at the same
                  table. We keep cycles tight, decisions clear, and outcomes visible."
                </p>
                <footer className="mt-2 text-xs text-gray-400">— Revzion Delivery Playbook</footer>
              </blockquote>
            </div>

            {/* Proof card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <img
                    src="/modern-team-workspace.png"
                    alt="Revzion team workspace"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 right-3 rounded-lg border border-white/80 bg-white/90 px-3 py-1.5 text-xs text-gray-700 shadow-sm">
                    Trusted by teams in 5+ countries
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <div className="grid grid-cols-3 divide-x divide-gray-100">
                    {[
                      { k: "NPS", v: "72" },
                      { k: "On-Time", v: "96%" },
                      { k: "Launches", v: "50+" },
                    ].map((it) => (
                      <div key={it.k} className="text-center px-3">
                        <div className="text-lg font-heading font-bold text-gray-900">{it.v}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{it.k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Recognition & Partnerships ── */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="max-w-xl mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Recognition & Partnerships
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
              External validation and regional reach.
            </h2>
            <p className="text-lg text-gray-600">
              Independent recognition and strategic partnerships that strengthen our delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Revzion is recognized on{" "}
                <strong className="text-gray-900">GoodFirms</strong> as a verified software
                development and consulting company — acknowledged for delivering reliable,
                scalable, and high-quality digital solutions.
              </p>
              <p>
                To support clients across the Middle East with local alignment and faster
                execution, we collaborate with{" "}
                <strong className="text-gray-900">TechXellent</strong>, a Saudi Arabia–based
                technology company. This partnership enables region-specific delivery while
                Revzion retains full ownership of engineering standards, architecture, and
                accountability.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <Image
                src="/logos/goodfirms_partner.svg"
                alt="GoodFirms Partner Badge"
                width={240}
                height={240}
                priority
                className="w-[180px] sm:w-[220px] h-auto object-contain drop-shadow-sm"
              />
              <Image
                src="/logos/techxellent.svg"
                alt="TechXellent Saudi Arabia"
                width={240}
                height={80}
                className="w-[140px] sm:w-[180px] h-auto object-contain opacity-90"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Values ── */}
      <section ref={valuesRef} className="py-20 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="max-w-xl mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              Values
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
              How we think and work.
            </h2>
            <p className="text-lg text-gray-600">
              Principles that keep us fast, thoughtful, and reliable — on every engagement.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={revealOnce}>
                <Card className="rvz-spotlight group border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white h-full relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(120px_120px_at_var(--mx,50%)_var(--my,50%),rgba(59,130,246,0.07),transparent_70%)]" />
                  <div className="p-6">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary/15 transition-colors">
                      {v.icon}
                    </div>
                    <h3 className="text-base font-heading font-semibold text-gray-900 mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="max-w-xl mb-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              The Team
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
              Meet the people behind the work.
            </h2>
            <p className="text-lg text-gray-600">
              A compact senior team shipping at startup speed with enterprise discipline.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {teamMembers.map((m) => (
              <motion.div key={m.name} variants={revealOnce}>
                <Card className="group border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl bg-white overflow-hidden h-full">
                  {/* Avatar */}
                  <div className="h-48 bg-gray-50 overflow-hidden">
                    <img
                      src={m.image || "/placeholder.svg"}
                      alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-sm font-heading font-bold text-gray-900 mb-0.5">
                      {m.portfolio ? (
                        <a
                          href={m.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {m.name}
                        </a>
                      ) : (
                        m.name
                      )}
                    </h3>
                    <p className="text-xs font-medium text-primary mb-3">{m.role}</p>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{m.bio}</p>

                    {/* Social links — only render if actual URL */}
                    {(m.linkedin || m.twitter || m.github || m.portfolio) && (
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                        {m.portfolio && (
                          <a
                            href={m.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-500 hover:bg-primary hover:text-white transition-colors"
                            aria-label={`${m.name} portfolio`}
                          >
                            <Globe className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {m.linkedin && (
                          <a
                            href={m.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-500 hover:bg-primary hover:text-white transition-colors"
                            aria-label={`${m.name} on LinkedIn`}
                          >
                            <Linkedin className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {m.twitter && (
                          <a
                            href={m.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-500 hover:bg-primary hover:text-white transition-colors"
                            aria-label={`${m.name} on X`}
                          >
                            <Twitter className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {m.github && (
                          <a
                            href={m.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-500 hover:bg-primary hover:text-white transition-colors"
                            aria-label={`${m.name} on GitHub`}
                          >
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Extended Team toggle */}
          <div className="mt-10 text-center">
            <Button
              onClick={() => setShowMore((v) => !v)}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-white"
            >
              {showMore
                ? "Hide extended team"
                : `Show ${extendedTeam.length} more contributors`}
            </Button>
          </div>

          {showMore && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8"
              variants={staggerParent}
              initial="hidden"
              animate="show"
            >
              {extendedTeam.map((m) => (
                <motion.div key={m.name} variants={revealOnce}>
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                    <p className="text-xs text-primary font-medium mt-0.5">{m.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{m.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={revealOnce}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
            Ready to work together?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            We take on a small number of new engagements each quarter. Tell us what you're
            building and we'll be straight about whether we're the right fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-gradient-revzion hover:opacity-90 text-white" asChild>
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
