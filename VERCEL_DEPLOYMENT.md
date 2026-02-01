# Vercel Deployment Checklist

## Environment Variables Required
Ensure these are set in your Vercel Environment Variables:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: `https://tdckfwyohklvzudnfswk.supabase.co`
   - Environment: Production, Preview, Development

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkY2tmd3lvaGtsdnp1ZG5mc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTg1NjgsImV4cCI6MjA4NDY3NDU2OH0.0kpiLZpQOY3jdhbtxRaKM27Tz9NiQFTGC7EV5Pw0lag`
   - Environment: Production, Preview, Development

## Deployment Steps

1. **Check Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Verify both variables are set for all environments

2. **Clear Build Cache**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click the three dots next to latest deployment
   - Select "Redeploy" and uncheck "Use existing Build Cache"

3. **Verify Build**
   - Check build logs for any errors
   - Ensure no "Missing environment variable" warnings

## Debugging Steps if Blank Screen Persists

1. **Check Browser Console**
   - Open DevTools (F12)
   - Look for JavaScript errors
   - Check for "Missing Supabase environment variables" error

2. **Check Network Tab**
   - Look for failed API calls
   - Verify Supabase URL is correct

3. **Add Debug Query Parameter**
   - Visit: `https://your-domain.com/learning/html/modern-html5-features?debug=1`
   - Check console for debug logs

## Common Issues

- **Blank screen**: Usually missing environment variables
- **Hydration mismatch**: Fixed with mounted state
- **Supabase connection**: Check URL and key format
- **Static generation**: Ensure paths exist in generateStaticParams
