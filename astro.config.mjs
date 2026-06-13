// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import { defaultLocale, locales } from "./src/i18n/config";


// https://astro.build/config
export default defineConfig({
  site: "https://ares.uy",
  redirects: {
    "/": `/${defaultLocale}`
  },
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    }
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Figtree",
      cssVariable: "--font-figtree",
      weights: ["400", "500"],
    },
    {
      provider: fontProviders.google(),
      name: "Open Sans",
      cssVariable: "--font-open-sans",
      weights: ["400", "700"],
    },
  ],
});
