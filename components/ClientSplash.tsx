// components/ClientSplash.tsx
"use client";

import SplashScreen from "@/components/splash-screen";

export default function ClientSplash() {
    // put any client-only guards inside the splash itself if needed
    return <SplashScreen minDuration={2500} />;
}