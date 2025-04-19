// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Recommended for highlighting potential problems in React 19+

  // Optional: Configure image optimization if using external image sources
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com", // Example: Allow images from CoinGecko
        port: "",
        pathname: "/coins/images/**",
      },
      // Add other domains if needed
    ],
  },

  // Experimental features (use with caution, check Next.js docs)
  experimental: {
    // ppr: true, // Example: Partial Prerendering (Next 15+)
    // serverActions: true, // If using Server Actions
    // after: true, // If using the experimental after() API
  },

  // Add other Next.js configurations as needed
  // E.g., redirects, rewrites, headers
};

export default nextConfig;
