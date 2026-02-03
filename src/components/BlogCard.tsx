import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import MarkdownRenderer from './MarkdownRenderer'
import { CategoryBadge } from './CategoryFilter'
import { Category } from '@/lib/categories'

interface BlogCardProps {
  title: string
  description: string
  category?: string
  category_data?: Category | null
  imageUrl?: string
  date?: string
  linkUrl?: string
  linkText?: string
}

export default function BlogCard({
  title,
  description,
  category,
  category_data,
  imageUrl,
  date,
  linkUrl,
  linkText = 'View Details'
}: BlogCardProps) {
  // State for client-side date formatting
  const [formattedDate, setFormattedDate] = useState<string>('')

  // Format date only on client-side to prevent hydration mismatch
  useEffect(() => {
    if (date) {
      try {
        // Use consistent date formatting to prevent hydration issues
        const dateObj = new Date(date)
        const formatted = dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
        setFormattedDate(formatted)
      } catch (error) {
        console.error('Error formatting date:', error)
        setFormattedDate(date || '') // Fallback to original date
      }
    }
  }, [date])

  return (
    <motion.div
      variants={{}}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)"
      }}
      transition={{ duration: 0.3 }}
      className="glass rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
    >
      {/* Thumbnail Area - EXACT copy from projects section */}
      <div className="relative h-48 group cursor-pointer">
        <Image 
          src={imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center'}
          alt={title}
          fill
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      {/* Content Area - EXACT copy from projects section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <div className="text-gray-300 text-sm mb-4">
          <MarkdownRenderer content={description} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400" suppressHydrationWarning={true}>
            {formattedDate || date}
          </span>
          {category_data ? (
            <CategoryBadge category={category_data} />
          ) : category ? (
            <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs rounded-full font-medium">
              {category}
            </span>
          ) : null}
        </div>
        
        {/* View Details Button - Smart routing with language preservation */}
        {linkUrl ? (
          <Link 
            href={linkUrl} 
            className="block"
            onClick={(e) => {
              // Prevent language reset during navigation
              console.log('🔗 BlogCard Link clicked, preserving language state')
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-lg font-medium hover:bg-cyan-500/30 hover:border-cyan-400 transition-colors mt-4"
            >
              {linkText}
            </motion.button>
          </Link>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-lg font-medium hover:bg-cyan-500/30 hover:border-cyan-400 transition-colors mt-4"
          >
            {linkText}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
