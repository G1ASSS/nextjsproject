'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface GitHubPagesRouterProps {
  children: React.ReactNode
}

export default function GitHubPagesRouter({ children }: GitHubPagesRouterProps) {
  const router = useRouter()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Only run in production and on client-side
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Handle initial hash-based routing (simplified format)
      const handleHashRouting = () => {
        const hash = window.location.hash
        if (hash && hash.startsWith('#/')) {
          // Remove the #/ prefix and navigate to the route
          const route = hash.substring(2) // Remove '#/'
          router.push(route)
        }
      }

      // Handle hash changes
      const handleHashChange = () => {
        handleHashRouting()
      }

      // Initial check
      handleHashRouting()

      // Listen for hash changes
      window.addEventListener('hashchange', handleHashChange)

      // Intercept link clicks for hash routing
      const handleClick = (e: Event) => {
        const target = e.target as HTMLElement
        const link = target.closest('a[href^="#"]')
        
        if (link) {
          e.preventDefault()
          const href = link.getAttribute('href')
          if (href && href.startsWith('#/')) {
            const route = href.substring(2) // Remove '#/'
            router.push(route)
          }
        }
      }

      document.addEventListener('click', handleClick)

      setIsInitialized(true)

      // Cleanup
      return () => {
        window.removeEventListener('hashchange', handleHashChange)
        document.removeEventListener('click', handleClick)
      }
    } else {
      setIsInitialized(true)
    }
  }, [router])

  // Don't render children until router is initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Initializing router...</p>
      </div>
    )
  }

  return <>{children}</>
}
