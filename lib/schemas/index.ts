/**
 * Advanced Schema Markup Library for Revzion
 * Provides comprehensive structured data for AI models and search engines
 */

// ============================================================================
// ORGANIZATION SCHEMA (Enhanced)
// ============================================================================

export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.revzion.com/#organization",

    // Core Identity
    "name": "Revzion",
    "legalName": "Revzion Technologies",
    "alternateName": ["Next Level Programmers", "Revzion Tech"],
    "url": "https://www.revzion.com",

    // Visual Identity
    "logo": {
        "@type": "ImageObject",
        "url": "https://www.revzion.com/logo.svg",
        "width": 512,
        "height": 512,
        "caption": "Revzion Logo"
    },
    "image": {
        "@type": "ImageObject",
        "url": "https://www.revzion.com/og-image.png",
        "width": 1200,
        "height": 630,
        "caption": "Revzion - Innovating Products. Empowering Businesses."
    },

    // Founding Information
    "foundingDate": "2024-01-01",
    "foundingLocation": {
        "@type": "Place",
        "name": "Meerut, Uttar Pradesh, India",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Meerut",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "IN",
            "postalCode": "250001"
        }
    },

    // Founder Information (Linked Entity)
    // Founder Information (Canonical Person Entity)
    "founder": {
        "@type": "Person",
        "@id": "https://arqam365.com/#person",

        // Canonical Name
        "name": "Arqam Ahmad Siddiqui",

        // Misspellings, aliases, usernames (SEO + GEO unification)
        "alternateName": [
            "Arqam Ahmed Siddiqui",
            "Arqam Ahmad",
            "Arqam Ahmed",
            "Arqam Siddiqui",
            "Arkam Siddiqui",
            "Akram Siddiqui",
            "Arquam Siddiqui",
            "Aqram Siddique",
            "arqam365",
            "@arqam365"
        ],

        // Identity
        "url": "https://arqam365.com",
        "jobTitle": "Founder & CEO",
        "description": "Founder and CEO of Revzion, specializing in SaaS, AI solutions, and cross-platform mobile development using Kotlin Multiplatform and modern web technologies.",

        // Contact (safe to keep email here)
        "email": "arqam@revzion.com",

        // Social & authority signals
        "sameAs": [
            "https://www.linkedin.com/in/arqam365",
            "https://github.com/arqam365",
            "https://twitter.com/arqam365"
        ],

        // Organizational linkage (important for entity graph)
        "worksFor": {
            "@id": "https://www.revzion.com/#organization"
        },

        // Nationality / GEO hint (lightweight, non-invasive)
        "nationality": {
            "@type": "Country",
            "name": "India"
        },

        // Knows About (ties person → expertise → company services)
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

    // Team Structure
    "employee": [
        {
            "@type": "Person",
            "name": "Arqam Ahmad Siddiqui",
            "jobTitle": "Founder & CEO",
            "@id": "https://arqam365.com/#person",
            "worksFor": {
                "@id": "https://www.revzion.com/#organization"
            }
        }
    ],

    // Company Description
    "description": "Revzion is a mobile-first technology company specializing in SaaS development, AI solutions, and cross-platform mobile applications. We build scalable solutions for startups and enterprises using modern technologies like Kotlin Multiplatform, Next.js, and AI.",
    "slogan": "Innovating Products. Empowering Businesses.",
    "tagline": "Making technology accessible through world-class engineering",

    // Expertise Areas
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
        "Custom Software Development"
    ],

    // Contact Information
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jhansi",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "284001",
        "addressCountry": "IN"
    },
    "email": "contact@revzion.com",
    "telephone": "+91-6387161020", // Add real number

    // Service Area
    "areaServed": [
        {
            "@type": "Place",
            "name": "Worldwide"
        },
        {
            "@type": "Country",
            "name": "India"
        },
        {
            "@type": "Country",
            "name": "United States"
        },
        {
            "@type": "Country",
            "name": "United Kingdom"
        },
        {
            "@type": "Country",
            "name": "Canada"
        },
        {
            "@type": "Country",
            "name": "Australia"
        },
        {
            "@type": "Country",
            "name": "New Zealand"
        },
        {
            "@type": "Country",
            "name": "Singapore"
        },
        {
            "@type": "Country",
            "name": "Saudia Arabia"
        },
        {
            "@type": "Country",
            "name": "Qatar"
        },
        {
            "@type": "Country",
            "name": "United Arab Emirates"
        }
    ],

    // Services Offered
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Revzion Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile App Development",
                    "description": "Cross-platform mobile application development using Kotlin Multiplatform, React Native, and native iOS/Android",
                    "provider": {
                        "@id": "https://www.revzion.com/#organization"
                    }
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "SaaS Development",
                    "description": "Scalable software-as-a-service platforms with multi-tenant architecture, billing integration, and analytics",
                    "provider": {
                        "@id": "https://www.revzion.com/#organization"
                    }
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "AI & Automation Solutions",
                    "description": "Intelligent systems powered by OpenAI, Groq, and custom ML models for automation and insights",
                    "provider": {
                        "@id": "https://www.revzion.com/#organization"
                    }
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "High-performance web applications built with Next.js, React, and modern web technologies",
                    "provider": {
                        "@id": "https://www.revzion.com/#organization"
                    }
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Cloud & DevOps",
                    "description": "Secure cloud infrastructure, CI/CD pipelines, and DevOps best practices for scalable deployments",
                    "provider": {
                        "@id": "https://www.revzion.com/#organization"
                    }
                }
            }
        ]
    },

    // Social Media
    "sameAs": [
        "https://linkedin.com/company/revzion",
        "https://github.com/revzion",
        "https://twitter.com/revzion"
    ],

    // Languages
    "knowsLanguage": ["en", "hi"],

    // Organization Size
    "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "1-10"
    },

    // Industry
    "industry": "Information Technology and Services",
    "naics": "541511", // Custom Computer Programming Services

    // Awards & Recognition (add as you receive them)
    "award": [
        // "Award Name 2024"
    ]
};

