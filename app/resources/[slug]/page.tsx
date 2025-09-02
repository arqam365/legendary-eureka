// app/resources/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Import client component directly (no dynamic)
import ResourceArticle from "./resource-client";

/** Minimal content shape; extend as needed */
type Section = { id: string; label: string; html: string };
type ResourceDoc = {
    title: string;
    description: string;
    badge?: string;
    sections: Section[];
};

const REGISTRY: Record<string, ResourceDoc> = {
    "ai-assistants-playbook": {
        title: "AI Assistants Playbook",
        description:
            "A practical guide to scope, architect, evaluate, and launch AI assistants and copilots — with safety, speed, and measurable impact.",
        badge: "Field-tested guide",
        sections: [
            {
                id: "overview",
                label: "Overview",
                html: `<p>Assistants are focused agents …</p>`,
            },
            {
                id: "when-to-use",
                label: "When to use assistants",
                html: `<p>Great fits …</p>`,
            },
            // …other sections
        ],
    },
};

export async function generateStaticParams() {
    return Object.keys(REGISTRY).map((slug) => ({ slug }));
}

export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    const doc = REGISTRY[params.slug];
    if (!doc) return {};
    return {
        title: `${doc.title} — Revzion`,
        description: doc.description,
    };
}

export default function Page({ params }: { params: { slug: string } }) {
    const doc = REGISTRY[params.slug];
    if (!doc) notFound();

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 border-b">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                    <div className="max-w-3xl">
                        {doc?.badge && (
                            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs text-blue-700 shadow-sm">
                {doc.badge}
              </span>
                        )}
                        <h1 className="mt-4 text-4xl sm:text-5xl font-heading font-bold text-gray-900">
                            {doc.title}
                        </h1>
                        <p className="mt-4 text-lg text-gray-700 max-w-2xl">{doc.description}</p>
                    </div>
                </div>
            </section>

            {/* Client component renders rest (TOC, sections, etc.) */}
            <ResourceArticle doc={doc} />
        </>
    );
}