import { ChevronDown } from "lucide-react"
import type { Faq } from "@/lib/faqs"

// Native <details>: answers stay in the HTML (needed for FAQPage structured data) and work without JS.
export function FaqSection({ items, title = "Frequently asked questions", className = "" }: { items: Faq[]; title?: string; className?: string }) {
    return (
        <section aria-labelledby="faq-heading" className={`border-t border-[#E4E9F1] ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <p className="eyebrow mb-4">FAQ</p>
                    <h2 id="faq-heading" className="text-3xl sm:text-4xl text-[#0B1220]">{title}</h2>
                </div>
                <div className="lg:col-span-8 divide-y divide-[#E4E9F1] border-y border-[#E4E9F1]">
                    {items.map(({ q, a }) => (
                        <details key={q} className="group">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-semibold text-[#0B1220] [&::-webkit-details-marker]:hidden">
                                {q}
                                <ChevronDown aria-hidden className="h-4 w-4 shrink-0 text-[#64748B] transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="pb-5 text-base leading-relaxed text-[#1F2937] max-w-prose">{a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    )
}
