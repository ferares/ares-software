"use client"

import { createContext, type Dispatch, type SetStateAction, useCallback, useContext, useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCookieBite } from "@fortawesome/free-solid-svg-icons"

import AlertComponent from "@/components/alert"

declare type CookieConsentContextProps = {
  consentGiven: boolean | null,
  setConsentGiven:  Dispatch<SetStateAction<boolean | null>>,
  showCookieConsentAlert: () => void,
}

const CookieConsentContext = createContext<CookieConsentContextProps>({
  consentGiven: false,
  setConsentGiven: () => null,
  showCookieConsentAlert: () => null,
})

const COOKIE_NAME = "cookieConsent"

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()
  const t = useTranslations()

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_NAME)
    if (savedConsent) {
      setConsentGiven(savedConsent === "true")
    } else {
      setShowAlert(true)
      setConsentGiven(null)
    }
  }, [])

  useEffect(() => {
    if (consentGiven !== null) {
      const savedConsent = localStorage.getItem(COOKIE_NAME)
      localStorage.setItem(COOKIE_NAME, consentGiven ? "true" : "false")
      if ((!consentGiven) && (savedConsent === "true")) {
        window.location.reload()
      }
    }
  }, [consentGiven, router])

  const handleSelection = useCallback((answer: boolean) => {
    setShowAlert(false)
    setConsentGiven(answer)
  }, [])

  const value = { setConsentGiven, consentGiven, showCookieConsentAlert: () => setShowAlert(true) }
  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {showAlert && (
        <AlertComponent type="info" removeAlert={() => setShowAlert(false)}>
          <div className="cookie-alert">
            <p>
              {t.rich("Messages.cookies", { br: () => <br /> })}&nbsp;
              <FontAwesomeIcon icon={faCookieBite} />
            </p>
            <div className="cookie-alert__btns">
              <button className="cookie-alert__btn btn" onClick={() => handleSelection(true)}>
                {t("Labels.accept")}
              </button>
              <button className="cookie-alert__btn btn" onClick={() => handleSelection(false)}>
                {t("Labels.reject-optional")}
              </button>
            </div>
          </div>
        </AlertComponent>
      )}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsentContext = () => useContext(CookieConsentContext)
