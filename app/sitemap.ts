import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.revzion.com";
    const currentDate = new Date().toISOString();

    // ============================================
    // STATIC PAGES (Core pages)
    // ============================================
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/labs`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/careers`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.8,
        },
    ];

    // ============================================
    // LEGAL PAGES (Lower priority)
    // ============================================
    const legalPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/cookie-settings`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.2,
        },
    ];

    // ============================================
    // PORTFOLIO/PROJECT PAGES
    // ============================================
    const portfolioProjects: string[] = [
        "beesocial",
        "evolwe",
        "packagefy",
        "hello-cloud",
        "mawasim-dates",
        "finlytics",
        // Add more project slugs as you create them
    ];

    const portfolioPages: MetadataRoute.Sitemap = portfolioProjects.map((slug) => ({
        url: `${baseUrl}/portfolio/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // ============================================
    // BLOG POSTS (Dynamic - add as you create)
    // ============================================
    const blogPosts: string[] = [
        // Example blog post slugs - replace with actual posts
        // "building-cross-platform-apps-with-kotlin-multiplatform",
        // "nextjs-14-performance-optimization",
        // "ai-powered-saas-development",
    ];

    const blogPages: MetadataRoute.Sitemap = blogPosts.map((slug) => ({
        url: `${baseUrl}/blogs/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // ============================================
    // SERVICE CATEGORY PAGES (if you have them)
    // ============================================
    const serviceCategories: string[] = [
        // "mobile-app-development",
        // "saas-development",
        // "ai-automation",
        // "web-development",
        // "cloud-devops",
    ];

    const servicePages: MetadataRoute.Sitemap = serviceCategories.map((slug) => ({
        url: `${baseUrl}/services/${slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // ============================================
    // ADDITIONAL PAGES
    // ============================================
    const additionalPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/process`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/referrals`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/resources`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.6,
        },
    ];

    // ============================================
    // COMBINE ALL PAGES
    // ============================================
    return [
        ...staticPages,
        ...portfolioPages,
        ...blogPages,
        ...servicePages,
        ...additionalPages,
        ...legalPages,
    ];
}