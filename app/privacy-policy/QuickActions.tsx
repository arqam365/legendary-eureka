"use client";

import { Printer, FileText } from "lucide-react";

export default function QuickActions() {
    return (
        <div className="hidden md:flex shrink-0 items-center gap-3">
            <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Print this page"
            >
                <Printer className="h-4 w-4" />
                Print
            </button>
            <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-revzion px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
                <FileText className="h-4 w-4" />
                Ask a question
            </a>
        </div>
    );
}