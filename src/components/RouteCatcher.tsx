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
    // Strictly listen for 'p' parameter from 404.html redirect
    if (typeof window !== 'undefined' && mounted) {
      const url = new URL(window.location.href)
      const pathParam = url.searchParams.get('p')
      
      if (pathParam) {
        console.log('=== ROUTE CATCHER STRICT INTERCEPTION ===')
        console.log('Path parameter found:', pathParam)
        console.log('Current pathname:', pathname)
        console.log('Mounted:', mounted)
        console.log('Environment:', process.env.NODE_ENV)
        
        // Ensure the path has the correct base path for Next.js router
        let finalPath = pathParam
        
        // Always ensure base path in production
        if (process.env.NODE_ENV === 'production') {
          if (!pathParam.startsWith('/nextjsproject')) {
            finalPath = '/nextjsproject' + pathParam
          }
        }
        
        console.log('Final path for router:', finalPath)
        
        // Clean the URL by removing the ?p= parameter
        url.searchParams.delete('p')
        const cleanUrl = url.pathname + url.search + url.hash
        
        console.log('Clean URL will be:', cleanUrl)
        
        // Immediate router.replace with pathParam
        console.log('IMMEDIATE ROUTER REPLACE...')
        router.replace(finalPath)
        
        // Clean URL history immediately
        window.history.replaceState({}, '', cleanUrl)
        
        console.log('=== END STRICT INTERCEPTION ===')
      }
    }
  }, [router, pathname, mounted])

  return <>{children}</>
}
