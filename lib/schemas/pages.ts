// ============================================
// HELPER FUNCTIONS (Must be defined FIRST)
// ============================================

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
    }))
});

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
});

// ============================================
// HOMEPAGE SCHEMAS (Now functions are available)
// ============================================

export const homeBreadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://www.revzion.com" }
]);

export const homepageFAQ = createFAQSchema([
    {
        question: "What services does Revzion offer?",
        answer: "Revzion offers comprehensive technology services including mobile app development (Kotlin Multiplatform, iOS, Android), SaaS development, AI & automation solutions, web development with Next.js and React, cloud architecture, and DevOps services."
    },
    {
        question: "What technologies does Revzion specialize in?",
        answer: "We specialize in Kotlin Multiplatform Mobile, Next.js, React, TypeScript, iOS (Swift/SwiftUI), Android (Kotlin/Jetpack Compose), AI technologies (OpenAI, Groq), cloud platforms (AWS, Firebase, Vercel), and modern DevOps practices."
    },
    {
        question: "How long does it take to build a mobile app?",
        answer: "A typical cross-platform mobile app takes 3-6 months from concept to App Store/Play Store launch. This includes discovery, design, development, testing, and submission. Timeline varies based on complexity and features."
    },
    {
        question: "Does Revzion work with startups or enterprises?",
        answer: "We work with both startups building MVPs and established enterprises scaling their platforms. We provide tailored solutions based on your stage, budget, and business goals."
    },
    {
        question: "Where is Revzion located?",
        answer: "Revzion is headquartered in Meerut, Uttar Pradesh, India. We operate as a remote-first company and serve clients globally across multiple time zones."
    },
    {
        question: "What is Kotlin Multiplatform?",
        answer: "Kotlin Multiplatform (KMP) is a technology that allows sharing 60-80% of code between iOS and Android apps while maintaining native UI and performance. It reduces development time and maintenance costs while ensuring high-quality user experience on both platforms."
    },
]);

// ============================================
// SERVICES PAGE SCHEMA
// ============================================

export const servicesPageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Revzion Services",
    "description": "Comprehensive technology services offered by Revzion",
    "itemListElement": [
        {
            "@type": "Service",
            "position": 1,
            "name": "Mobile App Development",
            "description": "Cross-platform and native mobile app development using Kotlin Multiplatform, React Native, iOS, and Android",
            "provider": {
                "@id": "https://www.revzion.com/#organization"
            },
            "serviceType": "Mobile Application Development",
            "areaServed": "Worldwide"
        },
        {
            "@type": "Service",
            "position": 2,
            "name": "SaaS Development",
            "description": "Scalable software-as-a-service platforms with multi-tenant architecture, billing, and analytics",
            "provider": {
                "@id": "https://www.revzion.com/#organization"
            },
            "serviceType": "Software as a Service Development",
            "areaServed": "Worldwide"
        },
        {
            "@type": "Service",
            "position": 3,
            "name": "AI & Automation",
            "description": "AI-powered solutions using OpenAI, Groq, vector databases, and machine learning",
            "provider": {
                "@id": "https://www.revzion.com/#organization"
            },
            "serviceType": "Artificial Intelligence Solutions",
            "areaServed": "Worldwide"
        },
        {
            "@type": "Service",
            "position": 4,
            "name": "Web Development",
            "description": "High-performance web applications built with Next.js, React, and TypeScript",
            "provider": {
                "@id": "https://www.revzion.com/#organization"
            },
            "serviceType": "Web Application Development",
            "areaServed": "Worldwide"
        },
        {
            "@type": "Service",
            "position": 5,
            "name": "Cloud & DevOps",
            "description": "Cloud infrastructure, CI/CD pipelines, and DevOps best practices",
            "provider": {
                "@id": "https://www.revzion.com/#organization"
            },
            "serviceType": "Cloud Infrastructure Services",
            "areaServed": "Worldwide"
        },
    ]
};

export const servicesBreadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://www.revzion.com" },
    { name: "Services", url: "https://www.revzion.com/services" },
]);

// ============================================
// PORTFOLIO PAGE SCHEMA
// ============================================

export const portfolioPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Revzion Portfolio",
    "description": "Portfolio of projects and case studies by Revzion",
    "url": "https://www.revzion.com/portfolio",
    "publisher": {
        "@id": "https://www.revzion.com/#organization"
    }
};

export const portfolioBreadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://www.revzion.com" },
    { name: "Portfolio", url: "https://www.revzion.com/portfolio" },
]);

// ============================================
// CONTACT PAGE SCHEMA
// ============================================

export const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Revzion",
    "description": "Get in touch with Revzion for your next project",
    "url": "https://www.revzion.com/contact",
    "mainEntity": {
        "@type": "Organization",
        "@id": "https://www.revzion.com/#organization"
    }
};

export const contactBreadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://www.revzion.com" },
    { name: "Contact", url: "https://www.revzion.com/contact" },
]);