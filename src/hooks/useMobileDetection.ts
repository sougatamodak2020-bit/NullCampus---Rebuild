// hooks/useMobileDetection.ts - Create this new file
'use client'

import { useState, useEffect } from 'react'

export function useMobileDetection(breakpoint: number = 1024) {
  const [isMobile, setIsMobile] = useState(true) // Default to mobile for SSR
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener with debounce for performance
    let timeoutId: NodeJS.Timeout
    const debouncedCheck = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 150)
    }
    
    window.addEventListener('resize', debouncedCheck, { passive: true })
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', debouncedCheck)
    }
  }, [breakpoint])

  return { isMobile, mounted }
}