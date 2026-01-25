import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { BlogPost } from '@/lib/blog'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Generate static params for static export
export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts()
    return posts.slice(0, 10).map((post: any) => ({
      id: post.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const blogPost = await getBlogPost(params.id)
  
  if (!blogPost) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 underline">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
            ← Back to Blog
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-4">
            {blogPost.title}
          </h1>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center text-gray-300 mb-8"
          >
            <div className="flex items-center space-x-4">
              {blogPost.category && (
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-sm rounded-full font-medium">
                  {blogPost.category}
                </span>
              )}
              <span className="text-sm">
                {new Date(blogPost.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </motion.div>

          {/* Full Content with prose styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="prose prose-invert max-w-none"
          >
            <MarkdownRenderer content={blogPost.content} />
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Link href="/blog" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
