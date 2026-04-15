import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  devIndicators: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'gsap'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.samaria.tech',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'samaria.tech',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
