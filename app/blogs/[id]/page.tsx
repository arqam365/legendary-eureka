import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ShareActions } from "../ShareActions"

// ---- Types & data -----------------------------------------------------------
type Post = {
    title: string
    excerpt: string
    content: string
    date: string              // ISO
    author: { name: string; avatar?: string }
    cover?: string
    tags?: string[]
}

const posts: Record<number, Post> = {
    1: {
        title: "How AI is Transforming SaaS",
        excerpt: "From copilots to automated ops, here’s how AI changes product velocity and margins.",
        content: `Full blog content goes here...`,
        date: "2025-02-01",
        author: { name: "Revzion Team" },
        cover: "/blogs/ai-saas.jpg",
        tags: ["AI", "SaaS", "Automation"],
    },
    2: {
        title: "5 Design Tips for Cross-Platform Apps",
        excerpt: "Practical heuristics to keep iOS, Android, and web consistent—without déjà vu UI.",
        content: `Full blog content goes here...`,
        date: "2025-02-08",
        author: { name: "Revzion Design" },
        cover: "/blogs/cross-platform-design.jpg",
        tags: ["Design", "Mobile", "React Native"],
    },
    3: {
        title: "Monthly Recap: Revzion Projects",
        excerpt: "Shipping notes, launches, and a peek behind the scenes.",
        content: `Full blog content goes here...`,
        date: "2025-02-15",
        author: { name: "Revzion Team" },
        cover: "/blogs/monthly-recap.jpg",
        tags: ["Changelog", "Revzion"],
    },
}

// ---- Helpers ----------------------------------------------------------------
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

// ---- Dynamic Metadata --------------------------------------------------------
export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata> {
    const id = Number.parseInt(params.id, 10)
    const post = posts[id]
    if (!post) return {}

    const url = `https://revzion.com/blogs/${id}`
    const title = `${post.title} • Revzion Blog`
    const description = post.excerpt || post.content.slice(0, 140)

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            title,
            description,
            images: post.cover ? [{ url: post.cover, width: 1200, height: 630, alt: post.title }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: post.cover ? [post.cover] : undefined,
        },
    }
}

// ---- Page -------------------------------------------------------------------
export default function BlogPost({ params }: { params: { id: string } }) {
    const id = Number.parseInt(params.id, 10)
    const post = posts[id]
    if (!post) return notFound()

    // prev/next ids (based on numeric keys)
    const ids = Object.keys(posts).map(Number).sort((a, b) => a - b)
    const index = ids.indexOf(id)
    const prevId = index > 0 ? ids[index - 1] : null
    const nextId = index < ids.length - 1 ? ids[index + 1] : null

    const shareUrl = `https://revzion.com/blogs/${id}`
    const rt = readingTime(`${post.excerpt}\n${post.content}`)

    return (
        <>
            {/* JSON-LD Article schema */}
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: post.title,
                        datePublished: post.date,
                        author: [{ "@type": "Person", name: post.author.name }],
                        image: post.cover ? [`https://revzion.com${post.cover}`] : undefined,
                        mainEntityOfPage: { "@type": "WebPage", "@id": shareUrl },
                        description: post.excerpt,
                    }),
                }}
            />

            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
                    <Link href="/" className="hover:text-gray-700">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/blogs" className="hover:text-gray-700">Blog</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700">{post.title}</span>
                </nav>

                {/* Title */}
                <h1 className="text-4xl font-heading font-bold text-gray-900 tracking-tight">
                    {post.title}
                </h1>

                {/* Meta row */}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        {post.author.avatar && (
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                        )}
                        <span>{post.author.name}</span>
                    </div>
                    <span>•</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>•</span>
                    <span>{rt}</span>
                    {post.tags && post.tags.length > 0 && (
                        <>
                            <span>•</span>
                            <ul className="flex flex-wrap gap-2">
                                {post.tags.map((t) => (
                                    <li key={t} className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">{t}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {/* Cover */}
                {post.cover && (
                    <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                        <Image
                            src={post.cover}
                            alt={post.title}
                            width={1200}
                            height={630}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none text-gray-800 mt-8">
                    {/* Replace these <p> with your MDX/renderer when ready */}
                    <p className="lead">{post.excerpt}</p>
                    <p>{post.content}</p>
                </div>

                {/* Share */}
                <ShareActions url={shareUrl} title={post.title} />

                {/* Prev / Next */}
                <div className="mt-12 flex items-center justify-between gap-4">
                    {prevId ? (
                        <Link
                            href={`/blogs/${prevId}`}
                            className="group inline-flex max-w-[48%] items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                        >
                            ← <span className="truncate group-hover:underline">{posts[prevId].title}</span>
                        </Link>
                    ) : <span />}

                    {nextId ? (
                        <Link
                            href={`/blogs/${nextId}`}
                            className="group inline-flex max-w-[48%] items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 ml-auto"
                        >
                            <span className="truncate group-hover:underline">{posts[nextId].title}</span> →
                        </Link>
                    ) : <span />}
                </div>

                {/* Back to blog */}
                <div className="mt-10">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                    >
                        ← All posts
                    </Link>
                </div>
            </article>
        </>
    )
}