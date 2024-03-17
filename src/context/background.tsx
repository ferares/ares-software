'use client'

import { createContext, useContext, useMemo, useState } from 'react'

declare type ContextProps = {
  newBackground: () => void
  loadingBg: boolean
  bg?: string
}

const BackgroundContext = createContext<ContextProps>({ newBackground: () => null, bg: undefined, loadingBg: true })
 
export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [bg, setBg] = useState<string>()
  const [loadingBg, setLoadingBg] = useState<boolean>(true)

  async function getBackground() {
    try {
      const response = await fetch('https://postales.ares.uy/random').then((response) => response.json())
      return `https://postales.ares.uy/${response.url}`
    } catch (error) {
      console.error('Error fetching background image', error)
    }
  }

  function newBackground() {
    setLoadingBg(true)
    getBackground().then((url) => {
      setBg(url)
      return new Promise((resolve, reject) => {
        if (!url) return reject()
        // Load image
        const imgElement = document.createElement('img')
        imgElement.addEventListener('load', () => resolve(url))
        imgElement.addEventListener('error', reject)
        imgElement.src = url
      })
    }).finally(() => setLoadingBg(false))
  }

  const value = { bg, newBackground, loadingBg }

  return <BackgroundContext.Provider value={value}>{children}</BackgroundContext.Provider>
}

export const useBackgroundContext = () => useContext(BackgroundContext)