export type Consent = {
    essential: true
    analytics: boolean
    functional: boolean
    marketing: boolean
}

export const DEFAULT_CONSENT: Consent = { essential: true, analytics: false, functional: false, marketing: false }
export const CONSENT_COOKIE = "revzion_consent"
export const CONSENT_EVENT = "rvz-consent"
const MAX_AGE_DAYS = 180

declare global {
    interface Window {
        dataLayer: any[]
        gtag?: (...args: any[]) => void
    }
}

export function readConsent(): Consent | null {
    if (typeof document === "undefined") return null
    const raw = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    if (!raw) return null
    try {
        const parsed = JSON.parse(decodeURIComponent(raw.slice(CONSENT_COOKIE.length + 1)))
        return { ...DEFAULT_CONSENT, ...parsed, essential: true }
    } catch {
        return null
    }
}

export function applyConsent(c: Consent) {
    window.dataLayer = window.dataLayer || []
    const gtag = window.gtag ?? ((...args: any[]) => window.dataLayer.push(args))
    gtag("consent", "update", {
        analytics_storage: c.analytics ? "granted" : "denied",
        ad_storage: c.marketing ? "granted" : "denied",
        ad_user_data: c.marketing ? "granted" : "denied",
        ad_personalization: c.marketing ? "granted" : "denied",
    })
}

export function saveConsent(c: Consent) {
    const payload = encodeURIComponent(JSON.stringify(c))
    document.cookie = `${CONSENT_COOKIE}=${payload}; Max-Age=${MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax; Secure`
    try {
        localStorage.setItem(`${CONSENT_COOKIE}_saved_at`, String(Date.now()))
    } catch {}
    applyConsent(c)
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }))
}
