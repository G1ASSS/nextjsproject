const fs = require('fs');
const path = require('path');

// Restore dynamic routes from backup
const dynamicRoutes = [
  'src/app/blog/[id]',
  'src/app/projects/[id]', 
  'src/app/tools/[id]'
];

const backupDir = 'temp-dynamic-routes-backup';

console.log('🔄 Restoring dynamic routes...');

// Restore dynamic routes from backup
dynamicRoutes.forEach(route => {
  const routePath = path.join(process.cwd(), route);
  const backupPath = path.join(process.cwd(), backupDir, path.basename(route));
  
  if (fs.existsSync(backupPath)) {
    console.log(`📦 Restoring ${route} from backup...`);
    fs.renameSync(backupPath, routePath);
  }
});

// Clean up backup directory if empty
try {
  fs.rmdirSync(backupDir);
  console.log('🧹 Cleaned up backup directory');
} catch (error) {
  // Directory not empty or doesn't exist, that's fine
}

console.log('✅ Dynamic routes restored successfully');
