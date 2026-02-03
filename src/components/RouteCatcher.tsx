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
  const [intercepted, setIntercepted] = useState(false)

  useEffect(() => {
    // Wait for component to mount to avoid hydration mismatches
    setMounted(true)
  }, [])

  useEffect(() => {
    // Aggressively listen for 'p' parameter from 404.html redirect
    if (typeof window !== 'undefined' && mounted && !intercepted) {
      const url = new URL(window.location.href)
      const pathParam = url.searchParams.get('p')
      
      console.log('=== ROUTE CATCHER AGGRESSIVE INTERCEPTION ===')
      console.log('URL:', window.location.href)
      console.log('Path parameter found:', pathParam)
      console.log('Current pathname:', pathname)
      console.log('Mounted:', mounted)
      console.log('Intercepted:', intercepted)
      console.log('Environment:', process.env.NODE_ENV)
      console.log('All search params:', Object.fromEntries(url.searchParams))
      
      if (pathParam) {
        console.log('🎯 PARAMETER DETECTED - IMMEDIATE ACTION!')
        
        // Ensure the path has the correct base path for Next.js router
        let finalPath = pathParam
        
        // Always ensure base path in production
        if (process.env.NODE_ENV === 'production') {
          if (!pathParam.startsWith('/nextjsproject')) {
            finalPath = '/nextjsproject' + pathParam
            console.log('Added base path:', finalPath)
          }
        }
        
        console.log('Final path for router:', finalPath)
        
        // Clean the URL by removing the ?p= parameter
        url.searchParams.delete('p')
        const cleanUrl = url.pathname + url.search + url.hash
        
        console.log('Clean URL will be:', cleanUrl)
        
        // Mark as intercepted to prevent duplicate actions
        setIntercepted(true)
        
        // Immediate router.replace with pathParam
        console.log('🚀 IMMEDIATE ROUTER REPLACE...')
        router.replace(finalPath)
        
        // Clean URL history immediately
        window.history.replaceState({}, '', cleanUrl)
        
        console.log('✅ INTERCEPTION COMPLETE - URL CLEANED')
        console.log('=== END AGGRESSIVE INTERCEPTION ===')
      } else {
        console.log('❌ No parameter found - checking again...')
        
        // Fallback: Check if we're on index.html with parameters
        if (pathname === '/' && url.search) {
          console.log('🔄 Fallback: On index.html with search params')
          console.log('Search params:', url.search)
          
          // Try to extract p parameter manually
          const pMatch = url.search.match(/[?&]p=([^&]+)/)
          if (pMatch) {
            const fallbackPath = decodeURIComponent(pMatch[1])
            console.log('🎯 FALLBACK PARAMETER FOUND:', fallbackPath)
            
            let finalPath = fallbackPath
            if (process.env.NODE_ENV === 'production') {
              if (!fallbackPath.startsWith('/nextjsproject')) {
                finalPath = '/nextjsproject' + fallbackPath
              }
            }
            
            setIntercepted(true)
            console.log('🚀 FALLBACK ROUTER REPLACE...')
            router.replace(finalPath)
            window.history.replaceState({}, '', finalPath)
          }
        }
      }
    }
  }, [router, pathname, mounted, intercepted])

  return <>{children}</>
}
