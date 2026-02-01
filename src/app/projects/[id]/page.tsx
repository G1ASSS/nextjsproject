import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectById, Project, getProjects } from '@/lib/projects'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

// Generate static params for all projects
export async function generateStaticParams() {
  try {
    console.log('Generating static params for projects...')
    
    const projects = await getProjects()
    
    if (!projects || projects.length === 0) {
      console.log('No projects found for static params')
      return []
    }

    const params = projects.map((project) => ({
      id: project.id
    }))

    console.log(`Generated ${params.length} static params for projects`)
    return params
  } catch (error) {
    console.error('Error in generateStaticParams for projects:', error)
    return []
  }
}

// Force static generation for this page
export const dynamic = 'force-static'

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const project = await getProjectById(id)
    
    if (!project) {
      return {
        title: 'Project Not Found',
      }
    }

    return {
      title: project.title,
      description: project.description || 'View this project',
      openGraph: {
        title: project.title,
        description: project.description || 'View this project',
        images: project.image_url ? [project.image_url] : [],
      },
    }
  } catch (error) {
    console.error('Error generating project metadata:', error)
    return {
      title: 'Project',
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  let project: Project | null = null
  
  try {
    console.log('Fetching project with ID:', id)
    project = await getProjectById(id)
    console.log('Project fetched:', project)
  } catch (error) {
    console.error('Error fetching project:', error)
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            href="/projects" 
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Project Not Found
            </h1>
            <p className="text-gray-300 mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              href="/projects" 
              className="inline-flex items-center px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
            >
              Browse All Projects
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
        {/* Back to Projects */}
        <Link 
          href="/projects" 
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Header */}
        <article className="glass rounded-2xl overflow-hidden">
          {project.image_url && (
            <div className="relative h-64 md:h-96">
              <Image
                src={project.image_url}
                alt={project.title}
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
                {project.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {project.title}
              </h1>
              
              <div className="flex items-center text-gray-400 text-sm">
                <time dateTime={project.created_at}>
                  {new Date(project.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>

            {/* Project Description */}
            <div className="prose prose-invert prose-lg max-w-none mb-8">
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project Link */}
            {project.link && (
              <div className="mb-8">
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
                >
                  View Live Project
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Project Details */}
            {project.content && (
              <div className="prose prose-invert prose-lg max-w-none">
                <MarkdownRenderer content={project.content} />
              </div>
            )}
          </div>
        </article>

        {/* Related Projects */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6 text-center text-gray-400">
              <p>More projects coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
