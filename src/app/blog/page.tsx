'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BlogCard from '@/components/BlogCard'
import { getBlogPosts } from '@/lib/blog'
import { BlogPost } from '@/lib/blog'

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getBlogPosts()
        setBlogPosts(posts)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        setError('Failed to load blog posts')
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Loading State */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Learning & Sharing
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((skeleton) => (
              <motion.div
                key={skeleton}
                className="glass rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="relative h-48">
                  <div className="w-full h-full bg-gray-700 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-700 rounded mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-4">Error Loading Blog Posts</h1>
        <p className="text-gray-300 mb-8">{error}</p>
        <Link href="/" className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Learning & Sharing
        </h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Explore our collection of cybersecurity tutorials, development guides, and technical insights. 
          Learn from our experiences and stay updated with the latest in technology and security.
        </p>
      </motion.div>

      {/* Blog Posts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        {blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-white mb-4">No Blog Posts Yet</h3>
            <p className="text-gray-300 mb-8">Check back soon for new content!</p>
            <Link href="/" className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BlogCard
                  title={blog.title}
                  description={blog.description}
                  category={blog.category}
                  imageUrl={blog.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center'}
                  date={new Date(blog.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                  linkUrl={`/blog/${blog.id}`}
                  linkText="View Details"
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
