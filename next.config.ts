import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats from our self-hosted JPG sources; AVIF first, WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Long cache for immutable, content-hashed optimized variants.
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        // `images.minimumCacheTTL` only governs the /_next/image optimizer output.
        // The raw JPG sources under /images are served by the static handler, which
        // defaults to `max-age=0` — so every uncached hit re-downloads them. These
        // files only change when scripts/fetch-images.mjs regenerates the manifest,
        // so they are safe to treat as immutable.
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
