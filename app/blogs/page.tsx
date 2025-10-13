"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Search, Loader2 } from "lucide-react";

/* ---------------- TYPES ---------------- */
type Post = {
    id: number;
    title: string;
    date: string;
    category: "daily" | "weekly" | "monthly";
    excerpt: string;
    cover?: string;
    tags?: string[];
    author: { name: string; avatar?: string };
};

/* ---------------- SAMPLE POSTS ---------------- */
const posts: Post[] = [
    {
        id: 1,
        title: "How AI is Transforming SaaS",
        date: "2025-08-29",
        category: "weekly",
        excerpt:
            "From copilots to automation: what AI means for product velocity, margins, and customer value.",
        cover: "/blogs/ai-saas.jpg",
        tags: ["AI", "SaaS"],
        author: { name: "Revzion Team", avatar: "/avatars/revzion.png" },
    },
    {
        id: 2,
        title: "5 Design Tips for Cross-Platform Apps",
        date: "2025-08-28",
        category: "daily",
        excerpt:
            "Keep iOS, Android, and Web cohesive without cookie-cutter UI. Five patterns that scale beautifully.",
        cover: "/blogs/cross-platform-design.jpg",
        tags: ["Design", "Mobile"],
        author: { name: "Revzion Design", avatar: "/avatars/design.png" },
    },
    {
        id: 3,
        title: "Monthly Recap: Revzion Projects",
        date: "2025-08-01",
        category: "monthly",
        excerpt:
            "Launches, learnings, and a peek behind the scenes from the Revzion team.",
        cover: "/blogs/monthly-recap.jpg",
        tags: ["Changelog"],
        author: { name: "Revzion Team", avatar: "/avatars/revzion.png" },
    },
];

const CATS = ["all", "daily", "weekly", "monthly"] as const;
type Cat = (typeof CATS)[number];

const card: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.995 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.36, ease: [0.2, 0.9, 0.25, 1] },
    },
};

/* ---------------- HELPERS ---------------- */
function formatDates(iso: string) {
    try {
        return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
            new Date(iso)
        );
    } catch {
        return iso;
    }
}

function readingTime(text: string) {
    const words = text.trim().split(/\s+/).length || 0;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
}

function debounce<T extends (...args: any[]) => void>(fn: T, ms = 250) {
    let t: any;
    return (...args: Parameters<T>) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), ms);
    };
}

/* ---------------- SKELETON ---------------- */
function PostSkeleton({ compact = false }: { compact?: boolean }) {
    return (
        <div
            aria-hidden
            className={`animate-pulse rounded-3xl bg-white/80 shadow-sm overflow-hidden`}
            style={{ minHeight: compact ? 64 : 220 }}
        >
            <div className={`${compact ? "h-14" : "h-40"} w-full bg-gray-100`} />
        </div>
    );
}

