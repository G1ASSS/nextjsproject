'use client'

import { motion } from 'framer-motion'
import { Category } from '@/lib/categories'

interface CategoryButtonsProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  className?: string
}

export default function CategoryButtons({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  className = '' 
}: CategoryButtonsProps) {
  const handleCategoryClick = (categorySlug: string | null) => {
    onCategoryChange(categorySlug)
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop: Centered Horizontal Scroll */}
      <div className="hidden md:flex justify-center">
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap max-w-4xl" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {/* All Posts Button */}
          <motion.button
            onClick={() => handleCategoryClick(null)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0 ${
              !selectedCategory
                ? 'bg-cyan-500 text-white border border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.6)]'
                : 'bg-[#1a1a1a] text-gray-300 border border-white/10 hover:border-cyan-400/50'
            }`}
            whileHover={{ 
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            All Posts
          </motion.button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                selectedCategory === category.slug
                  ? 'bg-cyan-500 text-white border border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.6)]'
                  : 'bg-[#1a1a1a] text-gray-300 border border-white/10 hover:border-cyan-400/50'
              }`}
              whileHover={{ 
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile: Full-width Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap px-4 -mx-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {/* All Posts Button */}
          <motion.button
            onClick={() => handleCategoryClick(null)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0 ${
              !selectedCategory
                ? 'bg-cyan-500 text-white border border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.6)]'
                : 'bg-[#1a1a1a] text-gray-300 border border-white/10 hover:border-cyan-400/50'
            }`}
            whileHover={{ 
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            All Posts
          </motion.button>

          {/* Category Buttons */}
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                selectedCategory === category.slug
                  ? 'bg-cyan-500 text-white border border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.6)]'
                  : 'bg-[#1a1a1a] text-gray-300 border border-white/10 hover:border-cyan-400/50'
              }`}
              whileHover={{ 
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
