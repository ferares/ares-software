import type { Metadata, Viewport } from "next"
import { Nunito, Open_Sans } from "next/font/google"

import { BackgroundProvider } from "@/context/background"
import { ScreenReaderProvider } from "@/context/screenReader"

import Header from "@/components/header"
import Footer from "@/components/footer"
import SRAnnouncer from "@/components/srAnnouncemer"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${openSans.variable}`}>
      <head>
        <link rel="shortcut icon" href="/imgs/me.jpg" type="image/jpeg" />
      </head>
      <body>
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
      </body>
    </html>
  )
}
