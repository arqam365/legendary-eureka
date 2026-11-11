import Link from "next/link"

export default function BuildarcSection() {
    return (
        <section aria-labelledby="buildarc-heading" className="border-y border-[#E4E9F1]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                    <p className="eyebrow mb-4">Estimation</p>
                    <h2 id="buildarc-heading" className="text-3xl sm:text-4xl text-[#0B1220]">
                        Scope and cost ranges before you commit
                    </h2>
                    <p className="mt-5 text-lg text-[#64748B] max-w-2xl leading-relaxed">
                        Buildarc is Revzion's estimation platform. Describe your project and get a scope outline and cost
                        range in a few minutes — no commitment.
                    </p>
                </div>
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-3">
                    <Link
                        href="/estimate"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-[#0B1220] px-6 text-sm font-semibold text-white hover:bg-[#1F2937]"
                    >
                        Get an estimate
                    </Link>
                </div>
            </div>
        </section>
    )
}
