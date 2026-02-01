'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import { BlogPost } from '@/lib/blog'
import { Category } from '@/lib/categories'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface BlogPostClientProps {
  post: BlogPost
  category: Category | null
}

export default function BlogPostClient({ post, category }: BlogPostClientProps) {
  const { currentLanguage } = useLanguage()
  const [currentPost, setCurrentPost] = useState(post)
  const [loading, setLoading] = useState(false)

  // Debug: Log initial language
  console.log('=== BLOG POST CLIENT INIT ===')
  console.log('Initial currentLanguage:', currentLanguage)
  console.log('Initial post language:', post.language)
  console.log('Initial post title:', post.title)

  // Test if JavaScript is working at all
  console.log('JavaScript is working! Component loaded.')

  // Add window.onload test
  if (typeof window !== 'undefined') {
    console.log('Window object is available - client-side rendering is working')
  }

  // Fetch post in the current language when language changes
  useEffect(() => {
    const fetchPostInLanguage = async () => {
      console.log('=== LANGUAGE SWITCH DEBUG ===')
      console.log('Current language:', currentLanguage)
      console.log('Original post slug:', post.slug)
      
      if (currentLanguage === 'en') {
        console.log('Using English version')
        setCurrentPost(post)
        return
      }

      console.log('Fetching localized post for language:', currentLanguage)
      setLoading(true)
      try {
        const { data: localizedPost, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', post.slug)
          .eq('language', currentLanguage) // Back to using currentLanguage directly
          .eq('status', 'published')
          .single()

        console.log('Localized post fetch result:', { localizedPost, error })

        if (localizedPost && !error) {
          console.log('Found localized post, switching to:', localizedPost.title)
          setCurrentPost(localizedPost)
        } else {
          console.log('No localized post found, falling back to English')
          // Fallback to English if localized version not found
          setCurrentPost(post)
        }
      } catch (error) {
        console.error('Error fetching localized post:', error)
        setCurrentPost(post)
      } finally {
        setLoading(false)
      }
    }

    fetchPostInLanguage()
  }, [currentLanguage, post.slug, post])

  // Check for Null Data
  if (!currentPost) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cyan-400 mb-4">Post Not Found</h1>
          <p className="text-gray-400">The blog post you're looking for doesn't exist.</p>
          <Link href="/learning" className="text-cyan-300 hover:text-white mt-4 inline-block">
            ← Back to Learning
          </Link>
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

      {/* Debug Language Indicator */}
      <div className="fixed top-4 left-4 z-50 glass rounded-lg px-4 py-2 border border-cyan-500/20">
        <div className="text-cyan-300 text-sm">
          Lang: {currentLanguage} | Post Lang: {currentPost.language}
        </div>
        <button 
          onClick={() => {
            console.log('=== BUTTON CLICKED ===')
            alert('Button clicked! Current language: ' + currentLanguage)
            console.log('Current language:', currentLanguage)
            console.log('Post title:', currentPost.title)
          }}
          className="mt-2 px-2 py-1 bg-red-500/20 border border-red-400/40 rounded text-xs text-red-300 hover:bg-red-500/30"
        >
          Simple Test
        </button>
        <button 
          onClick={async () => {
            console.log('=== MANUAL TEST DEBUG ===')
            console.log('Current post slug:', currentPost.slug)
            console.log('Testing fetch for Myanmar version...')
            
            try {
              // First, let's see all posts with this slug
              const { data: allPosts, error: allError } = await supabase
                .from('blogs')
                .select('*')
                .eq('slug', currentPost.slug)
              
              console.log('All posts with this slug:', { allPosts, allError })
              
              // Now try the specific Myanmar query
              const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('slug', currentPost.slug)
                .eq('language', 'my') // Use 'my' again
                .eq('status', 'published')
                .single()

              console.log('Myanmar specific query result:', { data, error })
              
              if (data && !error) {
                console.log('SUCCESS: Found Myanmar post:', data.title)
                setCurrentPost(data)
              } else {
                console.log('FAILED: No Myanmar post found')
                console.log('Looking for posts with language "my"...')
                
                // Check if there are any Myanmar posts at all
                const { data: myPosts, error: myError } = await supabase
                  .from('blogs')
                  .select('slug, title, language, status')
                  .eq('language', 'my') // Use 'my' again
                  .limit(5)
                
                console.log('All Myanmar posts:', { myPosts, myError })
              }
            } catch (err) {
              console.error('Test fetch error:', err)
            }
          }}
          className="mt-2 px-2 py-1 bg-cyan-500/20 border border-cyan-400/40 rounded text-xs text-cyan-300 hover:bg-cyan-500/30"
        >
          Test MY Fetch
        </button>
        <button 
          onClick={() => {
            console.log('=== MANUAL LANGUAGE SWITCH TEST ===')
            console.log('Current currentLanguage:', currentLanguage)
            console.log('Triggering manual fetch for currentLanguage...')
            
            // Manually trigger the same logic as useEffect
            if (currentLanguage === 'en') {
              console.log('Setting to English post')
              setCurrentPost(post)
            } else {
              console.log('Fetching for language:', currentLanguage)
              supabase
                .from('blogs')
                .select('*')
                .eq('slug', post.slug)
                .eq('language', currentLanguage)
                .eq('status', 'published')
                .single()
                .then(({ data, error }) => {
                  console.log('Manual language fetch result:', { data, error })
                  if (data && !error) {
                    console.log('SUCCESS: Switching to:', data.title)
                    setCurrentPost(data)
                  } else {
                    console.log('FAILED: Falling back to English')
                    setCurrentPost(post)
                  }
                })
            }
          }}
          className="mt-2 px-2 py-1 bg-purple-500/20 border border-purple-400/40 rounded text-xs text-purple-300 hover:bg-purple-500/30"
        >
          Test Lang Switch
        </button>
      </div>

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
