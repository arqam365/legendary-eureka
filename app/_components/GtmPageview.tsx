"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global { interface Window { dataLayer: any[] } }

export default function GtmPageview() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (!pathname) return
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
            event: "page_view",
            page_location: url,
        })
    }, [pathname, searchParams])

    return null
}