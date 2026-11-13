import { ImageResponse } from "next/og"
import { LOCKUP, MARK } from "@/components/brand/Logo"

export const runtime = "edge"

const PAGES: Record<string, { eyebrow: string; title: string }> = {
    default: { eyebrow: "Software engineering partner", title: "Platforms engineered to last." },
    services: { eyebrow: "Services", title: "SaaS, AI, mobile and cloud — delivered end to end." },
    portfolio: { eyebrow: "Portfolio", title: "Problems solved. Products shipped." },
    about: { eyebrow: "About", title: "The team behind Revzion." },
    contact: { eyebrow: "Contact", title: "Let's talk about your project." },
    careers: { eyebrow: "Careers", title: "Not hiring right now — check back soon." },
    process: { eyebrow: "Process", title: "A process that ships outcomes." },
}

async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
    try {
        const css = await (
            await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)
        ).text()
        const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
        return url ? await (await fetch(url)).arrayBuffer() : null
    } catch {
        return null
    }
}

export async function GET(req: Request) {
    const page = new URL(req.url).searchParams.get("page") ?? "default"
    const { eyebrow, title } = PAGES[page] ?? PAGES.default
    const [display, sans] = await Promise.all([
        googleFont("Fraunces", 600, title),
        googleFont("Inter", 700, `${eyebrow.toUpperCase()}revzion.in`),
    ])
    const fonts = [
        ...(sans ? [{ name: "Inter", data: sans, weight: 700 as const, style: "normal" as const }] : []),
        ...(display ? [{ name: "Fraunces", data: display, weight: 600 as const, style: "normal" as const }] : []),
    ]

    return new ImageResponse(
        (
            <div style={{ width: 1200, height: 630, display: "flex", position: "relative", background: "#0B1220", padding: 80, flexDirection: "column", fontFamily: "Inter" }}>
                {/* Ascendant — Charcoal on Ink, as on the brand guide cover */}
                <svg width="560" height="541" viewBox="0 0 120.246 116.148" style={{ position: "absolute", right: -40, bottom: -120 }}>
                    <path d={MARK} fill="#1F2937" />
                </svg>

                <svg width="184" height="40" viewBox="0 0 540.16 117.324">
                    {LOCKUP.map((d) => (
                        <path key={d.slice(0, 24)} d={d} fill="#FFFFFF" />
                    ))}
                </svg>

                <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
                    <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#A5B1C9", fontWeight: 700 }}>{eyebrow}</div>
                    <div
                        style={{
                            marginTop: 20,
                            fontSize: 72,
                            lineHeight: 1.08,
                            color: "#FFFFFF",
                            maxWidth: 860,
                            fontFamily: display ? "Fraunces" : "Inter",
                        }}
                    >
                        {title}
                    </div>
                    <div style={{ marginTop: 32, width: 56, height: 3, background: "#C9A227" }} />
                    <div style={{ marginTop: 28, fontSize: 24, color: "#A5B1C9", fontWeight: 700 }}>revzion.in</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: fonts.length ? fonts : undefined,
            headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" },
        },
    )
}
