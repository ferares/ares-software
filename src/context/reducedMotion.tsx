"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

declare type PrefersReducedMotionContextProps = {
  prefersReducedMotion: boolean,
}

const PrefersReducedMotionContext = createContext<PrefersReducedMotionContextProps>({
  prefersReducedMotion: false,
})

export function PrefersReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const mediaQuery = useMemo(() => {
    if (typeof window === "undefined") return null
    return window.matchMedia("(prefers-reduced-motion: reduce)")
  }, [])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(mediaQuery?.matches ?? false)


  const handlePrefersReducedMotionChange = useCallback(() => setPrefersReducedMotion(mediaQuery?.matches ?? false), [mediaQuery])

  useEffect(() => {
    mediaQuery?.addEventListener("change", handlePrefersReducedMotionChange)
    return () => mediaQuery?.removeEventListener("change", handlePrefersReducedMotionChange)
  }, [handlePrefersReducedMotionChange, mediaQuery])
  
  const value = { prefersReducedMotion }
  return (
    <PrefersReducedMotionContext.Provider value={value}>
      {children}
    </PrefersReducedMotionContext.Provider>
  )
}

export const usePrefersReducedMotionContext = () => useContext(PrefersReducedMotionContext)
