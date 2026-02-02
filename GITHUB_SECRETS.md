# GitHub Secrets Setup for Deployment

To deploy this Next.js application to GitHub Pages, you need to configure the following GitHub Secrets in your repository:

## Required Secrets

### 1. Supabase Configuration
Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

#### `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Your Supabase project URL
- **Example**: `https://your-project.supabase.co`

#### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anonymous/public key
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Your Supabase service role key (for server-side operations)
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## How to Get These Values

1. **Go to your Supabase Dashboard** (https://supabase.com/dashboard)
2. **Select your project**
3. **Go to Settings → API**
4. **Copy the following values:**
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Deployment Process

Once secrets are configured:

1. **Push to main branch** - GitHub Actions will automatically build and deploy
2. **Check Actions tab** - Monitor the build process
3. **Visit GitHub Pages** - Your site will be available at `https://[username].github.io/[repository-name]/nextjsproject`

## Static Generation

The build process:
- ✅ Generates static HTML files for all blog posts
- ✅ Creates static category pages
- ✅ Optimizes for GitHub Pages deployment
- ✅ Maintains `/nextjsproject` base path

## New Posts

To add new blog posts after deployment:
1. Add the post to your Supabase database
2. The static build will include it in the next deployment
3. Push to main to trigger a new build with the new post

## Troubleshooting

If the build fails:
1. **Check Secrets**: Ensure all three Supabase secrets are correctly set
2. **Check Supabase Connection**: Verify the URL and keys are valid
3. **Check Build Logs**: Look at the GitHub Actions logs for specific errors
4. **Check Database**: Ensure Supabase is accessible and has the required tables
