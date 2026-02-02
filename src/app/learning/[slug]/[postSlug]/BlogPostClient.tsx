'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { BlogPost } from '@/lib/blog'
import { Category } from '@/lib/categories'
import { useLanguage } from '@/contexts/LanguageContext'
import { getLocaleFromPath } from '@/lib/dynamicQueries'
import { supabase } from '@/lib/supabase'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface BlogPostClientProps {
  post: BlogPost
  category: Category | null
}

export default function BlogPostClient({ post, category }: BlogPostClientProps) {
  const { currentLanguage } = useLanguage()
  const pathname = usePathname()
  const [currentPost, setCurrentPost] = useState(post)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isTranslationAvailable, setIsTranslationAvailable] = useState(true)

  // Get locale from URL path or fallback to current language
  const urlLocale = getLocaleFromPath(pathname)
  const effectiveLocale = currentLanguage || urlLocale || 'en'

  // Handle direct routing for GitHub Pages (no hash routing needed)
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      console.log('=== DIRECT ROUTING MODE ===')
      console.log('Current post slug:', post.slug)
      console.log('Current pathname:', pathname)
      
      // No special routing needed with absolute paths
      // Next.js basePath handles the routing automatically
    }
    setMounted(true)
  }, [post.slug, pathname])

  // Fetch post data from slug (for hash routing)
  const fetchPostFromSlug = async (postSlug: string, categorySlug: string) => {
    setLoading(true)
    try {
      console.log('Fetching post from slug:', postSlug, 'category:', categorySlug)
      
      const { data: postData, error } = await supabase
        .from('blogs')
        .select(`
          *,
          categories(id, name, slug)
        `)
        .eq('slug', postSlug)
        .eq('status', 'published')
        .single()

      if (postData && !error) {
        console.log('Successfully fetched post from hash:', postData.title)
        setCurrentPost(postData)
      } else {
        console.error('Error fetching post from hash:', error)
      }
    } catch (err) {
      console.error('Error in fetchPostFromSlug:', err)
    } finally {
      setLoading(false)
    }
  }

  // Client-side fetch to get the latest post data with cache-busting
  useEffect(() => {
    const fetchLatestPost = async () => {
      if (!post?.slug || !mounted) return
      
      setLoading(true)
      try {
        // Add cache-busting parameters to prevent GitHub Pages caching
        const cacheBuster = `&_t=${Date.now()}&_r=${Math.random()}`
        
        console.log('=== CLIENT-SIDE POST FETCH ===')
        console.log('Fetching latest post data for:', post.slug)
        console.log('Effective locale:', effectiveLocale)
        
        const { data: latestPost, error } = await supabase
          .from('blogs')
          .select(`
            *,
            categories(id, name, slug)
          `)
          .eq('slug', post.slug)
          .eq('status', 'published')
          .single()

        if (latestPost && !error) {
          console.log('=== POST FETCH SUCCESS ===')
          console.log('Fetched latest post:', latestPost.title)
          console.log('Post language:', latestPost.language)
          console.log('Post updated_at:', latestPost.updated_at)
          
          setCurrentPost(latestPost)
        } else {
          console.log('=== POST FETCH ERROR ===')
          console.log('Error:', error)
          // Keep the original post if fetch fails
        }
      } catch (err) {
        console.error('Error fetching latest post:', err)
      } finally {
        setLoading(false)
      }
    }

    // Set mounted state and fetch latest data
    setMounted(true)
    fetchLatestPost()
  }, [post?.slug, effectiveLocale, mounted])

  console.log('=== DYNAMIC BLOG POST CLIENT DEBUG ===')
  console.log('Pathname:', pathname)
  console.log('URL locale:', urlLocale)
  console.log('Current language from context:', currentLanguage)
  console.log('Effective locale:', effectiveLocale)
  console.log('Initial post language:', post.language)
  console.log('=== END DYNAMIC BLOG POST CLIENT DEBUG ===')

  // Handle hydration
  useEffect(() => {
    setMounted(true)
    console.log('=== BLOG POST CLIENT INIT ===')
    console.log('Initial currentLanguage:', currentLanguage)
    console.log('Initial post language:', post.language)
    console.log('Initial post title:', post.title)
    console.log('JavaScript is working! Component loaded.')
    console.log('Window object is available - client-side rendering is working')
  }, [currentLanguage, post.language, post.title])

  // Fetch post in the effective locale when language changes
  useEffect(() => {
    const fetchPostInLanguage = async () => {
      console.log('=== DYNAMIC LANGUAGE SWITCH DEBUG ===')
      console.log('Effective locale:', effectiveLocale)
      console.log('Original post slug:', post.slug)
      console.log('Original post language:', post.language)
      
      // If the current post already matches the effective locale, no need to fetch
      if (post.language === effectiveLocale) {
        console.log('Post already matches effective locale, using current post')
        setCurrentPost(post)
        setIsTranslationAvailable(true)
        return
      }

      console.log('Fetching localized post for locale:', effectiveLocale)
      setLoading(true)
      try {
        const { data: localizedPost, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', post.slug)
          .eq('language', effectiveLocale) // Use effective locale instead of hardcoded checks
          .eq('status', 'published')
          .single()

        console.log('Localized post fetch result:', { localizedPost, error })

        if (localizedPost && !error) {
          console.log('Found localized post, switching to:', localizedPost.title)
          setCurrentPost(localizedPost)
          setIsTranslationAvailable(true)
        } else {
          console.log('No localized post found, falling back to original post')
          setCurrentPost(post)
          setIsTranslationAvailable(false)
        }
      } catch (error) {
        console.error('Error fetching localized post:', error)
        setCurrentPost(post)
        setIsTranslationAvailable(false)
      } finally {
        setLoading(false)
      }
    }

    fetchPostInLanguage()
  }, [effectiveLocale, post.slug, post.language, post]) // Re-fetch when effective locale changes

  // Check for Null Data
  if (!currentPost || !mounted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cyan-400 mb-4">Loading...</h1>
          <p className="text-gray-400">Please wait while we load the content.</p>
        </div>
      </div>
    )
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Loading Indicator */}
      {loading && (
        <div className="fixed top-4 right-4 z-50 glass rounded-lg px-4 py-2 border border-cyan-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-cyan-300 text-sm">Loading...</span>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="glass border-b border-cyan-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-cyan-300 hover:text-white transition-colors">
                ← Back to Home
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/learning" className="text-cyan-300 hover:text-white transition-colors">
                Back to Learning
              </Link>
              {category && (
                <>
                  <span className="text-gray-500">|</span>
                  <Link 
                    href={`/learning/${category.slug}`} 
                    className="text-cyan-300 hover:text-white transition-colors"
                  >
                    Back to {category.name}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Post Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          {/* Category Badge */}
          {category && (
            <div className="mb-4">
              <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs rounded-full font-medium drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                {category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {currentPost.title}
          </h1>

          {/* Translation Not Available Message */}
          {!isTranslationAvailable && currentLanguage !== 'en' && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-yellow-300 text-sm">
                  Translation not available in {currentLanguage === 'my' ? 'Myanmar' : currentLanguage}. Showing English version.
                </p>
              </div>
            </div>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <span className="text-cyan-300 text-xs font-bold">G1</span>
              </div>
              <span>{currentPost.author}</span>
            </div>
            <span>•</span>
            <span>{new Date(currentPost.created_at).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}</span>
            {currentPost.language && (
              <>
                <span>•</span>
                <span className="px-2 py-1 bg-gray-700/50 rounded text-xs">
                  {currentPost.language === 'en' ? 'English' : 
                   currentPost.language === 'mm' ? 'မြန်မာ' : currentPost.language}
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* Featured Image */}
        {currentPost.image_url && (
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
              <Image
                src={currentPost.image_url}
                alt={currentPost.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </motion.div>
        )}

        {/* Description */}
        {currentPost.description && (
          <motion.div variants={itemVariants} className="mb-8">
            <div className="glass rounded-xl p-6 border border-cyan-500/20">
              <p className="text-xl text-gray-300 leading-relaxed">
                {currentPost.description}
              </p>
            </div>
          </motion.div>
        )}

        {/* Video */}
        {currentPost.video_url && (
          <motion.div variants={itemVariants} className="mb-8">
            <div className="glass rounded-xl overflow-hidden border border-cyan-500/20">
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  src={currentPost.video_url}
                  title={currentPost.title}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Content */}
        {currentPost.content && (
          <motion.div variants={itemVariants} className="mb-8">
            <div className="glass rounded-xl p-8 border border-cyan-500/20">
              <div className="prose prose-invert prose-lg max-w-none">
                {/* Wrap MarkdownRenderer in Try-Catch block */}
                {(() => {
                  try {
                    return <MarkdownRenderer content={currentPost.content} />
                  } catch (error) {
                    console.error('MarkdownRenderer error:', error)
                    return (
                      <div className="text-red-400 p-4 border border-red-500/20 rounded-lg">
                        <p>Error rendering content. Please try again later.</p>
                      </div>
                    )
                  }
                })()}
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              Published on {new Date(currentPost.created_at).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
              {currentPost.updated_at && currentPost.updated_at !== currentPost.created_at && (
                <span> • Updated {new Date(currentPost.updated_at).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              )}
            </div>
            
            <div className="flex gap-4">
              {category && (
                <Link
                  href={`/learning/${category.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-cyan-300 hover:text-white transition-colors border border-cyan-500/30 hover:border-cyan-400/60"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">Back to {category.name}</span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
