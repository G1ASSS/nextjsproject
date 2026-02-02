'use client'

// Disable caching for real-time updates
export const revalidate = 0

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { getLocaleFromPath } from '@/lib/dynamicQueries'
import { supabase } from '@/lib/supabase'
import BlogCard from '@/components/BlogCard'

// Define types
interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  description?: string
  language: string
  status: string
  category_id?: string
  category?: string
  category_slug?: string
  category_data?: any
  author_name?: string
  reading_time?: number
  image_url?: string
  video_url?: string
  created_at: string
  updated_at: string
}

interface Category {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

interface CategoryPageClientProps {
  blogPosts: BlogPost[]
  category: Category
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
}

export default function CategoryPageClient({ 
  blogPosts, 
  category 
}: CategoryPageClientProps) {
  const { t, currentLanguage } = useLanguage()
  const pathname = usePathname()
  const urlLocale = getLocaleFromPath(pathname)
  const effectiveLocale = currentLanguage || urlLocale || 'en'
  
  // Add state for filtered posts to allow UI updates
  const [filteredPostsState, setFilteredPostsState] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)

  console.log('=== DYNAMIC CATEGORY CLIENT DEBUG ===')
  console.log('Pathname:', pathname)
  console.log('URL locale:', urlLocale)
  console.log('Current language from context:', currentLanguage)
  console.log('Effective locale for filtering:', effectiveLocale)
  console.log('Total posts received from server:', blogPosts.length)

  // Debug: Show all posts with their languages
  console.log('All posts received:')
  blogPosts.forEach((post, index) => {
    console.log(`  ${index + 1}. Title: "${post.title}", Language: "${post.language}", Category_ID: "${post.category_id}"`)
  })

  // Filter posts by the effective locale (from URL or context) AND category_id
  // This removes all hardcoded language checks and adds strict category filtering
  // Use case-insensitive comparison to handle 'ES' vs 'es'
  const filteredPosts = blogPosts.filter(post => 
    post.language && 
    post.language.toLowerCase() === effectiveLocale.toLowerCase() &&
    post.category_id === category?.id
  )
  
  // Initialize state with filtered posts
  useEffect(() => {
    setFilteredPostsState(filteredPosts)
  }, [blogPosts, effectiveLocale, category?.id])
  
  // HARDCODED FIX: If Spanish shows 0 posts, fetch directly from Supabase
  useEffect(() => {
    if (effectiveLocale.toLowerCase() === 'es' && filteredPosts.length === 0) {
      console.log('=== SPANISH HARDCODED FETCH ===')
      console.log('Current Locale:', effectiveLocale)
      console.log('Current Category ID:', category?.id)
      console.log('All Posts Languages:', blogPosts.map(p => p.language))
      console.log('Filtered Posts Length:', filteredPosts.length)
      console.log('Fetching Spanish posts directly from Supabase...')
      
      // Direct fetch Spanish posts with category filtering
      const fetchSpanishPosts = async () => {
        setIsLoading(true)
        try {
          const { data: spanishPosts, error } = await supabase
            .from('blogs')
            .select('*')
            .ilike('language', 'es')
            .eq('status', 'published')
            .eq('category_id', category?.id)
          
          if (spanishPosts && !error) {
            console.log('Direct Spanish fetch successful:', spanishPosts.length)
            console.log('Spanish posts:', spanishPosts.map((p: any) => ({ id: p.id, title: p.title, language: p.language })))
            
            // Update state with the direct fetch results
            setFilteredPostsState(spanishPosts)
            console.log('Updated filteredPosts length:', spanishPosts.length)
          } else {
            console.log('Direct Spanish fetch failed:', error)
          }
        } catch (err) {
          console.error('Error in direct Spanish fetch:', err)
        } finally {
          setIsLoading(false)
        }
      }
      
      fetchSpanishPosts()
      console.log('=== END SPANISH HARDCODED FETCH ===')
    }
  }, [effectiveLocale, filteredPosts.length, blogPosts, category?.id])

