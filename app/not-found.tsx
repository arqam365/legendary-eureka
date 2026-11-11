import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                <p className="eyebrow">Error 404</p>
                <h1 className="mt-4 text-4xl sm:text-5xl text-[#0B1220]">We can't find that page.</h1>
                <p className="mt-5 text-lg text-[#1F2937] max-w-xl">
                    It may have moved or no longer exists. Try one of these instead.
                </p>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[#2563EB] font-medium">
                    <li><Link href="/" className="underline underline-offset-4">Home</Link></li>
                    <li><Link href="/services" className="underline underline-offset-4">Services</Link></li>
                    <li><Link href="/portfolio" className="underline underline-offset-4">Portfolio</Link></li>
                    <li><Link href="/contact" className="underline underline-offset-4">Contact</Link></li>
                </ul>
            </section>
            <Footer />
        </div>
    )
}
