/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  basePath: '/nextjsproject',
  assetPrefix: '/nextjsproject',
  trailingSlash: true,
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
  // Exclude Supabase functions from Next.js build
  outputFileTracingExcludes: {
    '*': [
      './supabase/**/*',
    ],
  },
  // Transpile packages to handle Deno imports
  transpilePackages: [],
}

module.exports = nextConfig