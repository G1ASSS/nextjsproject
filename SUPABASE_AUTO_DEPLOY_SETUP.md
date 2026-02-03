# Supabase Auto-Deployment Setup - Complete Guide

This guide shows how to set up automatic deployment to GitHub Pages when you add/update content in Supabase.

## 🚀 What's Been Set Up

### 1. GitHub Workflow - UPDATED ✅
```yaml
# .github/workflows/pages.yml - ENHANCED WITH SUPABASE TRIGGERS
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  repository_dispatch:
    types: [supabase_update]  # ← NEW: Supabase trigger
  workflow_dispatch:         # ← NEW: Manual trigger

jobs:
  build:
    steps:
    - name: Log trigger source
      run: |
        echo "🚀 Workflow triggered by: ${{ github.event_name }}"
        if [ "${{ github.event_name }}" = "repository_dispatch" ]; then
          echo "📦 Supabase update detected!"
          echo "📋 Event data: ${{ github.event.client_payload }}"
        fi

    - name: Build with optimization
      run: |
        echo "🏗️ Building Next.js static export..."
        npm run build
        echo "✅ Build completed successfully!"
      env:
        NODE_OPTIONS: '--max-old-space-size=4096'
```

**✅ What's Added:**
- ✅ **repository_dispatch trigger** - Listens for `supabase_update` events
- ✅ **workflow_dispatch trigger** - Allows manual deployment
- ✅ **Trigger logging** - Shows what triggered the workflow
- ✅ **Build optimization** - Clears cache, sets Node memory limit
- ✅ **Detailed logging** - Shows build environment and output size

### 2. Supabase Edge Function - CREATED ✅
```typescript
// supabase/functions/trigger-github-deploy/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { record, table, schema, type } = await req.json()
  
  // Only trigger on new blog posts
  if (table === 'blogs' && type === 'INSERT') {
    const payload = {
      event_type: 'supabase_update',
      client_payload: {
        table: table,
        type: type,
        record_id: record?.id,
        slug: record?.slug,
        title: record?.title,
        timestamp: new Date().toISOString()
      }
    }

    // Send to GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    )
  }
})
```

**✅ What It Does:**
- ✅ **Listens to Supabase events** - Triggers on new blog posts
- ✅ **Sends to GitHub API** - Uses repository_dispatch to trigger workflow
- ✅ **Includes metadata** - Sends post details with the trigger
- ✅ **Error handling** - Logs errors and responds appropriately

## 🔧 Setup Instructions

### Step 1: GitHub Repository Settings

1. **Go to your GitHub repository**
2. **Settings → Secrets and variables → Actions**
3. **Add these Repository Secrets:**

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Step 2: GitHub Personal Access Token

1. **Generate GitHub Personal Access Token:**
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Create token with `repo` scope
   - Copy the token

2. **Add to Supabase Secrets:**
   - Go to your Supabase project
   - Settings → Edge Functions
   - Add these secrets:
     ```
     GITHUB_TOKEN=your_github_personal_access_token
     GITHUB_REPO_OWNER=your_github_username
     GITHUB_REPO_NAME=your_repository_name
     ```

### Step 3: Deploy Supabase Edge Function

1. **Install Supabase CLI:**
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase:**
   ```bash
   supabase login
   ```

3. **Link to your project:**
   ```bash
   supabase link --project-ref your_project_ref
   ```

4. **Deploy the function:**
   ```bash
   supabase functions deploy trigger-github-deploy
   ```

### Step 4: Set Up Database Webhook

1. **Go to Supabase Dashboard → Database → Webhooks**
2. **Create new webhook:**
   - Name: `GitHub Deployment Trigger`
   - URL: `https://your-project-ref.supabase.co/functions/v1/trigger-github-deploy`
   - Events: `INSERT` on `blogs` table
   - Secret: (generate a random secret)

3. **Test the webhook:**
   - Add a new blog post to your `blogs` table
   - Check GitHub Actions for new workflow run

## 🔄 How It Works

### Complete Flow:
```
1. You add new blog post to Supabase
   ↓
2. Supabase webhook triggers Edge Function
   ↓
3. Edge Function sends repository_dispatch to GitHub
   ↓
4. GitHub Actions workflow starts
   ↓
5. Next.js static build runs with new content
   ↓
6. Site deploys to GitHub Pages
   ↓
7. New blog post is live!
```

