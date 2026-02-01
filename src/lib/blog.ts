import { supabase } from './supabase'
import { Category } from './categories'

// Cache for blog posts to avoid redundant calls
let blogPostsCache: BlogPost[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes (increased for better performance)

// Test Supabase connection
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    console.log('Testing Supabase connection...')
    console.log('Supabase client initialized:', !!supabase)
    console.log('Supabase URL:', 'https://tdckfwyohklvzudnfswk.supabase.co')
    
    // Test basic network connectivity to Supabase
    try {
      console.log('Attempting network test to:', 'https://tdckfwyohklvzudnfswk.supabase.co/rest/v1/')
      const response = await fetch('https://tdckfwyohklvzudnfswk.supabase.co/rest/v1/', {
        method: 'GET',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkY2tmd3lvaGtsdnp1ZG5mc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTg1NjgsImV4cCI6MjA4NDY3NDU2OH0.0kpiLZpQOY3jdhbtxRaKM27Tz9NiQFTGC7EV5Pw0lag',
          'Content-Type': 'application/json'
        }
      })
      console.log('Network test response status:', response.status)
      console.log('Network test response ok:', response.ok)
      console.log('Network test response headers:', Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        const errorText = await response.text()
        console.log('Network test error response:', errorText)
      }
      
      // Test API key validity with a simple health check
      try {
        const healthResponse = await fetch('https://tdckfwyohklvzudnfswk.supabase.co/rest/v1/', {
          method: 'POST',
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkY2tmd3lvaGtsdnp1ZG5mc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTg1NjgsImV4cCI6MjA4NDY3NDU2OH0.0kpiLZpQOY3jdhbtxRaKM27Tz9NiQFTGC7EV5Pw0lag',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkY2tmd3lvaGtsdnp1ZG5mc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTg1NjgsImV4cCI6MjA4NDY3NDU2OH0.0kpiLZpQOY3jdhbtxRaKM27Tz9NiQFTGC7EV5Pw0lag'
          },
          body: JSON.stringify({ query: 'select 1' })
        })
        console.log('API key test response status:', healthResponse.status)
        console.log('API key test response ok:', healthResponse.ok)
      } catch (apiError: any) {
        console.error('API key test failed:', apiError?.message || apiError)
      }
    } catch (networkError: any) {
      console.error('Network test failed:', {
        message: networkError?.message || 'No message',
        name: networkError?.name || 'No name',
        stack: networkError?.stack || 'No stack'
      })
    }
    
    // Test if we can access the client at all
    try {
      const { data: authData } = await supabase.auth.getSession()
      console.log('Auth session test:', authData)
    } catch (authError) {
      console.log('Auth test failed (expected):', authError)
    }
    
    // Try a simple health check on the blogs table
    const { data, error } = await supabase
      .from('blogs')
      .select('id')
      .limit(1)
    
    console.log('Health check response:', { 
      hasData: !!data, 
      hasError: !!error,
      error: error,
      dataLength: data?.length 
    })
    
    if (error) {
      console.error('Supabase connection test failed:', {
        message: error.message || 'No message',
        details: error.details || 'No details',
        hint: error.hint || 'No hint',
        code: error.code || 'No code',
        errorString: JSON.stringify(error)
      })
      return false
    }
    
    console.log('Supabase connection successful!')
    return true
  } catch (error: any) {
    console.error('Supabase connection test error:', {
      error: error,
      message: error?.message || 'No message',
      stack: error?.stack || 'No stack',
      type: typeof error,
      constructor: error?.constructor?.name
    })
    return false
  }
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  content: string
  excerpt?: string
  author?: string
  created_at: string
  updated_at?: string
  published?: boolean
  category?: string
  category_id?: string
  category_data?: Category
  tags?: string[]
  image_url?: string
  video_url?: string
  language?: string
}

