export class Captcha extends HTMLElement {
  private sitekey: string
  public ready: boolean = false

  constructor() {
    super()
    this.sitekey = this.dataset["sitekey"] ?? ""
  }

  connectedCallback() {
    if (!this.querySelector("script")) {
      window.captchaOnLoadCallBack = this.render
      const script = document.createElement("script")
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=captchaOnLoadCallBack"
      script.async = true
      script.defer = true
      this.appendChild(script)
    }
  }

  private render = () => {
    window.turnstile.render(this, {
      sitekey: this.sitekey,
      callback: this.callback,
      size: "normal",
      execution: "execute",
    })
    this.ready = true
  }

  private callback = (token: string) => {
    window.Ares.emitEvent(document, "ares:captcha", { token })
    window.turnstile.reset()
  }

  public execute = () => {
    this.classList.add("show")
    return new Promise<string>((resolve, reject) => {
      document.addEventListener("ares:captcha", (event) => {
        this.classList.remove("show")
        resolve(event.detail.token)
      }, { once: true })
      try {
        window.turnstile.execute(this)
      } catch (error) {
        this.classList.remove("show")
        reject(error)
      }
    })
  }
}