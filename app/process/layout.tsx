import type { Metadata } from "next"
import { createBreadcrumbSchema, createFAQSchema, createHowToSchema } from "@/lib/schemas"

export const metadata: Metadata = {
    title: "Our engineering process",
    description: "Learn how Revzion delivers software — from Discovery & Alignment through Solution Design, Iterative Build, Test & Harden, Launch, and Operate & Scale. A proven 6-phase engineering framework.",
    keywords: [
        "software development process", "agile development process", "how Revzion works",
        "software engineering framework", "iterative development", "sprint-based development",
        "software delivery process", "product development methodology", "Revzion process"
    ],
    alternates: { canonical: "/process" },
    openGraph: {
        type: "website",
        url: "https://www.revzion.in/process",
        title: "Our Engineering Process | Revzion",
        description: "A 6-phase engineering framework: Discovery → Design → Build → Harden → Launch → Scale.",
        images: [{ url: "/api/og?page=process", width: 1200, height: 630, alt: "Revzion Process" }],
    },
}

const processBreadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://www.revzion.in" },
    { name: "Process", url: "https://www.revzion.in/process" },
])

const processHowTo = createHowToSchema({
    name: "How Revzion Delivers Software: 6-Phase Engineering Process",
    description: "Revzion's proven 6-phase framework for delivering mission-critical software — from discovery to production and beyond.",
    totalTime: "P3M",
    steps: [
        {
            name: "Discovery & Alignment",
            text: "Stakeholders, goals, risks, and success criteria captured as lean, testable assumptions. Outputs: problem statement, north-star KPIs, risk register, and constraints doc."
        },
        {
            name: "Solution Design",
            text: "Flows, wireframes, and technical architecture with early estimates and a cutline for v1. Outputs: user flows, wireframes, system design, and v1 scope & estimate."
        },
        {
            name: "Build in Iterations",
            text: "Weekly sprint demos. We ship vertical slices that prove value end-to-end. Outputs: sprint plan, demo builds, changelog, and burndown/burnup tracking."
        },
        {
            name: "Test & Harden",
            text: "Automated tests, security checks, and performance budgets before rollout. Outputs: test suite, performance budget report, security checklist, and UAT sign-off."
        },
        {
            name: "Launch",
            text: "Feature flags and gradual rollouts with monitoring to de-risk and learn fast. Outputs: release notes, runbook, monitoring & alerts, and rollback strategy."
        },
        {
            name: "Operate & Scale",
            text: "SLOs, roadmap, and experiments to keep pushing outcomes after launch. Outputs: SLOs/SLAs, roadmap, analytics dashboards, and experiment backlog."
        },
    ]
})

const processFAQ = createFAQSchema([
    {
        question: "How does Revzion manage software projects?",
        answer: "Revzion uses a 6-phase engineering framework: Discovery & Alignment, Solution Design, Build in Iterations (weekly sprints with demos), Test & Harden, Launch (with feature flags and gradual rollout), and Operate & Scale. Every phase has defined outputs and clear handoffs."
    },
    {
        question: "How often does Revzion provide project updates?",
        answer: "Weekly. Every sprint ends with a working demo, a changelog, and an updated burndown chart. You always know what was shipped, what's next, and where the project stands — no status meetings needed."
    },
    {
        question: "Does Revzion follow agile methodology?",
        answer: "We follow a pragmatic agile approach — weekly iterations with working deliverables, continuous integration, and frequent stakeholder feedback. We skip ceremony-heavy processes in favour of actual shipped software."
    },
    {
        question: "What happens after launch?",
        answer: "Post-launch, we move into an Operate & Scale phase: monitoring SLOs, shipping experiments, maintaining infrastructure, and evolving the product roadmap. Most clients stay on a monthly retainer for ongoing development."
    },
    {
        question: "How long does the Discovery phase take?",
        answer: "Discovery & Alignment typically takes 1–2 weeks. It includes stakeholder interviews, technical assessment, risk identification, scope definition, and a fixed estimate for the build phase."
    },
])

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(processBreadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(processHowTo) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(processFAQ) }} />
            {children}
        </>
    )
}
