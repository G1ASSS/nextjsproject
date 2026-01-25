import { supabase } from './supabase'

export interface Tool {
  id: string
  title: string
  description: string
  content: string
  image_url: string
  category: string
  link: string
  created_at: string
}

// Cache for tools data
let toolsCache: Tool[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

export async function getTools(): Promise<Tool[]> {
  // Check cache first
  if (toolsCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    console.log('Returning cached tools data')
    return toolsCache
  }

  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tools:', error)
      throw error
    }

    console.log('Fetched tools from Supabase:', data?.length || 0)
    
    // Update cache
    toolsCache = data || []
    cacheTimestamp = Date.now()
    
    return data || []
  } catch (error) {
    console.error('Error in getTools:', error)
    throw error
  }
}

export async function getToolById(id: string): Promise<Tool | null> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching tool by ID:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in getToolById:', error)
    throw error
  }
}

// Test Supabase connection for tools
export async function testToolsConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('tools')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Tools connection test failed:', error)
      return false
    }

    console.log('Tools connection test successful')
    return true
  } catch (error) {
    console.error('Tools connection test error:', error)
    return false
  }
}
