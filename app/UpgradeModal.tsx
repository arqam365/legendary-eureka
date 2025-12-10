"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "revzion_uiux_upgrade_notice_v1";

export default function UpgradeModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const { expires } = JSON.parse(raw);
                if (Date.now() < expires) return; // already dismissed
            }
        } catch (_) {}

        setOpen(true);
    }, []);

    const dismiss = () => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ expires: Date.now() + 24 * 60 * 60 * 1000 }) // 1 day hide
            );
        } catch (_) {}

        setOpen(false);
    };

    if (!open) return null;

    return (
        <div
            className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/50
      "
            role="dialog"
            aria-modal="true"
            aria-labelledby="upgrade-title"
        >
            <div
                className="
          w-[min(520px,90%)]
          bg-white rounded-xl
          p-6 shadow-2xl
        "
            >
                <h2
                    id="upgrade-title"
                    className="text-xl font-semibold mb-2 text-gray-900"
                >
                    We’re Elevating Your Experience
                </h2>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    We’re rolling out UI and UX upgrades to deliver a faster, smarter and more seamless
                    experience across our platform. During this transition, certain visuals or assets may
                    not display consistently. All core services remain fully available. Thanks for your
                    trust while we elevate the experience.
                </p>

                <div className="flex justify-end">
                    <button
                        onClick={dismiss}
                        className="
              px-4 py-2 rounded-lg
              bg-blue-600 text-white font-medium
              hover:bg-blue-700 transition
            "
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}