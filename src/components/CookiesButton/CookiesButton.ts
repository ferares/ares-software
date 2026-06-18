export class CookiesButton extends HTMLElement {
  private button: HTMLButtonElement

  constructor() {
    super()
    this.button = this.querySelector("[data-js=button]") as HTMLButtonElement
  }

  connectedCallback() {
    this.button.addEventListener("click", this.clickHandler)
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.clickHandler)
  }

  private clickHandler = () => {
    window.Ares.setCookieConsent(null)
  }
}