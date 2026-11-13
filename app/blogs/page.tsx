import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BlogsClient, type Post } from "./BlogsClient";

export const revalidate = 60;


const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://app.revzion.in";

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

async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch(`${API_URL}/api/cms/public/posts`, {
            next: { revalidate: 60 },
        });
        if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return [];
        const data: ApiPost[] = await res.json();
        return Array.isArray(data) ? data.map(mapApiPost) : [];
    } catch {
        return [];
    }
}

// Keep the empty listing out of search results until posts are published.
export async function generateMetadata(): Promise<Metadata> {
    const posts = await getPosts();
    return {
        title: "Blog",
        alternates: { canonical: "/blogs" },
        description:
            "Notes from the Revzion team on software, AI and product engineering.",
        robots: posts.length ? undefined : { index: false, follow: true },
    };
}

export default async function BlogsPage() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <BlogsClient posts={posts} />
            <Footer />
        </div>
    );
}
