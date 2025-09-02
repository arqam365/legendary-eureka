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
    peekMs?: number
    hideWhenInView?: string | Element
    disableBelow?: number
}

export default function ScrollMilestones({
                                             sections,
                                             activateAt = "top 70%",
                                             topOffsetPx = 96,
                                             leftOffsetPx = 8,
                                             className = "",
                                             peekMs = 900,
                                             hideWhenInView,
                                             disableBelow = 1024,
                                         }: Props) {
    const [active, setActive] = useState(0)
    const [peek, setPeek] = useState(false)

    const peekTimer = useRef<number | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const progressRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        if (!sections.length) return

        // one GSAP context + matchMedia per effect run
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add(`(min-width: ${disableBelow}px)`, () => {
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

                // Progress watcher
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
                                        scaleY: self.progress,
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

                // Hide while footer (or any target) is in view
                if (hideWhenInView && wrapperRef.current) {
                    const targetEl =
                        typeof hideWhenInView === "string"
                            ? (document.querySelector(hideWhenInView) as Element | null)
                            : (hideWhenInView as Element | null)

                    if (targetEl) {
                        triggers.push(
                            ScrollTrigger.create({
                                trigger: targetEl,
                                // Hide from the moment the footer's top touches the viewport bottom
                                // until the footer's bottom goes above the viewport top (i.e., fully out of view)
                                start: "top bottom",
                                end:   "bottom top",
                                onUpdate: (self) => {
                                    const hide = self.isActive // any part of footer intersects the viewport
                                    gsap.to(wrapperRef.current!, {
                                        autoAlpha: hide ? 0 : 1, // opacity + visibility
                                        duration: 0.18,
                                        ease: "power2.out",
                                        overwrite: true,
                                        onComplete: () => {
                                            if (!wrapperRef.current) return
                                            wrapperRef.current.style.pointerEvents = hide ? "none" : "auto"
                                            wrapperRef.current.setAttribute("aria-hidden", hide ? "true" : "false")
                                        },
                                    })
                                },
                            })
                        )
                    }
                }

                // CLEANUP for this media query ONLY: kill triggers
                return () => {
                    triggers.forEach((t) => t.kill())
                }
            })

            // CLEANUP for the whole matchMedia/context scope
            return () => {
                mm.revert() // revert all mm.add registrations from above
            }
        })

        // React effect cleanup
        return () => {
            ctx.revert()
            if (peekTimer.current) window.clearTimeout(peekTimer.current)
        }
    }, [sections, activateAt, peekMs, hideWhenInView, disableBelow])

    // rail math
    const DOT_WRAPPER = 24
    const RAIL_WIDTH = 2
    const railLeftPx = (DOT_WRAPPER - RAIL_WIDTH) / 2

    return (
        <aside
            ref={wrapperRef}
            className={["hidden lg:block fixed z-[60] select-none", className].join(" ")}
            style={{
                left: `calc(env(safe-area-inset-left, 0px) + ${leftOffsetPx}px)`,
                top: topOffsetPx,
                bottom: 24,
            }}
            aria-label="Page section tracker"
        >
            <div className="relative h-full w-[200px]">
                <div
                    className="absolute top-0 bottom-0 rounded-full pointer-events-none"
                    style={{ left: (DOT_WRAPPER - RAIL_WIDTH) / 2, width: RAIL_WIDTH, background: "rgb(229 231 235)" }}
                />
                <div
                    ref={progressRef}
                    className="absolute top-0 rounded-full pointer-events-none will-change-transform"
                    style={{
                        left: (DOT_WRAPPER - RAIL_WIDTH) / 2,
                        width: RAIL_WIDTH,
                        height: "100%",
                        transformOrigin: "top",
                        transform: "scaleY(0)",
                        background: "var(--revzion-gradient, #3b82f6)",
                        boxShadow: "0 0 10px rgba(59,130,246,0.25)",
                    }}
                    aria-hidden
                />

                <ul className="relative h-full list-none m-0 p-0">
                    {sections.map((s, idx) => {
                        const top = sections.length === 1 ? 0 : (idx / (sections.length - 1)) * 100
                        const isActive = idx === active
                        const isDone = idx < active
                        return (
                            <li key={s.id} className="absolute left-0 flex items-center" style={{ top: `${top}%`, transform: "translateY(-50%)" }}>
                                <a href={`#${s.id}`} className="relative grid place-items-center h-6 w-6 rounded-full focus:outline-none" title={s.label} aria-current={isActive ? "true" : undefined}>
                  <span
                      className={[
                          "relative z-[1] h-2.5 w-2.5 rounded-full border transition",
                          isActive ? "bg-primary border-primary" : isDone ? "bg-primary/60 border-primary/60" : "bg-white border-gray-300 hover:border-gray-400",
                      ].join(" ")}
                  />
                                </a>
                            </li>
                        )
                    })}
                </ul>

                {sections[active] && (
                    <div
                        className={[
                            "absolute -left-1 ml-7 px-2.5 py-1 rounded-md bg-white/90 shadow-sm border border-gray-200",
                            "text-sm font-medium text-gray-900 transition-all duration-200",
                            peek ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 pointer-events-none",
                        ].join(" ")}
                        style={{ top: `calc(${(active / (sections.length - 1 || 1)) * 100}% - 12px)` }}
                    >
                        {sections[active].label}
                    </div>
                )}
            </div>
        </aside>
    )
}