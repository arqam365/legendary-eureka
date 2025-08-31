"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export type Milestone = { id: string; label: string }

type Props = {
    sections: Milestone[]
    activateAt?: string
    topOffsetPx?: number
    leftOffsetPx?: number
    className?: string
}

export default function ScrollMilestones({
                                             sections,
                                             activateAt = "top 70%",
                                             topOffsetPx = 96,
                                             leftOffsetPx = 8,
                                             className = "",
                                         }: Props) {
    const [active, setActive] = useState(0)
    const [overall, setOverall] = useState(0)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        if (!sections.length) return
        const triggers: ScrollTrigger[] = []

        sections.forEach((s, idx) => {
            const el = document.getElementById(s.id)
            if (!el) return
            triggers.push(
                ScrollTrigger.create({
                    trigger: el,
                    start: activateAt,
                    end: "bottom center",
                    onEnter: () => setActive(idx),
                    onEnterBack: () => setActive(idx),
                })
            )
        })

        const firstEl = document.getElementById(sections[0]?.id || "")
        const lastEl = document.getElementById(sections[sections.length - 1]?.id || "")
        if (firstEl && lastEl) {
            triggers.push(
                ScrollTrigger.create({
                    trigger: firstEl,
                    start: "top center",
                    endTrigger: lastEl,
                    end: "bottom center",
                    onUpdate: (self) => setOverall(self.progress),
                })
            )
        }

        return () => triggers.forEach(t => t.kill())
    }, [sections, activateAt])

    const progressPct = Math.min(100, Math.max(0, overall * 100))

    // --- exact centering math (keeps everything perfectly aligned) ---
    const DOT_WRAPPER = 24       // w-6
    const RAIL_WIDTH = 2         // w-[2px]
    const railLeftPx = (DOT_WRAPPER - RAIL_WIDTH) / 2 // 11px, but computed
    // -----------------------------------------------------------------

    return (
        <aside
            className={["hidden lg:block fixed z-[60] select-none", className].join(" ")}
            style={{
                left: `calc(env(safe-area-inset-left, 0px) + ${leftOffsetPx}px)`,
                top: topOffsetPx,
                bottom: 24,
            }}
            aria-label="Page section tracker"
        >
            <div ref={containerRef} className="relative h-full w-[200px]">
                {/* rail */}
                <div
                    className="absolute top-0 bottom-0 rounded-full pointer-events-none"
                    style={{ left: railLeftPx, width: RAIL_WIDTH, background: "rgb(229 231 235)" /* gray-200 */ }}
                />
                {/* progress */}
                <div
                    className="absolute top-0 rounded-full pointer-events-none"
                    style={{
                        left: railLeftPx,
                        width: RAIL_WIDTH,
                        height: `calc(${progressPct}% )`,
                        background: "var(--revzion-gradient, #3b82f6)", // falls back to blue-500 if the CSS var isn't present
                        transition: "height 0.25s ease-out",
                    }}
                    aria-hidden
                />

                {/* markers */}
                <ul className="relative h-full list-none m-0 p-0">
                    {sections.map((s, idx) => {
                        const top = sections.length === 1 ? 0 : (idx / (sections.length - 1)) * 100
                        const isActive = idx === active
                        const isDone = idx < active

                        return (
                            <li
                                key={s.id}
                                className="absolute left-0 flex items-center"
                                style={{ top: `${top}%`, transform: "translateY(-50%)" }}
                            >
                                {/* dot wrapper = 24px, centered over railLeftPx */}
                                <a
                                    href={`#${s.id}`}
                                    className="relative grid place-items-center h-6 w-6 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    title={s.label}
                                    aria-current={isActive ? "true" : undefined}
                                >
                  <span
                      className={[
                          "absolute inset-0 rounded-full transition",
                          isActive ? "bg-primary/15 scale-110" : "hover:bg-gray-200/70",
                      ].join(" ")}
                      aria-hidden
                  />
                                    {/* keep the colored dot above the progress line */}
                                    <span
                                        className={[
                                            "relative z-[1] h-2.5 w-2.5 rounded-full border transition",
                                            isActive
                                                ? "bg-primary border-primary"
                                                : isDone
                                                    ? "bg-primary/60 border-primary/60"
                                                    : "bg-white border-gray-300 hover:border-gray-400",
                                        ].join(" ")}
                                    />
                                </a>

                                {/* label (hidden until active) */}
                                <a
                                    href={`#${s.id}`}
                                    className={[
                                        "ml-2 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "opacity-100 translate-x-0 text-gray-900"
                                            : "opacity-0 -translate-x-1 pointer-events-none",
                                    ].join(" ")}
                                >
                                    {s.label}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>
    )
}