import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/wasilewski',
  assetPrefix: '/wasilewski',
  trailingSlash: true,
};

export default nextConfig;
