import { defineRouting } from "next-intl/routing"

export const locales = ["en", "es", "it", "fr", "pt"] as const

export type Locale = typeof locales[number]

export const defaultLocale: Locale = "en"

export const labels: Record<Locale, string> = {"es": "Español", "en": "English", "it": "Italiano", "fr": "Français" ,"pt": "Português" }

export const routing = defineRouting({ locales, defaultLocale })