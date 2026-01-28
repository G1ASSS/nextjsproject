'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Category } from '@/lib/categories'
import { X, Filter } from 'lucide-react'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  className?: string
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  className = '' 
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCategorySelect = (categorySlug: string | null) => {
    onCategoryChange(categorySlug)
    setIsOpen(false)
  }

  const clearFilter = () => {
    onCategoryChange(null)
    setIsOpen(false)
  }

  const selectedCategoryData = categories.find(cat => cat.slug === selectedCategory)

  return (
    <div className={`relative ${className}`}>
      {/* Filter Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
          selectedCategory
            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
            : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-cyan-500 hover:text-cyan-300'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">
          {selectedCategoryData ? selectedCategoryData.name : 'All Categories'}
        </span>
        {selectedCategory && (
          <X 
            className="w-3 h-3 ml-1 cursor-pointer hover:text-red-400" 
            onClick={(e) => {
              e.stopPropagation()
              clearFilter()
            }}
          />
        )}
      </motion.button>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50"
        >
          <div className="p-2">
            {/* All Categories Option */}
            <motion.button
              onClick={() => handleCategorySelect(null)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                !selectedCategory
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span>All Categories</span>
                {!selectedCategory && (
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                )}
              </div>
            </motion.button>

            {/* Category Options */}
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategorySelect(category.slug)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span>{category.name}</span>
                  {selectedCategory === category.slug && (
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

// Category Badge Component
export function CategoryBadge({ category, size = 'sm' }: { 
  category: Category | null
  size?: 'sm' | 'md' 
}) {
  if (!category) return null

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 ${sizeClasses[size]}`}
    >
      {category.name}
    </motion.span>
  )
}
