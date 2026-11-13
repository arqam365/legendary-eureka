// Single source for every page FAQ: the visible accordion and the FAQPage JSON-LD both read from here,
// so structured data always matches on-page content (Google requirement).
import { createFAQSchema } from "@/lib/schemas"

export type Faq = { q: string; a: string }

export const faqJsonLd = (items: Faq[]) => createFAQSchema(items.map(({ q, a }) => ({ question: q, answer: a })))

export const HOME_FAQ: Faq[] = [
    {
        q: "What services does Revzion offer?",
        a: "Six disciplines: SaaS platforms, AI & automation, mobile & cross-platform apps (React Native, Kotlin Multiplatform), cloud & DevOps, data & intelligence, and custom enterprise software (ERP, CRM, HRMS).",
    },
    {
        q: "How long does it take to build a software product?",
        a: "A typical MVP takes 8–14 weeks from signed scope to production; a full platform 4–6 months. We ship in weekly slices with working demos each sprint.",
    },
    {
        q: "Do you work with startups or enterprises?",
        a: "Both. We adapt the process to your stage — tight scope and speed for startups, structured delivery and integration depth for established businesses.",
    },
    {
        q: "What does a typical engagement look like?",
        a: "A 1–2 week discovery to lock scope, risks and success metrics, then weekly sprints with demos and changelogs. After launch we can stay on to operate and extend the platform.",
    },
    {
        q: "How does pricing work?",
        a: "Fixed-scope projects with a locked estimate after discovery, or monthly retainers for a dedicated team. The Estimate page gives a rough range; contact us for a detailed quote.",
    },
    {
        q: "Where is Revzion based?",
        a: "Jhansi, Uttar Pradesh, India. We work remotely with clients in India, the Middle East and the UK, with overlap windows for live calls.",
    },
]

export const SERVICES_FAQ: Faq[] = [
    {
        q: "What software development services does Revzion offer?",
        a: "Six disciplines: SaaS platforms, AI & automation, cross-platform mobile apps (Kotlin Multiplatform, React Native), cloud & DevOps, data & intelligence, and custom enterprise software (ERP, CRM, HRMS).",
    },
    {
        q: "Does Revzion build iOS and Android apps?",
        a: "Yes — with Kotlin Multiplatform, React Native and Expo, or natively with SwiftUI and Jetpack Compose, depending on what the product needs.",
    },
    {
        q: "How do you estimate timeline and cost?",
        a: "We run a short discovery to map scope, risks and milestones, then give a conservative estimate with options (fixed scope or flexible capacity). For a quick range first, use the Estimate page.",
    },
    {
        q: "Can you work with our in-house team?",
        a: "Yes. We pair with your PM or tech lead, follow your existing rituals and repositories, and leave documentation and handoff sessions behind.",
    },
    {
        q: "Do you offer post-launch support?",
        a: "Yes — monitoring, incident response, dependency upgrades and ongoing feature work, on a retainer or milestone basis.",
    },
    {
        q: "What's your minimum engagement size?",
        a: "Our smallest engagements are typically fixed-scope projects of 4–6 weeks. If your need is smaller, we'll point you to someone better suited.",
    },
]

export const PROCESS_FAQ: Faq[] = [
    {
        q: "How does Revzion manage software projects?",
        a: "In six phases: Discovery & Alignment, Solution Design, Build in Iterations, Test & Harden, Launch, and Operate & Scale. Each phase has defined outputs and a clear handoff.",
    },
    {
        q: "How long is discovery?",
        a: "Usually 1–2 weeks — enough to map risks, define v1 and plan the first build.",
    },
    {
        q: "How often will we see progress?",
        a: "Weekly. Every sprint ends with a working demo and a changelog, so you always know what shipped and what's next.",
    },
    {
        q: "How are changes handled mid-project?",
        a: "We keep a cutline. New work enters the backlog, is sized, and is traded against lower-value scope.",
    },
    {
        q: "Do you handle security & compliance?",
        a: "Yes — we apply OWASP hardening, secret management and SSO, and can design controls that support your SOC 2 or GDPR obligations.",
    },
    {
        q: "What happens after launch?",
        a: "We move into Operate & Scale: monitoring, maintenance, experiments and roadmap work, usually on a monthly retainer.",
    },
]

export const CONTACT_FAQ: Faq[] = [
    {
        q: "How quickly does Revzion respond?",
        a: "We reply to every project inquiry within one business day.",
    },
    {
        q: "What should I include in my message?",
        a: "A short description of what you want to build, your rough timeline and, if you know it, a budget range. The Estimate page can help with a first range.",
    },
    {
        q: "Will you sign an NDA?",
        a: "Yes. We're happy to sign a mutual NDA before discussing sensitive product or business details — just mention it in your message.",
    },
    {
        q: "How long does a typical project take?",
        a: "An MVP usually takes 8–14 weeks; larger platforms run several months. You get a milestone plan during discovery.",
    },
    {
        q: "Do you work with early-stage startups?",
        a: "Yes. Our engagements scale from first products to established businesses, and we aim to prove value in the first sprint.",
    },
]

export const ABOUT_FAQ: Faq[] = [
    {
        q: "Who founded Revzion?",
        a: "Arqam Ahmad Siddiqui. Revzion began as Next Level Programmers in 2019 and has operated as Revzion since 2024.",
    },
    {
        q: "Where is Revzion based?",
        a: "Jhansi, Uttar Pradesh, India. We work remotely with clients in India, Saudi Arabia and the UK.",
    },
    {
        q: "How big is the team?",
        a: "A small senior team of engineers, designers and product specialists. For larger projects we work with trusted partners.",
    },
]

export const PORTFOLIO_FAQ: Faq[] = [
    {
        q: "What kind of projects has Revzion built?",
        a: "An AI-first LMS (Cognivia), a smart ring companion app and product site (Evolwe), an e-commerce store (Scottish Home Bargains) and websites (Mazencito, Everyday Fitness).",
    },
    {
        q: "Do you share source code from client projects?",
        a: "No — source code stays confidential. Case studies cover the problem, our approach, the stack and the outcome, and we go deeper on technical decisions in a call.",
    },
    {
        q: "Do you work with startups or established businesses?",
        a: "Both — from first products to established businesses modernising existing systems.",
    },
]
