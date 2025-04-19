// next.config.ts

import type { NextConfig } from "next";

const repoName = "my-crypto-dashboard";

const isGithubPages = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  reactStrictMode: true, // Recommended for highlighting potential problems in React 19+

  // --- GitHub Pages Configuration ---
  // 1. Enable Static Export
  output: "export",

  // 2. Set Base Path (prefixed with /)
  // Tells Next.js the site will live in a subdirectory on the server (e.g., /YOUR_REPO_NAME/)
  basePath: isGithubPages ? `/${repoName}` : "",

  // 3. Set Asset Prefix (usually same as basePath for GH Pages)
  // Ensures CSS/JS/Image files are loaded from the correct subpath
  assetPrefix: isGithubPages ? `/${repoName}/` : "",

  // 4. Disable Image Optimization (Required for static export without custom loader)
  images: {
    unoptimized: true,
    // Keep remotePatterns if you still want <Image> benefits like lazy loading,
    // but optimization itself is disabled by unoptimized: true.
    remotePatterns: [
      { protocol: "https", hostname: "coin-images.coingecko.com" },
    ],
  },
  // --- End GitHub Pages Configuration ---

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
