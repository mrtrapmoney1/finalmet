import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/what-to-expect", destination: "/how-it-works", permanent: true },
      { source: "/troubleshooting-appliances", destination: "/troubleshooting/appliances", permanent: true },
      { source: "/troubleshooting-tv", destination: "/troubleshooting/tv", permanent: true },
      { source: "/troubleshooting-audio", destination: "/troubleshooting/audio", permanent: true },
      { source: "/troubleshooting-commercial", destination: "/troubleshooting/commercial", permanent: true },
    ];
  },
};

export default nextConfig;
