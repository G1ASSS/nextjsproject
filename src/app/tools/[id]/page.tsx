import { getToolById, getTools } from '@/lib/tools'
import { Tool } from '@/lib/tools'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export async function generateStaticParams() {
  try {
    const tools = await getTools()
    return tools.slice(0, 10).map((tool: any) => ({
      id: tool.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function ToolPage({ params }: { params: { id: string } }) {
  const tool = await getToolById(params.id)
  
  if (!tool) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-gray-400 mb-8">The tool you're looking for doesn't exist.</p>
          <Link href="/tools" className="text-cyan-400 hover:text-cyan-300 underline">
            Back to Tools
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
          <Link href="/tools" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
            ← Back to Tools
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-4">
            {tool.title}
          </h1>
          
          <div className="text-gray-400 mb-8">
            {tool.category && (
              <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm mr-4">
                {tool.category}
              </span>
            )}
            {tool.created_at && (
              <span>
                {new Date(tool.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
          
          {tool.image_url && (
            <div className="mb-8">
              <Image
                src={tool.image_url}
                alt={tool.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="prose prose-invert prose-lg max-w-none">
            <MarkdownRenderer content={tool.content || ''} />
          </div>
          
          {tool.link && (
            <div className="mt-8">
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 underline"
              >
                Visit Tool Website
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
