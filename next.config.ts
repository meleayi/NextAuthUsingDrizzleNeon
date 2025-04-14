import type { NextConfig } from "next";

// next.config.js
const nextConfig = {
  env: {
    NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", // or whatever size you need
    },
  },
};

export default nextConfig;