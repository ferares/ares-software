"use client"

import { createContext, useCallback, useContext, useState } from "react"

type BackgroundImage = { url: string }

interface ContextProps {
  newBackground: () => void
  loadingBg: boolean
  bg?: string
}

const BackgroundContext = createContext<ContextProps>({ newBackground: () => null, bg: undefined, loadingBg: true })
 
export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [bg, setBg] = useState<string>()
  const [loadingBg, setLoadingBg] = useState<boolean>(true)

  const getBackground = useCallback(async () => {
    try {
      const response = await fetch("https://postales.ares.uy/random").then((response) => response.json()) as BackgroundImage
      return `https://postales.ares.uy/${response.url}`
    } catch (error) {
      console.error("Error fetching background image", error)
    }
  }, [])

  const newBackground = useCallback(() => {
    setLoadingBg(true)
    getBackground().then((url) => {
      setBg(url)
      return new Promise((resolve, reject) => {
        if (!url) return reject(new Error("No background image URL"))
        // Load image
        const imgElement = document.createElement("img")
        imgElement.addEventListener("load", () => resolve(url))
        imgElement.addEventListener("error", reject)
        imgElement.src = url
      })
    }).catch(console.error).finally(() => setLoadingBg(false))
  }, [getBackground])

  const value = { bg, newBackground, loadingBg }

  return <BackgroundContext.Provider value={value}>{children}</BackgroundContext.Provider>
}

export const useBackgroundContext = () => useContext(BackgroundContext)