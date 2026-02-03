'use client'

import { useState, useEffect } from 'react'
import RouteCatcher from './RouteCatcher'

interface ClientLayoutWrapperProps {
  children: React.ReactNode
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only set mounted to true after client-side hydration
    setMounted(true)
  }, [])

  // Don't render RouteCatcher until mounted to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <RouteCatcher>
      {children}
    </RouteCatcher>
  )
}
