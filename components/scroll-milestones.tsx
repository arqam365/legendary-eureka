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
    peekMs?: number // how long the pill stays visible on activate
}

export default function ScrollMilestones({
                                             sections,
                                             activateAt = "top 70%",
                                             topOffsetPx = 96,
                                             leftOffsetPx = 8,
                                             className = "",
                                             peekMs = 900,
                                         }: Props) {
    const [active, setActive] = useState(0)
    const [peek, setPeek] = useState(false)

    const peekTimer = useRef<number | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const progressRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        if (!sections.length) return
        const triggers: ScrollTrigger[] = []

        const showPeek = (idx: number) => {
            setActive(idx)
            setPeek(true)
            if (peekTimer.current) window.clearTimeout(peekTimer.current)
            peekTimer.current = window.setTimeout(() => setPeek(false), peekMs)
        }

        // Section watchers
        sections.forEach((s, idx) => {
            const el = document.getElementById(s.id)
            if (!el) return
            triggers.push(
                ScrollTrigger.create({
                    trigger: el,
                    start: activateAt,
                    end: "bottom center",
                    onEnter: () => showPeek(idx),
                    onEnterBack: () => showPeek(idx),
                })
            )
        })

        // Progress bar watcher
        const firstEl = document.getElementById(sections[0]?.id || "")
        const lastEl = document.getElementById(sections[sections.length - 1]?.id || "")

        if (firstEl && lastEl) {
            triggers.push(
                ScrollTrigger.create({
                    trigger: firstEl,
                    start: "top center",
                    endTrigger: lastEl,
                    end: "bottom center",
                    onUpdate: (self) => {
                        if (progressRef.current) {
                            gsap.to(progressRef.current, {
                                scaleY: self.progress, // 0 → 1
                                duration: 0.35,
                                ease: "power2.out",
                                overwrite: true,
                            })
                        }
                    },
                    onLeaveBack: () => {
                        if (progressRef.current) gsap.set(progressRef.current, { scaleY: 0 })
                    },
                })
            )
        }

        return () => {
            triggers.forEach((t) => t.kill())
            if (peekTimer.current) window.clearTimeout(peekTimer.current)
        }
    }, [sections, activateAt, peekMs])

    // rail math
    const DOT_WRAPPER = 24
    const RAIL_WIDTH = 2
    const railLeftPx = (DOT_WRAPPER - RAIL_WIDTH) / 2

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
                    style={{ left: railLeftPx, width: RAIL_WIDTH, background: "rgb(229 231 235)" }}
                />

                {/* progress (scale-based for smooth growth) */}
                <div
                    ref={progressRef}
                    className="absolute top-0 rounded-full pointer-events-none will-change-transform"
                    style={{
                        left: railLeftPx,
                        width: RAIL_WIDTH,
                        height: "100%",
                        transformOrigin: "top",
                        transform: "scaleY(0)",
                        background: "var(--revzion-gradient, #3b82f6)",
                        boxShadow: "0 0 10px rgba(59,130,246,0.25)",
                    }}
                    aria-hidden
                />

                {/* dots */}
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
                                <a
                                    href={`#${s.id}`}
                                    className="relative grid place-items-center h-6 w-6 rounded-full focus:outline-none"
                                    title={s.label}
                                    aria-current={isActive ? "true" : undefined}
                                >
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
                            </li>
                        )
                    })}
                </ul>

                {/* floating active label pill (only peeks) */}
                {sections[active] && (
                    <div
                        className={[
                            "absolute -left-1 ml-7 px-2.5 py-1 rounded-md bg-white/90 shadow-sm border border-gray-200",
                            "text-sm font-medium text-gray-900 transition-all duration-200",
                            peek ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 pointer-events-none",
                        ].join(" ")}
                        style={{
                            top: `calc(${(active / (sections.length - 1 || 1)) * 100}% - 12px)`,
                        }}
                    >
                        {sections[active].label}
                    </div>
                )}
            </div>
        </aside>
    )
}