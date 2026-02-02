'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to learning page after a short delay
    const timer = setTimeout(() => {
      router.push('/learning')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-cyan-400 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-300 mb-8">
            The blog post you're looking for doesn't exist in this language.
          </p>
          <p className="text-gray-400 mb-8">
            Redirecting you to the Learning page...
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          onClick={() => router.push('/learning')}
          className="mt-8 px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
        >
          Go to Learning Page
        </motion.button>
      </motion.div>
    </div>
  )
}
