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
        
        // Strict path extraction - remove unwanted prefixes
        let targetPath = pathParam
        let detectedLanguage: string | null = null
        
        console.log('🔍 STRICT PATH EXTRACTION START')
        console.log('Original path parameter:', targetPath)
        
        // Remove trailing slashes first
        targetPath = targetPath.replace(/\/+$/, '')
        console.log('After removing trailing slashes:', targetPath)
        
        // Remove /blog/ prefix if present (this is not part of our structure)
        if (targetPath.startsWith('/blog/')) {
          console.log('🧹 Removing /blog/ prefix:', targetPath)
          targetPath = targetPath.replace('/blog/', '/')
          console.log('After removing /blog/ prefix:', targetPath)
        }
        
        // Remove /en/ prefix if present (language prefix)
        if (targetPath.startsWith('/en/')) {
          console.log('🧹 Removing /en/ prefix:', targetPath)
          targetPath = targetPath.replace('/en/', '/')
          console.log('After removing /en/ prefix:', targetPath)
        }
        
        // Remove any other language prefixes
        const languagePrefixMatch = targetPath.match(/^\/([a-z]{2})\//)
        if (languagePrefixMatch) {
          const detectedLang = languagePrefixMatch[1]
          console.log('🧹 Removing language prefix:', detectedLang, 'from:', targetPath)
          targetPath = targetPath.replace(/^\/[a-z]{2}\//, '/')
          console.log('After removing language prefix:', targetPath)
          
          // Set the detected language as current language
          if (['en', 'my', 'th', 'es', 'zh'].includes(detectedLang)) {
            console.log('🌐 Setting detected language as current language:', detectedLang)
            setLanguage(detectedLang as any)
          }
        }
        
        // Remove any remaining unwanted prefixes like /nextjsproject/
        if (targetPath.startsWith('/nextjsproject/')) {
          console.log('🧹 Removing /nextjsproject/ prefix:', targetPath)
          targetPath = targetPath.replace('/nextjsproject/', '/')
          console.log('After removing /nextjsproject/ prefix:', targetPath)
        }
        
        // Ensure path starts with / and remove trailing slashes again
        if (!targetPath.startsWith('/')) {
          targetPath = '/' + targetPath
        }
        targetPath = targetPath.replace(/\/+$/, '')
        
        console.log('🎯 FINAL CLEAN PATH:', targetPath)
        console.log('🔍 STRICT PATH EXTRACTION END')
        
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
            
            console.log('🔍 STRICT FALLBACK PATH EXTRACTION START')
            console.log('Original extracted path:', extractedPath)
            
            // Remove trailing slashes first
            extractedPath = extractedPath.replace(/\/+$/, '')
            console.log('After removing trailing slashes:', extractedPath)
            
            // Remove /blog/ prefix if present (this is not part of our structure)
            if (extractedPath.startsWith('/blog/')) {
              console.log('🧹 Removing /blog/ prefix from fallback:', extractedPath)
              extractedPath = extractedPath.replace('/blog/', '/')
              console.log('After removing /blog/ prefix:', extractedPath)
            }
            
            // Remove /en/ prefix if present (language prefix)
            if (extractedPath.startsWith('/en/')) {
              console.log('🧹 Removing /en/ prefix from fallback:', extractedPath)
              extractedPath = extractedPath.replace('/en/', '/')
              console.log('After removing /en/ prefix:', extractedPath)
            }
            
            // Remove any other language prefixes
            const fallbackLanguageMatch = extractedPath.match(/^\/([a-z]{2})\//)
            if (fallbackLanguageMatch) {
              const detectedLang = fallbackLanguageMatch[1]
              console.log('🧹 Removing language prefix from fallback:', detectedLang, 'from:', extractedPath)
              extractedPath = extractedPath.replace(/^\/[a-z]{2}\//, '/')
              console.log('After removing language prefix:', extractedPath)
              
              // Set the detected language as current language
              if (['en', 'my', 'th', 'es', 'zh'].includes(detectedLang)) {
                console.log('🌐 Setting detected language as current language:', detectedLang)
                setLanguage(detectedLang as any)
              }
            }
            
            // Remove any remaining unwanted prefixes like /nextjsproject/
            if (extractedPath.startsWith('/nextjsproject/')) {
              console.log('🧹 Removing /nextjsproject/ prefix from fallback:', extractedPath)
              extractedPath = extractedPath.replace('/nextjsproject/', '/')
              console.log('After removing /nextjsproject/ prefix:', extractedPath)
            }
            
            // Ensure path starts with / and remove trailing slashes again
            if (!extractedPath.startsWith('/')) {
              extractedPath = '/' + extractedPath
            }
            extractedPath = extractedPath.replace(/\/+$/, '')
            
            console.log('🎯 FINAL CLEAN FALLBACK PATH:', extractedPath)
            console.log('🔍 STRICT FALLBACK PATH EXTRACTION END')
            
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
