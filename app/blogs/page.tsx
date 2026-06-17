"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Search, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://app.revzion.in";

/* ---------------- TYPES ---------------- */
type Post = {
    id: string;
    slug: string;
    title: string;
    date: string;
    category: "daily" | "weekly" | "monthly";
    excerpt: string;
    cover?: string;
    tags?: string[];
    author: { name: string; avatar?: string };
};

type ApiPost = {
    id: string;
    slug: string;
    title: string;
    description: string;
    coverImage?: string | null;
    category: "DAILY" | "WEEKLY" | "MONTHLY";
    tags: string[];
    publishedAt: string | null;
    createdAt: string;
    author: { name: string };
};

function mapApiPost(p: ApiPost): Post {
    return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        date: p.publishedAt ?? p.createdAt,
        category: p.category.toLowerCase() as Post["category"],
        excerpt: p.description,
        cover: p.coverImage ?? undefined,
        tags: p.tags,
        author: { name: p.author.name },
    };
}

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
function PostSkeleton() {
    return (
        <div
            aria-hidden
            className="animate-pulse rounded-3xl bg-white/80 shadow-sm overflow-hidden"
            style={{ minHeight: 240 }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-56 w-full bg-gray-100" />
                <div className="p-6 flex flex-col gap-3">
                    <div className="h-3 w-24 rounded bg-gray-100" />
                    <div className="h-5 w-3/4 rounded bg-gray-200" />
                    <div className="h-3 w-full rounded bg-gray-100" />
                    <div className="h-3 w-2/3 rounded bg-gray-100" />
                </div>
            </div>
        </div>
    );
}

/* ---------------- MAIN PAGE ---------------- */
export default function BlogsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [fetching, setFetching] = useState(true);
    const [filter, setFilter] = useState<Cat>("all");
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(6);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isCompact, setIsCompact] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/api/cms/public/posts`)
            .then((r) => {
                if (!r.ok) throw new Error("Failed to fetch");
                return r.json();
            })
            .then((data: ApiPost[]) => setPosts(data.map(mapApiPost)))
            .catch(() => {})
            .finally(() => setFetching(false));
    }, []);

    const sorted = useMemo(
        () => [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
        [posts]
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

    const debouncedQueryRef = useRef(
        debounce((text: string) => {
            setQuery(text);
        }, 300)
    );

    const handleSearchChange = useCallback((value: string) => {
        setVisible(6);
        debouncedQueryRef.current(value);
    }, []);

    const handleLoadMore = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));
        setVisible((v) => v + 6);
        setLoading(false);
    };

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

    const handleImgError: React.ComponentProps<"img">["onError"] = (e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
    };

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
                <span>{sorted[0] ? formatDates(sorted[0].date) : "—"}</span>
              </span>

                            <button
                                type="button"
                                onClick={() => setIsCompact((c) => !c)}
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

                    {/* Search */}
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

                {/* Loading skeletons */}
                {fetching && (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
                        {[0, 1, 2, 3].map((i) => <PostSkeleton key={i} />)}
                    </div>
                )}

                {/* Grid */}
                {!fetching && (
                    <div className={viewMode === "grid" ? "grid gap-8 grid-cols-1 sm:grid-cols-2" : "flex flex-col gap-6"}>
                        <AnimatePresence mode="popLayout">
                            {toShow.map((post) => (
                                <motion.article
                                    key={post.id}
                                    variants={card}
                                    initial="hidden"
                                    animate="show"
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.09)" }}
                                    className="group rounded-3xl bg-white shadow-md border border-gray-100 overflow-hidden flex transition-all"
                                    style={{ minHeight: 180 }}
                                >
                                    {/* Cover image panel */}
                                    <div className="w-40 sm:w-48 md:w-52 flex-shrink-0 relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                        {post.cover ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={post.cover}
                                                alt={post.title}
                                                onError={handleImgError}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 select-none">
                                                <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center text-xl">
                                                    📝
                                                </div>
                                                <span className="text-xs text-gray-400 font-medium">No cover</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content panel */}
                                    <div className="flex-1 min-w-0 p-5 sm:p-6 flex flex-col justify-between">
                                        <div>
                                            {/* Meta row — single line */}
                                            <div className="flex items-center gap-x-2 text-xs text-gray-500 mb-2.5 flex-wrap gap-y-1">
                                                <span className="font-semibold text-gray-700 shrink-0">{post.author.name}</span>
                                                <span aria-hidden className="shrink-0">·</span>
                                                <time dateTime={post.date} className="shrink-0">{formatDates(post.date)}</time>
                                                <span aria-hidden className="shrink-0">·</span>
                                                <span className="shrink-0">{readingTime(`${post.title} ${post.excerpt}`)}</span>
                                                <span className="ml-auto capitalize rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-600 font-medium text-[11px] shrink-0">
                                                    {post.category}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-base sm:text-lg font-heading font-semibold text-gray-900 group-hover:text-primary transition line-clamp-2 leading-snug">
                                                <Link href={`/blogs/${post.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                                                    {post.title}
                                                </Link>
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="mt-1.5 text-sm text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>

                                            {/* Tags */}
                                            {post.tags?.length ? (
                                                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                                                    {post.tags.slice(0, 4).map((t) => (
                                                        <li key={t} className="text-[11px] rounded-md bg-gray-100 px-2 py-0.5 text-gray-600">
                                                            {t}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : null}
                                        </div>

                                        <Link
                                            href={`/blogs/${post.slug}`}
                                            className="mt-3 text-sm text-primary font-medium hover:underline self-start"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Empty state */}
                {!fetching && filtered.length === 0 && (
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
                {!fetching && filtered.length > toShow.length && (
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