/* ---------------- MAIN PAGE ---------------- */
export default function BlogsPage() {
    const [filter, setFilter] = useState<Cat>("all");
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(6);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isCompact, setIsCompact] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const sorted = useMemo(
        () => [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
        []
    );

    const counts = useMemo(() => {
        const base: Record<string, number> = { all: sorted.length, daily: 0, weekly: 0, monthly: 0 };
        sorted.forEach((p) => (base[p.category] += 1));
        return base;
    }, [sorted]);

    const normalizedQuery = query.trim().toLowerCase();

    const filtered = useMemo(() => {
        const byCat = filter === "all" ? sorted : sorted.filter((p) => p.category === filter);
        if (!normalizedQuery) return byCat;
        return byCat.filter(
            (p) =>
                p.title.toLowerCase().includes(normalizedQuery) ||
                p.excerpt.toLowerCase().includes(normalizedQuery) ||
                (p.tags ?? []).some((t) => t.toLowerCase().includes(normalizedQuery)) ||
                p.author.name.toLowerCase().includes(normalizedQuery)
        );
    }, [filter, sorted, normalizedQuery]);

    const toShow = filtered.slice(0, visible);

    // debounced query setter to improve UX (but keep immediate visible reset)
    const debouncedQueryRef = useRef(
        debounce((text: string) => {
            setQuery(text);
        }, 300)
    );

    const handleSearchChange = useCallback((value: string) => {
        // immediate show reset for discoverability
        setVisible(6);
        debouncedQueryRef.current(value);
    }, []);

    // Load more (manual)
    const handleLoadMore = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));
        setVisible((v) => v + 6);
        setLoading(false);
    };

    // Auto-load more when sentinel becomes visible (progressive reveal)
    useEffect(() => {
        if (!loadMoreRef.current) return;
        const el = loadMoreRef.current;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && filtered.length > toShow.length && !loading) {
                        setVisible((v) => Math.min(filtered.length, v + 6));
                    }
                });
            },
            { root: null, rootMargin: "200px", threshold: 0.15 }
        );
        io.observe(el);
        return () => io.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtered.length, toShow.length, loading]);

    // keyboard: clear search with Esc
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setQuery("");
                setVisible(6);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // image fallback helper
    const handleImgError: React.ComponentProps<"img">["onError"] = (e) => {
        (e.target as HTMLImageElement).src = "/blogs/placeholder.jpg";
    };

    // shape clip for image (slanted right edge)
    const imageClip = "polygon(0 0, 100% 0, 86% 100%, 0% 100%)";

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Navigation />

            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
                    <div className="max-w-xl">
                        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-gray-900">
                            Revzion <span className="text-primary">Blog</span>
                        </h1>
                        <p className="text-gray-600 mt-2 leading-relaxed">
                            Fresh thinking — engineers, designers, and product leads sharing practical insights on AI, design, and engineering.
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                <strong className="font-medium text-gray-800">Updated</strong>
                <span>{formatDates(sorted[0]?.date ?? new Date().toISOString())}</span>
              </span>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsCompact((c) => !c);
                                }}
                                className="inline-flex items-center gap-2 rounded-full bg-white border px-3 py-1 shadow-sm text-gray-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-primary/30"
                                aria-pressed={isCompact}
                            >
                                {isCompact ? "Compact" : "Cozy"}
                            </button>

                            <div className="ml-auto hidden md:flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`px-3 py-1 rounded-md text-sm ${viewMode === "grid" ? "bg-primary text-white" : "bg-white border"}`}
                                    aria-label="Grid view"
                                >
                                    Grid
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`px-3 py-1 rounded-md text-sm ${viewMode === "list" ? "bg-primary text-white" : "bg-white border"}`}
                                    aria-label="List view"
                                >
                                    List
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search + controls */}
                    <div className="w-full md:w-[360px] flex gap-3">
                        <label className="relative flex-1" aria-label="Search posts">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                onChange={(e) => handleSearchChange(e.target.value)}
                                onKeyDown={() => setVisible(6)}
                                placeholder="Search posts, tags or author…"
                                className="w-full rounded-xl border border-gray-200 bg-white px-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition shadow-sm"
                                aria-label="Search posts"
                                defaultValue={query}
                            />
                            {query && (
                                <button
                                    onClick={() => {
                                        setQuery("");
                                        setVisible(6);
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </label>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 -mx-4 px-4">
                    <div className="max-w-6xl mx-auto flex items-center gap-3 bg-white/80 rounded-2xl border border-gray-200 px-4 py-3 shadow-sm backdrop-blur">
                        <div className="flex gap-2 overflow-x-auto py-1">
                            {CATS.map((cat) => {
                                const active = filter === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setFilter(cat);
                                            setVisible(6);
                                        }}
                                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium capitalize transition ${
                                            active ? "text-white bg-primary shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                        aria-pressed={active}
                                    >
                                        <span className="lowercase">{cat}</span>
                                        <span className={`ml-2 inline-block rounded-full px-2 py-0.5 text-[11px] ${active ? "bg-white/25" : "bg-white"}`}>
                      {counts[cat]}
                    </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="ml-auto flex items-center gap-3">
                            <Link href="/blogs/rss.xml" className="hidden sm:inline text-sm text-primary hover:underline">
                                RSS
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Unique-shaped Grid */}
                <div className={viewMode === "grid" ? "grid gap-8 grid-cols-1 sm:grid-cols-2" : "flex flex-col gap-6"}>
                    <AnimatePresence mode="popLayout">
                        {toShow.map((post, idx) => (
                            <motion.article
                                key={post.id}
                                variants={card}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0, scale: 0.98 }}
                                whileHover={{ y: -6, rotate: -0.5, boxShadow: "0 18px 45px rgba(12, 15, 20, 0.12)" }}
                                className={`relative group overflow-visible transition-transform ${viewMode === "list" ? "flex" : ""}`}
                            >
                                {/* Card shell — we use layered pieces to create a unique silhouette */}
                                <div
                                    className="relative rounded-3xl bg-white border border-transparent shadow-md"
                                    style={{ minHeight: viewMode === "list" ? 160 : 240 }}
                                >
                                    {/* Background accent shape (soft blob) */}
                                    <div
                                        aria-hidden
                                        className="absolute -left-8 -top-6 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                                        style={{
                                            background:
                                                "radial-gradient(closest-side, rgba(240,138,39,0.28), rgba(240,138,39,0.06))",
                                            filter: "blur(18px)",
                                            transform: idx % 2 === 0 ? "rotate(10deg)" : "rotate(-8deg)",
                                        }}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        {/* left: slanted image block (on desktop grid) */}
                                        <div
                                            className={`relative overflow-hidden ${viewMode === "list" ? "md:w-40 md:flex-shrink-0" : ""}`}
                                            style={{
                                                clipPath: imageClip,
                                                minHeight: viewMode === "list" ? 140 : 220,
                                            }}
                                        >
                                            {post.cover ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={post.cover}
                                                    alt={post.title}
                                                    onError={handleImgError}
                                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400">
                                                    No image
                                                </div>
                                            )}

                                            {/* image overlay gradient for legibility */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                                            {/* floating circular author badge that overlaps edge */}
                                            <div
                                                className="absolute -right-6 bottom-4 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                                                style={{ background: "linear-gradient(135deg,#fff,#fff0)" }}
                                            >
                                                {post.author.avatar ? (
                                                    <img
                                                        src={post.author.avatar}
                                                        alt={post.author.name}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xs text-gray-600">{post.author.name.split(" ")[0]}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* right: content panel overlapping image */}
                                        <div className="p-6 md:p-8 flex flex-col justify-between">
                                            <div>
                                                <div className="mb-3 flex items-center gap-3 text-xs text-gray-600">
                                                    <span className="font-medium text-gray-800">{post.author.name}</span>
                                                    <span aria-hidden>•</span>
                                                    <time dateTime={post.date} className="text-gray-500">{formatDates(post.date)}</time>
                                                    <span aria-hidden>•</span>
                                                    <span className="text-gray-500">{readingTime(`${post.title} ${post.excerpt}`)}</span>
                                                    <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-gray-100 px-2 py-0.5 capitalize text-gray-700 text-[12px]">
                            {post.category}
                          </span>
                                                </div>

                                                <h2 className="text-lg sm:text-xl font-heading font-semibold text-gray-900 group-hover:text-primary transition">
                                                    <Link href={`/blogs/${post.id}`} className="focus:outline-none focus:ring-2 focus:ring-primary/40">
                                                        {post.title}
                                                    </Link>
                                                </h2>

                                                <p className="mt-2 line-clamp-3 text-gray-600">{post.excerpt}</p>

                                                {post.tags?.length ? (
                                                    <ul className="mt-3 flex flex-wrap gap-2" aria-hidden>
                                                        {post.tags.map((t) => (
                                                            <li
                                                                key={t}
                                                                className="text-[12px] rounded-md bg-gray-100 px-2 py-0.5 text-gray-700"
                                                            >
                                                                {t}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : null}
                                            </div>

                                            <div className="mt-5 flex items-center gap-4">
                                                <Link
                                                    href={`/blogs/${post.id}`}
                                                    className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
                                                >
                                                    Read more →
                                                </Link>
                                                <span className="text-xs text-gray-500"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm"
                        role="status"
                        aria-live="polite"
                    >
                        <p className="text-gray-800 font-semibold">No posts found</p>
                        <p className="text-gray-500 mt-2">Try different keywords, or browse all posts below.</p>
                        <div className="mt-4 flex items-center justify-center gap-3">
                            <Link href="/blogs" className="rounded-full bg-primary px-4 py-2 text-white">
                                View all posts
                            </Link>
                            <button
                                onClick={() => {
                                    setFilter("all");
                                    setQuery("");
                                }}
                                className="rounded-full border px-4 py-2"
                            >
                                Reset filters
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Load more */}
                {filtered.length > toShow.length && (
                    <>
                        <div className="mt-10 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={loading}
                                className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 flex items-center gap-2 transition disabled:opacity-60"
                                aria-label="Load more posts"
                            >
                                {loading && <Loader2 className="animate-spin h-4 w-4" />}
                                {loading ? "Loading..." : "Load more"}
                            </button>
                        </div>

                        {/* invisible sentinel for auto-loading */}
                        <div ref={loadMoreRef} className="h-8" />
                    </>
                )}

                {/* Bottom meta */}
                <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
                    <p>
                        Posting cadence: <span className="font-medium text-gray-800">Daily · Weekly · Monthly</span>
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/blogs/rss.xml" className="text-primary hover:underline">
                            RSS Feed
                        </Link>
                        <Link href="/blogs" className="hover:underline">
                            All posts
                        </Link>
                    </div>
                </footer>
            </section>

            <Footer />
        </div>
    );
}