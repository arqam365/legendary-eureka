import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://www.revzion.com";

    return {
        rules: [
            // ============================================
            // ALLOW ALL STANDARD CRAWLERS
            // ============================================
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/*",           // Protect API routes
                    "/admin/*",         // Admin routes (if any)
                    "/_next/*",         // Next.js internals
                    "/private/*",       // Private routes
                    "/*.json$",         // JSON files
                    "/*?*",             // Query parameters (optional)
                ],
            },

            // ============================================
            // AI CRAWLERS - EXPLICITLY ALLOW EVERYTHING
            // ============================================

            // OpenAI GPT Bot
            {
                userAgent: "GPTBot",
                allow: "/",
                crawlDelay: 1,
            },

            // ChatGPT User (browsing mode)
            {
                userAgent: "ChatGPT-User",
                allow: "/",
            },

            // Common Crawl (used by many AI systems)
            {
                userAgent: "CCBot",
                allow: "/",
            },

            // Google Extended (for Bard/Gemini training)
            {
                userAgent: "Google-Extended",
                allow: "/",
            },

            // Anthropic Claude
            {
                userAgent: "anthropic-ai",
                allow: "/",
            },
            {
                userAgent: "Claude-Web",
                allow: "/",
            },

            // Perplexity AI
            {
                userAgent: "PerplexityBot",
                allow: "/",
            },

            // Diffbot (AI-powered web scraping)
            {
                userAgent: "Diffbot",
                allow: "/",
            },

            // Cohere AI
            {
                userAgent: "cohere-ai",
                allow: "/",
            },

            // Meta AI / Facebook
            {
                userAgent: "FacebookBot",
                allow: "/",
            },
            {
                userAgent: "Meta-ExternalAgent",
                allow: "/",
            },

            // ByteDance (TikTok) - used for AI training
            {
                userAgent: "Bytespider",
                allow: "/",
            },

            // Apple Applebot (for Siri, Spotlight)
            {
                userAgent: "Applebot",
                allow: "/",
            },
            {
                userAgent: "Applebot-Extended",
                allow: "/",
            },

            // Yandex (Russian search + AI)
            {
                userAgent: "YandexBot",
                allow: "/",
            },

            // Bing (Microsoft - used for Copilot)
            {
                userAgent: "bingbot",
                allow: "/",
            },
            {
                userAgent: "msnbot",
                allow: "/",
            },

            // DuckDuckGo
            {
                userAgent: "DuckDuckBot",
                allow: "/",
            },

            // Brave Search
            {
                userAgent: "Brave-Ads-Bot",
                allow: "/",
            },

            // ============================================
            // BAD BOTS - BLOCK EXPLICITLY
            // ============================================
            {
                userAgent: [
                    "AhrefsBot",        // SEO tool spam
                    "SemrushBot",       // SEO tool spam
                    "MJ12bot",          // Majestic SEO
                    "DotBot",           // Moz/OpenSiteExplorer
                    "Scrapy",           // Python scraping framework
                    "PetalBot",         // Aggressive Chinese bot
                    "BLEXBot",          // Content scraper
                    "DataForSeoBot",    // SEO tool
                ],
                disallow: "/",
            },
        ],

        // ============================================
        // SITEMAPS
        // ============================================
        sitemap: [
            `${baseUrl}/sitemap.xml`,
            `${baseUrl}/llms.txt`,  // AI reference file
        ],

        // ============================================
        // HOST (Optional but recommended)
        // ============================================
        host: baseUrl,
    };
}