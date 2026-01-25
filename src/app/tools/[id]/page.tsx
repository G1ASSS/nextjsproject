import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getToolById, Tool } from '@/lib/tools'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface ToolPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const tool = await getToolById(id)
    
    if (!tool) {
      return {
        title: 'Tool Not Found',
      }
    }

    return {
      title: tool.title,
      description: tool.description || 'View this tool',
      openGraph: {
        title: tool.title,
        description: tool.description || 'View this tool',
        images: tool.image_url ? [tool.image_url] : [],
      },
    }
  } catch (error) {
    console.error('Error generating tool metadata:', error)
    return {
      title: 'Tool',
    }
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { id } = await params
  let tool: Tool | null = null
  
  try {
    console.log('Fetching tool with ID:', id)
    tool = await getToolById(id)
    console.log('Tool fetched:', tool)
  } catch (error) {
    console.error('Error fetching tool:', error)
  }

  if (!tool) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            href="/tools" 
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tools
          </Link>

          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tool Not Found
            </h1>
            <p className="text-gray-300 mb-6">
              The tool you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              href="/tools" 
              className="inline-flex items-center px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
            >
              Browse All Tools
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
        {/* Back to Tools */}
        <Link 
          href="/tools" 
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Tools
        </Link>

        {/* Tool Header */}
        <article className="glass rounded-2xl overflow-hidden">
          {tool.image_url && (
            <div className="relative h-64 md:h-96">
              <Image
                src={tool.image_url}
                alt={tool.title}
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
                {tool.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {tool.title}
              </h1>
              
              <div className="flex items-center text-gray-400 text-sm">
                <time dateTime={tool.created_at}>
                  {new Date(tool.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>

            {/* Tool Description */}
            <div className="prose prose-invert prose-lg max-w-none mb-8">
              <p className="text-gray-300 text-lg leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Tool Details */}
            {tool.content && (
              <div className="prose prose-invert prose-lg max-w-none">
                <MarkdownRenderer content={tool.content} />
              </div>
            )}
          </div>
        </article>

        {/* Related Tools */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6 text-center text-gray-400">
              <p>More tools coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
