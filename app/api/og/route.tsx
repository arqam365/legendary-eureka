import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    background: '#FFFFFF',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Top-right ambient glow */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-120px',
                        right: '-80px',
                        width: '620px',
                        height: '620px',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle at center, rgba(37,99,235,0.08) 0%, rgba(109,40,217,0.04) 45%, transparent 70%)',
                        display: 'flex',
                    }}
                />

                {/* Bottom ambient glow */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-80px',
                        right: '280px',
                        width: '480px',
                        height: '480px',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle at center, rgba(6,182,212,0.05) 0%, transparent 65%)',
                        display: 'flex',
                    }}
                />

                {/* Subtle grid texture — top-right quadrant */}
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        width: '540px',
                        height: '400px',
                        opacity: 0.035,
                        backgroundImage:
                            'linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        display: 'flex',
                    }}
                />

                {/* ── CONTENT WRAPPER ── */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        padding: '52px 64px 48px',
                    }}
                >
                    {/* ── LOGO ROW ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                        {/* Share / network icon — matches Revzion icon */}
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                            {/* Hub node */}
                            <circle cx="10" cy="20" r="7.5" fill="#2563EB" />
                            {/* Top-right satellite */}
                            <circle cx="28" cy="7" r="6" fill="#2563EB" opacity="0.80" />
                            {/* Bottom-right satellite */}
                            <circle cx="28" cy="29" r="5" fill="#6D28D9" opacity="0.90" />
                            {/* Connector lines */}
                            <line
                                x1="17"
                                y1="16"
                                x2="23"
                                y2="11"
                                stroke="#2563EB"
                                strokeWidth="2.6"
                                strokeLinecap="round"
                            />
                            <line
                                x1="17"
                                y1="23"
                                x2="23.5"
                                y2="26.5"
                                stroke="#6D28D9"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                            />
                        </svg>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: '22px',
                                    fontWeight: '800',
                                    color: '#0F172A',
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                Revzion
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: '9px',
                                    fontWeight: '600',
                                    color: '#94A3B8',
                                    letterSpacing: '3px',
                                }}
                            >
                                TECHNOLOGIES
                            </div>
                        </div>

                        {/* Spacer */}
                        <div style={{ display: 'flex', flex: 1 }} />

                        {/* Domain label */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '13px',
                                color: '#94A3B8',
                                fontWeight: '500',
                            }}
                        >
                            <div
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#22C55E',
                                    display: 'flex',
                                }}
                            />
                            revzion.com
                        </div>
                    </div>

                    {/* ── MAIN SECTION ── */}
                    <div
                        style={{
                            display: 'flex',
                            flex: 1,
                            gap: '32px',
                            marginTop: '38px',
                            alignItems: 'center',
                        }}
                    >
                        {/* ── LEFT: TEXT ── */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                minWidth: 0,
                            }}
                        >
                            {/* Headline */}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        fontSize: '74px',
                                        fontWeight: '800',
                                        color: '#0F172A',
                                        lineHeight: '1.02',
                                        letterSpacing: '-2.5px',
                                    }}
                                >
                                    Digital
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        fontSize: '74px',
                                        fontWeight: '800',
                                        color: '#0F172A',
                                        lineHeight: '1.02',
                                        letterSpacing: '-2.5px',
                                    }}
                                >
                                    Solutions.
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        fontSize: '74px',
                                        fontWeight: '800',
                                        color: '#2563EB',
                                        lineHeight: '1.02',
                                        letterSpacing: '-2.5px',
                                    }}
                                >
                                    Limitless
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        fontSize: '74px',
                                        fontWeight: '800',
                                        color: '#6D28D9',
                                        lineHeight: '1.02',
                                        letterSpacing: '-2.5px',
                                    }}
                                >
                                    Possibilities.
                                </div>
                            </div>

                            {/* Supporting description */}
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: '15px',
                                    color: '#64748B',
                                    lineHeight: '1.65',
                                    marginTop: '18px',
                                    maxWidth: '455px',
                                    fontWeight: '400',
                                }}
                            >
                                We build scalable software, AI-powered solutions, mobile applications,
                                and cloud infrastructure that help businesses innovate and lead.
                            </div>

                            {/* Service tags */}
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '20px',
                                    marginTop: '20px',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {[
                                    { label: 'Web Development', color: '#2563EB' },
                                    { label: 'Mobile Apps', color: '#6D28D9' },
                                    { label: 'AI Solutions', color: '#06B6D4' },
                                    { label: 'Cloud & DevOps', color: '#059669' },
                                    { label: 'UI/UX Design', color: '#F59E0B' },
                                ].map(({ label, color }) => (
                                    <div
                                        key={label}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '12px',
                                            color: '#475569',
                                            fontWeight: '500',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '5px',
                                                height: '5px',
                                                borderRadius: '50%',
                                                background: color,
                                                display: 'flex',
                                            }}
                                        />
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT: 3D NETWORK VISUALIZATION ── */}
                        <div
                            style={{
                                width: '368px',
                                height: '368px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <svg
                                width="360"
                                height="360"
                                viewBox="0 0 360 360"
                                fill="none"
                            >
                                <defs>
                                    {/* Node gradients with 3D top-left highlight */}
                                    <radialGradient id="ng1" cx="38%" cy="32%" r="68%">
                                        <stop offset="0%" stopColor="#93C5FD" />
                                        <stop offset="55%" stopColor="#2563EB" />
                                        <stop offset="100%" stopColor="#1E3A8A" />
                                    </radialGradient>
                                    <radialGradient id="ng2" cx="38%" cy="32%" r="68%">
                                        <stop offset="0%" stopColor="#C4B5FD" />
                                        <stop offset="55%" stopColor="#6D28D9" />
                                        <stop offset="100%" stopColor="#3B0764" />
                                    </radialGradient>
                                    <radialGradient id="ng3" cx="38%" cy="32%" r="68%">
                                        <stop offset="0%" stopColor="#67E8F9" />
                                        <stop offset="55%" stopColor="#06B6D4" />
                                        <stop offset="100%" stopColor="#0E4F5C" />
                                    </radialGradient>
                                    {/* Ambient background glow */}
                                    <radialGradient id="bg" cx="50%" cy="55%" r="50%">
                                        <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.55" />
                                        <stop offset="60%" stopColor="#EDE9FE" stopOpacity="0.25" />
                                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                                    </radialGradient>
                                </defs>

                                {/* Ambient glow backdrop */}
                                <ellipse cx="180" cy="210" rx="162" ry="138" fill="url(#bg)" />

                                {/* ── CONNECTOR LINES ── */}
                                {/* Hub ↔ bottom-left */}
                                <line
                                    x1="180" y1="82"
                                    x2="78"  y2="244"
                                    stroke="#BFDBFE"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                {/* Hub ↔ bottom-right */}
                                <line
                                    x1="180" y1="82"
                                    x2="294" y2="244"
                                    stroke="#DDD6FE"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                {/* bottom-left ↔ bottom-right */}
                                <line
                                    x1="78"  y1="244"
                                    x2="294" y2="244"
                                    stroke="#A5F3FC"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                {/* Hub ↔ right satellite */}
                                <line
                                    x1="180" y1="82"
                                    x2="308" y2="148"
                                    stroke="#BFDBFE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    opacity="0.65"
                                />
                                {/* Hub ↔ left satellite */}
                                <line
                                    x1="180" y1="82"
                                    x2="44"  y2="148"
                                    stroke="#DDD6FE"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    opacity="0.65"
                                />

                                {/* ── DROP SHADOWS ── */}
                                <ellipse cx="180" cy="102" rx="54"  ry="14" fill="#1E40AF" opacity="0.12" />
                                <ellipse cx="78"  cy="258" rx="42"  ry="11" fill="#4C1D95" opacity="0.10" />
                                <ellipse cx="294" cy="256" rx="38"  ry="10" fill="#0E4F5C" opacity="0.10" />

                                {/* ── MAIN NODE 1 — top hub (blue) ── */}
                                <circle cx="180" cy="82" r="56" fill="url(#ng1)" />
                                {/* specular highlights */}
                                <circle cx="162" cy="64" r="22" fill="white" opacity="0.16" />
                                <circle cx="166" cy="68" r="11" fill="white" opacity="0.10" />
                                <circle cx="155" cy="57" r="5"  fill="white" opacity="0.12" />

                                {/* ── MAIN NODE 2 — bottom-left (purple) ── */}
                                <circle cx="78"  cy="244" r="44" fill="url(#ng2)" />
                                <circle cx="62"  cy="229" r="17" fill="white" opacity="0.16" />
                                <circle cx="65"  cy="233" r="8"  fill="white" opacity="0.10" />
                                <circle cx="56"  cy="224" r="4"  fill="white" opacity="0.12" />

                                {/* ── MAIN NODE 3 — bottom-right (cyan) ── */}
                                <circle cx="294" cy="244" r="38" fill="url(#ng3)" />
                                <circle cx="279" cy="231" r="14" fill="white" opacity="0.16" />
                                <circle cx="282" cy="235" r="7"  fill="white" opacity="0.10" />
                                <circle cx="273" cy="226" r="3.5" fill="white" opacity="0.12" />

                                {/* ── SATELLITE NODES ── */}
                                <circle cx="308" cy="148" r="16" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
                                <circle cx="303" cy="143" r="5"  fill="#2563EB" opacity="0.35" />

                                <circle cx="44"  cy="148" r="14" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="2" />
                                <circle cx="39"  cy="143" r="4.5" fill="#6D28D9" opacity="0.35" />

                                {/* ── FLOATING ACCENT DOTS ── */}
                                <circle cx="248" cy="38"  r="5"   fill="#2563EB" opacity="0.20" />
                                <circle cx="114" cy="32"  r="4"   fill="#6D28D9" opacity="0.18" />
                                <circle cx="336" cy="210" r="3.5" fill="#06B6D4" opacity="0.18" />
                                <circle cx="28"  cy="205" r="3"   fill="#2563EB" opacity="0.14" />
                                <circle cx="186" cy="318" r="3.5" fill="#06B6D4" opacity="0.16" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* ── BOTTOM ACCENT STRIPE ── */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        height: '3px',
                        background: 'linear-gradient(90deg, #2563EB 0%, #6D28D9 50%, #06B6D4 100%)',
                        display: 'flex',
                    }}
                />
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: {
                'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
            },
        }
    );
}
