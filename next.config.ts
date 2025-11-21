import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  // Permanently disable all caching mechanisms
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-label', '@radix-ui/react-slot', '@radix-ui/react-tooltip'],
    staleTimes: {
      dynamic: 0,
      static: 0
    }
  },
  // Disable static optimization to prevent caching
  output: 'standalone',
  // Ensure all pages are dynamic
  generateBuildId: async () => {
    // Generate unique build ID each time to prevent caching
    return `build-${Date.now()}-${Math.random().toString(36).substring(7)}`
  },
  // Add headers to disable caching globally
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'Surrogate-Control',
            value: 'no-store',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
