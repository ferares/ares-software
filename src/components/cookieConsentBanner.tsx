"use client"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCookieBite } from "@fortawesome/free-solid-svg-icons"

import { useCookieConsentContext } from "@/context/cookieConsent"

function CookieConsentBanner() {
  const { consentGiven, setConsentGiven } = useCookieConsentContext()
  const t = useTranslations()

  if (consentGiven !== null) return null

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__content">
        <p>
          {t.rich("Messages.cookies", { br: () => <br /> })}&nbsp;
          <FontAwesomeIcon icon={faCookieBite} />
        </p>
        <div className="cookie-banner__btns">
          <button className="cookie-banner__btn btn" onClick={() => setConsentGiven(true)}>
            {t("Labels.accept")}
          </button>
          <button className="cookie-banner__btn btn" onClick={() => setConsentGiven(false)}>
            {t("Labels.decline")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsentBanner