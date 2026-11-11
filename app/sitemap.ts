import type { MetadataRoute } from "next"
import { CASE_STUDIES } from "@/lib/case-studies"
import { SITE_URL } from "@/lib/site"

const ROUTES: Array<[path: string, priority: number]> = [
    ["", 1],
    ["/services", 0.9],
    ["/portfolio", 0.9],
    ["/about", 0.8],
    ["/contact", 0.8],
    ["/process", 0.6],
    ["/labs", 0.5],
    ["/careers", 0.5],
    ["/estimate", 0.5],
    ["/referrals", 0.4],
    ["/blogs", 0.4],
    ["/privacy-policy", 0.2],
    ["/terms", 0.2],
]

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        ...ROUTES.map(([path, priority]) => ({ url: `${SITE_URL}${path}`, priority })),
        ...CASE_STUDIES.map((c) => ({ url: `${SITE_URL}/portfolio/${c.id}`, priority: 0.7 })),
    ]
}
