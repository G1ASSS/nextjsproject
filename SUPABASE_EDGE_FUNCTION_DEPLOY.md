# Supabase Edge Function Deployment Guide

This guide shows how to deploy the GitHub Webhook Bridge function using Supabase CLI.

## 🚀 Step 1: Install Supabase CLI

### Option A: Install with npm (Recommended)
```bash
npm install -g supabase
```

### Option B: Install with Homebrew (macOS)
```bash
brew install supabase/tap/supabase
```

### Option C: Install with other methods
```bash
# Download binary
curl -L https://github.com/supabase/cli/releases/latest/download/supabase_darwin_amd64.tar.gz | tar xz
sudo mv supabase /usr/local/bin/
```

## 🔐 Step 2: Login to Supabase

```bash
supabase login
```

This will open a browser window to authenticate with your Supabase account.

## 🔗 Step 3: Link to Your Project

```bash
# Get your project reference from Supabase Dashboard
# Settings → General → Project ID
supabase link --project-ref your-project-ref
```

Example:
```bash
supabase link --project-ref abcdefghijklmnopqrst
```

## 🔧 Step 4: Set Environment Variables

### Option A: Using Supabase CLI
```bash
# Set GitHub configuration
supabase secrets set GITHUB_TOKEN=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
supabase secrets set GITHUB_REPO_OWNER=g1asss
supabase secrets set GITHUB_REPO_NAME=nextjsproject

# Verify secrets are set
supabase secrets list
```

### Option B: Using Supabase Dashboard
1. Go to Supabase Dashboard → Settings → Edge Functions
2. Add these secrets:
   - `GITHUB_TOKEN=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`
   - `GITHUB_REPO_OWNER=g1asss`
   - `GITHUB_REPO_NAME=nextjsproject`

## 🚀 Step 5: Deploy the Function

```bash
# Deploy the specific function
supabase functions deploy github-webhook-bridge

# Or deploy all functions
supabase functions deploy
```

Expected output:
```
✅ Deployed function github-webhook-bridge
🔗 Function URL: https://your-project-ref.supabase.co/functions/v1/github-webhook-bridge
```

## 🔍 Step 6: Verify Deployment

### Check Function Status
```bash
supabase functions list
```

### View Function Logs
```bash
supabase functions logs github-webhook-bridge
```

### Test Function Directly
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  https://your-project-ref.supabase.co/functions/v1/github-webhook-bridge \
  -d '{
    "record": {
      "id": "test-123",
      "slug": "test-post",
      "title": "Test Post",
      "content": "Test content",
      "category_id": "cat-123",
      "language": "en",
      "status": "published"
    },
    "table": "blogs",
    "schema": "public",
    "type": "INSERT"
  }'
```

## 🔗 Step 7: Configure Supabase Webhook

### In Supabase Dashboard:
1. Go to **Database** → **Webhooks**
2. Click **"New Webhook"**
3. Configure:
   - **Name**: `GitHub Deployment Trigger`
   - **URL**: `https://your-project-ref.supabase.co/functions/v1/github-webhook-bridge`
   - **HTTP Method**: `POST`
   - **Content Type**: `application/json`
   - **Events**: 
     - Table: `blogs`
     - Events: `INSERT`
   - **Secret**: (Generate a random secret)

### Test Webhook:
1. Add a new blog post to your `blogs` table
2. Check the function logs: `supabase functions logs github-webhook-bridge`
3. Check GitHub Actions for new workflow run

## 📋 Complete Deployment Commands

```bash
# 1. Install CLI (if not already installed)
npm install -g supabase

# 2. Login
supabase login

# 3. Link to project
supabase link --project-ref your-project-ref

# 4. Set secrets
supabase secrets set GITHUB_TOKEN=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
supabase secrets set GITHUB_REPO_OWNER=g1asss
supabase secrets set GITHUB_REPO_NAME=nextjsproject

# 5. Deploy function
supabase functions deploy github-webhook-bridge

# 6. Check logs
supabase functions logs github-webhook-bridge --follow
```

## 🔧 Troubleshooting

### Issue: Permission Denied
```bash
# Make sure you're logged in
supabase login

# Check project link
supabase projects list
```

### Issue: Secrets Not Found
```bash
# List current secrets
supabase secrets list

# Set missing secrets
supabase secrets set GITHUB_TOKEN=your_token
```

### Issue: Function Not Working
```bash
# Check function logs
supabase functions logs github-webhook-bridge

# Redeploy function
supabase functions deploy github-webhook-bridge --no-verify-jwt
```

### Issue: Webhook Not Triggering
1. Check webhook configuration in Supabase Dashboard
2. Verify webhook URL is correct
3. Check function logs for errors
4. Test webhook manually with curl

## 🎯 Expected Results

### Successful Deployment:
```
✅ Deployed function github-webhook-bridge
🔗 Function URL: https://your-project-ref.supabase.co/functions/v1/github-webhook-bridge
```

### Successful Webhook Trigger:
```
🚀 GitHub Webhook Bridge Function Called
📦 Received webhook payload: {...}
📝 New blog post detected, triggering GitHub deployment
📤 Sending to GitHub: {...}
✅ GitHub deployment triggered successfully
```

### GitHub Actions Should Show:
```
🚀 Workflow triggered by: repository_dispatch
📦 Supabase update detected!
📋 Event type: supabase_update
📋 Event data: {"table":"blogs","type":"INSERT",...}
```

## 🔄 Complete Flow

1. **New blog post added** to Supabase `blogs` table
2. **Supabase webhook** triggers Edge Function
3. **Edge Function** formats payload and sends to GitHub
4. **GitHub Actions** workflow starts automatically
5. **Next.js build** runs with new content
6. **Site deploys** to GitHub Pages
7. **New blog post** is live! 🎉

Your auto-deployment system is now complete! 🚀
