export const locales = ["es", "en", "it", "fr", "pt"] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = "es"
export const routeKeys = ["home"] as const;
export type RouteKey = typeof routeKeys[number];
export const labels: Record<Locale, string> = { "es": "Español", "en": "English", "it": "Italiano", "fr": "Français", "pt": "Português" }
export const paths: Record<Locale, Record<RouteKey, string>> = {
  es: {
    home: "",
  },
  en: {
    home: "",
  },
  it: {
    home: "",
  },
  fr: {
    home: "",
  },
  pt: {
    home: "",
  },
};