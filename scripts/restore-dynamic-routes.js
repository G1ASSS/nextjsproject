const fs = require('fs');
const path = require('path');

console.log('🔄 Restoring original configuration and dynamic routes...');

const originalConfig = path.join(process.cwd(), 'next.config.js');
const backupConfig = path.join(process.cwd(), 'next.config.js.backup');
const githubConfig = path.join(process.cwd(), 'next.config.github.js');

// Dynamic routes to restore
const dynamicRoutes = [
  'src/app/blog/[id]',
  'src/app/projects/[id]', 
  'src/app/tools/[id]'
];

const backupDir = 'temp-dynamic-routes-backup';

try {
  // Restore dynamic routes from backup
  dynamicRoutes.forEach((route, index) => {
    const routePath = path.join(process.cwd(), route);
    const backupPath = path.join(process.cwd(), backupDir, `route-${index}`);
    
    if (fs.existsSync(backupPath)) {
      console.log(`📦 Restoring ${route} from backup...`);
      fs.renameSync(backupPath, routePath);
    }
  });
  
  // Restore original config from backup
  if (fs.existsSync(backupConfig)) {
    fs.copyFileSync(backupConfig, originalConfig);
    fs.unlinkSync(backupConfig);
    console.log('✅ Original configuration restored');
  }
  
  // Clean up temporary GitHub config
  if (fs.existsSync(githubConfig)) {
    fs.unlinkSync(githubConfig);
    console.log('🧹 Cleaned up temporary config');
  }
  
  // Clean up backup directory if empty
  try {
    if (fs.existsSync(backupDir)) {
      fs.rmdirSync(backupDir);
      console.log('🧹 Cleaned up backup directory');
    }
  } catch (error) {
    // Directory not empty, that's fine
  }
  
  console.log('✅ Restore completed successfully');
} catch (error) {
  console.error('❌ Error restoring configuration:', error);
  process.exit(1);
}
