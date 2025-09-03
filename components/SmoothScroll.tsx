"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = { children: React.ReactNode };

export default function SmoothScroll({ children }: Props) {
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        // Respect reduced motion
        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) return;

        // 1) Init Lenis
        const lenis = new Lenis({
            duration: 1.0,                       // tweak 0.8–1.2 to taste
            easing: (t: number) => 1 - Math.pow(1 - t, 1.5),
            smoothWheel: true,
            gestureOrientation: "vertical",
            touchMultiplier: 1.1,
        });
        (lenisRef as any).current = lenis;
        (window as any).__lenis = lenis;

        // 2) Drive Lenis with rAF
        const raf = (time: number) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        };
        rafRef.current = requestAnimationFrame(raf);

        // 3) GSAP ScrollTrigger ↔ Lenis bridge
        //    Let GSAP read/write scroll via Lenis
        lenis.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(document.documentElement, {
            scrollTop(value?: number) {
                if (typeof value === "number") {
                    // jump immediately so GSAP can set scroll positions precisely
                    lenis.scrollTo(value, { immediate: true });
                }
                return window.scrollY || window.pageYOffset || 0;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            // Some mobile browsers don’t transform <html>. Pick pin strategy accordingly.
            pinType: (document.documentElement.style as any).transform ? "transform" : "fixed",
        });

        // Make ScrollTrigger use the root scroller by default
        ScrollTrigger.defaults({ scroller: document.documentElement });

        // Keep things in sync on refresh/resize
        const onRefresh = () => lenis.resize();
        ScrollTrigger.addEventListener("refresh", onRefresh);
        // Initial measurement
        ScrollTrigger.refresh();

        // 4) Smooth hash-link (anchor) scrolling w/ sticky header offset
        const HEADER_OFFSET = 96; // adjust if your sticky header height differs
        const onClick = (e: MouseEvent) => {
            const a = (e.target as HTMLElement)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
            if (!a) return;
            const raw = a.getAttribute("href");
            if (!raw) return;
            const id = decodeURIComponent(raw.slice(1));
            const el = document.getElementById(id);
            if (!el) return;
            e.preventDefault();
            lenis.scrollTo(el, { offset: -HEADER_OFFSET });
        };
        document.addEventListener("click", onClick);

        // Cleanup
        return () => {
            document.removeEventListener("click", onClick);
            ScrollTrigger.removeEventListener("refresh", onRefresh);
            // Don’t try to “unset” scrollerProxy; just kill triggers if needed
            // (You likely keep ST globally; killing here is optional)
            // ScrollTrigger.getAll().forEach(t => t.kill());

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}