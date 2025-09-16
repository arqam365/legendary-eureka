// /lib/email.ts
import nodemailer, { Transporter } from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";

export type ContactPayload = {
    name: string
    email: string
    company?: string
    phone?: string
    service?: string
    budget?: string
    message: string
}

let cachedTransporter: Transporter | null = null

export function getTransporter(): Transporter {
    if (cachedTransporter) return cachedTransporter

    const {
        SMTP_HOST,
        SMTP_PORT = "587",
        SMTP_USER,
        SMTP_PASS,
        SMTP_REQUIRE_TLS = "true",
        // Optional DKIM
        DKIM_DOMAIN,
        DKIM_SELECTOR,
        DKIM_PRIVATE_KEY,
    } = process.env

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        throw new Error("SMTP credentials are missing (SMTP_HOST, SMTP_USER, SMTP_PASS).")
    }

    const useSecure = Number(SMTP_PORT) === 465

    const base: SMTPTransport.Options = {
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: useSecure, // true for 465, false for others
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        tls: {
            rejectUnauthorized: true,
            ...(SMTP_REQUIRE_TLS === "true" ? { ciphers: "TLSv1.2" } : {}),
        },
    }
    cachedTransporter = nodemailer.createTransport(base)

    // Optional DKIM (recommended for deliverability)
    if (DKIM_DOMAIN && DKIM_SELECTOR && DKIM_PRIVATE_KEY) {
        (base as any).dkim = {
            domainName: DKIM_DOMAIN,
            keySelector: DKIM_SELECTOR,
            privateKey: DKIM_PRIVATE_KEY,
        }
    }

    cachedTransporter = nodemailer.createTransport(base)
    return cachedTransporter
}

/* ---------------- Templates (HTML + Text) ---------------- */

export function renderAdminHtml(p: ContactPayload) {
    const now = new Date();
    const receivedAt = now.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

    const chip = (text: string, tone: "primary" | "neutral" = "neutral") => {
        const bg = tone === "primary" ? "#eef2ff" : "#f3f4f6";
        const fg = tone === "primary" ? "#3730a3" : "#374151";
        const border = tone === "primary" ? "#e0e7ff" : "#e5e7eb";
        return `
      <span style="
        display:inline-block;
        padding:6px 10px;
        border:1px solid ${border};
        background:${bg};
        color:${fg};
        border-radius:9999px;
        font-size:12px;
        line-height:1;
        font-weight:600;
        margin:4px 6px 0 0;
        text-decoration:none;
      ">${escapeHtml(text)}</span>
    `;
    };

    const btn = (label: string, href: string) => `
    <a href="${href}" style="
      display:inline-block;
      padding:10px 14px;
      background:#0b1220;
      color:#ffffff !important;
      text-decoration:none;
      border-radius:10px;
      font-size:14px;
      font-weight:600;
      margin-right:8px;
      margin-top:6px;
    ">${escapeHtml(label)} →</a>
  `;

    const row = (label: string, value?: string) =>
        value
            ? `<tr>
           <td style="padding:10px 14px;background:#f9fafb;width:160px;font-weight:600;border-bottom:1px solid #f1f5f9">${escapeHtml(
                label
            )}</td>
           <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9">${escapeHtml(
                value
            )}</td>
         </tr>`
            : "";

    const quickChips = [
        p.service ? chip(p.service, "primary") : "",
        p.budget ? chip(`Budget: ${p.budget}`) : "",
        p.company ? chip(p.company) : "",
    ]
        .filter(Boolean)
        .join("");

    const quickActions = `
    ${btn("Reply", `mailto:${encodeURIComponent(p.email)}?subject=${encodeURIComponent(
        `Re: Your inquiry to Revzion`
    )}`)}
    ${p.phone ? btn("Call", `tel:${encodeURIComponent(p.phone)}`) : ""}
    ${btn("Schedule", "https://calendly.com/arqam365/30min")}
  `;

    const messageBlock = p.message
        ? `
      <div style="
        margin-top:8px;
        padding:14px 16px;
        background:#f8fafc;
        border:1px solid #e5e7eb;
        border-radius:12px;
        color:#111827;
        font-size:14px;
        line-height:1.6;
        white-space:normal;
      ">
        ${nl2br(escapeHtml(p.message))}
      </div>
    `
        : "";

    return wrapEmail(
        `New inquiry — ${escapeHtml(p.name)}`,
        `
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px">
        <div style="font-size:15px;color:#111827;font-weight:600">New business inquiry</div>
        <div style="font-size:12px;color:#6b7280">${escapeHtml(receivedAt)}</div>
      </div>

      <!-- Chips -->
      <div>${quickChips}</div>

      <!-- Quick actions -->
      <div style="margin-top:10px">${quickActions}</div>

      <!-- Details -->
      <div style="margin-top:18px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial">
          <tbody>
            ${row("Name", p.name)}
            ${row("Email", p.email)}
            ${row("Company", p.company)}
            ${row("Phone", p.phone)}
            ${row("Service", p.service)}
            ${row("Budget", p.budget)}
          </tbody>
        </table>
      </div>

      <!-- Message -->
      ${messageBlock}

      <!-- Footer hint -->
      <p style="margin-top:16px;color:#6b7280;font-size:12px">
        Tip: reply directly to this email to contact the sender. This thread will stay linked to their address.
      </p>
    `
    );
}

