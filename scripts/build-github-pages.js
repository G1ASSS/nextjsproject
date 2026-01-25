const fs = require('fs');
const path = require('path');

console.log('🔄 Preparing GitHub Pages build...');

// Create a .gitignore-safe approach by creating a temporary next.config for GitHub Pages
const originalConfig = path.join(process.cwd(), 'next.config.js');
const githubConfig = path.join(process.cwd(), 'next.config.github.js');

// Create GitHub-specific config that forces static export
const githubConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force static export for GitHub Pages
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
}

module.exports = nextConfig`;

// Dynamic routes to temporarily remove
const dynamicRoutes = [
  'src/app/blog/[id]',
  'src/app/projects/[id]', 
  'src/app/tools/[id]'
];

const backupDir = 'temp-dynamic-routes-backup';

try {
  // Clean up any existing backup directory first
  if (fs.existsSync(backupDir)) {
    fs.rmSync(backupDir, { recursive: true, force: true });
  }
  
  // Create backup directory
  fs.mkdirSync(backupDir, { recursive: true });
  
  // Move dynamic routes to backup with unique names
  dynamicRoutes.forEach((route, index) => {
    const routePath = path.join(process.cwd(), route);
    const backupPath = path.join(process.cwd(), backupDir, `route-${index}`);
    
    if (fs.existsSync(routePath)) {
      console.log(`📦 Moving ${route} to backup...`);
      fs.renameSync(routePath, backupPath);
    }
  });
  
  // Write GitHub-specific config
  fs.writeFileSync(githubConfig, githubConfigContent);
  
  // Backup original config and replace with GitHub config
  if (fs.existsSync(originalConfig)) {
    fs.copyFileSync(originalConfig, originalConfig + '.backup');
    fs.copyFileSync(githubConfig, originalConfig);
  }
  
  console.log('✅ GitHub Pages configuration applied');
  console.log('🚀 Ready for GitHub Pages build');
} catch (error) {
  console.error('❌ Error preparing GitHub Pages build:', error);
  process.exit(1);
}
