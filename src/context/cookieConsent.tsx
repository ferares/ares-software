"use client"

import { createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState } from "react"

declare type CookieConsentContextProps = { consentGiven: boolean | null, setConsentGiven:  Dispatch<SetStateAction<boolean | null>> }

const CookieConsentContext = createContext<CookieConsentContextProps>({ consentGiven: false, setConsentGiven: () => null })

const COOKIE_NAME = "cookieConsent"

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(true)

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_NAME)
    if (savedConsent) {
      setConsentGiven(savedConsent === "true")
    } else {
      setConsentGiven(null)
    }
  }, [])

  useEffect(() => {
    if (consentGiven !== null) localStorage.setItem(COOKIE_NAME, consentGiven ? "true" : "false")
    else localStorage.removeItem(COOKIE_NAME)
  }, [consentGiven])

  const value = { setConsentGiven, consentGiven }
  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsentContext = () => useContext(CookieConsentContext)
