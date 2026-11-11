import { SITE_URL } from "@/lib/site"

export const revalidate = 300

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://app.revzion.in"

type ApiPost = { slug: string; title: string; description: string; publishedAt: string | null; createdAt: string }

const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

async function getPosts(): Promise<ApiPost[]> {
    try {
        const res = await fetch(`${API_URL}/api/cms/public/posts`, { next: { revalidate: 300 } })
        if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return []
        const data = await res.json()
        return Array.isArray(data) ? data : []
    } catch {
        return []
    }
}

export async function GET() {
    const posts = await getPosts()
    const items = posts
        .map((p) => {
            const url = `${SITE_URL}/blogs/${p.slug}`
            return `<item><title>${esc(p.title)}</title><link>${url}</link><guid>${url}</guid><description>${esc(
                p.description ?? "",
            )}</description><pubDate>${new Date(p.publishedAt ?? p.createdAt).toUTCString()}</pubDate></item>`
        })
        .join("")

    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Revzion Blog</title><link>${SITE_URL}/blogs</link><description>Notes from the Revzion team on software, AI and product engineering.</description><language>en</language>${items}</channel></rss>`

    return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
