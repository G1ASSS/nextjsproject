import { getProjectById, getProjects } from '@/lib/projects'
import { Project } from '@/lib/projects'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    return projects.slice(0, 10).map((project: any) => ({
      id: project.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id)
  
  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/projects" className="text-cyan-400 hover:text-cyan-300 underline">
            Back to Projects
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
          <Link href="/projects" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
            ← Back to Projects
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-4">
            {project.title}
          </h1>
          
          <div className="text-gray-400 mb-8">
            {project.category && (
              <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm mr-4">
                {project.category}
              </span>
            )}
            {project.created_at && (
              <span>
                {new Date(project.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
          
          {project.image_url && (
            <div className="mb-8">
              <Image
                src={project.image_url}
                alt={project.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="prose prose-invert prose-lg max-w-none">
            <MarkdownRenderer content={project.content || ''} />
          </div>
          
          {project.link && (
            <div className="mt-8">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 underline"
              >
                View Project
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
