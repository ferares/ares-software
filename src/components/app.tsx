"use client"

import { AlertsProvider } from "@/context/alerts"
import { BackgroundProvider } from "@/context/background"
import { CookieConsentProvider } from "@/context/cookieConsent"
import { LoaderProvider } from "@/context/loader"
import { MenuProvider } from "@/context/menu"
import { useThemeContext } from "@/context/theme"

import Header from "./header"
import Menu from "./menu"
import Footer from "./footer"

function App({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeContext()
  return (
    <div className={`app theme-${theme}`}>
      <LoaderProvider>
        <AlertsProvider>
          <BackgroundProvider>
            <CookieConsentProvider>
              <MenuProvider>
                <Header />
                <Menu />
                <main id="main" className="main">
                  {children}
                </main>
              </MenuProvider>
              <Footer />
            </CookieConsentProvider>
          </BackgroundProvider>
        </AlertsProvider>
      </LoaderProvider>
    </div>
  )
}

export default App