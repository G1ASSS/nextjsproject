'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface RouteCatcherProps {
  children: React.ReactNode
}

export default function RouteCatcher({ children }: RouteCatcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Handle ?p= parameter from 404.html redirect
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const pathParam = url.searchParams.get('p')
      
      if (pathParam) {
        console.log('=== ROUTE CATCHER DEBUG ===')
        console.log('Path parameter found:', pathParam)
        console.log('Current pathname:', pathname)
        
        // Clean the URL by removing the ?p= parameter
        url.searchParams.delete('p')
        const cleanUrl = url.pathname + url.search + url.hash
        
        // Navigate to the actual path
        console.log('Navigating to:', pathParam)
        console.log('Clean URL will be:', cleanUrl)
        
        // Use router.push to navigate to the actual path
        router.push(pathParam)
        
        // Replace URL history to clean up the ?p= parameter
        window.history.replaceState({}, '', cleanUrl)
        
        console.log('=== END ROUTE CATCHER DEBUG ===')
      }
    }
  }, [router, pathname])

  return <>{children}</>
}
