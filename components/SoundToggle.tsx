"use client"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

export default function SoundToggle() {
    const [enabled, setEnabled] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const prefersReduced = useReducedMotion()

    useEffect(() => {
        if (!audioRef.current) {
            const a = new Audio("/audio/ambient.mp3")
            a.loop = true; a.preload = "auto"; a.volume = 0.12
            audioRef.current = a
        }
        const saved = localStorage.getItem("ambient-sound")
        if (saved === "on" && !prefersReduced) setEnabled(true)
    }, [prefersReduced])

    useEffect(() => {
        const a = audioRef.current
        if (!a) return
        if (enabled && !prefersReduced) { a.play().catch(()=>{}) ; localStorage.setItem("ambient-sound","on") }
        else { a.pause(); localStorage.setItem("ambient-sound","off") }
    }, [enabled, prefersReduced])

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <Button
                variant="outline"
                className="backdrop-blur-md bg-white/70 border-white/60 shadow-sm"
                onClick={() => setEnabled(v => !v)}
                aria-pressed={enabled}
            >
                {enabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
                {enabled ? "Sound on" : "Sound off"}
            </Button>
        </div>
    )
}