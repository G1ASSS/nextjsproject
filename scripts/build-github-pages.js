const fs = require('fs');
const path = require('path');

// Create a backup of dynamic routes
const dynamicRoutes = [
  'src/app/blog/[id]',
  'src/app/projects/[id]', 
  'src/app/tools/[id]'
];

const backupDir = 'temp-dynamic-routes-backup';

console.log('🔄 Preparing GitHub Pages build...');

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Move dynamic routes to backup
dynamicRoutes.forEach(route => {
  const routePath = path.join(process.cwd(), route);
  const backupPath = path.join(process.cwd(), backupDir, path.basename(route));
  
  if (fs.existsSync(routePath)) {
    console.log(`📦 Moving ${route} to backup...`);
    fs.renameSync(routePath, backupPath);
  }
});

console.log('✅ Dynamic routes backed up successfully');
console.log('🚀 Ready for GitHub Pages build');
