import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ShareActions } from "../ShareActions"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://app.revzion.in";

// ---- Types ------------------------------------------------------------------
type ApiPost = {
    id: string
    slug: string
    title: string
    description: string
    contentHtml: string
    coverImage?: string | null
    category: "DAILY" | "WEEKLY" | "MONTHLY"
    tags: string[]
    publishedAt: string | null
    createdAt: string
    readTime?: number | null
    author: { name: string; email: string }
}

// ---- Data fetching ----------------------------------------------------------
async function fetchPost(slug: string): Promise<ApiPost | null> {
    try {
        const res = await fetch(`${API_URL}/api/cms/public/posts/${slug}`, {
            next: { revalidate: 30 },
        })
        if (!res.ok) return null
        return res.json()
    } catch {
        return null
    }
}

// ---- Helpers ----------------------------------------------------------------
function formatDate(iso: string) {
    try {
        return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(iso))
    } catch {
        return iso
    }
}

// ---- Dynamic Metadata -------------------------------------------------------
export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id: slug } = await params
    const post = await fetchPost(slug)
    if (!post) return {}

    const url = `https://revzion.com/blogs/${slug}`
    const title = `${post.title} • Revzion Blog`
    const description = post.description

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            title,
            description,
            images: post.coverImage
                ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: post.coverImage ? [post.coverImage] : undefined,
        },
    }
}

// ---- Page -------------------------------------------------------------------
export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
    const { id: slug } = await params
    const post = await fetchPost(slug)
    if (!post) return notFound()

    const shareUrl = `https://revzion.com/blogs/${slug}`
    const date = post.publishedAt ?? post.createdAt
    const rt = post.readTime ? `${post.readTime} min read` : null

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {/* JSON-LD */}
                <script
                    type="application/ld+json"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Article",
                            headline: post.title,
                            datePublished: date,
                            author: [{ "@type": "Person", name: post.author.name }],
                            image: post.coverImage ? [post.coverImage] : undefined,
                            mainEntityOfPage: { "@type": "WebPage", "@id": shareUrl },
                            description: post.description,
                        }),
                    }}
                />

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

                {/* Meta */}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span>{post.author.name}</span>
                    <span>•</span>
                    <time dateTime={date}>{formatDate(date)}</time>
                    {rt && (
                        <>
                            <span>•</span>
                            <span>{rt}</span>
                        </>
                    )}
                    <span className="capitalize rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                        {post.category.toLowerCase()}
                    </span>
                    {post.tags.length > 0 && (
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
                {post.coverImage && (
                    <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-lg max-w-none text-gray-800 mt-8"
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />

                {/* Share */}
                <ShareActions url={shareUrl} title={post.title} />

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

            <Footer />
        </div>
    )
}
