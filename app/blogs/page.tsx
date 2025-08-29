"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

type Post = {
    id: number
    title: string
    date: string // ISO
    category: "daily" | "weekly" | "monthly"
    excerpt: string
    cover?: string
    tags?: string[]
    author: { name: string; avatar?: string }
}

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
            "Keep iOS, Android, and Web cohesive without cookie-cutter UI. Five patterns that scale.",
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
]

const CATS = ["all", "daily", "weekly", "monthly"] as const
type Cat = (typeof CATS)[number]

const card: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
}

function formatDate(iso: string) {
    try {
        return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(iso))
    } catch {
        return iso
    }
}
function readingTime(text: string) {
    const words = text.trim().split(/\s+/).length || 0
    const minutes = Math.max(1, Math.round(words / 200))
    return `${minutes} min read`
}

export default function BlogsPage() {
    const [filter, setFilter] = useState<Cat>("all")
    const [query, setQuery] = useState("")
    const [visible, setVisible] = useState(6)

    // newest first
    const sorted = useMemo(
        () => [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
        []
    )

    const counts = useMemo(() => {
        const base = { all: sorted.length, daily: 0, weekly: 0, monthly: 0 }
        sorted.forEach((p) => (base[p.category] += 1))
        return base
    }, [sorted])

    const normalizedQuery = query.trim().toLowerCase()

    const filtered = useMemo(() => {
        const byCat = filter === "all" ? sorted : sorted.filter((p) => p.category === filter)
        if (!normalizedQuery) return byCat
        return byCat.filter(
            (p) =>
                p.title.toLowerCase().includes(normalizedQuery) ||
                p.excerpt.toLowerCase().includes(normalizedQuery) ||
                (p.tags ?? []).some((t) => t.toLowerCase().includes(normalizedQuery)) ||
                p.author.name.toLowerCase().includes(normalizedQuery)
        )
    }, [filter, sorted, normalizedQuery])

    const toShow = filtered.slice(0, visible)

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-gray-900">Revzion Blog</h1>
                        <p className="text-gray-600 mt-2">
                            Daily tips, weekly deep-dives, and monthly recaps to level up your product & engineering.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                                setVisible(6)
                            }}
                            placeholder="Search posts…"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                            aria-label="Search posts"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-gray-500 hover:bg-gray-100"
                                aria-label="Clear search"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Category pills */}
                <div className="relative mb-8 overflow-x-auto">
                    <div className="flex gap-2">
                        {CATS.map((cat) => {
                            const active = filter === cat
                            return (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setFilter(cat)
                                        setVisible(6)
                                    }}
                                    className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                                        active ? "text-white" : "text-gray-700 hover:text-gray-900"
                                    }`}
                                    style={{
                                        background: active ? "var(--color-primary, #2563eb)" : "rgba(17,24,39,0.06)",
                                    }}
                                    aria-pressed={active}
                                >
                                    <span className="capitalize">{cat}</span>
                                    <span
                                        className={`ml-2 inline-block rounded-full bg-white/30 px-2 py-0.5 text-[11px] ${
                                            active ? "text-white" : "text-gray-700/80"
                                        }`}
                                    >
                    {counts[cat as keyof typeof counts]}
                  </span>
                                    {active && (
                                        <motion.span
                                            layoutId="active-pill"
                                            className="absolute inset-0 -z-10 rounded-full"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                        {toShow.map((post) => (
                            <motion.article
                                key={post.id}
                                variants={card}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                            >
                                {/* Cover */}
                                {post.cover && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={post.cover} alt="" className="h-44 w-full object-cover" loading="lazy" />
                                )}

                                <div className="p-6">
                                    {/* Meta line: author + date + read time */}
                                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                                        <div className="flex items-center gap-2">
                                            {post.author.avatar && (
                                                <Image
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    width={18}
                                                    height={18}
                                                    className="rounded-full"
                                                />
                                            )}
                                            <span className="font-medium">{post.author.name}</span>
                                        </div>
                                        <span>•</span>
                                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                                        <span>•</span>
                                        <span>{readingTime(`${post.title} ${post.excerpt}`)}</span>
                                        <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 capitalize text-gray-700">
                      {post.category}
                    </span>
                                    </div>

                                    <h2 className="text-lg sm:text-xl font-heading font-semibold text-gray-900">
                                        <Link href={`/blogs/${post.id}`} className="hover:underline">
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p className="mt-2 line-clamp-3 text-gray-600">{post.excerpt}</p>

                                    {post.tags && post.tags.length > 0 && (
                                        <ul className="mt-3 flex flex-wrap gap-2">
                                            {post.tags.map((t) => (
                                                <li key={t} className="text-[11px] rounded-md bg-gray-100 px-2 py-0.5 text-gray-700">
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="mt-4">
                                        <Link
                                            href={`/blogs/${post.id}`}
                                            className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5"
                                            aria-label={`Read ${post.title}`}
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div className="mt-16 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                        <p className="text-gray-700 font-medium">No posts found</p>
                        <p className="text-gray-500 mt-1 text-sm">Try a different filter or clear the search.</p>
                    </div>
                )}

                {/* Load more */}
                {filtered.length > toShow.length && (
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={() => setVisible((v) => v + 6)}
                            className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
                        >
                            Load more
                        </button>
                    </div>
                )}

                {/* SEO/feeds helpers row */}
                <div className="mt-12 flex flex-wrap items-center justify-between gap-3 text-sm">
                    <p className="text-gray-500">
                        Posting cadence: <span className="font-medium text-gray-700">Daily · Weekly · Monthly</span>
                    </p>
                    <div className="flex items-center gap-3">
                        <Link href="/blogs/rss.xml" className="text-primary hover:underline">
                            RSS
                        </Link>
                        <Link href="/blogs" className="text-gray-600 hover:underline">
                            All posts
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}