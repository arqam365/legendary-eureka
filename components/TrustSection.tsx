'use client';

import { useState } from 'react';

interface Client {
    name: string;
    url: string;
    hasLink: boolean;
}

export default function TrustSection() {
    const [hoveredClient, setHoveredClient] = useState<Client | null>(null);
    const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

    const clients: Client[] = [
        { name: "EvolWe", url: "https://evolwering.com", hasLink: true },
        { name: "HelloCloud", url: "https://hellocloud.co.in", hasLink: true },
        { name: "Rynox", url: "https://rynox.io", hasLink: true },
        { name: "Packagefy", url: "#", hasLink: false },
        { name: "BeeSocial", url: "#", hasLink: false },
    ];

    const handleMouseEnter = (client: Client, event: React.MouseEvent<HTMLAnchorElement>) => {
        if (client.hasLink) {
            setHoveredClient(client);
            const rect = event.currentTarget.getBoundingClientRect();
            setPreviewPosition({
                x: rect.left + rect.width / 2,
                y: rect.top - 10
            });
        }
    };

    const handleMouseLeave = () => {
        setHoveredClient(null);
    };

    return (
        <>
            {/* Client Impact / Trust bar */}
            <section id="trust" className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="rounded-2xl border border-gray-100 bg-gray-50/60 backdrop-blur-sm px-6 py-5">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-sm text-gray-600">
                                Trusted by teams shipping <span className="font-semibold text-gray-900">50+ projects</span> across{" "}
                                <span className="font-semibold text-gray-900">5+ countries</span>
                            </p>

                            {/* Client names with links */}
                            <div className="flex items-center gap-6 transition">
                                {clients.map((client) => (
                                    <a key={client.name}
                                    href={client.url}
                                    target={client.hasLink ? "_blank" : undefined}
                                    rel={client.hasLink ? "noopener noreferrer" : undefined}
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
                    </div>
                </div>
            </section>

            {/* Preview tooltip */}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                    </div>
                    <div className="px-3 py-2 bg-white border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{hoveredClient.name}</p>
                        <p className="text-xs text-gray-500 truncate">{hoveredClient.url}</p>
                    </div>
                </div>
                {/* Arrow pointer */}
                <div className="w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45 mx-auto -mt-1.5" />
            </div>
            )}
        </>
    );
}