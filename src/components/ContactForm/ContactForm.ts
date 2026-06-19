import { useTranslations } from "../../i18n/utils"

import type { Captcha } from "../Captcha/Captcha"

export class ContactForm extends HTMLElement {
  private form: HTMLFormElement
  private captcha: Captcha
  private t = useTranslations(window.Astro.currentLocale)

  constructor() {
    super()
    this.form = this.querySelector<HTMLFormElement>("[data-js=form]")!
    this.captcha = document.querySelector<Captcha>("ares-captcha")!
  }

  connectedCallback() {
    this.form.addEventListener("submit", this.submitHandler)
  }

  disconnectedCallback() {
    this.form.removeEventListener("submit", this.submitHandler)
  }

  private submitHandler = async (event: SubmitEvent) => {
    event.preventDefault()
    this.form.classList.add("was-validated")
    if (!this.form.checkValidity()) {
      window.Ares.pushScreenReaderAlert({ type: "assertive", content: this.t("Messages.invalid-form") })
      return
    }
    const token = await this.captcha.execute()
    try {
      window.Ares.setLoading(true, this.t("Messages.contact-submitting"))
      const body = new FormData(this.form)
      body.set("token", token)
      const response = await fetch("http://localhost:8000/contact.php", { method: "POST", body })
      if (!response.ok) {
        window.Ares.pushAlert({ type: "danger", content: this.t("Messages.error") })
      } else {
        window.Ares.pushAlert({ type: "success", content: this.t("Messages.contact-success"), timeout: 5000 })
        this.form.classList.remove("was-validated")
        this.form.reset()
      }
    } catch (error) {
      console.error(error)
    }
    window.Ares.setLoading(false)
  }
}