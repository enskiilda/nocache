import type { NextConfig } from "next";
import { randomUUID } from "crypto";

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
  // Generate unique build ID each time to prevent any build-level caching
  // Note: This will break incremental deployments but is required for complete cache prevention
  generateBuildId: async () => {
    return `build-${Date.now()}-${randomUUID()}`
  },
};

export default nextConfig;
