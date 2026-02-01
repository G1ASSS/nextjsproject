import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import BlogPostClient from './BlogPostClient'
import ErrorBoundary from '@/components/ErrorBoundary'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
    postSlug: string
  }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    // First, get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, slug')

    if (categoriesError || !categories) {
      console.error('Error fetching categories for static params:', categoriesError)
      return []
    }

    console.log('Found categories:', categories)

    // Then, for each category, get all blog posts
    const allParams: Array<{ slug: string; postSlug: string }> = []

    for (const category of categories) {
      const { data: posts, error: postsError } = await supabase
        .from('blogs')
        .select('slug')
        .eq('category_id', category.id)
        .eq('status', 'published')

      if (postsError) {
        console.error(`Error fetching posts for category ${category.slug}:`, postsError)
        continue
      }

      if (posts && posts.length > 0) {
        console.log(`Found ${posts.length} posts for category ${category.slug}`)
        const categoryParams = posts.map((post: any) => ({
          slug: category.slug,
          postSlug: post.slug
        }))
        allParams.push(...categoryParams)
      }
    }

    console.log('Total static params generated:', allParams.length)
    console.log('Static params:', allParams)

    return allParams
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    return []
  }
}

// Tell Next.js that only the paths returned from generateStaticParams should be generated
export const dynamicParams = false

// Force static generation for this page
export const dynamic = 'force-static'

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, postSlug } = await params
  
  try {
    // Get category info first
    const { data: categoryData } = await supabase
      .from('categories')
      .select('name, slug')
      .eq('slug', slug)
      .single()

    if (!categoryData) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.'
      }
    }

    // Get the blog post using postSlug
    const { data: postData } = await supabase
      .from('blogs')
      .select(`
        *,
        categories(id, name, slug)
      `)
      .eq('slug', postSlug)
      .eq('status', 'published')
      .single()

    if (!postData) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.'
      }
    }

    return {
      title: postData.title,
      description: postData.description,
      openGraph: {
        title: postData.title,
        description: postData.description,
        type: 'article',
        publishedTime: postData.created_at,
        modifiedTime: postData.updated_at,
        images: postData.image_url ? [
          {
            url: postData.image_url,
            width: 1200,
            height: 630,
            alt: postData.title,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: postData.title,
        description: postData.description,
        images: postData.image_url ? [postData.image_url] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog Post',
      description: 'Read our latest blog post.'
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Awaited params at the start of the component
  const { slug, postSlug } = await params
  
  // Environment variable validation
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    notFound()
  }
  
  // Clean logs for debugging
  console.log('=== BLOG POST PAGE DEBUG ===')
  console.log('Requested slug:', slug)
  console.log('Requested postSlug:', postSlug)
  console.log('Supabase URL:', supabaseUrl)
  console.log('Both params received successfully')
  
  try {
    // Get category info first
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .eq('slug', slug)
      .single()

    console.log('Category fetch result:', { categoryData, categoryError })

    if (!categoryData || categoryError) {
      console.log('Category not found or error occurred')
      notFound()
    }

    // Get current language - use 'en' for static generation
    const currentLang = 'en'; // Force English for static generation

    console.log('Current language:', currentLang)

    // Direct Supabase fetch without complex error handling
    const { data: postData, error: postError } = await supabase
      .from('blogs')
      .select(`
        *,
        categories(id, name, slug)
      `)
      .eq('slug', postSlug)
      .eq('category_id', categoryData.id)
      .eq('status', 'published')
      .single() // Temporarily removed language filter for debugging

    console.log('Post fetch result:', { postData, postError })

    // Handle null data with notFound() instead of throwing server error
    if (!postData || postError) {
      console.log('Post not found or error occurred')
      notFound()
    }

    // Debug log to see if data is coming from Supabase
    console.log("Post Data:", postData)

    // Check for Null Data before accessing properties
    if (!postData) {
      console.log('Post data is null, calling notFound()')
      notFound()
    }

    // Transform the data to match expected format
    const transformedPost = {
      id: postData.id,
      title: postData.title,
      slug: postData.slug,
      description: postData.description,
      content: postData.content,
      excerpt: postData.description,
      author: postData.author_name || 'G1ASS',
      created_at: postData.created_at,
      updated_at: postData.updated_at,
      published: postData.status === 'published',
      category: postData.categories?.name || '',
      category_id: postData.category_id,
      category_data: postData.categories || null,
      tags: [],
      image_url: postData.image_url,
      video_url: postData.video_url,
      language: postData.language || 'en'
    }

    console.log('Transformed post:', transformedPost)
    console.log('=== BLOG POST PAGE DEBUG END ===')

    // Wrap content rendering in Try-Catch block
    try {
      return (
        <ErrorBoundary>
          <BlogPostClient post={transformedPost} category={postData.categories} />
        </ErrorBoundary>
      )
    } catch (renderError) {
      console.error('Error rendering BlogPostClient:', renderError)
      notFound()
    }
  } catch (error) {
    console.error('Critical error in BlogPostPage:', error)
    notFound()
  }
}
