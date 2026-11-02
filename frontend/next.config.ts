import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy API calls to the Laravel backend in development. This keeps requests
  // same-origin (no CORS) and mirrors how production routes behind one domain.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
      // Sanctum's CSRF cookie endpoint (used before the login POST).
      {
        source: "/sanctum/:path*",
        destination: "http://localhost:8000/sanctum/:path*",
      },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
