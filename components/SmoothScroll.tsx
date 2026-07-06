"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode };

export default function SmoothScroll({ children }: Props) {
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef   = useRef<number | null>(null);

    useEffect(() => {
        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) return;

        const lenis = new Lenis({
            duration: 0.9,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            syncTouch: true,
            gestureOrientation: "vertical",
            wheelMultiplier: 1.1,
            touchMultiplier: 1.2,
        });

        lenisRef.current = lenis;
        (window as any).__lenis = lenis;

        // Drive Lenis with its own rAF — stable, no ticker conflicts
        const raf = (time: number) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        };
        rafRef.current = requestAnimationFrame(raf);

        // Keep ScrollTrigger in sync with Lenis scroll position
        lenis.on("scroll", ScrollTrigger.update);

        // Tell ScrollTrigger how to read/write scroll through Lenis
        ScrollTrigger.scrollerProxy(document.documentElement, {
            scrollTop(value?: number) {
                if (typeof value === "number") {
                    lenis.scrollTo(value, { immediate: true });
                }
                return window.scrollY ?? 0;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: (document.documentElement.style as any).transform ? "transform" : "fixed",
        });

        ScrollTrigger.defaults({ scroller: document.documentElement });

        const onRefresh = () => lenis.resize();
        ScrollTrigger.addEventListener("refresh", onRefresh);
        ScrollTrigger.refresh();

        // Smooth anchor scrolling
        const onClick = (e: MouseEvent) => {
            const a = (e.target as HTMLElement)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
            if (!a) return;
            const id = decodeURIComponent((a.getAttribute("href") ?? "").slice(1));
            const el = document.getElementById(id);
            if (!el) return;
            e.preventDefault();
            lenis.scrollTo(el, { offset: -96, duration: 0.8, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
        };
        document.addEventListener("click", onClick);

        return () => {
            document.removeEventListener("click", onClick);
            ScrollTrigger.removeEventListener("refresh", onRefresh);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}
