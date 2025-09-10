import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimized for Vercel deployment
  images: {
    unoptimized: true
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
