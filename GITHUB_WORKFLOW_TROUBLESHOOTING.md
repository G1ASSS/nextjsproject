# GitHub Workflow Troubleshooting Guide

This guide helps you fix common errors in GitHub Actions workflow for auto-deployment.

## 🔧 Common Issues & Solutions

### Issue 1: Repository Dispatch Not Triggering

**Error:** `repository_dispatch` event not working

**Solution 1: Check Permissions**
```yaml
# Make sure you have these permissions:
permissions:
  contents: read
  pages: write
  id-token: write
  repository-projects: read
  actions: write  # ← IMPORTANT for repository_dispatch
```

**Solution 2: Check GitHub Token**
- Ensure your Personal Access Token has `repo` scope
- Token must be added to Supabase secrets as `GITHUB_TOKEN`

**Solution 3: Test Manually**
```bash
# Test repository_dispatch manually
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches \
  -d '{"event_type":"supabase_update","client_payload":{"test":true}}'
```

### Issue 2: Build Fails - Missing Scripts

**Error:** `node scripts/build-github-pages.js` not found

**Solution: Create the missing scripts**

```javascript
// scripts/build-github-pages.js
const fs = require('fs')
const path = require('path')

console.log('🔧 Preparing GitHub Pages build...')

// Ensure out directory exists
const outDir = path.join(process.cwd(), 'out')
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

// Create .nojekyll file
fs.writeFileSync(path.join(outDir, '.nojekyll'), '')

console.log('✅ GitHub Pages preparation complete')
```

```javascript
// scripts/restore-dynamic-routes.js
const fs = require('fs')
const path = require('path')

console.log('🔄 Restoring dynamic routes...')

// This script can handle any dynamic route restoration
// For now, it's a placeholder for future enhancements

console.log('✅ Dynamic routes restored')
```

### Issue 3: Environment Variables Not Found

**Error:** `NEXT_PUBLIC_SUPABASE_URL` not found

**Solution: Add GitHub Secrets**
1. Go to repository Settings → Secrets and variables → Actions
2. Add these secrets:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

### Issue 4: Deploy Job Not Running

**Error:** Deploy job skipped

**Solution: Fix Deploy Condition**
```yaml
deploy:
  # ... other config
  if: github.ref == 'refs/heads/main' || github.event_name == 'repository_dispatch'
```

### Issue 5: Supabase Edge Function Errors

**Error:** Edge Function deployment fails

**Solution: Check Function Structure**
```typescript
// supabase/functions/trigger-github-deploy/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }

  try {
    const { record, table, type } = await req.json()
    
    // Only trigger on specific events
    if (table === 'blogs' && type === 'INSERT') {
      // Your logic here
    }
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }
})
```

## 🔍 Debugging Steps

### Step 1: Check Workflow Logs
1. Go to Actions tab in your GitHub repository
2. Click on the failed workflow run
3. Check each step for error messages
4. Look for red ❌ indicators

### Step 2: Test Manual Trigger
1. Go to Actions → "pages" workflow
2. Click "Run workflow"
3. Select branch: main
4. Check if it runs successfully

### Step 3: Verify Secrets
```bash
# Check if secrets are accessible (in workflow)
- name: Debug secrets
  run: |
    echo "Supabase URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}"
    echo "Supabase Anon Key: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}"
```

### Step 4: Test Supabase Webhook
1. Go to Supabase Dashboard → Database → Webhooks
2. Check webhook status
3. View webhook logs
4. Test webhook with sample payload

## 🛠️ Quick Fixes

### Fix 1: Update Workflow Permissions
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
  repository-projects: read
  actions: write
```

### Fix 2: Add Missing Scripts
Create `scripts/build-github-pages.js` and `scripts/restore-dynamic-routes.js`

### Fix 3: Update Deploy Condition
```yaml
if: github.ref == 'refs/heads/main' || github.event_name == 'repository_dispatch'
```

### Fix 4: Add Error Handling
```yaml
- name: Build with error handling
  run: |
    set -e  # Exit on any error
    echo "🏗️ Building Next.js static export..."
    npm run build || {
      echo "❌ Build failed!"
      exit 1
    }
    echo "✅ Build completed successfully!"
```

## 📋 Expected Successful Workflow

### Working Workflow Should Show:
```
🚀 Workflow triggered by: repository_dispatch
📦 Supabase update detected!
📋 Event data: {"table":"blogs","type":"INSERT"}

✅ Checkout complete
✅ Node.js setup complete
✅ Dependencies installed
🧹 Clearing Next.js cache for fresh build...
✅ Environment variables set
🔧 Preparing GitHub Pages build...
🏗️ Building Next.js static export...
✅ Build completed successfully!
📁 Build output size: 15M out/
🔄 Restoring dynamic routes...
✅ Dynamic routes restored
✅ Pages configured
✅ Artifact uploaded
✅ Deployment complete
```

## 🆘 If Still Not Working

### Check These:
1. **GitHub repository settings** - Actions enabled?
2. **GitHub Pages settings** - Source set to "GitHub Actions"?
3. **Supabase project** - Edge Functions enabled?
4. **Network access** - Can Supabase reach GitHub API?
5. **Token permissions** - Does token have required scopes?

### Get Help:
1. **Share workflow logs** - Copy error messages
2. **Check GitHub status** - github.com/status
3. **Review recent changes** - What was modified before error?
4. **Test step by step** - Run each step individually

## 🎯 Final Checklist

Before deploying, ensure:
- ✅ GitHub repository has Actions enabled
- ✅ GitHub Pages source is set to "GitHub Actions"
- ✅ All required secrets are added
- ✅ Workflow permissions are correct
- ✅ Build scripts exist and work
- ✅ Supabase Edge Function is deployed
- ✅ Webhook is configured correctly

**Follow this guide and your GitHub workflow should work perfectly!** 🚀
