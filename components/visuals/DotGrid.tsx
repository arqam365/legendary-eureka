export default function DotGrid() {
    return (
        <div
            aria-hidden
            className="absolute inset-0 z-0 opacity-40"
            style={{
                backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)",
                backgroundSize: "20px 20px",
                maskImage: "linear-gradient(to bottom, black, black 60%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black, black 60%, transparent 100%)",
            }}
        />
    )
}