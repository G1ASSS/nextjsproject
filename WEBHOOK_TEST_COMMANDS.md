# Supabase Webhook Testing Commands

## 🧪 Manual Testing from MacBook

### Replace placeholders:
- `YOUR_GITHUB_TOKEN` - Your personal access token
- `YOUR_USERNAME` - Your GitHub username
- `YOUR_REPO` - Your repository name

## Option 1: JSON Body Method
```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches \
  -d '{
    "event_type": "supabase_update",
    "client_payload": {
      "table": "blogs",
      "type": "INSERT",
      "record_id": "test-123",
      "slug": "manual-test-post",
      "title": "Manual Test Post"
    }
  }'
```

## Option 2: Workflow Dispatch
```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/workflows/pages.yml/dispatches \
  -d '{"ref": "main"}'
```

## Expected Workflow Logs:
```
🚀 Workflow triggered by: repository_dispatch
📦 Supabase update detected!
📋 Event type: supabase_update
📋 Event data: {"table":"blogs","type":"INSERT",...}
```

## Quick Test (replace values):
```bash
curl -X POST \
  -H "Authorization: token ghp_YOUR_TOKEN_HERE" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/YOUR_USERNAME/nextjs-project/dispatches \
  -d '{"event_type":"supabase_update","client_payload":{"test":true}}'
```
