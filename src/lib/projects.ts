import { supabase } from './supabase'

export interface Project {
  id: string
  title: string
  description: string
  content: string
  image_url: string
  category: string
  link: string
  video_url?: string
  created_at: string
}

// Cache for projects data
let projectsCache: Project[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

export async function getProjects(): Promise<Project[]> {
  // Check cache first
  if (projectsCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    console.log('Returning cached projects data')
    return projectsCache
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      throw error
    }

    console.log('Fetched projects from Supabase:', data?.length || 0)
    
    // Update cache
    projectsCache = data || []
    cacheTimestamp = Date.now()
    
    return data || []
  } catch (error) {
    console.error('Error in getProjects:', error)
    throw error
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching project by ID:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in getProjectById:', error)
    throw error
  }
}

// Test Supabase connection for projects
export async function testProjectsConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Projects connection test failed:', error)
      return false
    }

    console.log('Projects connection test successful')
    return true
  } catch (error) {
    console.error('Projects connection test error:', error)
    return false
  }
}
