import type { MetadataRoute } from "next"
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: "https://www.revzion.com/",        changeFrequency: "weekly", priority: 1.0 },
        { url: "https://www.revzion.com/services", changeFrequency: "weekly", priority: 0.9 },
        { url: "https://www.revzion.com/portfolio", changeFrequency: "weekly", priority: 0.8 },
        { url: "https://www.revzion.com/labs",     changeFrequency: "weekly", priority: 0.8 },
    ]
}