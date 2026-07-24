import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/BOSSLA-CAREER-PRO",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