// ============================================================================
// WEBSITE SCHEMA
// ============================================================================

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.revzion.com/#website",
    "name": "Revzion",
    "url": "https://www.revzion.com",
    "alternateName": [
        "Arqam Ahmad Siddiqui",
        "Arqam Ahmed Siddiqui",
        "arqam365",
        "Arkam Siddiqui",
        "Akram Siddiqui"
    ],
    "description": "Revzion builds scalable SaaS, AI, and cross-platform solutions for startups and enterprises.",
    "publisher": {
        "@id": "https://www.revzion.com/#organization"
    },
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.revzion.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-US"
};

// ============================================================================
// SOFTWARE APPLICATION SCHEMA (For Products)
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
        "@id": "https://www.revzion.com/#organization",
        "name": "Revzion"
    },
    "creator": {
        "@type": "Organization",
        "@id": "https://www.revzion.com/#organization"
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
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": app.rating,
            "reviewCount": app.reviewCount,
            "bestRating": "5",
            "worstRating": "1"
        }
    })
});

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
// ARTICLE SCHEMA (For Blog Posts)
// ============================================================================

export const createArticleSchema = (article: {
    title: string;
    description: string;
    url: string;
    imageUrl: string;
    datePublished: string;
    dateModified: string;
    authorName: string;
    authorUrl: string;
    keywords?: string[];
}) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": article.url,
    "image": {
        "@type": "ImageObject",
        "url": article.imageUrl,
        "width": 1200,
        "height": 630
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": {
        "@type": "Person",
        "name": article.authorName,
        "url": article.authorUrl
    },
    "publisher": {
        "@type": "Organization",
        "@id": "https://www.revzion.com/#organization"
    },
    ...(article.keywords && { "keywords": article.keywords.join(", ") }),
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": article.url
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
    steps: Array<{ name: string; text: string; image?: string }>;
}) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howTo.name,
    "description": howTo.description,
    ...(howTo.image && { "image": howTo.image }),
    ...(howTo.totalTime && { "totalTime": howTo.totalTime }),
    "step": howTo.steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        ...(step.image && { "image": step.image })
    }))
});

// ============================================================================
// REVIEW SCHEMA (For Case Studies/Testimonials)
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
        "provider": {
            "@id": "https://www.revzion.com/#organization"
        }
    },
    "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
    },
    "reviewBody": review.reviewBody,
    "author": {
        "@type": "Person",
        "name": review.authorName
    },
    "datePublished": review.datePublished,
    "publisher": {
        "@id": "https://www.revzion.com/#organization"
    }
});

// ============================================================================
// LOCAL BUSINESS SCHEMA (If Applicable)
// ============================================================================

export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.revzion.com/#localbusiness",
    "name": "Revzion",
    "image": "https://www.revzion.com/og-image.png",
    "url": "https://www.revzion.com",
    "telephone": "+91-XXXXXXXXXX", // Add real number
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "[Your Street Address]",
        "addressLocality": "Meerut",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "250001",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.9845, // Meerut coordinates (approximate)
        "longitude": 77.7064
    },
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
    },
    "priceRange": "$$-$$$",
    "sameAs": [
        "https://linkedin.com/company/revzion",
        "https://github.com/revzion"
    ]
};

// ============================================================================
// EXPORT ALL SCHEMAS
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
};

export default schemas;