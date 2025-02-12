import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Nunito, Open_Sans } from "next/font/google"

import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"

import { config } from "@fortawesome/fontawesome-svg-core"

import { type LocaleOption, locales } from "@/i18n/routing"

import { BackgroundProvider } from "@/context/background"
import { ScreenReaderProvider } from "@/context/screenReader"

import Header from "@/components/header"
import Footer from "@/components/footer"
import SRAnnouncer from "@/components/srAnnouncemer"

// We load FA's styles on app.css to prevent FOUC
config.autoAddCss = false

import "@/styles/main.css"

const nunito = Nunito({ subsets: ["latin"], display: "swap", weight: ["400"], style: ["italic", "normal"], variable: "--font-nunito" })
const openSans = Open_Sans({ subsets: ["latin"], display: "swap", weight: ["400"], variable: "--font-open-sans" })

const metadataBase = new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "")
const title = "Ares Software"
const description = "Ares Software"

export const viewport: Viewport = {
  themeColor: "black",
}

export const metadata: Metadata = {
  title,
  description,
  metadataBase,
  openGraph: {
    type: "website",
    description,
    title,
    images: "/imgs/me.jpg",
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
        <link rel="shortcut icon" href="/imgs/me.jpg" type="image/jpeg" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ScreenReaderProvider>
            <BackgroundProvider>
              <Header />
              <main className="main">
                {children}
              </main>
              <Footer />
              <SRAnnouncer />
            </BackgroundProvider>
          </ScreenReaderProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
