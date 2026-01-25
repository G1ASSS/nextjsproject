import { supabase } from './supabase'

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
  description: string
  content: string
  excerpt?: string
  author?: string
  created_at: string
  updated_at?: string
  published?: boolean
  category?: string
  tags?: string[]
  image_url?: string
}

// Fallback blog data for when Supabase is not available
const fallbackBlogPosts: BlogPost[] = [
  {
    id: 'fallback-1',
    title: 'Advanced Kali Linux Security Techniques',
    description: 'Master advanced penetration testing tools and techniques for ethical hacking and security auditing.',
    content: 'In this comprehensive guide, we explore advanced penetration testing methodologies using Kali Linux.',
    excerpt: 'Master advanced penetration testing tools and techniques for ethical hacking and security auditing.',
    author: 'G1ASS Security Team',
    created_at: new Date().toISOString(),
    category: 'Security',
    tags: ['Security', 'Penetration Testing', 'Ethical Hacking'],
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    published: true
  },
  {
    id: 'fallback-2',
    title: 'Next.js 14 Performance Optimization Guide',
    description: 'Build high-performance web applications with Next.js 14, server components, and advanced optimization strategies.',
    content: 'Building lightning-fast web applications requires understanding the intricacies of Next.js 14.',
    excerpt: 'Build high-performance web applications with Next.js 14, server components, and advanced optimization strategies.',
    author: 'G1ASS Development Team',
    created_at: new Date().toISOString(),
    category: 'Web Development',
    tags: ['Web Development', 'React', 'Next.js', 'Performance'],
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop&crop=center',
    published: true
  },
  {
    id: 'fallback-3',
    title: 'Python for Security Automation',
    description: 'Automate security workflows with Python - from network scanning to vulnerability assessment.',
    content: 'Automating security tasks with Python can significantly improve efficiency and accuracy.',
    excerpt: 'Automate security workflows with Python - from network scanning to vulnerability assessment.',
    author: 'G1ASS Automation Team',
    created_at: new Date().toISOString(),
    category: 'Python',
    tags: ['Python', 'Automation', 'Security', 'Programming'],
    image_url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop&crop=center',
    published: true
  }
]

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Check cache first
  const now = Date.now()
  if (blogPostsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('Returning cached blog posts')
    return blogPostsCache
  }

  try {
    console.log('Fetching blog posts from Supabase...')
    
    const { data, error, status } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
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
      
      return []
    }

    console.log('Successfully fetched blog posts:', data?.length || 0)
    
    // Update cache
    blogPostsCache = data || []
    cacheTimestamp = now
    
    return blogPostsCache
  } catch (error) {
    console.error('Unexpected error fetching blog posts:', error)
    console.log('Using fallback data...')
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
