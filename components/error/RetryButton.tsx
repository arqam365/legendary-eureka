"use client";

import { useRouter } from "next/navigation";

export default function RetryButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.refresh()}
            className="px-4 py-2 rounded-full border"
        >
            Try again
        </button>
    );
}