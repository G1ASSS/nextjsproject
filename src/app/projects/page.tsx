'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BlogCard from '@/components/BlogCard'
import { getProjects } from '@/lib/projects'
import { Project } from '@/lib/projects'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getProjects()
        setProjects(projectData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects')
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Loading State */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Built by G1ASS
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
        <h1 className="text-4xl font-bold text-white mb-4">Error Loading Projects</h1>
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
          Built by G1ASS
        </h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Explore my portfolio of projects spanning cybersecurity tools, web applications, 
          and innovative solutions. Each project represents a unique challenge and learning experience.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-white mb-4">No Projects Yet</h3>
            <p className="text-gray-300 mb-8">Check back soon for new projects!</p>
            <Link href="/" className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BlogCard
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  imageUrl={project.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center'}
                  date={new Date(project.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                  linkUrl={`/projects/${project.id}`}
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