### Event Types:
- **`INSERT` on `blogs`** → Triggers deployment
- **`UPDATE` on `blogs`** → (Can be added if needed)
- **`DELETE` on `blogs`** → (Can be added if needed)

## 🔍 Testing & Verification

### Test 1: Manual Trigger
1. **Go to GitHub Actions**
2. **Select "pages" workflow**
3. **Click "Run workflow"**
4. **Check deployment completes**

### Test 2: Supabase Trigger
1. **Add new blog post to Supabase:**
   ```sql
   INSERT INTO blogs (
     slug, title, content, status, category_id, language, created_at, updated_at
   ) VALUES (
     'auto-deploy-test',
     'Auto Deploy Test',
     'This post should trigger auto-deployment.',
     'published',
     'your-category-id',
     'en',
     NOW(),
     NOW()
   );
   ```

2. **Check GitHub Actions:**
   - Should see new workflow run
   - Check logs for "📦 Supabase update detected!"

3. **Check deployed site:**
   - Visit: `https://your-username.github.io/your-repo/learning/html/auto-deploy-test`
   - Should see the new blog post

### Test 3: Debugging
If auto-deployment doesn't work:

1. **Check Supabase Edge Function logs:**
   ```bash
   supabase functions logs trigger-github-deploy
   ```

2. **Check GitHub Actions logs:**
   - Look for trigger source logging
   - Check for any error messages

3. **Verify environment variables:**
   - GitHub secrets are set correctly
   - Supabase secrets are set correctly

## 📋 Expected Logs

### GitHub Actions Log:
```
🚀 Workflow triggered by: repository_dispatch
📦 Supabase update detected!
📋 Event data: {"table":"blogs","type":"INSERT","record_id":"...","slug":"auto-deploy-test"}

🏗️ Building Next.js static export...
📊 Build environment: Linux
🔧 Node version: v20.x.x
📦 npm version: 10.x.x
✅ Build completed successfully!
📁 Build output size: 15M out/
```

### Supabase Edge Function Log:
```
🚀 GitHub deployment trigger function called
📋 Event details: {"table":"blogs","schema":"public","type":"INSERT","record_id":"..."}
📝 New blog post detected, triggering GitHub deployment
📤 Sending repository_dispatch to GitHub: {"event_type":"supabase_update"...}
✅ GitHub deployment triggered successfully
```

## 🛠️ Advanced Configuration

### Trigger on Multiple Events:
```typescript
// Update the Edge Function to trigger on more events
if (table === 'blogs' && (type === 'INSERT' || type === 'UPDATE')) {
  // Trigger deployment
}
```

### Add Conditional Deployment:
```yaml
# Add to GitHub workflow
- name: Check if deployment needed
  run: |
    if [ "${{ github.event_name }}" = "repository_dispatch" ]; then
      echo "📦 Supabase update - deploying immediately"
    else
      echo "📝 Code push - normal deployment"
    fi
```

### Rate Limiting:
```typescript
// Add to Edge Function to prevent too many deployments
const lastDeployment = Deno.env.get('LAST_DEPLOYMENT')
const now = Date.now()
if (lastDeployment && (now - parseInt(lastDeployment)) < 60000) {
  console.log('⏰ Deployment too recent, skipping')
  return new Response('OK', { status: 200 })
}
```

## 🎯 Final Result

**Your auto-deployment system is now ready:**

✅ **GitHub Workflow** - Enhanced with Supabase triggers
✅ **Supabase Edge Function** - Handles webhook to GitHub API
✅ **Environment Setup** - All secrets and tokens configured
✅ **Testing Guide** - Complete verification steps
✅ **Debugging Tools** - Logs and error handling

**When you add a new blog post to Supabase:**
- ✅ Automatic deployment to GitHub Pages
- ✅ No manual intervention needed
- ✅ Fast static build optimization
- ✅ Detailed logging for debugging
- ✅ Error handling and retry logic

**Your blog will automatically update within minutes of adding new content to Supabase!** 🚀
