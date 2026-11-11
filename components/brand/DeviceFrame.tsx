import Image from "next/image"

type FrameProps = { src: string; alt: string; priority?: boolean; sizes?: string; className?: string }

export function BrowserFrame({ src, alt, priority, sizes = "(max-width: 1024px) 100vw, 50vw", className = "" }: FrameProps) {
    return (
        <div className={`overflow-hidden rounded-xl border border-[#D5DCE8] bg-white shadow-[0_24px_60px_-30px_rgba(11,18,32,0.35)] ${className}`}>
            <div aria-hidden className="flex h-7 items-center gap-1.5 border-b border-[#E4E9F1] bg-[#F7F9FB] px-3">
                <span className="h-2 w-2 rounded-full bg-[#D5DCE8]" />
                <span className="h-2 w-2 rounded-full bg-[#D5DCE8]" />
                <span className="h-2 w-2 rounded-full bg-[#D5DCE8]" />
            </div>
            <Image src={src} alt={alt} width={1600} height={1000} sizes={sizes} priority={priority} className="aspect-[16/10] w-full object-cover object-top" />
        </div>
    )
}

export function PhoneFrame({ src, alt, priority, sizes = "240px", className = "" }: FrameProps) {
    return (
        <div className={`overflow-hidden rounded-[28px] border-[6px] border-[#0B1220] bg-[#0B1220] shadow-[0_24px_60px_-30px_rgba(11,18,32,0.45)] ${className}`}>
            <Image src={src} alt={alt} width={780} height={1688} sizes={sizes} priority={priority} className="aspect-[390/844] w-full rounded-[22px] object-cover object-top" />
        </div>
    )
}
