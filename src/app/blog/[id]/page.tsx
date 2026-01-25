import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPost, BlogPost } from '@/lib/blog'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface BlogPostPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const post = await getBlogPost(id)
    
    if (!post) {
      return {
        title: 'Blog Post Not Found',
      }
    }

    return {
      title: post.title,
      description: post.description || post.excerpt || 'Read this blog post',
      openGraph: {
        title: post.title,
        description: post.description || post.excerpt || 'Read this blog post',
        images: post.image_url ? [post.image_url] : [],
      },
    }
  } catch (error) {
    console.error('Error generating blog metadata:', error)
    return {
      title: 'Blog Post',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  let post: BlogPost | null = null
  
  try {
    console.log('Fetching blog post with ID:', id)
    post = await getBlogPost(id)
    console.log('Blog post fetched:', post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-gray-300 mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
            >
              Browse All Posts
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Blog */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Blog Post Header */}
        <article className="glass rounded-2xl overflow-hidden">
          {post.image_url && (
            <div className="relative h-64 md:h-96">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center text-gray-400 text-sm">
                {post.author && (
                  <>
                    <span>By {post.author}</span>
                    <span className="mx-2">•</span>
                  </>
                )}
                <time dateTime={post.created_at}>
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>

            {/* Blog Post Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {post.content ? (
                <MarkdownRenderer content={post.content} />
              ) : (
                <div className="text-gray-300">
                  <p>{post.description || post.excerpt || 'Content not available.'}</p>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6 text-center text-gray-400">
              <p>More posts coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
