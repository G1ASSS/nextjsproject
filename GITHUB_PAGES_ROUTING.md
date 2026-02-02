# GitHub Pages Routing Solution

This document explains how the routing system works for GitHub Pages deployment.

## Problem Solved

GitHub Pages doesn't support server-side routing, so dynamic routes like `/learning/html/advanced-html-tags` would return 404 errors. This solution uses client-side hash routing to make all routes work.

## How It Works

### 1. 404.html Redirect Hack
- **File**: `public/404.html`
- **Purpose**: Redirects all unknown paths back to index.html while preserving the original URL
- **Method**: Uses JavaScript to extract the original path and redirect to `/#/original-path`

### 2. Hash Routing System
- **Component**: `GitHubPagesRouter.tsx`
- **Purpose**: Intercepts hash-based routes and converts them to Next.js routes
- **Method**: Listens for hash changes and updates Next.js router accordingly

### 3. Smart Link Components
- **File**: `BlogCard.tsx`
- **Purpose**: Uses hash routing in production, regular routing in development
- **Method**: 
  - Development: Uses Next.js `<Link>` components
  - Production: Uses hash-based links (`#/learning/html/post-slug`)

### 4. Post Page Hash Support
- **File**: `BlogPostClient.tsx`
- **Purpose**: Parses hash-based routes to fetch correct post data
- **Method**: Extracts category and post slugs from hash and fetches from Supabase

## URL Examples

### Development (localhost)
```
/learning/html/advanced-html-tags
```

### Production (GitHub Pages)
```
/#/learning/html/advanced-html-tags
```

Both URLs work the same way from the user's perspective.

## Implementation Details

### Hash Format
```
https://username.github.io/repository/#/learning/category/post-sug
```

### Route Parsing
```javascript
const hash = window.location.hash // #/learning/html/post-slug
const hashPath = hash.substring(2) // learning/html/post-slug
const pathParts = hashPath.split('/') // ['learning', 'html', 'post-slug']
```

### Link Generation
```javascript
// Production
<a href="#/learning/html/post-slug" onClick={handleHashClick}>

// Development  
<Link href="/learning/html/post-slug">
```

## Benefits

✅ **All routes work** - No 404 errors for dynamic routes
✅ **SEO friendly** - 404.html ensures search engines can crawl
✅ **Back button works** - Hash routing maintains browser history
✅ **Development friendly** - Regular Next.js routing in dev
✅ **Real-time updates** - Client-side fetching still works

## Deployment Notes

1. **Static Export**: The app uses `output: 'export'` for GitHub Pages
2. **Base Path**: All assets use `/nextjsproject/` prefix
3. **Hash Routing**: Only active in production environment
4. **Fallback**: 404.html handles all unknown routes

## Testing

### Local Testing
```bash
npm run dev
# Uses regular Next.js routing
```

### Production Testing
```bash
npm run build
npm run start
# Uses hash routing (NODE_ENV=production)
```

### GitHub Pages Testing
1. Deploy to GitHub Pages
2. Visit `https://username.github.io/repository/#/learning/html/advanced-html-tags`
3. Should load the correct post without 404

## Troubleshooting

### If routes don't work:
1. Check that `404.html` is in the `public/` folder
2. Verify `GitHubPagesRouter` is wrapping the app in `layout.tsx`
3. Ensure `NODE_ENV=production` for hash routing to activate

### If posts don't load:
1. Check console for hash parsing errors
2. Verify Supabase slugs match the URL slugs
3. Check that `BlogPostClient` hash parsing is working

### If links don't work:
1. Verify `BlogCard.tsx` is using hash routing in production
2. Check that click handlers are properly attached
3. Ensure hash change events are being triggered

## Files Modified

- `public/404.html` - New redirect page
- `src/components/GitHubPagesRouter.tsx` - New router component
- `src/components/BlogCard.tsx` - Updated for hash routing
- `src/app/learning/[slug]/[postSlug]/BlogPostClient.tsx` - Added hash parsing
- `src/app/layout.tsx` - Added router wrapper

## No Supabase Changes

✅ **Supabase slugs remain unchanged** - Only the website routing logic was modified
✅ **Database structure unchanged** - All existing posts work as before
✅ **API calls unchanged** - Same Supabase queries, just different URL handling
