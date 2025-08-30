import { ReactNode } from "react"
import { TrendingUp, Users, Zap, Target } from "lucide-react"

export type Metric = { label: string; value: string; icon?: ReactNode }
export type Study = {
    id: string
    slug?: string // optional alias if you want prettier URLs later
    title: string
    client: string
    category: string
    duration: string
    team: string
    heroImage: string
    gallery?: string[]
    technologies: string[]
    problem: {
        title: string
        description: string
        challenges: string[]
    }
    solution: {
        title: string
        description: string
        features: string[]
    }
    results: {
        title: string
        description: string
        metrics: Metric[]
    }
    summary?: string // short SEO description
}

export const CASE_STUDIES: Study[] = [
    {
        id: "beesocial",
        title: "BeeSocial – Social Media App",
        client: "BeeSocial Inc.",
        category: "Mobile App Development",
        duration: "6 months",
        team: "8 developers",
        heroImage: "/beesocial-case-study.png",
        gallery: ["/beesocial-1.png", "/beesocial-2.png", "/beesocial-3.png"],
        technologies: ["React Native", "Node.js", "MongoDB", "AWS", "Socket.io"],
        problem: {
            title: "The Challenge",
            description:
                "BeeSocial needed a cross-platform social app with real-time chat, sharing, and a scalable recommendation engine.",
            challenges: [
                "Real-time messaging at scale",
                "Complex recommendation algorithms",
                "Cross-platform compatibility",
                "High-performance media handling",
            ],
        },
        solution: {
            title: "Our Approach",
            description:
                "We used React Native for cross-platform parity, Socket.io for realtime interactions, and an AI-driven feed ranking pipeline.",
            features: [
                "Real-time messaging system",
                "AI-powered content recommendations",
                "Advanced media compression",
                "Scalable cloud infrastructure",
            ],
        },
        results: {
            title: "The Impact",
            description:
                "Successful launch with strong engagement metrics and retention.",
            metrics: [
                { label: "User Growth", value: "500K+", icon: <Users className="h-5 w-5" /> },
                { label: "Engagement Rate", value: "85%", icon: <TrendingUp className="h-5 w-5" /> },
                { label: "App Store Rating", value: "4.8/5", icon: <Target className="h-5 w-5" /> },
                { label: "Load Time", value: "<2s", icon: <Zap className="h-5 w-5" /> },
            ],
        },
        summary:
            "Cross-platform social app with real-time chat and AI ranking that scaled to 500K+ users.",
    },
    {
        id: "fintech-platform",
        title: "FinanceFlow – Banking Platform",
        client: "Regional Bank Corp",
        category: "FinTech Solution",
        duration: "8 months",
        team: "12 developers",
        heroImage: "/financeflow-case-study.png",
        gallery: ["/financeflow-1.png", "/financeflow-2.png"],
        technologies: ["React", "Python", "PostgreSQL", "Kubernetes", "Stripe"],
        problem: {
            title: "The Challenge",
            description:
                "Modernize legacy systems to deliver a secure digital banking experience with strict compliance.",
            challenges: [
                "Legacy system integration",
                "Regulatory compliance requirements",
                "Real-time transaction processing",
                "Multi-factor authentication",
            ],
        },
        solution: {
            title: "Our Approach",
            description:
                "Built a secure, scalable platform with microservices, an API gateway, and biometric auth.",
            features: [
                "Secure API gateway",
                "Biometric authentication",
                "Real-time fraud detection",
                "Microservices architecture",
            ],
        },
        results: {
            title: "The Impact",
            description: "Increased CSAT and reduced operating costs.",
            metrics: [
                { label: "Customer Satisfaction", value: "95%" },
                { label: "Transaction Speed", value: "3× faster" },
                { label: "Cost Reduction", value: "40%" },
                { label: "Security Score", value: "99.9%" },
            ],
        },
        summary:
            "Modern banking platform with secure microservices, API gateway, and biometric authentication.",
    },
]

export function getCaseStudyById(id: string) {
    return CASE_STUDIES.find((c) => c.id === id || c.slug === id) || null
}