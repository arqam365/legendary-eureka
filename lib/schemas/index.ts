/**
 * Advanced Schema Markup Library for Revzion
 * SEO · GEO · AEO — Structured data for search engines and AI models
 */

// ============================================================================
// ORGANIZATION SCHEMA
// ============================================================================

export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.revzion.in/#organization",

    "name": "Revzion",
    "legalName": "REVZION GLOBAL TECHNOLOGIES LLP",
    "alternateName": ["Next Level Programmers", "Revzion Tech", "Revzion Technologies"],
    "url": "https://www.revzion.in",

    "logo": {
        "@type": "ImageObject",
        "url": "https://www.revzion.in/brand/icon-512.png",
        "width": 512,
        "height": 512
    },
    "image": {
        "@type": "ImageObject",
        "url": "https://www.revzion.in/api/og",
        "width": 1200,
        "height": 630,
        "caption": "Revzion — Enterprise platforms, engineered to last."
    },

    "foundingDate": "2024-01-01",
    "foundingLocation": {
        "@type": "Place",
        "name": "Jhansi, Uttar Pradesh, India",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jhansi",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "IN",
            "postalCode": "284001"
        }
    },

    "founder": {
        "@type": "Person",
        "@id": "https://arqam365.com/#person",
        "name": "Arqam Ahmad Siddiqui",
        "alternateName": ["Arqam Ahmed Siddiqui"],
        "url": "https://arqam365.com",
        "jobTitle": "Founder & CEO",
        "description": "Founder and CEO of Revzion. Full-stack engineer specialising in SaaS architecture, AI-powered systems, and cross-platform mobile development with Kotlin Multiplatform.",
        "sameAs": [
            "https://www.linkedin.com/in/arqam365",
            "https://github.com/arqam365",
            "https://twitter.com/arqam365",
            "https://arqam365.com"
        ],
        "worksFor": { "@id": "https://www.revzion.in/#organization" },
        "nationality": { "@type": "Country", "name": "India" },
        "knowsAbout": [
            "SaaS Architecture",
            "Artificial Intelligence",
            "Machine Learning",
            "Kotlin Multiplatform",
            "Cross-Platform Mobile Development",
            "Next.js",
            "Cloud Architecture",
            "Startup Engineering",
            "Health Technology",
            "Wearable Integration"
        ]
    },

    "employee": [
        {
            "@type": "Person",
            "name": "Arqam Ahmad Siddiqui",
            "jobTitle": "Founder & CEO",
            "@id": "https://arqam365.com/#person",
            "worksFor": { "@id": "https://www.revzion.in/#organization" }
        }
    ],

    "description": "Revzion is a global software engineering company delivering scalable SaaS platforms, AI-powered systems, and cross-platform mobile applications. We build enterprise-grade software for startups and organisations that can't afford to compromise on reliability.",
    "slogan": "Enterprise platforms, engineered to last.",
    "tagline": "We design and build mission-critical software, AI systems, and cloud infrastructure.",

    "knowsAbout": [
        "SaaS Development",
        "Artificial Intelligence",
        "Machine Learning",
        "Kotlin Multiplatform Mobile",
        "Cross-Platform Development",
        "Mobile App Development",
        "iOS Development",
        "Android Development",
        "Next.js Development",
        "React Development",
        "TypeScript",
        "Cloud Architecture",
        "DevOps",
        "API Development",
        "Health Technology",
        "Wearable Integration",
        "BLE Connectivity",
        "E-commerce Development",
        "Web Development",
        "UI/UX Design",
        "Custom Software Development",
        "Enterprise Software Engineering",
        "Startup MVP Development"
    ],

    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jhansi",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "284001",
        "addressCountry": "IN"
    },
    "email": "connect@revzion.in",
    "telephone": "+91-6387161020",

    "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "United Kingdom" }
    ],

    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Revzion Engineering Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile App Development",
                    "description": "Cross-platform mobile application development using Kotlin Multiplatform, React Native, and native iOS/Android. Share 60–80% of code while maintaining native UI and performance.",
                    "provider": { "@id": "https://www.revzion.in/#organization" },
                    "url": "https://www.revzion.in/services"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "SaaS Platform Development",
                    "description": "Scalable software-as-a-service platforms with multi-tenant architecture, Stripe billing integration, role-based access control, and real-time analytics dashboards.",
                    "provider": { "@id": "https://www.revzion.in/#organization" },
                    "url": "https://www.revzion.in/services"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "AI & Automation Solutions",
                    "description": "Intelligent systems powered by LLMs, vector databases, and custom ML models. LLM copilots, RAG pipelines, embeddings search, and workflow automation.",
                    "provider": { "@id": "https://www.revzion.in/#organization" },
                    "url": "https://www.revzion.in/services"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "High-performance web applications built with Next.js, React, and TypeScript. Optimised for Core Web Vitals, SEO, and conversion.",
                    "provider": { "@id": "https://www.revzion.in/#organization" },
                    "url": "https://www.revzion.in/services"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Cloud & DevOps",
                    "description": "Secure cloud infrastructure on AWS, GCP, and Vercel. CI/CD pipelines, container orchestration and monitoring.",
                    "provider": { "@id": "https://www.revzion.in/#organization" },
                    "url": "https://www.revzion.in/services"
                }
            }
        ]
    },

    "sameAs": [
        "https://www.linkedin.com/company/revzion",
        "https://github.com/revzion",
        "https://twitter.com/revzion",
        "https://www.goodfirms.co/company/revzion"
    ],

    "knowsLanguage": ["en", "hi"],

    "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 1,
        "maxValue": 10
    },

    "industry": "Information Technology and Services",
    "naics": "541511"
};

