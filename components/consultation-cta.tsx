"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

/* -------------------------------- Types ------------------------------- */
type Appearance = "button" | "pill" | "link";

type Props = {
    label?: string;
    size?: "default" | "sm" | "lg";
    className?: string;
    calendlyUrl?: string;
    onBooked?: () => void;
    appearance?: Appearance; // "button" (default), "pill" (rounded gradient), "link" (text link)
};

const INITIAL_WEEKLY_SLOTS = 5;

/* -------------------- Weekly slots (localStorage) -------------------- */
function useWeeklySlots(initial = INITIAL_WEEKLY_SLOTS) {
    const [slots, setSlots] = useState<number>(initial);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;
        const key = "weekly-consult-slots";
        const resetKey = "weekly-consult-reset";
        const now = new Date();

        // ISO-like week id (YYYY-WW)
        const currentWeekId = (() => {
            const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
            const dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
            return `${d.getUTCFullYear()}-${weekNo}`;
        })();

        const storedWeek = localStorage.getItem(resetKey);
        const storedSlots = localStorage.getItem(key);

        if (storedWeek !== currentWeekId) {
            localStorage.setItem(resetKey, currentWeekId);
            localStorage.setItem(key, String(initial));
            setSlots(initial);
        } else if (storedSlots != null) {
            setSlots(Number(storedSlots));
        } else {
            localStorage.setItem(key, String(initial));
            setSlots(initial);
        }
    }, [initial, mounted]);

    const decrement = () => {
        setSlots(prev => {
            const next = Math.max(0, prev - 1);
            try { localStorage.setItem("weekly-consult-slots", String(next)); } catch {}
            return next;
        });
    };

    return { slots, decrement, mounted };
}

