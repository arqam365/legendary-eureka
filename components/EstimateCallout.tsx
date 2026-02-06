import Link from "next/link"

export function EstimateCallout() {
    return (
        <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50/60 px-6 py-5">
            <p className="text-sm text-gray-700">
        <span className="font-medium text-gray-900">
          Not sure about cost or scope yet?
        </span>{" "}
                Start with an instant estimate on{" "}
                <Link href="/estimate" className="font-medium text-primary hover:underline">
                    Buildarc
                </Link>{" "}
                before committing.
            </p>
        </div>
    )
}