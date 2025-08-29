"use client"

type Props = { url: string; title: string }

export function ShareActions({ url, title }: Props) {
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url)
            // optional: toast
        } catch {
            // fallback
            const ta = document.createElement("textarea")
            ta.value = url
            document.body.appendChild(ta)
            ta.select()
            document.execCommand("copy")
            document.body.removeChild(ta)
        }
    }

    return (
        <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-600">Share:</span>

            <a
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
                target="_blank" rel="noopener noreferrer"
            >
                X/Twitter
            </a>

            <a
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank" rel="noopener noreferrer"
            >
                LinkedIn
            </a>

            <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
            >
                Copy link
            </button>
        </div>
    )
}