// ============================================================================
// WEBSITE SCHEMA
// ============================================================================

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.revzion.in/#website",
    "name": "Revzion",
    "url": "https://www.revzion.in",
    "alternateName": ["Revzion Technologies", "Next Level Programmers"],
    "description": "Revzion builds enterprise-grade SaaS platforms, AI-powered systems, and cross-platform mobile applications for startups and organisations worldwide.",
    "publisher": { "@id": "https://www.revzion.in/#organization" },
    "inLanguage": "en-US",
    "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", "[data-speakable]"]
    }
};

// ============================================================================
// LOCAL BUSINESS SCHEMA
// ============================================================================

export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://www.revzion.in/#localbusiness",
    "name": "Revzion",
    "image": "https://www.revzion.in/api/og",
    "url": "https://www.revzion.in",
    "telephone": "+91-6387161020",
    "email": "connect@revzion.in",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jhansi",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "284001",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.4484,
        "longitude": 78.5685
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "19:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "14:00"
        }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "USD, INR",
    "paymentAccepted": "Credit Card, Bank Transfer, PayPal",
    "sameAs": [
        "https://www.linkedin.com/company/revzion",
        "https://github.com/revzion"
    ]
};

// ============================================================================
// BREADCRUMB SCHEMA
// ============================================================================

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

// ============================================================================
// ARTICLE SCHEMA (Blog Posts)
// ============================================================================

export const createArticleSchema = (article: {
    title: string;
    description: string;
    url: string;
    imageUrl?: string;
    datePublished: string;
    dateModified?: string;
    authorName: string;
    authorUrl?: string;
    keywords?: string[];
    category?: string;
}) => ({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.description,
    "url": article.url,
    ...(article.imageUrl && {
        "image": {
            "@type": "ImageObject",
            "url": article.imageUrl,
            "width": 1200,
            "height": 630
        }
    }),
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
        "@type": "Person",
        "name": article.authorName,
        "@id": "https://arqam365.com/#person",
        "url": article.authorUrl || "https://arqam365.com"
    },
    "publisher": {
        "@type": "Organization",
        "@id": "https://www.revzion.in/#organization",
        "name": "Revzion",
        "logo": {
        "@type": "ImageObject",
        "url": "https://www.revzion.in/brand/icon-512.png",
        "width": 512,
        "height": 512
    }
    },
    ...(article.keywords && { "keywords": article.keywords.join(", ") }),
    ...(article.category && { "articleSection": article.category }),
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": article.url
    },
    "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", ".article-summary"]
    }
});

// ============================================================================
// FAQ SCHEMA
// ============================================================================

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

// ============================================================================
// HOW-TO SCHEMA
// ============================================================================

