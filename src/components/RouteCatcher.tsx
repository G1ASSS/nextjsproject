'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

interface RouteCatcherProps {
  children: React.ReactNode
}

export default function RouteCatcher({ children }: RouteCatcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { setLanguage } = useLanguage()

  useEffect(() => {
    // Wait for component to mount to avoid hydration mismatches
    setMounted(true)
  }, [])

  useEffect(() => {
    // Simple and direct parameter interception with language prefix handling
    if (typeof window !== 'undefined' && mounted) {
      const url = new URL(window.location.href)
      const pathParam = url.searchParams.get('p')
      
      console.log('=== ROUTE CATCHER WITH LANGUAGE DETECTION ===')
      console.log('Full URL:', window.location.href)
      console.log('Pathname:', pathname)
      console.log('Search params:', url.search)
      console.log('Path parameter (p):', pathParam)
      
      if (pathParam) {
        console.log('🎯 FOUND PATH PARAMETER!')
        console.log('Path parameter value:', pathParam)
        
        // Clean the path parameter - handle language prefixes and trailing slashes
        let targetPath = pathParam
        let detectedLanguage: string | null = null
        
        // Remove trailing slashes to prevent duplication
        targetPath = targetPath.replace(/\/+$/, '')
        console.log('Path after removing trailing slashes:', targetPath)
        
        // Detect and extract language prefix if present (e.g., /en/learning/html/post)
        const languageMatch = targetPath.match(/^\/([a-z]{2})\//)
        if (languageMatch) {
          detectedLanguage = languageMatch[1]
          console.log('🌐 Detected language prefix:', detectedLanguage)
          console.log('🌐 Removing language prefix from path:', targetPath)
          targetPath = targetPath.replace(/^\/[a-z]{2}\//, '/')
          console.log('Path after removing language prefix:', targetPath)
          
          // Set the detected language as current language
          if (['en', 'my', 'th', 'es', 'zh'].includes(detectedLanguage)) {
            console.log('🌐 Setting detected language as current language:', detectedLanguage)
            setLanguage(detectedLanguage as any)
          }
        }
        
        // Remove trailing slashes again after language processing
        targetPath = targetPath.replace(/\/+$/, '')
        console.log('Final clean path:', targetPath)
        
        // Ensure base path for production - STRICT BASE PATH HANDLING
        if (process.env.NODE_ENV === 'production') {
          if (!targetPath.startsWith('/nextjsproject')) {
            targetPath = '/nextjsproject' + targetPath
            console.log('🔧 Added /nextjsproject base path:', targetPath)
          } else {
            console.log('✅ Base path already present:', targetPath)
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
            
            // Remove trailing slashes first
            extractedPath = extractedPath.replace(/\/+$/, '')
            console.log('Extracted path after removing trailing slashes:', extractedPath)
            
            // Detect and extract language prefix from extracted path
            const extractedLanguageMatch = extractedPath.match(/^\/([a-z]{2})\//)
            if (extractedLanguageMatch) {
              const extractedLanguage = extractedLanguageMatch[1]
              console.log('🌐 Detected language prefix in extracted path:', extractedLanguage)
              console.log('🌐 Removing language prefix from extracted path:', extractedPath)
              extractedPath = extractedPath.replace(/^\/[a-z]{2}\//, '/')
              console.log('Path after removing language prefix:', extractedPath)
              
              // Set the detected language as current language
              if (['en', 'my', 'th', 'es', 'zh'].includes(extractedLanguage)) {
                console.log('🌐 Setting detected language as current language:', extractedLanguage)
                setLanguage(extractedLanguage as any)
              }
            }
            
            // Remove trailing slashes again after language processing
            extractedPath = extractedPath.replace(/\/+$/, '')
            console.log('Final extracted path:', extractedPath)
            
            let targetPath = extractedPath
            // Ensure base path for production - STRICT BASE PATH HANDLING
            if (process.env.NODE_ENV === 'production') {
              if (!targetPath.startsWith('/nextjsproject')) {
                targetPath = '/nextjsproject' + targetPath
                console.log('🔧 Added /nextjsproject base path to fallback:', targetPath)
              } else {
                console.log('✅ Base path already present in fallback:', targetPath)
              }
            }
            
            console.log('🚀 FALLBACK NAVIGATING TO:', targetPath)
            router.push(targetPath)
            window.history.replaceState({}, '', window.location.origin + targetPath)
          }
        }
      }
    }
  }, [router, pathname, mounted, setLanguage])

  return <>{children}</>
}
