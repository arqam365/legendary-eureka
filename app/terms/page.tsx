import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Terms of Service | Revzion",
    description: "The rules and terms for using Revzion’s services.",
}

export default function TermsPage() {
    return (
        <main className="bg-white">
            <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">Terms of Service</h1>
                    <p className="mt-3 text-gray-600">Last updated: August 31, 2025</p>
                </div>
            </section>
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray">
                    {/* …your terms content… */}
                    <p>These terms govern your use of Revzion’s website and services.</p>
                </div>
            </section>
        </main>
    )
}