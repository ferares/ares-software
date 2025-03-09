"use client"

import { useMemo } from "react"

import { useTranslations } from "next-intl"

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

import { useThemeContext } from "@/context/theme"

import Switch from "./switch"

function ThemeSwitch() {
  const { toggleTheme, isDark } = useThemeContext()
  const t = useTranslations("Labels")
  const ariaLabel = useMemo(() => isDark ? t("switch-light") : t("switch-dark"), [isDark, t])
  return (
    <Switch ariaLabel={ariaLabel} leftIcon={faSun} rightIcon={faMoon} onChange={toggleTheme} state={isDark ? "right" : "left"} />
  )
}

export default ThemeSwitch