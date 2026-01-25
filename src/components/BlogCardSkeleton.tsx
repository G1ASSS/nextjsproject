import { motion } from 'framer-motion'

export default function BlogCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass p-6 rounded-xl border border-cyan-500/20"
    >
      <div className="flex items-start gap-4">
        {/* Skeleton Image - matching icon dimensions */}
        <div className="w-16 h-16 bg-cyan-500/20 rounded-lg border border-cyan-400/30 animate-pulse flex-shrink-0"></div>
        
        {/* Skeleton Content */}
        <div className="flex-1">
          {/* Skeleton Title */}
          <div className="h-6 bg-gray-700/30 rounded-lg mb-2 animate-pulse"></div>
          
          {/* Skeleton Description */}
          <div className="space-y-1 mb-3">
            <div className="h-4 bg-gray-700/20 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-700/20 rounded w-3/4 animate-pulse"></div>
          </div>
          
          {/* Skeleton Tags and Date */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              <div className="h-5 w-12 bg-gray-700/20 rounded-full animate-pulse"></div>
              <div className="h-5 w-16 bg-gray-700/20 rounded-full animate-pulse"></div>
            </div>
            <div className="h-3 w-12 bg-gray-700/20 rounded animate-pulse"></div>
          </div>
          
          {/* Skeleton Category */}
          <div className="h-5 w-20 bg-gray-700/20 rounded-full animate-pulse mb-4"></div>
          
          {/* Skeleton Button */}
          <div className="h-8 bg-gray-700/20 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  )
}
