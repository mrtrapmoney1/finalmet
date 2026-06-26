import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats from our self-hosted JPG sources; AVIF first, WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Long cache for immutable, content-hashed optimized variants.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
