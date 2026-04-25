import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/3d',
  assetPrefix: '/3d',
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      { source: '/', destination: '/3d', basePath: false, permanent: false },
    ];
  },
};

export default nextConfig;
