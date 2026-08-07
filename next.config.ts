import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mtxprqvaxwjishdhqgpk.supabase.co",
      },
    ],
  },
};

export default nextConfig;