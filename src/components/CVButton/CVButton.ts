import type { Locale } from "../../i18n/config"
import { useTranslations } from "../../i18n/utils"

export class CVButton extends HTMLElement {
  private button: HTMLButtonElement
  private t = useTranslations(window.Astro.currentLocale as Locale)

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
    const anchor = document.createElement("a")
    anchor.href = this.t("Sections.About.cv-link")
    anchor.download = "Fermín Ares CV.pdf"
    anchor.target = "_blank"
    anchor.click()
  }
}