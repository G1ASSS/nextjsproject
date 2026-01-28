import { supabase } from './supabase'

// Cache for categories to avoid redundant calls
let categoriesCache: Category[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at?: string
}

// Fallback categories for when Supabase is not available
const fallbackCategories: Category[] = [
  { id: 'fallback-1', name: 'HTML', slug: 'html', created_at: new Date().toISOString() },
  { id: 'fallback-2', name: 'CSS', slug: 'css', created_at: new Date().toISOString() },
  { id: 'fallback-3', name: 'JavaScript', slug: 'javascript', created_at: new Date().toISOString() },
  { id: 'fallback-4', name: 'React', slug: 'react', created_at: new Date().toISOString() },
  { id: 'fallback-5', name: 'Next.js', slug: 'nextjs', created_at: new Date().toISOString() },
  { id: 'fallback-6', name: 'TypeScript', slug: 'typescript', created_at: new Date().toISOString() },
  { id: 'fallback-7', name: 'Security', slug: 'security', created_at: new Date().toISOString() },
  { id: 'fallback-8', name: 'DevOps', slug: 'devops', created_at: new Date().toISOString() },
  { id: 'fallback-9', name: 'Database', slug: 'database', created_at: new Date().toISOString() },
  { id: 'fallback-10', name: 'API', slug: 'api', created_at: new Date().toISOString() },
]

export async function getCategories(): Promise<Category[]> {
  // Check cache first
  const now = Date.now()
  if (categoriesCache && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('Returning cached categories')
    return categoriesCache
  }

  try {
    console.log('Fetching categories from Supabase...')
    
    const { data, error, status } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    console.log('Supabase categories response:', { data, error, status })

    if (error) {
      console.error('Error fetching categories:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        status: status
      })
      
      console.log('Using fallback categories...')
      categoriesCache = fallbackCategories
      cacheTimestamp = now
      return fallbackCategories
    }

    console.log('Successfully fetched categories:', data?.length || 0)
    
    // Update cache
    categoriesCache = data || []
    cacheTimestamp = now
    
    return categoriesCache
  } catch (error) {
    console.error('Unexpected error fetching categories:', error)
    console.log('Using fallback categories...')
    categoriesCache = fallbackCategories
    cacheTimestamp = now
    return fallbackCategories
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching category by slug:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching category by slug:', error)
    return null
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching category by ID:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching category by ID:', error)
    return null
  }
}

// Test categories connection
export async function testCategoriesConnection(): Promise<boolean> {
  try {
    console.log('Testing categories connection...')
    
    const { data, error } = await supabase
      .from('categories')
      .select('id')
      .limit(1)
    
    console.log('Categories health check response:', { 
      hasData: !!data, 
      hasError: !!error,
      error: error,
      dataLength: data?.length 
    })
    
    if (error) {
      console.error('Categories connection test failed:', error)
      return false
    }
    
    console.log('Categories connection successful!')
    return true
  } catch (error) {
    console.error('Categories connection test error:', error)
    return false
  }
}
