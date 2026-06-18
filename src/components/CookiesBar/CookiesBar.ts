import type { AresCookieConsentEvent } from "../../scripts/types"

export class CookiesBar extends HTMLElement {
  private acceptButton: HTMLButtonElement
  private rejectButton: HTMLButtonElement

  constructor() {
    super()
    this.acceptButton = this.querySelector("[data-js=accept]") as HTMLButtonElement
    this.rejectButton = this.querySelector("[data-js=reject]") as HTMLButtonElement
  }

  connectedCallback() {
    this.acceptButton.addEventListener("click", this.acceptHandler)
    this.rejectButton.addEventListener("click", this.rejectHandler)
    document.addEventListener("ares:cookies", this.cookiesEventHandler)
    if (window.Ares.getCookieConsent() === null) this.toggle(true)
  }

  disconnectedCallback() {
    this.acceptButton.removeEventListener("click", this.acceptHandler)
    this.rejectButton.removeEventListener("click", this.rejectHandler)
    document.removeEventListener("ares:cookies", this.cookiesEventHandler)
  }

  private acceptHandler = () => {
    window.Ares.setCookieConsent(true)
  }

  private rejectHandler = () => {
    window.Ares.setCookieConsent(false)
  }

  private cookiesEventHandler = (event: AresCookieConsentEvent) => {
    this.toggle(event.detail.consentGiven === null)
  }

  private toggle = (show: boolean) => {
    this.classList.toggle("show", show)
  }
}