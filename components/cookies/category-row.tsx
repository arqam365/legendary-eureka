"use client";

import ToggleSwitch from "@/components/ui/toggle-switch";

export default function CookieCategoryRow({
                                              title,
                                              desc,
                                              checked,
                                              locked = false,
                                              onChange,
                                          }: {
    title: string;
    desc: string;
    checked: boolean;
    locked?: boolean;
    onChange: (v: boolean) => void;
}) {
    const id = `cookie-${title.toLowerCase().replace(/\s+/g, "-")}`;
    const descId = `${id}-desc`;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-5 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <label htmlFor={id} className="block font-semibold text-gray-900">
                        {title}{" "}
                        {locked && (
                            <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                Required
              </span>
                        )}
                    </label>
                    <p id={descId} className="mt-1 text-[15px] leading-relaxed text-gray-700">
                        {desc}
                    </p>
                </div>

                {/* Toggle */}
                <div className="mt-1">
                    <ToggleSwitch
                        id={id}
                        checked={checked}
                        disabled={locked}
                        onCheckedChange={(v) => !locked && onChange(v)}
                        ariaDescribedBy={descId}
                    />
                </div>
            </div>
        </div>
    );
}