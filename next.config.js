/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only enable static export for GitHub Pages (not for Vercel)
  ...(process.env.VERCEL ? {} : {
    output: 'export',
    basePath: '/nextjsproject',
    assetPrefix: '/nextjsproject',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tdckfwyohklvzudnfswk.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig
