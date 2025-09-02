"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ArrowRight,
    Gift,
    Handshake,
    BadgeDollarSign,
    Users,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
    Clock4,
    Rocket,
} from "lucide-react";
import { Footer } from "@/components/footer"; // ← add this

/** ----- Config (easy to tweak later) ----- */
const PROGRAM = {
    headline: "Revzion Referral Program",
    subhead:
        "Earn rewards for introducing teams that need product, AI, or platform help. Simple terms, transparent tracking.",
    rewardPrimary: "10% finder’s fee",
    rewardPrimaryNote: "of the first paid invoice (capped at $10,000)",
    rewardAlt: "OR $1,000 credit",
    rewardAltNote: "toward any Revzion engagement (your choice)",
    termsSummary: [
        "Qualified lead = intro to a decision-maker + discovery call set.",
        "Reward is paid within 14 days of their first paid invoice.",
        "If they’re already in conversation with us, we’ll tell you right away.",
    ],
};

const revealOnce: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function ReferralProgramPage() {
    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "Revzion Referral Program",
                        description:
                            "Earn rewards for referring companies to Revzion. Simple terms, transparent tracking, and fast payouts.",
                    }),
                }}
            />

            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <motion.div
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
                >
                    <div className="grid gap-8 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs text-blue-700 shadow-sm">
                                <Sparkles className="h-3.5 w-3.5" /> Invite &amp; earn
                            </div>
                            <h1 className="mt-4 text-4xl sm:text-5xl font-heading font-bold text-gray-900">
                                {PROGRAM.headline}
                            </h1>
                            <p className="mt-4 text-lg text-gray-700 max-w-2xl">
                                {PROGRAM.subhead}
                            </p>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Button asChild size="lg" className="bg-gradient-revzion">
                                    <Link href="#refer-form">
                                        Make a referral <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="#how-it-works">How it works</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="lg:sticky lg:top-24 rounded-2xl border border-blue-200 bg-white/80 backdrop-blur p-5 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <Gift className="h-6 w-6 text-primary mt-0.5" />
                                    <div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {PROGRAM.rewardPrimary}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {PROGRAM.rewardPrimaryNote}
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">— or —</div>
                                        <div className="mt-2 text-lg font-semibold text-gray-900">
                                            {PROGRAM.rewardAlt}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {PROGRAM.rewardAltNote}
                                        </div>
                                    </div>
                                </div>
                                <ul className="mt-4 space-y-2">
                                    {PROGRAM.termsSummary.map((t) => (
                                        <li
                                            key={t}
                                            className="flex items-start gap-2 text-sm text-gray-700"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="py-16 sm:py-20 bg-white">
                <motion.div
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
                            How it works
                        </h2>
                        <p className="mt-3 text-lg text-gray-600">
                            Three simple steps — we keep you in the loop the whole way.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Users className="h-6 w-6" />,
                                title: "1) Intro",
                                copy:
                                    "Send a warm intro to a decision-maker (or use the form below). We’ll schedule discovery.",
                            },
                            {
                                icon: <Handshake className="h-6 w-6" />,
                                title: "2) Qualification",
                                copy:
                                    "If it’s a fit, we’ll scope a pilot or engagement and keep you updated on status.",
                            },
                            {
                                icon: <BadgeDollarSign className="h-6 w-6" />,
                                title: "3) Payout",
                                copy:
                                    "When their first invoice is paid, you receive your reward within 14 days.",
                            },
                        ].map((s) => (
                            <Card
                                key={s.title}
                                className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 shadow-sm"
                            >
                                <div className="flex items-center gap-3 text-primary">
                                    {s.icon}
                                    <h3 className="text-lg font-heading font-semibold text-gray-900">
                                        {s.title}
                                    </h3>
                                </div>
                                <p className="mt-2 text-gray-700">{s.copy}</p>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* WHAT MAKES A GOOD REFERRAL */}
            <section className="py-16 bg-gray-50">
                <motion.div
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
                            What makes a great referral?
                        </h2>
                        <p className="mt-3 text-lg text-gray-600">
                            These patterns typically turn into successful projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Rocket className="h-5 w-5" />,
                                title: "New Product or AI Initiative",
                                copy:
                                    "They need a pod to design, build, and ship a v1 or a pilot AI assistant.",
                            },
                            {
                                icon: <Clock4 className="h-5 w-5" />,
                                title: "Tight Deadline",
                                copy:
                                    "They must hit a launch window and need senior capacity to accelerate.",
                            },
                            {
                                icon: <ShieldCheck className="h-5 w-5" />,
                                title: "Secure & Scalable",
                                copy:
                                    "They care about quality, observability, and compliance from day one.",
                            },
                        ].map((b) => (
                            <Card
                                key={b.title}
                                className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-revzion text-white">
                    {b.icon}
                  </span>
                                    <h3 className="text-lg font-heading font-semibold text-gray-900">
                                        {b.title}
                                    </h3>
                                </div>
                                <p className="mt-2 text-gray-700">{b.copy}</p>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* REFER FORM */}
            <section id="refer-form" className="py-16 sm:py-20 bg-white">
                <motion.div
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
                            Make a referral
                        </h2>
                        <p className="mt-3 text-gray-600">
                            Prefer email? Send an intro to{" "}
                            <a
                                className="text-primary underline underline-offset-2"
                                href="mailto:contact@revzion.com"
                            >
                                contact@revzion.com
                            </a>
                            .
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget as HTMLFormElement);
                            // TODO: POST to /api/referrals (create this endpoint)
                            alert("Thanks! We’ll follow up within 24–48 hours.");
                        }}
                        className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 shadow-sm space-y-4"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Your name
                                </label>
                                <input
                                    required
                                    name="referrer_name"
                                    placeholder="Jane Doe"
                                    className="mt-1 h-11 w-full rounded-xl border border-gray-200 bg-white/80 px-3 outline-none text-[15px] shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Your email
                                </label>
                                <input
                                    required
                                    name="referrer_email"
                                    type="email"
                                    placeholder="jane@you.com"
                                    className="mt-1 h-11 w-full rounded-xl border border-gray-200 bg-white/80 px-3 outline-none text-[15px] shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Referral name
                                </label>
                                <input
                                    required
                                    name="lead_name"
                                    placeholder="Alex Smith"
                                    className="mt-1 h-11 w-full rounded-xl border border-gray-200 bg-white/80 px-3 outline-none text-[15px] shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Referral email
                                </label>
                                <input
                                    required
                                    name="lead_email"
                                    type="email"
                                    placeholder="alex@company.com"
                                    className="mt-1 h-11 w-full rounded-xl border border-gray-200 bg-white/80 px-3 outline-none text-[15px] shadow-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Context (what they need / timeline / budget signals)
                            </label>
                            <textarea
                                name="context"
                                rows={4}
                                className="mt-1 w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 outline-none text-[15px] shadow-sm"
                                placeholder="Briefly describe the opportunity…"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                            <p className="text-xs text-gray-500">
                                By submitting, you agree that you have permission to introduce
                                this contact. We’ll keep you posted on status.
                            </p>
                            <Button type="submit" className="bg-gradient-revzion">
                                Submit referral <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </section>

            {/* FAQ / TERMS */}
            <section className="py-16 bg-gray-50">
                <motion.div
                    variants={revealOnce}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
                            FAQ & Terms
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                q: "Who can participate?",
                                a:
                                    "Anyone who can make a warm intro to a qualified lead (agencies, founders, operators, engineers, designers).",
                            },
                            {
                                q: "What counts as a qualified lead?",
                                a:
                                    "An intro to a decision-maker where we complete a discovery call and scope an opportunity.",
                            },
                            {
                                q: "When do I get paid?",
                                a:
                                    "Within 14 days of the lead’s first paid invoice. We’ll confirm eligibility and amount via email.",
                            },
                            {
                                q: "Is there a limit on referrals?",
                                a:
                                    "No. You can refer multiple opportunities; rewards are paid per unique qualified engagement.",
                            },
                            {
                                q: "What if they’re already in our pipeline?",
                                a:
                                    "We’ll let you know promptly. If we’ve had material conversations recently, it won’t qualify.",
                            },
                            {
                                q: "Can I take credit instead of cash?",
                                a:
                                    "Yes — you can opt for a Revzion services credit instead of a cash reward.",
                            },
                        ].map((f) => (
                            <Card
                                key={f.q}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                            >
                                <h3 className="font-heading font-semibold text-gray-900">
                                    {f.q}
                                </h3>
                                <p className="mt-2 text-gray-700">{f.a}</p>
                            </Card>
                        ))}
                    </div>

                    <p className="mt-6 text-xs text-gray-500 text-center">
                        Final terms are confirmed in writing at time of referral. Revzion may
                        update program details at any time.
                    </p>
                </motion.div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-revzion">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold">
                        Know a team we should meet?
                    </h2>
                    <p className="mt-3 text-blue-100">
                        Send an intro and earn when we get them to impact.
                    </p>
                    <Button asChild size="lg" variant="secondary" className="mt-6">
                        <Link href="#refer-form">
                            Refer someone now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* FOOTER */}
            <Footer />
        </>
    );
}