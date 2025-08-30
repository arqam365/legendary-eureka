// app/privacy-policy/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy | Revzion",
    description:
        "How Revzion collects, uses, and protects your information. Learn about cookies, analytics, data sharing, retention, and your rights.",
    robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
    const lastUpdated = "August 31, 2025" // keep this current

    return (
        <main className="bg-white">
            <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900">
                        Privacy Policy
                    </h1>
                    <p className="mt-3 text-gray-600">
                        Last updated: {lastUpdated}
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
                    <p>
                        This Privacy Policy explains how <strong>Revzion</strong> (“we”, “us”, “our”) collects,
                        uses, discloses, and safeguards information when you use our website, products, and services
                        (collectively, the “Services”).
                    </p>

                    <h2>Information We Collect</h2>
                    <ul>
                        <li><strong>Information you provide:</strong> contact details, messages, files you upload.</li>
                        <li><strong>Usage data:</strong> pages viewed, links clicked, approximate location, device & browser data.</li>
                        <li><strong>Cookies & similar tech:</strong> to remember preferences and measure performance.</li>
                    </ul>

                    <h2>How We Use Information</h2>
                    <ul>
                        <li>Provide, maintain, and improve the Services</li>
                        <li>Respond to inquiries and provide support</li>
                        <li>Analyze usage to improve performance and features</li>
                        <li>Security, fraud prevention, and compliance</li>
                        <li>With your consent, send updates and marketing communications</li>
                    </ul>

                    <h2>Legal Bases (EEA/UK)</h2>
                    <p>
                        We process personal data based on: performance of a contract, legitimate interests,
                        consent (where required), and compliance with legal obligations.
                    </p>

                    <h2>Sharing & Disclosures</h2>
                    <ul>
                        <li><strong>Vendors/Processors:</strong> cloud hosting, analytics, email and payment providers.</li>
                        <li><strong>Legal:</strong> to comply with laws or protect rights, safety, and property.</li>
                        <li><strong>Business transfers:</strong> in connection with a merger, acquisition, or asset sale.</li>
                    </ul>

                    <h2>Data Retention</h2>
                    <p>
                        We keep data only as long as necessary for the purposes above, then delete or anonymize it
                        unless longer retention is required by law.
                    </p>

                    <h2>Your Rights</h2>
                    <p>
                        Depending on your location, you may have rights to access, correct, delete, or export your data,
                        and to object or restrict certain processing. To exercise a right, contact us at
                        <a href="mailto:privacy@revzion.com"> privacy@revzion.com</a>.
                    </p>

                    <h2>International Transfers</h2>
                    <p>
                        If we transfer data internationally, we use appropriate safeguards (e.g., SCCs) where required.
                    </p>

                    <h2>Security</h2>
                    <p>
                        We use technical and organizational measures to protect data. No method is 100% secure; report
                        issues to <a href="mailto:security@revzion.com">security@revzion.com</a>.
                    </p>

                    <h2>Children</h2>
                    <p>
                        Our Services are not directed to children under 13 (or as defined by local law), and we don’t knowingly collect their data.
                    </p>

                    <h2>Cookies</h2>
                    <p>
                        You can control cookies via your browser settings. Where required, we’ll request consent via a banner.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        Questions? Email <a href="mailto:privacy@revzion.com">privacy@revzion.com</a>.
                    </p>

                    <hr />
                    <p className="text-sm text-gray-500">
                        This template is informational and not legal advice. Review with your counsel, especially for GDPR/CCPA/CPRA compliance.
                    </p>
                </div>
            </section>
        </main>
    )
}