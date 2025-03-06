"use client"

import { createContext, useCallback, useContext, useState } from "react"

import { setCookie } from "@/helpers/cookies"

type ThemeOption = "light" | "dark"

declare type ThemeContextProps = {
  toggleTheme: () => void,
  theme: ThemeOption,
}

const ThemeContext = createContext<ThemeContextProps>({
  toggleTheme: () => null,
  theme: "dark",
})

export function ThemeProvider({ children, initialTheme }: { children: React.ReactNode, initialTheme: ThemeOption }) {
  const [theme, setTheme] = useState<ThemeOption>(initialTheme)

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const newTheme = current === "dark" ? "light": "dark"
      setCookie("theme", newTheme)
      return newTheme
    })
  }, [])

  const value = { theme, toggleTheme }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
