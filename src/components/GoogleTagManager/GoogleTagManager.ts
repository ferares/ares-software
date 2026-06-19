import type { AresCookieConsentEvent } from "../../scripts/types"

export class GoogleTagManager extends HTMLElement {
  private static GTM_ID = import.meta.env.PUBLIC_GTM_ID

  connectedCallback() {
    const consent = window.Ares.getCookieConsent()
    this.setup(consent)
    document.addEventListener("ares:cookies", this.cookiesEventHandler)
  }

  disconnectedCallback() {
    document.removeEventListener("ares:cookies", this.cookiesEventHandler)
  }

  private cookiesEventHandler = (event: AresCookieConsentEvent) => {
    this.setup(event.detail.consentGiven)
  }

  private setup = (consent: boolean | null) => {
    const scriptLoaded = this.querySelector("script") !== null
    if (consent === false) {
      if (scriptLoaded) window.location.reload()
    } else if (!scriptLoaded) {
      const script = document.createElement("script")
      script.setAttribute("async", "true")
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GoogleTagManager.GTM_ID}`
      script.addEventListener("load", () => {
        window.dataLayer = window.dataLayer || []
        window.gtag = function gtag() {
          window.dataLayer.push(arguments)
        }
        window.gtag("js", new Date())
        window.gtag("config", GoogleTagManager.GTM_ID)
      })
      this.appendChild(script)
    }
  }
}