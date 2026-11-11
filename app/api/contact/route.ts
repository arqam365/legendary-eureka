import { NextResponse } from "next/server"
import { sendContactEmails, type ContactPayload } from "@/lib/email"

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 3
// ponytail: per-instance memory; move to a shared store (e.g. Upstash/Redis) if abuse spans instances
const hits = new Map<string, number[]>()

function limited(key: string) {
    const now = Date.now()
    const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
    recent.push(now)
    hits.set(key, recent)
    return recent.length > MAX_PER_WINDOW
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "")
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export async function POST(req: Request) {
    let body: Record<string, unknown>
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
    }

    // Honeypot: bots fill the hidden field; pretend success so they don't retry.
    if (clean(body.website, 200)) return NextResponse.json({ success: true })

    const payload: ContactPayload = {
        name: clean(body.name, 100),
        email: clean(body.email, 254),
        company: clean(body.company, 150),
        phone: clean(body.phone, 30),
        service: clean(body.service, 100),
        budget: clean(body.budget, 50),
        message: clean(body.message, 5000),
    }

    const errors: Record<string, string> = {}
    if (!payload.name) errors.name = "Name is required"
    if (!payload.email) errors.email = "Email is required"
    else if (!isValidEmail(payload.email)) errors.email = "Invalid email"
    if (payload.phone && !/^[+()\-\d\s]{7,}$/.test(payload.phone)) errors.phone = "Invalid phone"
    if (payload.message.length < 20) errors.message = "Message must be at least 20 characters"
    if (!payload.service) errors.service = "Service is required"
    if (Object.keys(errors).length) {
        return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (limited(`ip:${ip}`) || limited(`email:${payload.email.toLowerCase()}`)) {
        return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 })
    }

    try {
        await sendContactEmails(payload)
        return NextResponse.json({ success: true })
    } catch (err) {
        console.error("/api/contact error", err)
        return NextResponse.json(
            { success: false, error: "We couldn't send your message. Please email connect@revzion.in." },
            { status: 500 },
        )
    }
}