export function renderSenderHtml(p: ContactPayload) {
    const summaryChip = (label: string, value?: string) =>
        value
            ? `<span style="
           display:inline-block;
           padding:6px 10px;
           border:1px solid #e5e7eb;
           background:#f9fafb;
           color:#374151;
           border-radius:9999px;
           font-size:12px;
           line-height:1;
           font-weight:600;
           margin:4px 6px 0 0;
         ">${escapeHtml(label)}: ${escapeHtml(value)}</span>`
            : "";

    const detailsTableRow = (label: string, value?: string) =>
        value
            ? `<tr>
           <td style="padding:8px 12px;background:#f9fafb;width:140px;font-weight:600;border-bottom:1px solid #f1f5f9">${escapeHtml(label)}</td>
           <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9">${escapeHtml(value)}</td>
         </tr>`
            : "";

    const messageBlock = p.message
        ? `
      <div style="
        margin-top:12px;
        padding:14px 16px;
        background:#f8fafc;
        border:1px solid #e5e7eb;
        border-radius:12px;
        color:#111827;
        font-size:14px;
        line-height:1.6;
        white-space:normal;
      ">
        ${nl2br(escapeHtml(p.message))}
      </div>
    `
        : "";

    // Main content
    return wrapEmail(
        "We’ve received your request — Revzion Studio",
        `
      <p style="font-size:15px;color:#111827;margin:0 0 8px">
        Hi ${escapeHtml(firstName(p.name))},
      </p>
      <p style="font-size:15px;color:#374151;margin:0 0 16px">
        Thanks for reaching out to <strong>Revzion</strong>. Your request is in our queue and a consultant will reply within
        <strong>24 business hours</strong>.
      </p>

      <!-- Quick summary chips -->
      <div style="margin:8px 0 2px">
        ${summaryChip("Service", p.service)}
        ${summaryChip("Budget", p.budget)}
        ${summaryChip("Company", p.company)}
      </div>

      <!-- Your message -->
      <p style="margin:18px 0 6px;font-size:14px;color:#6b7280">Your message:</p>
      ${messageBlock}

      <!-- Details table (useful for forwarding) -->
      <div style="margin-top:16px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial">
          <tbody>
            ${detailsTableRow("Name", p.name)}
            ${detailsTableRow("Email", p.email)}
            ${detailsTableRow("Company", p.company)}
            ${detailsTableRow("Phone", p.phone)}
            ${detailsTableRow("Service", p.service)}
            ${detailsTableRow("Budget", p.budget)}
          </tbody>
        </table>
      </div>

      <!-- Primary CTA -->
      <div style="margin-top:18px">
        <a href="https://calendly.com/arqam365/30min" style="
          display:inline-block;
          padding:11px 16px;
          background:#0b1220;
          color:#ffffff !important;
          text-decoration:none;
          border-radius:10px;
          font-size:14px;
          font-weight:600;
          margin-right:8px;
        ">Schedule a 30-min intro call →</a>
        <a href="mailto:${encodeURIComponent(p.email)}" style="
          display:inline-block;
          padding:11px 16px;
          background:#eef2ff;
          color:#3730a3 !important;
          text-decoration:none;
          border-radius:10px;
          font-size:14px;
          font-weight:600;
          border:1px solid #e0e7ff;
        ">Update your request</a>
      </div>

      <!-- Social proof & expectations -->
      <div style="margin-top:18px;padding:12px 14px;background:#fafafa;border:1px solid #e5e7eb;border-radius:12px;color:#374151;font-size:13px;line-height:1.55">
        <strong style="display:block;margin-bottom:6px">What happens next</strong>
        <ul style="margin:0;padding-left:18px">
          <li>We’ll review your goals and clarify open questions (if any).</li>
          <li>You’ll receive a recommended approach, timeline, and commercial options.</li>
          <li>Live call (optional) to align on scope and next steps.</li>
        </ul>
        <div style="margin-top:10px;color:#6b7280">Trusted by teams in 25+ countries · 100+ launches</div>
      </div>

      <!-- Footer note -->
      <p style="color:#6b7280;font-size:12px;margin-top:14px">
        If you didn’t submit this request, you can safely ignore this email.
      </p>
    `
    );
}

