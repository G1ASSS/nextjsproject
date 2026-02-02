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
    // Handle ?p= parameter from 404.html redirect ONLY after mounted
    if (typeof window !== 'undefined' && mounted) {
      const url = new URL(window.location.href)
      const pathParam = url.searchParams.get('p')
      
      if (pathParam) {
        console.log('=== ROUTE CATCHER DEBUG ===')
        console.log('Path parameter found:', pathParam)
        console.log('Current pathname:', pathname)
        console.log('Mounted:', mounted)
        
        // Clean the URL by removing the ?p= parameter
        url.searchParams.delete('p')
        const cleanUrl = url.pathname + url.search + url.hash
        
        // Ensure the path has the correct base path for Next.js router
        let finalPath = pathParam
        if (!pathParam.startsWith('/nextjsproject') && process.env.NODE_ENV === 'production') {
          finalPath = '/nextjsproject' + pathParam
        }
        
        console.log('Final path for router:', finalPath)
        console.log('Clean URL will be:', cleanUrl)
        
        // Navigate to the actual path
        router.push(finalPath)
        
        // Replace URL history to clean up the ?p= parameter
        window.history.replaceState({}, '', cleanUrl)
        
        console.log('=== END ROUTE CATCHER DEBUG ===')
      }
    }
  }, [router, pathname, mounted])

  return <>{children}</>
}
