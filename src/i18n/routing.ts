import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export type Locale = (typeof locales)[number]

export const locales = ["en", "es", "it", "fr", "pt"] as const
export const defaultLocale: Locale = "en"

export type LocaleOption = typeof locales[number]

export const labels: Record<LocaleOption, string> = {"es": "Español", "en": "English", "it": "Italiano", "fr": "Français" ,"pt": "Português" }

 
export const routing = defineRouting({ locales, defaultLocale })
 
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)