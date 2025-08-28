export function SectionWave({ flip=false }: { flip?: boolean }) {
    return (
        <div className={`relative h-12 ${flip ? "rotate-180" : ""}`} aria-hidden>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path
                    d="M0,0 C240,80 480,80 720,40 C960,0 1200,0 1440,40 L1440,100 L0,100 Z"
                    fill="rgba(59,130,246,0.06)"
                />
            </svg>
        </div>
    )
}