import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Revzion",
        short_name: "Revzion",
        start_url: "/",
        display: "browser",
        background_color: "#FFFFFF",
        theme_color: "#0B1220",
        icons: [
            { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
    }
}
