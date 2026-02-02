// Disable caching for real-time updates
export const revalidate = 0

import { supabase } from './supabase'

// Category slug to ID mapping for dynamic fetching
const CATEGORY_SLUG_TO_ID: Record<string, string> = {
  'html': '7b327908-8760-4443-b407-7d56d7b24184',
  'css': 'your-css-category-id',
  'javascript': 'your-js-category-id',
  'nextjs': 'your-nextjs-category-id',
  'security': 'your-security-category-id',
  'python': 'your-python-category-id',
  'react': 'your-react-category-id',
  'nodejs': 'your-nodejs-category-id',
  'typescript': 'your-typescript-category-id',
  'general': 'general'
}

export interface DynamicQueryOptions {
  locale?: string
  category?: string
  status?: 'published' | 'draft' | 'all'
  limit?: number
  offset?: number
}

/**
 * Universal dynamic query function for blog posts
 * Fetches posts based on locale from URL path with no hardcoded language checks
 */
export async function fetchBlogPostsDynamic(options: DynamicQueryOptions = {}) {
  const {
    locale = 'en', // Default to English if no locale provided
    category,
    status = 'published',
    limit,
    offset
  } = options

  console.log('=== DYNAMIC QUERY DEBUG ===')
  console.log('Query options:', { locale, category, status, limit, offset })

  try {
    let query = supabase
      .from('blogs')
      .select('*')
    
    // Handle special 'all' locale to get all languages
    if (locale !== 'all') {
      // Use case-insensitive comparison for language filtering
      query = query.ilike('language', locale)
      console.log('Filtering by language (case-insensitive):', locale)
    } else {
      console.log('Fetching all languages (no language filter)')
    }

    // Add status filter if not 'all'
    if (status !== 'all') {
      query = query.eq('status', status)
    }

    // Add category filter if provided
    if (category) {
      // Get category ID from slug or use directly if it's already an ID
      const categoryId = CATEGORY_SLUG_TO_ID[category.toLowerCase()] || category
      query = query.eq('category_id', categoryId)
      console.log('Filtering by category:', category, 'ID:', categoryId)
    }

    // Add ordering
    query = query.order('created_at', { ascending: false })

    // Apply pagination if specified
    if (limit) {
      query = query.limit(limit)
    }
    if (offset) {
      query = query.range(offset, offset + (limit || 10) - 1)
    }

    console.log('Final query built, executing...')
    
    const { data: posts, error } = await query

    if (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }

    console.log('=== FETCH RESULTS DEBUG ===')
    console.log('Posts fetched:', posts?.length || 0)
    
    if (posts && posts.length > 0) {
      // Count posts by language (case-insensitive)
      const languageCounts = posts.reduce((acc: Record<string, number>, post: any) => {
        const lang = post.language ? post.language.toLowerCase() : 'unknown'
        acc[lang] = (acc[lang] || 0) + 1
        return acc
      }, {})
      console.log('Posts by language (case-insensitive):', languageCounts)

      // Specifically check for Spanish posts (case-insensitive)
      const spanishPosts = posts.filter((post: any) => post.language && post.language.toLowerCase() === 'es')
      console.log('Spanish posts found (case-insensitive):', spanishPosts.length)
      if (spanishPosts.length > 0) {
        console.log('Spanish post details:', spanishPosts.map((p: any) => ({ 
          id: p.id, 
          title: p.title, 
          language: p.language,
          category_id: p.category_id,
          category: p.category
        })))
      }

      // Specifically check for Myanmar posts (case-insensitive)
      const myanmarPosts = posts.filter((post: any) => post.language && post.language.toLowerCase() === 'my')
      console.log('Myanmar posts found (case-insensitive):', myanmarPosts.length)
      if (myanmarPosts.length > 0) {
        console.log('Myanmar post details:', myanmarPosts.map((p: any) => ({ 
          id: p.id, 
          title: p.title, 
          language: p.language,
          category_id: p.category_id,
          category: p.category
        })))
      }

      // Debug: Show all posts with their languages and categories
      console.log('All posts with details:')
      posts.forEach((post: any, index: number) => {
        console.log(`  ${index + 1}. Title: "${post.title}", Language: "${post.language}", Category_ID: "${post.category_id}", Slug: "${post.slug}"`)
      })
    }

    return posts || []
  } catch (error) {
    console.error('Failed to fetch blog posts dynamically:', error)
    return []
  }
}

