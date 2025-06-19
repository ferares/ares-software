import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Figtree, Open_Sans } from "next/font/google"
import { cookies } from "next/headers"

import { type Locale, NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"

import { config } from "@fortawesome/fontawesome-svg-core"

import { locales } from "@/i18n/routing"

import { PrefersReducedMotionProvider } from "@/context/reducedMotion"
import { CallOnEscProvider } from "@/context/callOnEsc"
import { ThemeProvider } from "@/context/theme"

import GoogleTagManager from "@/components/googleTagManager"
import App from "@/components/app"

import "@/styles/main.css"

// We load FA's styles on main.css to prevent FOUC
config.autoAddCss = false

const { GTM_ID, APP_URL } = process.env

const openSans = Open_Sans({ subsets: ["latin"], display: "swap", weight: ["400", "700"], variable: "--font-open-sans" })
const figtree = Figtree({ subsets: ["latin"], display: "swap", weight: ["400", "500"], variable: "--font-figtree" })


export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "black",
}

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const title = "Ares Software"
  const description = t("description")
  const appUrl = APP_URL
  return {
    title,
    metadataBase: new URL(APP_URL ?? ""),
    authors: [{ name: "Ares Software", url: "https://ares.uy" }],
    description,
    robots: "index,follow",
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: `${appUrl}/imgs/share-card.jpg"`
    },
    openGraph: {
      type: "website",
      title,
      description,
      images: `${appUrl}/imgs/share-card.jpg`
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode, params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()
  setRequestLocale(locale)

  const messages = await getMessages()

  const cookieStore = await cookies()
  const theme = cookieStore.get("theme")?.value.split(" ")[0]

  return (
    <html lang={locale} className={`${openSans.variable} ${figtree.variable}`}>
      <head>
        <link rel="shortcut icon" href="/imgs/favicon.png" type="image/png" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <PrefersReducedMotionProvider>
            <CallOnEscProvider>
              <ThemeProvider initialTheme={theme === "light" ? "light" : "dark"}>
                <App>
                  {children}
                  {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
                </App>
              </ThemeProvider>
            </CallOnEscProvider>
          </PrefersReducedMotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