export function renderAdminText(p: ContactPayload) {
    return `New contact inquiry

Name: ${p.name}
Email: ${p.email}
Company: ${p.company || "-"}
Phone: ${p.phone || "-"}
Service: ${p.service || "-"}
Budget: ${p.budget || "-"}

Message:
${p.message}
`
}

export function renderSenderText(p: ContactPayload) {
    return `Hi ${firstName(p.name)},

Thank you for contacting Revzion.
Your request has been received and we will respond within 24 business hours.

Your message:
${p.message}

If you did not submit this request, you can ignore this email.
`
}

export async function sendContactEmails(p: ContactPayload) {
    const transporter = getTransporter()

    const from =
        process.env.MAIL_FROM ||
        `Revzion Studio <${process.env.SMTP_USER}>`

    const adminTo =
        process.env.MAIL_TO ||
        process.env.CONTACT_RECEIVER ||
        process.env.SMTP_USER

    if (!adminTo) throw new Error("Receiver email is not configured (MAIL_TO or CONTACT_RECEIVER).")

    const sendSafe = async (opts: any) => {
        try {
            return await transporter.sendMail(opts)
        } catch (err) {
            console.error("[email] sendMail error:", err)
            throw err
        }
    }

    // 1) Notify internal team
    await sendSafe({
        from,
        to: adminTo,
        subject: `New Inquiry — ${p.name} (${p.company || "No Company"})`,
        html: renderAdminHtml(p),
        text: renderAdminText(p),
        replyTo: p.email,
    })

    // 2) Acknowledge sender
    await sendSafe({
        from,
        to: p.email,
        subject: "We’ve received your request — Revzion Studio",
        html: renderSenderHtml(p),
        text: renderSenderText(p),
    })
}

/* ---------------- Chrome-clean wrapper ---------------- */

function wrapEmail(title: string, content: string) {
    // If MAIL_LOGO_URL is set in env, use that; otherwise fallback to your public path on the deployed site
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.revzion.com";
    // const brandLogo = process.env.MAIL_LOGO_URL || `${baseUrl}/logo.svg`;

    return `
  <div style="background:#f3f4f6;padding:28px">
    <div style="max-width:640px;margin:auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif">
      
      <!-- Header -->
      <div style="padding:16px 24px;background:#0b1220;color:#fff;display:flex;align-items:center;gap:12px">
        <div style="font-size:16px;font-weight:600;line-height:1">${escapeHtml(title)}</div>
      </div>

      <!-- Body -->
      <div style="padding:24px;color:#111827;line-height:1.6">${content}</div>

      <!-- Footer -->
      <div style="padding:16px 24px;color:#6b7280;font-size:12px;background:#fafafa;border-top:1px solid #e5e7eb;text-align:center">
        © ${new Date().getFullYear()} Revzion · Global Consulting & Engineering · 
        <a href="https://www.revzion.in" style="color:#2563eb;text-decoration:none">revzion.in</a>
      </div>
    </div>
  </div>
  `;
}

/* ---------------- small helpers ---------------- */

function firstName(full: string) {
    return full.trim().split(/\s+/)[0] || "there"
}
function escapeHtml(str: string) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}
function nl2br(str: string) {
    return str.replace(/\n/g, "<br/>")
}