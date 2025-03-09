"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"

import { setCookie } from "@/helpers/cookies"

type ThemeOption = "light" | "dark"

declare type ThemeContextProps = {
  toggleTheme: () => void,
  theme: ThemeOption,
  isDark: boolean,
}

const ThemeContext = createContext<ThemeContextProps>({
  toggleTheme: () => null,
  theme: "dark",
  isDark: true,
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

  const isDark = useMemo(() => theme === "dark", [theme])

  const value = { theme, toggleTheme, isDark }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
