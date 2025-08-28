export default function NoiseOverlay() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[2] opacity-[0.07] mix-blend-multiply"
            style={{
                backgroundImage:
                    "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22512%22 height=%22512%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.4%22/></svg>')",
            }}
        />
    )
}