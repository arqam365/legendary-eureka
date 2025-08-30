// app/not-found.tsx
import Link from "next/link";
import RetryButton from "@/components/error/RetryButton"; // client

export default function NotFound() {
    return (
        <main className="min-h-[70vh] grid place-items-center bg-white">
            <div className="max-w-xl text-center space-y-6 p-8 rounded-3xl border bg-gray-50/60 backdrop-blur">
                <p className="text-sm text-blue-600 font-medium">404 — Page not found</p>
                <h1 className="text-3xl font-bold text-gray-900">
                    We can’t find that page.
                </h1>
                <p className="text-gray-600">
                    It may have been moved or deleted. Try going home or refresh.
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                    {/* NO onClick here */}
                    <Link
                        href="/"
                        className="px-4 py-2 rounded-full bg-primary text-white"
                    >
                        Go to Home
                    </Link>

                    {/* Any interactive behavior lives in a client component */}
                    <RetryButton />

                    <a
                        href="mailto:hello@yourdomain.com?subject=Missing%20page"
                        className="px-4 py-2 rounded-full border"
                    >
                        Report issue
                    </a>
                </div>
            </div>
        </main>
    );
}