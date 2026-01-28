'use client'

import { motion } from 'framer-motion'
import { BlogPost } from '@/lib/blog'
import { Category } from '@/lib/categories'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'

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
              <span className="text-sm font-medium">Back to All Categories</span>
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
              Explore {blogPosts.length} {blogPosts.length === 1 ? 'post' : 'posts'} about {category?.name || 'this category'}.
              Discover tutorials, insights, and best practices in this area.
            </p>
            
            {/* Category Badge */}
            <div className="flex justify-center mb-8">
              <div className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-full font-medium">
                {blogPosts.length} {blogPosts.length === 1 ? 'Post' : 'Posts'}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {blogPosts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((blog) => (
              <motion.div
                key={blog.id}
                variants={cardVariants}
              >
                <BlogCard
                  title={blog.title}
                  description={blog.description}
                  category={blog.category}
                  category_data={blog.category_data}
                  imageUrl={blog.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center'}
                  date={new Date(blog.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  linkUrl={`/blog/${blog.id}`}
                  linkText="Read More"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="glass rounded-xl p-12 border border-cyan-500/20">
              <h3 className="text-2xl font-semibold text-white mb-4">
                No Posts in This Category Yet
              </h3>
              <p className="text-gray-400 mb-6">
                There are no posts in the "{category?.name || 'this'}" category yet. 
                Check back soon for new content, or explore other categories.
              </p>
              <Link 
                href="/learning"
                className="inline-block"
              >
                <motion.button
                  className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-lg font-medium hover:bg-cyan-500/30 hover:border-cyan-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Other Categories
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
