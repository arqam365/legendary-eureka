import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const TERMS = [
    "Qualified lead = intro to a decision-maker + discovery call set.",
    "Reward is paid within 14 days of their first paid invoice.",
    "If they're already in conversation with us, we'll tell you right away.",
]

const STEPS = [
    { title: "Intro", copy: "Email a warm intro to a decision-maker and copy connect@revzion.in. We'll schedule discovery." },
    { title: "Qualification", copy: "If it's a fit, we scope a pilot or engagement and keep you updated on status." },
    { title: "Payout", copy: "When their first invoice is paid, you receive your reward within 14 days." },
]

const FAQ = [
    { q: "Who can participate?", a: "Anyone who can make a warm intro to a qualified lead — agencies, founders, operators, engineers, designers." },
    { q: "What counts as a qualified lead?", a: "An intro to a decision-maker where we complete a discovery call and scope an opportunity." },
    { q: "When do I get paid?", a: "Within 14 days of the lead's first paid invoice. We confirm eligibility and amount by email." },
    { q: "Is there a limit on referrals?", a: "No. Rewards are paid per unique qualified engagement." },
    { q: "What if they're already in our pipeline?", a: "We'll let you know promptly. If we've had material conversations recently, it won't qualify." },
    { q: "Can I take credit instead of cash?", a: "Yes — you can opt for a Revzion services credit instead of a cash reward." },
]

const REFER_HREF = `mailto:connect@revzion.in?subject=${encodeURIComponent("Referral introduction")}&body=${encodeURIComponent(
    "Your name:\nReferral name and email:\nWhat they need / timeline:\n\n(I confirm I have permission to share this contact.)",
)}`

export default function ReferralProgramPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <section className="bg-[#EEF1F6]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <p className="eyebrow">Referral programme</p>
                        <h1 className="mt-4 text-4xl sm:text-5xl text-[#0B1220]">Introduce a team. Earn a finder's fee.</h1>
                        <p className="mt-4 text-lg text-[#1F2937] max-w-2xl">
                            For introductions to teams that need product, AI or platform help.
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <Button asChild size="lg" className="bg-[#0B1220] hover:bg-[#1F2937] text-white">
                                <a href={REFER_HREF}>Make a referral by email</a>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-[#D5DCE8]">
                                <a href="#how-it-works">How it works</a>
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-5 rounded-2xl border border-[#D5DCE8] bg-white p-6">
                        <p className="text-lg font-semibold text-[#0B1220]">10% finder's fee</p>
                        <p className="text-sm text-[#1F2937]">of the first paid invoice (capped at $10,000)</p>
                        <p className="my-2 text-sm text-[#1F2937]">— or —</p>
                        <p className="text-lg font-semibold text-[#0B1220]">$1,000 credit</p>
                        <p className="text-sm text-[#1F2937]">toward any Revzion engagement</p>
                        <ul className="mt-4 space-y-2 border-t border-[#E4E9F1] pt-4">
                            {TERMS.map((t) => (
                                <li key={t} className="text-sm text-[#1F2937]">{t}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-10">How it works</h2>
                    <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {STEPS.map((s, i) => (
                            <li key={s.title} className="border-t border-[#D5DCE8] pt-6">
                                <p className="text-sm font-semibold text-[#64748B]">0{i + 1}</p>
                                <h3 className="mt-1 text-xl text-[#0B1220]">{s.title}</h3>
                                <p className="mt-2 text-[#1F2937]">{s.copy}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="py-16 bg-[#F7F9FB]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl text-[#0B1220] mb-10">FAQ & terms</h2>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 max-w-5xl">
                        {FAQ.map((f) => (
                            <div key={f.q}>
                                <dt className="font-semibold text-[#0B1220]">{f.q}</dt>
                                <dd className="mt-2 text-[#1F2937]">{f.a}</dd>
                            </div>
                        ))}
                    </dl>
                    <p className="mt-10 text-sm text-[#64748B] max-w-2xl">
                        Final terms are confirmed in writing at the time of referral. Revzion may update programme details at
                        any time.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    )
}
