'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Category } from '@/lib/categories'

interface CategoryCardProps {
  category: Category
  postCount?: number
}

export default function CategoryCard({ category, postCount = 0 }: CategoryCardProps) {
  // Default descriptions for common categories
  const getDefaultDescription = (slug: string) => {
    const descriptions: Record<string, string> = {
      'html': 'Structure and semantic markup for the web',
      'css': 'Styling and layout for modern web design',
      'javascript': 'Dynamic programming and interactivity',
      'react': 'Component-based UI development',
      'nextjs': 'Full-stack React framework',
      'typescript': 'Type-safe JavaScript development',
      'security': 'Cybersecurity and best practices',
      'devops': 'Development operations and deployment',
      'database': 'Data storage and management',
      'api': 'Application programming interfaces'
    }
    return descriptions[slug] || 'Explore articles and tutorials'
  }

  // Default icons using emojis for simplicity
  const getDefaultIcon = (slug: string) => {
    const icons: Record<string, string> = {
      'html': '🌐',
      'css': '🎨',
      'javascript': '⚡',
      'react': '⚛️',
      'nextjs': '▲',
      'typescript': '📘',
      'security': '🔒',
      'devops': '🚀',
      'database': '🗄️',
      'api': '🔌'
    }
    return icons[slug] || '📚'
  }

  return (
    <Link href={`/learning/${category.slug}`}>
      <motion.div
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)"
        }}
        whileTap={{ scale: 0.98 }}
        className="glass rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer group relative overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Cyan glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {getDefaultIcon(category.slug)}
          </div>
          
          {/* Category Name */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
            {category.name}
          </h3>
          
          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {getDefaultDescription(category.slug)}
          </p>
          
          {/* Post count */}
          <div className="flex items-center justify-between">
            <span className="text-cyan-400 text-sm font-medium">
              {postCount} {postCount === 1 ? 'post' : 'posts'}
            </span>
            
            {/* Arrow indicator */}
            <div className="text-cyan-400 group-hover:translate-x-1 transition-transform duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Subtle border animation */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyan-400/30 transition-all duration-300 pointer-events-none"></div>
      </motion.div>
    </Link>
  )
}