/**
 * Get post count per category for a specific locale
 */
export async function getCategoryPostCounts(locale: string = 'en') {
  console.log('=== CATEGORY COUNTS DEBUG ===')
  console.log('Fetching counts for locale:', locale)
  console.log('Cache disabled for real-time Supabase data')

  try {
    // Get all posts for the locale
    const posts = await fetchBlogPostsDynamic({ locale, status: 'published' })
    
    console.log('Posts received for counting:', posts.length)
    
    // Count posts per category using the known category_id mappings
    const categoryCounts: Record<string, number> = {}
    
    posts.forEach(post => {
      let categorySlug = null
      
      // Map category_id to slug using the known mappings
      const categoryMapping: Record<string, string> = {
        '7b327908-8760-4443-b407-7d56d7b24184': 'html',
        '808f4ff0-9983-4b7b-a943-d32c3fd050b8': 'security',
        '30b3dfe3-09c7-4b58-8bb0-3fd7cdd6da5d': 'css' // Next.js category ID from build output
        // Note: This ID maps to multiple categories (css, javascript, next.js, etc.)
        // The fallback logic below will handle category name matching
      }
      
      if (post.category_id && categoryMapping[post.category_id]) {
        categorySlug = categoryMapping[post.category_id]
      } else if (post.category) {
        // Try to match category name to known slugs
        const nameToSlugMap: Record<string, string> = {
          'HTML': 'html',
          'CSS': 'css', 
          'JavaScript': 'javascript',
          'React': 'react',
          'Next.js': 'nextjs',
          'TypeScript': 'typescript',
          'Security': 'security',
          'DevOps': 'devops',
          'Database': 'database',
          'API': 'api'
        }
        categorySlug = nameToSlugMap[post.category] || post.category.toLowerCase()
      }
      
      if (categorySlug) {
        categoryCounts[categorySlug] = (categoryCounts[categorySlug] || 0) + 1
      }
    })

    console.log('Category counts for locale:', locale, categoryCounts)
    
    // Specifically check for Spanish locale (case-insensitive)
    if (locale.toLowerCase() === 'es') {
      console.log('=== SPANISH COUNTS DEBUG ===')
      console.log('Spanish posts found:', posts.length)
      console.log('Spanish posts by category (case-insensitive):', posts.reduce((acc, post) => {
        const category = post.category || 'unknown'
        acc[category] = (acc[category] || 0) + 1
        return acc
      }, {}))
      console.log('=== END SPANISH COUNTS DEBUG ===')
    }
    
    console.log('=== END CATEGORY COUNTS DEBUG ===')
    
    return categoryCounts
  } catch (error) {
    console.error('Error getting category post counts:', error)
    return {}
  }
}

/**
 * Get locale from URL path or default to 'en'
 * Works with both static and dynamic rendering
 */
export function getLocaleFromPath(pathname: string): string {
  // Extract locale from URL path if it exists
  // For example: /en/learning/html -> 'en'
  // Or: /learning/html -> 'en' (default)
  
  const pathParts = pathname.split('/').filter(Boolean)
  
  // Check if first path part is a valid locale
  const validLocales = ['en', 'my', 'th', 'es', 'zh']
  if (pathParts.length > 0 && validLocales.includes(pathParts[0])) {
    return pathParts[0]
  }
  
  return 'en' // Default to English
}

/**
 * Get locale from multiple sources with fallback
 * This works for both static and dynamic rendering
 */
export function getEffectiveLocale(
  currentLanguage?: string, 
  pathname?: string
): string {
  // Try current language from context first
  if (currentLanguage && ['en', 'my', 'th', 'es', 'zh'].includes(currentLanguage)) {
    return currentLanguage
  }
  
  // Try pathname if available
  if (pathname) {
    return getLocaleFromPath(pathname)
  }
  
  // Try localStorage (client-side only)
  if (typeof window !== 'undefined') {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage && ['en', 'my', 'th', 'es', 'zh'].includes(storedLanguage)) {
      return storedLanguage
    }
  }
  
  return 'en' // Default to English
}
