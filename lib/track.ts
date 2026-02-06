type TrackPayload = Record<string, any>

export function track(event: string, payload?: TrackPayload) {
    if (typeof window === "undefined") return

    // GA4 (if present)
    if ((window as any).gtag) {
        ;(window as any).gtag("event", event, payload)
    }

    // PostHog (if present)
    if ((window as any).posthog) {
        ;(window as any).posthog.capture(event, payload)
    }

    // Fallback (dev visibility)
    if (process.env.NODE_ENV === "development") {
        console.log("[track]", event, payload)
    }
}