'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface RouteCatcherProps {
  children: React.ReactNode
}

export default function RouteCatcher({ children }: RouteCatcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Wait for component to mount to avoid hydration mismatches
    setMounted(true)
  }, [])

  useEffect(() => {
    // Simple and direct parameter interception with language prefix handling
    if (typeof window !== 'undefined' && mounted) {
      const url = new URL(window.location.href)
      const pathParam = url.searchParams.get('p')
      
      console.log('=== ROUTE CATCHER WITH LANGUAGE SUPPORT ===')
      console.log('Full URL:', window.location.href)
      console.log('Pathname:', pathname)
      console.log('Search params:', url.search)
      console.log('Path parameter (p):', pathParam)
      
      if (pathParam) {
        console.log('🎯 FOUND PATH PARAMETER!')
        console.log('Path parameter value:', pathParam)
        
        // Clean the path parameter - handle language prefixes
        let targetPath = pathParam
        
        // Remove language prefix if present (e.g., /en/learning/html/post)
        if (targetPath.match(/^\/[a-z]{2}\//)) {
          console.log('🌐 Detected language prefix, removing:', targetPath)
          targetPath = targetPath.replace(/^\/[a-z]{2}\//, '/')
          console.log('Path after removing language prefix:', targetPath)
        }
        
        // Ensure base path for production
        if (process.env.NODE_ENV === 'production') {
          if (!targetPath.startsWith('/nextjsproject')) {
            targetPath = '/nextjsproject' + targetPath
            console.log('Added base path:', targetPath)
          }
        }
        
        console.log('Final target path:', targetPath)
        
        // Navigate immediately
        console.log('🚀 NAVIGATING TO:', targetPath)
        router.push(targetPath)
        
        // Clean the URL
        const cleanUrl = window.location.origin + targetPath
        console.log('🧹 Cleaning URL to:', cleanUrl)
        window.history.replaceState({}, '', cleanUrl)
        
        console.log('✅ ROUTE CATCHER COMPLETE')
      } else {
        console.log('❌ No path parameter found')
        
        // Check if we're on the index page with search params
        if (pathname === '/' && url.search) {
          console.log('🔍 Checking index page for hidden parameters...')
          console.log('Raw search string:', url.search)
          
          // Manual extraction as fallback
          const match = url.search.match(/[?&]p=([^&]+)/)
          if (match) {
            let extractedPath = decodeURIComponent(match[1])
            console.log('🎯 EXTRACTED PATH:', extractedPath)
            
            // Remove language prefix if present
            if (extractedPath.match(/^\/[a-z]{2}\//)) {
              console.log('🌐 Removing language prefix from extracted path:', extractedPath)
              extractedPath = extractedPath.replace(/^\/[a-z]{2}\//, '/')
              console.log('Path after removing language prefix:', extractedPath)
            }
            
            let targetPath = extractedPath
            if (process.env.NODE_ENV === 'production') {
              if (!targetPath.startsWith('/nextjsproject')) {
                targetPath = '/nextjsproject' + targetPath
              }
            }
            
            console.log('🚀 FALLBACK NAVIGATING TO:', targetPath)
            router.push(targetPath)
            window.history.replaceState({}, '', window.location.origin + targetPath)
          }
        }
      }
    }
  }, [router, pathname, mounted])

  return <>{children}</>
}