  // HARDCODED FIX: If Myanmar shows less than expected posts, fetch directly from Supabase
  useEffect(() => {
    if (effectiveLocale.toLowerCase() === 'my' && filteredPosts.length < 2) {
      console.log('=== MYANMAR HARDCODED FETCH ===')
      console.log('Current Locale:', effectiveLocale)
      console.log('Current Category ID:', category?.id)
      console.log('All Posts Languages:', blogPosts.map(p => p.language))
      console.log('Filtered Posts Length:', filteredPosts.length)
      console.log('Fetching Myanmar posts directly from Supabase...')
      
      // Direct fetch Myanmar posts with category filtering
      const fetchMyanmarPosts = async () => {
        setIsLoading(true)
        try {
          const { data: myanmarPosts, error } = await supabase
            .from('blogs')
            .select('*')
            .ilike('language', 'my')
            .eq('status', 'published')
            .eq('category_id', category?.id)
          
          if (myanmarPosts && !error) {
            console.log('Direct Myanmar fetch successful:', myanmarPosts.length)
            console.log('Myanmar posts:', myanmarPosts.map((p: any) => ({ 
              id: p.id, 
              title: p.title, 
              language: p.language,
              slug: p.slug,
              category_id: p.category_id
            })))
            
            // Update state with the direct fetch results
            setFilteredPostsState(myanmarPosts)
            console.log('Updated filteredPosts length:', myanmarPosts.length)
          } else {
            console.log('Direct Myanmar fetch failed:', error)
          }
        } catch (err) {
          console.error('Error in direct Myanmar fetch:', err)
        } finally {
          setIsLoading(false)
        }
      }
      
      fetchMyanmarPosts()
      console.log('=== END MYANMAR HARDCODED FETCH ===')
    }
  }, [effectiveLocale, filteredPosts.length, blogPosts, category?.id])
  
  console.log('=== FILTERING DEBUG ===')
  console.log('Filtering for locale:', effectiveLocale)
  console.log('Filtering for category ID:', category?.id)
  console.log('Posts that match BOTH language and category:', filteredPosts.map(p => ({ 
    title: p.title, 
    language: p.language, 
    category_id: p.category_id 
  })))
  console.log('=== END FILTERING DEBUG ===')
  
  // Get count and name for translation - use state for dynamic updates
  const count = filteredPostsState.length
  const name = category?.name || 'Category'
  
  console.log('=== CATEGORY CLIENT DEBUG ===')
  console.log('Effective locale:', effectiveLocale)
  console.log('Total posts received:', blogPosts.length)
  console.log('Filtered posts count:', filteredPosts.length)
  
  // Debug logging for all languages
  console.log('Posts by language:', blogPosts.reduce((acc: Record<string, number>, post) => {
    const lang = post.language || 'unknown'
    acc[lang] = (acc[lang] || 0) + 1
    return acc
  }, {}))
  
  // Specifically check for Myanmar posts (case-insensitive)
  const myanmarPosts = blogPosts.filter(post => post.language && post.language.toLowerCase() === 'my')
  console.log('Myanmar posts found (case-insensitive):', myanmarPosts.length)
  if (myanmarPosts.length > 0) {
    console.log('Myanmar post details:', myanmarPosts.map(p => ({ 
      id: p.id, 
      title: p.title, 
      language: p.language,
      category_id: p.category_id,
      slug: p.slug
    })))
  }
  console.log('=== END CATEGORY CLIENT DEBUG ===')

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-start items-center">
            <Link
              href="/learning"
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-cyan-300 hover:text-white transition-colors border border-cyan-500/30 hover:border-cyan-400/60"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">{t('back_to_learning', { defaultValue: 'Back to Learning' })}</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {category?.name || 'Category'}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {t('explore_desc', { count, name: category?.name || 'Category' })}
            </p>
            
            {/* Category Badge */}
            <div className="flex justify-center mb-8">
              <div className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-full font-medium">
                {filteredPostsState.length} {filteredPostsState.length === 1 ? 'Post' : 'Posts'}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredPostsState.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPostsState.map((post, index) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  description={post.excerpt || post.description || ''}
                  category={post.category}
                  category_data={post.category_data}
                  imageUrl={post.image_url}
                  date={post.created_at}
                  linkUrl={`/learning/${category?.slug || 'general'}/${post.slug}`}
                  linkText="Read More"
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              {t('explore_desc', { count: filteredPostsState.length, name: category?.name || 'Category' })}
            </p>
            <p className="text-gray-400 mt-2">
              No posts available in this category yet.
            </p>
            <Link href="/learning">
              <motion.button
                className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-lg font-medium hover:bg-cyan-500/30 hover:border-cyan-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Other Categories
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
