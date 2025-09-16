import { NextResponse } from "next/server"
import { sendContactEmails, type ContactPayload } from "@/lib/email"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(input: string) {
  return input?.toString().trim().slice(0, 10000)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const payload: ContactPayload = {
      name: sanitize(body.name || ""),
      email: sanitize(body.email || ""),
      company: sanitize(body.company || ""),
      phone: sanitize(body.phone || ""),
      service: sanitize(body.service || ""),
      budget: sanitize(body.budget || ""),
      message: sanitize(body.message || ""),
    }

    const errors: Record<string, string> = {}
    if (!payload.name) errors.name = "Name is required"
    if (!payload.email) errors.email = "Email is required"
    else if (!isValidEmail(payload.email)) errors.email = "Invalid email"
    if (payload.phone && !/^[+()\-\d\s]{7,}$/.test(payload.phone)) errors.phone = "Invalid phone"
    if (!payload.message || payload.message.length < 20) errors.message = "Message must be at least 20 characters"
    if (!payload.service) errors.service = "Service is required"
    if (!payload.budget) errors.budget = "Budget is required"

    if (Object.keys(errors).length) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    await sendContactEmails(payload)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("/api/contact error", err)
    return NextResponse.json(
      { success: false, error: err?.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
