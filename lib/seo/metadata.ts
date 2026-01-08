import type { Metadata } from "next";

/**
 * SEO Metadata Generation Library
 * Provides reusable functions for consistent SEO across pages
 */

const baseUrl = "https://www.revzion.com";
const siteName = "Revzion";
const defaultImage = "/og-image.png";
const twitterHandle = "@revzion";
const founderHandle = "@arqam365";

// ============================================
// BASE METADATA GENERATOR
// ============================================

interface PageMetadataOptions {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    path?: string;
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    noindex?: boolean;
}

export function generateMetadata(options: PageMetadataOptions): Metadata {
    const {
        title,
        description,
        keywords = [],
        image = defaultImage,
        path = "",
        type = "website",
        publishedTime,
        modifiedTime,
        authors,
        noindex = false,
    } = options;

    const url = `${baseUrl}${path}`;
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.length > 0 ? keywords : undefined,

        authors: authors
            ? authors.map(name => ({ name, url: baseUrl }))
            : [{ name: "Revzion Team", url: baseUrl }],

        openGraph: {
            type,
            url,
            title: fullTitle,
            description,
            siteName,
            images: [
                {
                    url: image.startsWith("http") ? image : `${baseUrl}${image}`,
                    width: 1200,
                    height: 630,
                    alt: title,
                }
            ],
            locale: "en_US",
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },

        twitter: {
            card: "summary_large_image",
            site: twitterHandle,
            creator: founderHandle,
            title: fullTitle,
            description,
            images: [image.startsWith("http") ? image : `${baseUrl}${image}`],
        },

        robots: noindex
            ? { index: false, follow: false }
            : { index: true, follow: true },

        alternates: {
            canonical: url,
        },
    };
}

// ============================================
// PAGE-SPECIFIC METADATA GENERATORS
// ============================================

export const homeMetadata = (): Metadata => generateMetadata({
    title: "Revzion - Mobile-First SaaS, AI & Cross-Platform Solutions",
    description: "Build scalable SaaS platforms, AI-powered solutions, and cross-platform mobile apps with Revzion. Expert team specializing in Kotlin Multiplatform, Next.js, React, and modern technologies.",
    keywords: [
        "Revzion",
        "SaaS development",
        "AI solutions",
        "Kotlin Multiplatform",
        "Next.js development",
        "Cross-platform apps",
        "Mobile app development",
        "React development",
        "TypeScript",
        "Arqam Ahmad Siddiqui",
    ],
    path: "/",
});

export const servicesMetadata = (): Metadata => generateMetadata({
    title: "Our Services - SaaS, AI, Mobile & Web Development",
    description: "Comprehensive technology services including SaaS development, AI automation, cross-platform mobile apps, web development, cloud architecture, and DevOps. Custom solutions for startups and enterprises.",
    keywords: [
        "software services",
        "SaaS development services",
        "AI development",
        "mobile app development services",
        "web development services",
        "cloud services",
        "DevOps services",
        "Kotlin Multiplatform services",
        "Next.js development",
    ],
    path: "/services",
});

export const portfolioMetadata = (): Metadata => generateMetadata({
    title: "Portfolio - Our Work & Case Studies",
    description: "Explore Revzion's portfolio of successful projects including mobile apps, SaaS platforms, AI solutions, and web applications. Real results for real businesses.",
    keywords: [
        "portfolio",
        "case studies",
        "project examples",
        "mobile apps",
        "SaaS examples",
        "web applications",
        "AI projects",
        "Kotlin Multiplatform projects",
    ],
    path: "/portfolio",
});

export const contactMetadata = (): Metadata => generateMetadata({
    title: "Contact Us - Let's Build Something Amazing",
    description: "Get in touch with Revzion for your next SaaS, mobile app, or AI project. Free consultation available. Based in India, serving clients worldwide.",
    keywords: [
        "contact Revzion",
        "hire developers",
        "software development inquiry",
        "project consultation",
        "Revzion contact",
    ],
    path: "/contact",
});

export const careersMetadata = (): Metadata => generateMetadata({
    title: "Careers - Join the Revzion Team",
    description: "Join Revzion's team of talented developers and designers. We're building the future of SaaS, AI, and mobile technology. Remote-first company.",
    keywords: [
        "careers",
        "jobs at Revzion",
        "developer jobs",
        "software engineer jobs",
        "remote developer jobs",
        "Kotlin developer jobs",
        "Next.js developer jobs",
    ],
    path: "/careers",
});

// ============================================
// PROJECT METADATA GENERATOR
// ============================================

interface ProjectMetadataOptions {
    projectName: string;
    description: string;
    slug: string;
    image?: string;
    keywords?: string[];
    technologies?: string[];
}

export function generateProjectMetadata(options: ProjectMetadataOptions): Metadata {
    const {
        projectName,
        description,
        slug,
        image = defaultImage,
        keywords = [],
        technologies = [],
    } = options;

    const allKeywords = [
        projectName,
        "case study",
        "project",
        ...technologies,
        ...keywords,
    ];

    return generateMetadata({
        title: `${projectName} - Case Study`,
        description,
        keywords: allKeywords,
        image,
        path: `/portfolio/${slug}`,
    });
}

// ============================================
// BLOG POST METADATA GENERATOR
// ============================================

interface BlogPostMetadataOptions {
    title: string;
    description: string;
    slug: string;
    image?: string;
    keywords?: string[];
    author: string;
    publishedTime: string;
    modifiedTime?: string;
}

export function generateBlogMetadata(options: BlogPostMetadataOptions): Metadata {
    const {
        title,
        description,
        slug,
        image = defaultImage,
        keywords = [],
        author,
        publishedTime,
        modifiedTime,
    } = options;

    return generateMetadata({
        title,
        description,
        keywords: ["blog", "article", ...keywords],
        image,
        path: `/blogs/${slug}`,
        type: "article",
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: [author],
    });
}

// ============================================
// SERVICE PAGE METADATA GENERATOR
// ============================================

interface ServiceMetadataOptions {
    serviceName: string;
    description: string;
    slug?: string;
    keywords?: string[];
}

export function generateServiceMetadata(options: ServiceMetadataOptions): Metadata {
    const {
        serviceName,
        description,
        slug,
        keywords = [],
    } = options;

    return generateMetadata({
        title: `${serviceName} Services`,
        description,
        keywords: [serviceName, "services", "development", ...keywords],
        path: slug ? `/services/${slug}` : "/services",
    });
}