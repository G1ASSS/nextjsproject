import { getBlogPosts, getBlogPostsByCategoryId, BlogPost, testSupabaseConnection } from '@/lib/blog'
import { getCategories, Category } from '@/lib/categories'
import { fetchBlogPostsDynamic, getLocaleFromPath } from '@/lib/dynamicQueries'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'
import ErrorBoundary from '@/components/ErrorBoundary'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
    postSlug: string
  }>
}

// Force static rendering for GitHub Pages
export const dynamic = 'force-static'

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    // Get all categories to generate static paths
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, slug')

    if (categoriesError || !categories) {
      console.error('Error fetching categories for static params:', categoriesError)
      return []
    }

    // Generate params for all published posts
    const allParams: Array<{ slug: string; postSlug: string }> = []

    for (const category of categories) {
      // Get all published posts for this category
      const { data: posts, error: postsError } = await supabase
        .from('blogs')
        .select('slug')
        .eq('category_id', category.id)
        .eq('status', 'published')

      if (postsError) {
        console.error(`Error fetching posts for category ${category.slug}:`, postsError)
      } else if (posts && posts.length > 0) {
        // Get unique slugs to avoid duplicates across languages
        const uniqueSlugs = Array.from(new Set(posts.map((post: any) => post.slug)))
        const params = uniqueSlugs.map((slug: string) => ({
          slug: category.slug,
          postSlug: slug
        }))
        allParams.push(...params)
      }
    }

    console.log(`Generated ${allParams.length} static params for blog posts`)
    return allParams
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, postSlug } = await params
  
  // Always return default metadata - never throw errors
  try {
    // Validate parameters before querying
    if (!postSlug || !slug) {
      return {
        title: 'Blog Post',
        description: 'Read our latest blog post.'
      }
    }
    
    // Get category info first - don't throw if fails
    let categoryData = null
    try {
      const { data } = await supabase
        .from('categories')
        .select('name, slug')
        .eq('slug', slug)
        .single()
      categoryData = data
    } catch (categoryError) {
      // Silently handle category fetch failure
      console.warn('Metadata: Category not found, using defaults')
    }

    // Get the blog post using postSlug - don't throw if fails
    let postData = null
    try {
      const { data } = await supabase
        .from('blogs')
        .select(`
          *,
          categories(id, name, slug)
        `)
        .eq('slug', postSlug)
        .eq('status', 'published')
        .single()
      postData = data
    } catch (postError) {
      // Silently handle post fetch failure
      console.warn('Metadata: Post not found, using defaults')
    }

    // Return dynamic metadata if found, otherwise return defaults
    if (postData) {
      return {
        title: postData.title || 'Blog Post',
        description: postData.description || postData.excerpt || 'Read our latest blog post.',
        openGraph: {
          title: postData.title || 'Blog Post',
          description: postData.description || postData.excerpt || 'Read our latest blog post.',
          type: 'article',
          publishedTime: postData.created_at,
          modifiedTime: postData.updated_at,
          images: postData.image_url ? [
            {
              url: postData.image_url,
              width: 1200,
              height: 630,
              alt: postData.title || 'Blog Post',
            }
          ] : [],
        },
        twitter: {
          card: 'summary_large_image',
          title: postData.title || 'Blog Post',
          description: postData.description || postData.excerpt || 'Read our latest blog post.',
          images: postData.image_url ? [postData.image_url] : [],
        },
      }
    }

    // Default fallback metadata
    return {
      title: categoryData ? `${categoryData.name} - Blog Post` : 'Blog Post',
      description: `Read our latest blog post${categoryData ? ` in ${categoryData.name}` : ''}.`
    }
  } catch (error) {
    // Final fallback - never throws
    return {
      title: 'Blog Post',
      description: 'Read our latest blog post.'
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, postSlug } = await params
  
  console.log('=== DYNAMIC BLOG POST PAGE DEBUG ===')
  console.log('Category slug:', slug)
  console.log('Post slug:', postSlug)
  
  // Get the current locale from the URL or default to English
  const locale = getLocaleFromPath(`/${slug}/${postSlug}`)
  console.log('Current locale:', locale)
  
  // Map URL slug to category UUID
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
  
  const categoryId = CATEGORY_SLUG_TO_ID[slug.toLowerCase()] || slug
  console.log('Mapped category ID:', categoryId)
  
  // Validate required parameters before querying
  if (!postSlug || !categoryId) {
    console.error('Missing required parameters:', { postSlug, categoryId })
    return (
      <ErrorBoundary>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Invalid Request</h1>
            <p className="text-gray-600 mb-6">Missing required parameters.</p>
            <Link href="/learning" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Learning
            </Link>
          </div>
        </div>
      </ErrorBoundary>
    )
  }
  
  // Fetch the specific post directly from Supabase
  let post = null
  let error = null
  let isLoading = true
  
  try {
    console.log('=== DYNAMIC POST FETCH ===')
    console.log('Fetching post:', postSlug, 'for locale:', locale, 'category ID:', categoryId)
    
    // PRIMARY QUERY: Fetch using postSlug, language, and category_id
    const primaryQuery = supabase
      .from('blogs')
      .select(`
        *,
        categories(id, name, slug)
      `)
      .eq('slug', postSlug)
      .eq('language', locale)
      .eq('category_id', categoryId)
      .eq('status', 'published')
      .single()
    
    console.log('Primary query built:', { 
      slug: postSlug, 
      language: locale, 
      categoryId, 
      status: 'published' 
    })
    
    const { data: postData, error: fetchError } = await primaryQuery
    
    if (fetchError) {
      // Only log as warning since we have bypass query
      console.warn('Primary query not found, trying bypass:', fetchError.code)
      
      // SECONDARY QUERY: Bypass strict filtering - fetch by slug only
      console.log('=== BYPASS QUERY - SLUG ONLY ===')
      const bypassQuery = supabase
        .from('blogs')
        .select(`
          *,
          categories(id, name, slug)
        `)
        .eq('slug', postSlug)
        .eq('status', 'published')
      
      console.log('Bypass query built:', { 
        slug: postSlug, 
        status: 'published' 
      })
      
      const { data: bypassData, error: bypassError } = await bypassQuery
      
      if (bypassError) {
        // Only log as error if both queries fail
        console.error('Both primary and bypass queries failed:', bypassError)
        error = bypassError
      } else if (bypassData && bypassData.length > 0) {
        console.log('Bypass query successful - found posts:', bypassData.length)
        bypassData.forEach((p: any, index: number) => {
          console.log(`  ${index + 1}. Title: "${p.title}", Language: "${p.language}", Category_ID: "${p.category_id}"`)
        })
        
        // Find the post that matches the current language
        const languageMatch = bypassData.find((p: any) => p.language === locale)
        if (languageMatch) {
          post = languageMatch
          console.log('Found language match:', languageMatch.title)
        } else {
          // If no language match, use the first post
          post = bypassData[0]
          console.log('No language match, using first post:', post.title)
        }
      } else {
        console.log('Bypass query found no posts with slug:', postSlug)
      }
    } else {
      post = postData
      console.log('Primary query successful:', { 
        foundPost: !!post,
        postTitle: post?.title,
        postLanguage: post?.language,
        postCategory: post?.categories?.name,
        postCategoryId: post?.category_id
      })
    }
    
    console.log('=== END DYNAMIC POST FETCH ===')
    
  } catch (err) {
    console.error('Unexpected error in dynamic post fetch:', err)
    error = err
  } finally {
    isLoading = false
  }
  
  // If post not found, try to get category info for error page
  let categoryData = null
  if (!post) {
    try {
      const { data } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('slug', slug)
        .single()
      categoryData = data
    } catch (err) {
      console.error('Error fetching category:', err)
    }
  }
  
  // Show loading state instead of immediate 404
  if (isLoading) {
    console.log('Post is loading...')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }
  
  // Show custom error instead of 404 redirect
  if (!post) {
    console.log('Post not found, showing custom error')
    return (
      <ErrorBoundary>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">
              The post "{postSlug}" was not found in the "{slug}" category for language "{locale}".
            </p>
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Category ID: {categoryId}<br/>
                Expected Language: {locale}<br/>
                Debug: Check console for detailed query results
              </p>
            </div>
            <Link 
              href={`/learning/${slug}`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to {categoryData?.name || slug}
            </Link>
          </div>
        </div>
      </ErrorBoundary>
    )
  }
  
  console.log('=== END DYNAMIC BLOG POST PAGE DEBUG ===')
  
  return (
    <ErrorBoundary>
      <BlogPostClient 
        post={post} 
        category={post?.categories || null}
      />
    </ErrorBoundary>
  )
}