/* --------------------------- Main component -------------------------- */
export function ConsultationCTA({
                                    label = "Free Consultation",
                                    size = "lg",
                                    className = "",
                                    calendlyUrl = "https://calendly.com/YOUR_HANDLE/free-consultation?hide_gdpr_banner=1&primary_color=4f46e5",
                                    onBooked,
                                    appearance = "button",
                                }: Props) {
    const [open, setOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { slots, decrement, mounted } = useWeeklySlots();
    const prefersReducedMotion = useReducedMotion();

    // preload chime on client
    useEffect(() => {
        const a = new Audio("/audio/chime.mp3");
        a.volume = 0.35;
        a.preload = "auto";
        audioRef.current = a;
    }, []);

    const chime = () => {
        try {
            if (!audioRef.current) return;
            audioRef.current.currentTime = 0;
            void audioRef.current.play();
        } catch {}
    };

    const popConfetti = (count = 80) => {
        if (prefersReducedMotion) return;
        const angleBase = 60;
        confetti({ particleCount: count, spread: 55, startVelocity: 28, gravity: 0.9, ticks: 150, origin: { y: 0.2 }, scalar: 1.05, angle: angleBase });
        confetti({ particleCount: count, spread: 55, startVelocity: 28, gravity: 0.9, ticks: 150, origin: { y: 0.2, x: 1 }, scalar: 1.05, angle: 120 - angleBase });
    };

    const handleOpen = () => { setOpen(true); chime(); popConfetti(48); };
    const handleBooked = () => { decrement(); chime(); popConfetti(120); onBooked?.(); };

    /* ---------- Trigger renderer (button/pill/link) ---------- */
    const Trigger = () => {
        if (appearance === "pill") {
            return (
                <button
                    type="button"
                    onClick={handleOpen}
                    className={[
                        "inline-flex items-center rounded-full px-5 py-3 text-base font-semibold",
                        "bg-gradient-revzion text-white shadow-sm hover:opacity-90 transition-opacity",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                        className,
                    ].join(" ")}
                >
                    {label} <ArrowRight className="ml-2 h-4 w-4" />
                </button>
            );
        }
        if (appearance === "link") {
            return (
                <button
                    type="button"
                    onClick={handleOpen}
                    className={[
                        "group relative inline-flex items-center text-gray-600 dark:text-gray-300",
                        "hover:text-primary focus:outline-none",
                        className,
                    ].join(" ")}
                >
                    <span>{label}</span>
                </button>
            );
        }
        // default: shadcn Button
        return (
            <Button
                size={size}
                className={["bg-gradient-revzion hover:opacity-90 transition-opacity", className].join(" ")}
                onClick={handleOpen}
            >
                {label} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        );
    };

    return (
        <div className="relative inline-flex items-center gap-3">
            {/* Slots pill (hide on link appearance) */}
            {mounted && appearance !== "link" && (
                <div
                    className={[
                        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border select-none",
                        slots > 0
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200",
                    ].join(" ")}
                    title="Estimated free 30-min sessions remaining this week"
                    aria-live="polite"
                >
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    {slots > 0 ? `${slots} slots left this week` : "Slots filling fast"}
                </div>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Trigger />
                </DialogTrigger>

                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Book your free consultation</DialogTitle>
                        <DialogDescription>
                            Pick a time right now or leave your details — we’ll respond within 24–48 hours.
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="cal" className="mt-2">
                        <TabsList className="grid grid-cols-2 w-full">
                            <TabsTrigger value="cal">
                                <Calendar className="h-4 w-4 mr-2" />
                                Book a time
                            </TabsTrigger>
                            <TabsTrigger value="form">Quick form</TabsTrigger>
                        </TabsList>

                        {/* Calendly embed */}
                        <TabsContent value="cal" className="mt-4">
                            <div className="relative overflow-hidden rounded-xl border bg-white">
                                <iframe
                                    title="Calendly booking"
                                    src={calendlyUrl}
                                    className="w-full h-[620px]"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allow="clipboard-read; clipboard-write"
                                    sandbox="allow-forms allow-popups allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
                                />
                            </div>
                            <p className="mt-3 text-xs text-gray-500">
                                Don’t see a time that works? Switch to the quick form — we’ll find a slot for you.
                            </p>
                            <div className="mt-4 flex justify-end">
                                <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                            </div>
                        </TabsContent>

                        {/* Lead form */}
                        <TabsContent value="form" className="mt-4">
                            <LeadForm onSuccess={() => { handleBooked(); setOpen(false); }} />
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </div>
    );
}

/* ------------------------------ Lead Form ----------------------------- */
function LeadForm({ onSuccess }: { onSuccess: () => void }) {
    const [loading, setLoading] = useState(false);
    const [projectType, setProjectType] = useState<string>("SaaS");

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const payload = {
            name: String(fd.get("name") || ""),
            email: String(fd.get("email") || ""),
            projectType,
            message: String(fd.get("message") || ""),
        };

        try {
            setLoading(true);
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Failed");
            onSuccess();
        } catch {
            alert("Something went wrong. Please try again or email contact@revzion.com");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
                <Label htmlFor="name">Your name</Label>
                <Input id="name" name="name" placeholder="Jane Doe" required />
            </div>
            <div className="col-span-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="jane@company.com" required />
            </div>

            <div className="col-span-1">
                <Label>Project type</Label>
                <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger><SelectValue placeholder="Select a project type" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="SaaS">SaaS / Web App</SelectItem>
                        <SelectItem value="AI">AI / Automation</SelectItem>
                        <SelectItem value="Mobile">Mobile App</SelectItem>
                        <SelectItem value="Ecommerce">E-commerce</SelectItem>
                        <SelectItem value="Consulting">Consulting</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="col-span-1 md:col-span-2">
                <Label htmlFor="message">Brief</Label>
                <Textarea id="message" name="message" rows={4} placeholder="What are you trying to build or improve?" />
            </div>

            <div className="col-span-1 md:col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Image src="/logo.svg" alt="" width={16} height={16} />
                    We reply within 24–48 hours.
                </div>
                <Button type="submit" disabled={loading} className="bg-gradient-revzion">
                    {loading ? "Sending..." : "Send request"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}