// Fallback blog data for when Supabase is not available
const fallbackBlogPosts: BlogPost[] = [
  {
    id: 'fallback-1',
    slug: 'advanced-kali-linux-security',
    title: 'Advanced Kali Linux Security Techniques',
    description: 'Master advanced penetration testing tools and techniques for ethical hacking and security auditing.',
    content: 'In this comprehensive guide, we explore advanced penetration testing methodologies using Kali Linux.',
    excerpt: 'Master advanced penetration testing tools and techniques for ethical hacking and security auditing.',
    author: 'G1ASS',
    created_at: '2024-01-15T10:00:00Z',
    category: 'Security',
    tags: ['kali-linux', 'penetration-testing', 'security'],
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    published: true
  },
  {
    id: 'fallback-2',
    slug: 'modern-html5-features',
    title: 'Modern HTML5 Features and Best Practices',
    description: 'Explore the latest HTML5 features including semantic elements, multimedia support, and powerful APIs.',
    content: 'HTML5 has revolutionized web development with semantic elements, multimedia support, and powerful APIs.',
    excerpt: 'Explore the latest HTML5 features including semantic elements, multimedia support, and powerful APIs.',
    author: 'G1ASS',
    created_at: '2024-01-10T14:30:00Z',
    category: 'HTML',
    tags: ['html5', 'web-development', 'frontend'],
    image_url: 'https://images.unsplash.com/photo-1627398242455-45a1465c2479?w=400&h=200&fit=crop&crop=center',
    published: true
  },
  {
    id: 'fallback-3',
    slug: 'nextjs-performance-optimization',
    title: 'Next.js Performance Optimization Guide',
    description: 'Learn advanced techniques for optimizing Next.js applications for maximum performance and user experience.',
    content: 'Next.js provides powerful features for building high-performance web applications.',
    excerpt: 'Learn advanced techniques for optimizing Next.js applications for maximum performance.',
    author: 'G1ASS',
    created_at: '2024-01-05T09:15:00Z',
    category: 'Next.js',
    tags: ['nextjs', 'performance', 'optimization'],
    image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&crop=center',
    published: true
  }
]

export async function getBlogPostsByCategoryId(categoryId: string): Promise<BlogPost[]> {
  try {
    console.log('=== getBlogPostsByCategoryId START ===')
    console.log('Fetching blog posts by category ID:', categoryId)
    console.log('Category ID type:', typeof categoryId)
    console.log('Category ID length:', categoryId?.length)
    console.log('Supabase client available:', !!supabase)
    
    if (!categoryId) {
      console.error('Category ID is null or undefined')
      return []
    }
    
    if (!supabase) {
      console.error('Supabase client is not available')
      return []
    }
    
    console.log('Executing Supabase query...')
    const query = supabase
      .from('blogs')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })
    
    console.log('Query object:', query)
    
    const { data, error, status } = await query

    console.log('=== RAW SUPABASE RESPONSE ===')
    console.log('Data:', data)
    console.log('Error:', error)
    console.log('Status:', status)
    console.log('Data type:', typeof data)
    console.log('Error type:', typeof error)
    console.log('Status type:', typeof status)
    console.log('Data is null:', data === null)
    console.log('Error is null:', error === null)
    console.log('Error is undefined:', error === undefined)
    console.log('Error constructor:', error?.constructor?.name)
    console.log('Error keys:', error ? Object.keys(error) : 'No keys')
    
    // Stringify for inspection
    try {
      console.log('Error stringified:', JSON.stringify(error, null, 2))
    } catch (e) {
      console.log('Could not stringify error:', e)
    }

    console.log('Supabase response for category posts:', { 
      data, 
      error, 
      status,
      dataType: typeof data,
      errorType: typeof error,
      dataLength: data?.length,
      errorMessage: error?.message,
      errorDetails: error?.details,
      hint: error?.hint,
      code: error?.code
    })

    if (error) {
      console.error('=== ERROR DETECTED ===')
      console.error('Error fetching blog posts by category ID:', {
        message: error.message || 'No message',
        details: error.details || 'No details',
        hint: error.hint || 'No hint',
        code: error.code || 'No code',
        status: status || 'No status'
      })
      
      // Try to fetch all posts to see if the issue is with the filter
      console.log('Attempting to fetch all posts to diagnose the issue...')
      const { data: allPostsData, error: allPostsError } = await supabase
        .from('blogs')
        .select('*')
        .limit(5)
      
      console.log('All posts diagnostic result:', {
        data: allPostsData,
        error: allPostsError,
        count: allPostsData?.length
      })
      
      // If category_id doesn't work, try fallback with string matching
      console.log('Category ID query failed, trying fallback logic...')
      const allPosts = await getBlogPosts()
      console.log('All posts from getBlogPosts:', allPosts.length)
      
      const filteredPosts = allPosts.filter(post => {
        console.log('Checking post:', post.id, 'category_id:', post.category_id, 'target:', categoryId)
        return post.category_id === categoryId
      })
      
      console.log('Filtered posts count:', filteredPosts.length)
      return filteredPosts
    }

    console.log('Successfully fetched blog posts by category ID:', data?.length || 0)
    console.log('Posts data by category ID:', data)
    return data || []
  } catch (error) {
    console.error('=== CATCH BLOCK ERROR ===')
    console.error('Error fetching blog posts by category ID:', error)
    console.error('Error type:', typeof error)
    console.error('Error constructor:', error?.constructor?.name)
    console.error('Error keys:', error ? Object.keys(error) : 'No keys')
    
    try {
      console.error('Error stringified:', JSON.stringify(error, null, 2))
    } catch (e) {
      console.error('Could not stringify error:', e)
    }
    
    console.error('Error message:', error && typeof error === 'object' && 'message' in error ? error.message : 'No message')
    console.error('Error stack:', error && typeof error === 'object' && 'stack' in error ? error.stack : 'No stack')
    return []
  }
}

