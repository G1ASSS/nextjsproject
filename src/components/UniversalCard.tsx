import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface UniversalCardProps {
  title: string
  description: string
  category?: string
  imageUrl?: string
  icon?: React.ComponentType<{ className?: string }>
  tags?: string[]
  date?: string
  linkUrl?: string
  linkText?: string
  type: 'tool' | 'blog' | 'project'
  className?: string
}

export default function UniversalCard({
  title,
  description,
  category,
  imageUrl,
  icon: Icon,
  tags,
  date,
  linkUrl,
  linkText = 'View Details',
  type,
  className = ''
}: UniversalCardProps) {
  const CardContent = () => (
    <div className="flex items-start gap-4">
      {/* Icon/Image Section - Fixed size like tools */}
      <div className="flex-shrink-0">
        {type === 'tool' && Icon ? (
          <div className="p-3 bg-cyan-500/20 rounded-lg border border-cyan-400/30">
            <Icon className="w-6 h-6 text-cyan-300" />
          </div>
        ) : type === 'blog' && imageUrl ? (
          <div className="relative w-16 h-16 bg-cyan-500/20 rounded-lg border border-cyan-400/30 overflow-hidden">
            <Image 
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="64px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
            />
          </div>
        ) : null}
      </div>

      {/* Content Section - Takes remaining space */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-300 text-sm mb-3">
          {description}
        </p>
        
        {/* Tags for blog posts - Compact layout */}
        {type === 'blog' && tags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="inline-block px-2 py-1 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Category/Date - Single row layout */}
        <div className="flex items-center justify-between mb-3">
          {category && (
            <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs rounded-full font-medium">
              {category}
            </span>
          )}
          {date && (
            <span className="text-xs text-gray-400">
              {date}
            </span>
          )}
        </div>
        
        {/* Link Button - Full width */}
        {linkUrl && (
          <Link href={linkUrl}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-lg font-medium hover:bg-cyan-500/30 hover:border-cyan-400/60 transition-colors text-sm"
            >
              {linkText}
            </motion.button>
          </Link>
        )}
      </div>
    </div>
  )

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
      }}
      className={`glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 ${className}`}
    >
      <CardContent />
    </motion.div>
  )
}
