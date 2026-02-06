'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Client {
    name: string;
    url: string;
    hasLink: boolean;
}

export default function TrustSection() {
    const [hoveredClient, setHoveredClient] = useState<Client | null>(null);
    const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

    const clients: Client[] = [
        { name: 'EvolWe', url: 'https://evolwering.com', hasLink: true },
        { name: 'HelloCloud', url: 'https://hellocloud.co.in', hasLink: true },
        { name: 'Rynox', url: 'https://rynox.io', hasLink: true },
        { name: 'Packagefy', url: '#', hasLink: false },
        { name: 'BeeSocial', url: '#', hasLink: false },
    ];

    const handleMouseEnter = (
        client: Client,
        event: React.MouseEvent<HTMLAnchorElement>
    ) => {
        if (!client.hasLink) return;
        setHoveredClient(client);
        const rect = event.currentTarget.getBoundingClientRect();
        setPreviewPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 12,
        });
    };

    const handleMouseLeave = () => setHoveredClient(null);

    return (
        <>
            <section id="trust" className="bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="rounded-2xl border border-gray-100 bg-gray-50/60 backdrop-blur-sm px-6 py-6 space-y-6">

                        {/* ---------- ROW 1: CLIENTS ---------- */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-sm text-gray-600">
                                Trusted by teams shipping{' '}
                                <span className="font-semibold text-gray-900">50+ projects</span>{' '}
                                across <span className="font-semibold text-gray-900">5+ countries</span>
                            </p>

                            <div className="flex flex-wrap items-center gap-6">
                                {clients.map((client) => (
                                    <a
                                        key={client.name}
                                        href={client.url}
                                        target={client.hasLink ? '_blank' : undefined}
                                        rel={client.hasLink ? 'noopener noreferrer' : undefined}
                                        className={`text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors ${
                                            !client.hasLink ? 'cursor-default pointer-events-none' : ''
                                        }`}
                                        onMouseEnter={(e) => handleMouseEnter(client, e)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {client.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* ---------- DIVIDER ---------- */}
                        <div className="h-px bg-gray-200/60" />

                        {/* ---------- ROW 2: RECOGNITION & PARTNERS ---------- */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                Recognition & Global Partners
                            </p>

                            <div className="flex items-center gap-10">
                                {/* GoodFirms */}
                                <Link
                                    href="https://www.goodfirms.co/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="opacity-80 hover:opacity-100 transition"
                                >
                                    <Image
                                        src="/logos/gf-logo-horizontal.svg"
                                        alt="GoodFirms recognized company"
                                        width={140}
                                        height={40}
                                        className="h-8 w-auto object-contain"
                                    />
                                </Link>

                                {/* TechXellent */}
                                <Link
                                    href="https://techxellent.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="opacity-80 hover:opacity-100 transition"
                                >
                                    <Image
                                        src="/logos/techxellent.svg"
                                        alt="TechXellent Saudi Arabia"
                                        width={160}
                                        height={40}
                                        className="h-8 w-auto object-contain"
                                    />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ---------- CLIENT PREVIEW TOOLTIP ---------- */}
            {hoveredClient && (
                <div
                    className="fixed z-50 pointer-events-none"
                    style={{
                        left: `${previewPosition.x}px`,
                        top: `${previewPosition.y}px`,
                        transform: 'translate(-50%, -100%)',
                    }}
                >
                    <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden mb-2">
                        <div className="w-[320px] h-[200px] bg-gray-100 relative overflow-hidden">
                            <iframe
                                src={hoveredClient.url}
                                className="absolute top-0 left-0 pointer-events-none border-0"
                                style={{
                                    width: '1280px',
                                    height: '800px',
                                    transform: 'scale(0.25)',
                                    transformOrigin: 'top left',
                                }}
                                title={`Preview of ${hoveredClient.name}`}
                                sandbox="allow-same-origin"
                            />
                        </div>
                        <div className="px-3 py-2 border-t border-gray-100">
                            <p className="text-sm font-medium text-gray-900">
                                {hoveredClient.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {hoveredClient.url}
                            </p>
                        </div>
                    </div>
                    <div className="w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45 mx-auto -mt-1.5" />
                </div>
            )}
        </>
    );
}