"use client"
import Script from "next/script"

export default function JsonLd({ json, id = "json-ld" }: { json: Record<string, any>, id?: string }) {
    return (
        <Script
            id={id}
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
        />
    )
}