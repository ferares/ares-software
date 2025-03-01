import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Nunito, Open_Sans } from "next/font/google"

import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"

import { config } from "@fortawesome/fontawesome-svg-core"

import { type LocaleOption, locales } from "@/i18n/routing"

import { BackgroundProvider } from "@/context/background"
import { AlertsProvider } from "@/context/alerts"
import { LoaderProvider } from "@/context/loader"
import { PrefersReducedMotionProvider } from "@/context/reducedMotion"
import { CallOnEscProvider } from "@/context/callOnEsc"
import { CookieConsentProvider } from "@/context/cookieConsent"

import Header from "@/components/header"
import Footer from "@/components/footer"
import GoogleTagManager from "@/components/googleTagManager"

import "@/styles/main.css"

// We load FA's styles on main.css to prevent FOUC
config.autoAddCss = false

const { GTM_ID, APP_URL } = process.env

const nunito = Nunito({ subsets: ["latin"], display: "swap", weight: ["400"], style: ["italic", "normal"], variable: "--font-nunito" })
const openSans = Open_Sans({ subsets: ["latin"], display: "swap", weight: ["400"], variable: "--font-open-sans" })


export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "black",
}

export async function generateMetadata(props: { params: Promise<{ locale: LocaleOption }> }): Promise<Metadata> {
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

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode, params: Promise<{ locale: LocaleOption }> }>) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${nunito.variable} ${openSans.variable}`}>
      <head>
        <link rel="shortcut icon" href="/icons/me.jpg" type="image/jpeg" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <PrefersReducedMotionProvider>
            <CallOnEscProvider>
              <LoaderProvider>
                <AlertsProvider>
                  <BackgroundProvider>
                    <CookieConsentProvider>
                      <Header />
                      <main id="main" className="main">
                        {children}
                      </main>
                      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
                      <Footer />
                    </CookieConsentProvider>
                  </BackgroundProvider>
                </AlertsProvider>
              </LoaderProvider>
            </CallOnEscProvider>
          </PrefersReducedMotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