export const createHowToSchema = (howTo: {
    name: string;
    description: string;
    image?: string;
    totalTime?: string;
    estimatedCost?: string;
    steps: Array<{ name: string; text: string; image?: string }>;
}) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howTo.name,
    "description": howTo.description,
    ...(howTo.image && { "image": howTo.image }),
    ...(howTo.totalTime && { "totalTime": howTo.totalTime }),
    ...(howTo.estimatedCost && {
        "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": howTo.estimatedCost
        }
    }),
    "supply": [
        { "@type": "HowToSupply", "name": "Project requirements document" },
        { "@type": "HowToSupply", "name": "Stakeholder alignment" }
    ],
    "step": howTo.steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        ...(step.image && { "image": step.image })
    }))
});

// ============================================================================
// REVIEW SCHEMA
// ============================================================================

export const createReviewSchema = (review: {
    itemName: string;
    itemUrl: string;
    rating: number;
    reviewBody: string;
    authorName: string;
    datePublished: string;
}) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
        "@type": "Service",
        "name": review.itemName,
        "url": review.itemUrl,
        "provider": { "@id": "https://www.revzion.in/#organization" }
    },
    "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
    },
    "reviewBody": review.reviewBody,
    "author": { "@type": "Person", "name": review.authorName },
    "datePublished": review.datePublished,
    "publisher": { "@id": "https://www.revzion.in/#organization" }
});

// ============================================================================
// SOFTWARE APPLICATION SCHEMA
// ============================================================================

export const createSoftwareSchema = (app: {
    name: string;
    description: string;
    url: string;
    image?: string;
    platforms: string[];
    version?: string;
    releaseDate?: string;
    price?: string;
    rating?: number;
    reviewCount?: number;
}) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": app.name,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": app.platforms.join(", "),
    "description": app.description,
    "url": app.url,
    ...(app.image && { "image": app.image }),
    "author": {
        "@type": "Organization",
        "@id": "https://www.revzion.in/#organization",
        "name": "Revzion"
    },
    "offers": {
        "@type": "Offer",
        "price": app.price || "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
    },
    ...(app.version && { "softwareVersion": app.version }),
    ...(app.releaseDate && { "datePublished": app.releaseDate }),
    ...(app.rating && app.reviewCount && {
    })
});

// ============================================================================
// JOB POSTING SCHEMA
// ============================================================================

export const createJobPostingSchema = (job: {
    title: string;
    description: string;
    employmentType: string;
    workHours?: string;
    datePosted: string;
    validThrough?: string;
    baseSalary?: { currency: string; minValue: number; maxValue: number };
    remote?: boolean;
}) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.datePosted,
    ...(job.validThrough && { "validThrough": job.validThrough }),
    "employmentType": job.employmentType,
    ...(job.workHours && { "workHours": job.workHours }),
    "hiringOrganization": {
        "@type": "Organization",
        "@id": "https://www.revzion.in/#organization",
        "name": "Revzion",
        "sameAs": "https://www.revzion.in",
        "logo": "https://www.revzion.in/brand/icon-512.png"
    },
    "jobLocation": {
        "@type": "Place",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jhansi",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "IN"
        }
    },
    ...(job.remote && {
        "jobLocationType": "TELECOMMUTE",
        "applicantLocationRequirements": {
            "@type": "Country",
            "name": "India"
        }
    }),
    ...(job.baseSalary && {
        "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": job.baseSalary.currency,
            "value": {
                "@type": "QuantitativeValue",
                "minValue": job.baseSalary.minValue,
                "maxValue": job.baseSalary.maxValue,
                "unitText": "YEAR"
            }
        }
    })
});

// ============================================================================
// SPEAKABLE SPECIFICATION HELPER (AEO — voice search)
// ============================================================================

export const createSpeakableSchema = (url: string, selectors: string[]) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": url,
    "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": selectors
    }
});

// ============================================================================
// EXPORTS
// ============================================================================

export const schemas = {
    organization: organizationSchema,
    website: websiteSchema,
    localBusiness: localBusinessSchema,
    createSoftware: createSoftwareSchema,
    createBreadcrumb: createBreadcrumbSchema,
    createArticle: createArticleSchema,
    createFAQ: createFAQSchema,
    createHowTo: createHowToSchema,
    createReview: createReviewSchema,
    createJobPosting: createJobPostingSchema,
    createSpeakable: createSpeakableSchema,
};

export default schemas;
