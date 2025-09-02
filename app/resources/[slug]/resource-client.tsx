"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {motion, useReducedMotion, Variants} from "framer-motion";
import {
    ArrowRight,
    ListTree,
    Link as LinkIcon,
    Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {Footer} from "@/components/footer";

type Section = { id: string; label: string; html: string };
type ResourceDoc = {
    title: string;
    description: string;
    badge?: string;
    sections: Section[];
};

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // cubic-bezier
        },
    },
};

function estimateReading(sections: Section[]) {
    const text = sections.map(s => s.html.replace(/<[^>]+>/g, " ")).join(" ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const mins = Math.max(1, Math.round(words / 220));
    return { words, mins };
}

export default function ResourceArticle({ doc }: { doc: ResourceDoc }) {
    const prefersReduced = useReducedMotion();
    const toc = useMemo(
        () => doc.sections.map((s) => ({ id: s.id, label: s.label })),
        [doc.sections]
    );

    const [active, setActive] = useState(toc[0]?.id || "");
    const [mobileTocOpen, setMobileTocOpen] = useState(false);
    const progressRef = useRef<HTMLDivElement | null>(null);

    // ——— Scroll spy
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: [0, 1] }
        );
        toc.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, [toc]);

    // ——— Top progress bar
    useEffect(() => {
        const onScroll = () => {
            if (!progressRef.current) return;
            const docEl = document.documentElement;
            const total = docEl.scrollHeight - docEl.clientHeight;
            const p = total > 0 ? window.scrollY / total : 0;
            progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ——— Smooth in-page scroll with header offset
    const scrollToId = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (!target) return;
        const headerOffset = 88; // matches sticky header/TOC spacing
        const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        if (prefersReduced) {
            window.scrollTo(0, y);
        } else {
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        setMobileTocOpen(false);
        // ensure active state updates
        setTimeout(() => target.focus?.(), 10);
    };

    // ——— Copy link helper
    const copyLink = async (id: string) => {
        const url = `${location.origin}${location.pathname}#${id}`;
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            // noop
        }
    };

    const { mins, words } = estimateReading(doc.sections);

    return (
        <>
            {/* progress bar */}
            <div className="fixed left-0 right-0 top-0 z-[95] h-[2px] origin-left bg-primary"
                 ref={progressRef}
                 style={{ transform: "scaleX(0)" }}
                 aria-hidden />

            <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                {/* meta row */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1">
              {mins} min read • {words.toLocaleString()} words
            </span>
                        {doc.badge && (
                            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700">
                {doc.badge}
              </span>
                        )}
                    </div>

                    {/* mobile TOC toggle */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setMobileTocOpen(v => !v)}
                            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm"
                            aria-expanded={mobileTocOpen}
                            aria-controls="mobile-toc"
                        >
                            <ListTree className="h-4 w-4" /> On this page
                        </button>
                    </div>
                </motion.div>

                {/* mobile TOC */}
                {mobileTocOpen && (
                    <div id="mobile-toc" className="mb-6 lg:hidden rounded-2xl border border-gray-200 bg-white/80 p-3 shadow-sm">
                        <nav className="grid gap-1" aria-label="Table of contents">
                            {toc.map((t) => (
                                <a
                                    key={t.id}
                                    href={`#${t.id}`}
                                    onClick={scrollToId(t.id)}
                                    className={[
                                        "rounded-md px-3 py-2 text-sm transition",
                                        active === t.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-100 text-gray-700",
                                    ].join(" ")}
                                >
                                    {t.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                )}

                <div className="grid gap-12 lg:grid-cols-12">
                    {/* content */}
                    <div className="lg:col-span-8 space-y-12">
                        {doc.sections.map((s, idx) => (
                            <motion.section
                                key={s.id}
                                id={s.id}
                                className="group scroll-mt-28"
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.25 }}
                            >
                                {/* heading row with copy link */}
                                <div className="flex items-start justify-between gap-3">
                                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">
                                        {s.label}
                                    </h2>
                                    <button
                                        onClick={() => copyLink(s.id)}
                                        className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600"
                                        aria-label={`Copy link to ${s.label}`}
                                        title="Copy link"
                                    >
                                        <LinkIcon className="h-3.5 w-3.5" />
                                        Link
                                    </button>
                                </div>

                                {/* section body */}
                                <div
                                    className={[
                                        "prose max-w-none mt-3",
                                        // fine-tuned prose colors
                                        "prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900",
                                        "prose-a:text-primary hover:prose-a:underline",
                                        "prose-code:text-gray-900",
                                    ].join(" ")}
                                    dangerouslySetInnerHTML={{ __html: s.html }}
                                />

                                {/* subtle divider between sections */}
                                {idx < doc.sections.length - 1 && (
                                    <hr className="mt-8 border-gray-200/80" />
                                )}
                            </motion.section>
                        ))}

                        {/* share row */}
                        <div className="pt-2">
                            <button
                                onClick={() => {
                                    try {
                                        navigator.share?.({
                                            title: doc.title,
                                            text: doc.description,
                                            url: location.href,
                                        });
                                    } catch {
                                        navigator.clipboard?.writeText?.(location.href);
                                    }
                                }}
                                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm"
                            >
                                <Share2 className="h-4 w-4" /> Share
                            </button>
                        </div>
                    </div>

                    {/* right rail */}
                    <aside className="lg:col-span-4">
                        <div className="lg:sticky lg:top-24 space-y-4">
                            {/* desktop TOC */}
                            <div className="hidden lg:block rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm">
                                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <ListTree className="h-4 w-4" /> On this page
                                </div>
                                <nav aria-label="Table of contents" className="space-y-1">
                                    {toc.map((t) => (
                                        <a
                                            key={t.id}
                                            href={`#${t.id}`}
                                            onClick={scrollToId(t.id)}
                                            className={[
                                                "block rounded-md px-3 py-2 text-sm transition",
                                                active === t.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-100 text-gray-700",
                                            ].join(" ")}
                                            aria-current={active === t.id ? "true" : undefined}
                                        >
                                            {t.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            {/* CTA card */}
                            <div className="rounded-2xl border border-blue-200 bg-white/80 p-5 shadow-sm">
                                <p className="text-sm font-medium text-blue-800">Need a partner?</p>
                                <p className="mt-1 text-blue-900">
                                    We design, ship, and operate assistants with guardrails and KPIs.
                                </p>
                                <Button asChild className="w-full bg-gradient-revzion mt-3">
                                    <Link href="/contact">
                                        Book a free consultation <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            </article>

            <Footer />

            {/* minimal styling enhancements */}
            <style jsx global>{`
        .prose pre {
          background: #f8fafc;
          border: 1px solid rgba(148, 163, 184, 0.25);
          border-radius: 0.75rem;
          padding: 1rem;
        }
        .prose code {
          background: rgba(148, 163, 184, 0.12);
          padding: 0.1rem 0.35rem;
          border-radius: 0.375rem;
        }
      `}</style>
        </>
    );
}