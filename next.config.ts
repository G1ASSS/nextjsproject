import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  basePath: '/nextjsproject',
  assetPrefix: '/nextjsproject',
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/learning',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/learning/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
