import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/wasilewski',
  assetPrefix: '/wasilewski',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
