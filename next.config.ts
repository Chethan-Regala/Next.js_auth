import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  }
};

export default nextConfig;
