"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronUp } from "lucide-react";

type Props = {
    threshold?: number; // px scrolled before showing
};

export default function BackToTopFab({ threshold = 400 }: Props) {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => setMounted(true), []);
    useMotionValueEvent(scrollY, "change", (v) => setVisible(v > threshold));

    const node = (
        <motion.a
            href="#top"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.95 }}
            transition={{ duration: 0.18 }}
            aria-label="Back to top"
            className="
        fixed
        right-[calc(1rem+env(safe-area-inset-right,0px))]
        bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))]
        sm:bottom-[calc(5rem+env(safe-area-inset-bottom,0px))]
        inline-flex h-12 w-12 items-center justify-center
        rounded-full bg-primary text-white
        shadow-xl ring-1 ring-black/5
        hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
      "
            style={{ zIndex: 10000, pointerEvents: visible ? "auto" : "none" }}
        >
            <ChevronUp className="h-5 w-5" />
        </motion.a>
    );

    // Render outside any stacking/transform contexts
    return mounted ? createPortal(node, document.body) : null;
}