import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        // Cloudflare R2 custom CDN domain
        protocol: 'https',
        hostname: 'assets.vegaarena.com',
        pathname: '/**',
      },
      {
        // Fallback: Cloudflare R2 public .dev subdomain (if custom domain not yet active)
        protocol: 'https',
        hostname: '*.r2.dev',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb',
    },
  },
};

export default nextConfig;