export async function getBlogPosts(categorySlug?: string): Promise<BlogPost[]> {
  // Check cache first
  const now = Date.now()
  if (blogPostsCache && (now - cacheTimestamp) < CACHE_DURATION && !categorySlug) {
    console.log('Returning cached blog posts')
    return blogPostsCache
  }

  try {
    console.log('Fetching blog posts from Supabase...')
    
    // Updated query for new table structure with category join
    let query = supabase
      .from('blogs')
      .select(`
        *,
        categories(id, name, slug)
      `)
      .eq('status', 'published')

    // Add category filter if provided (using slug from categories table)
    if (categorySlug) {
      query = query.eq('categories.slug', categorySlug)
    }

    const { data, error, status } = await query
      .order('created_at', { ascending: false })

    console.log('Supabase response:', { data, error, status })

    if (error) {
      console.error('Error fetching blog posts:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        status: status
      })
      
      // Check if it's a "relation does not exist" error (table doesn't exist)
      if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        console.log('Blogs table does not exist. Please run the SQL script in Supabase.')
        console.log('Using fallback data for now...')
        return fallbackBlogPosts
      }
      
      console.log('Using fallback data due to error...')
      return fallbackBlogPosts
    }

    if (!data || data.length === 0) {
      console.log('No blog posts found')
      return []
    }

    console.log(`Successfully fetched ${data.length} blog posts`)

    // Transform the data to match BlogPost interface
    const transformedPosts: BlogPost[] = data.map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      description: post.description || '',
      content: post.content || '',
      excerpt: post.description || '',
      author: post.author_name || 'G1ASS',
      created_at: post.created_at,
      updated_at: post.updated_at,
      published: post.status === 'published',
      category: post.categories?.name || '',
      category_id: post.category_id,
      category_data: post.categories || null,
      tags: [],
      image_url: post.image_url,
      video_url: post.video_url,
      language: post.language || 'en'
    }))

    // Cache the results if no category filter
    if (!categorySlug) {
      blogPostsCache = transformedPosts
      cacheTimestamp = now
    }

    return transformedPosts
  } catch (error) {
    console.error('Unexpected error in getBlogPosts:', error)
    console.error('Error message:', error && typeof error === 'object' && 'message' in error ? error.message : 'No message')
    console.error('Error stack:', error && typeof error === 'object' && 'stack' in error ? error.stack : 'No stack')
    return fallbackBlogPosts
  }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}
