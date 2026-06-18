export type Alert = { type: "info" | "success" | "danger", content: string, timeout?: number }

export type ScreenReaderAlert = { type: "assertive" | "polite", content: string }

export class Alerts extends HTMLElement {
  private alertTemplate: HTMLTemplateElement
  private screenReaderPoliteAlert: HTMLElement
  private screenReaderAssertiveAlert: HTMLElement
  private alerts: Alert[] = []
  private screenReaderAlerts: ScreenReaderAlert[] = []
  private running = false
  private screenReaderRunning = false

  constructor() {
    super()
    this.alertTemplate = this.querySelector("[data-js=template]") as HTMLTemplateElement
    this.screenReaderPoliteAlert = this.querySelector("[aria-live=polite]") as HTMLElement
    this.screenReaderAssertiveAlert = this.querySelector("[aria-live=assertive]") as HTMLElement
  }

  private show = (alert: Alert) => {
    return new Promise<void>(resolve => {
      let timeoutId: number | undefined
      const alertElement = this.render(alert)
      this.appendChild(alertElement)
      const dismiss = () => {
        clearTimeout(timeoutId)
        alertElement.addEventListener("transitionend", () => {
          alertElement.remove()
          resolve()
        }, { once: true })
        alertElement.classList.add("hide")
      }
      alertElement.querySelector<HTMLButtonElement>("[data-js=button]")!
        .addEventListener("click", dismiss, { once: true })
      if (alert.timeout) {
        timeoutId = setTimeout(dismiss, alert.timeout)
      }
    })
  }

  private drain = async () => {
    this.running = true
    while (this.alerts.length > 0) {
      await this.show(this.alerts.shift()!)
    }
    this.running = false
  }

  private render = (alert: Alert) => {
    const alertElement = this.alertTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement
    alertElement.classList.add(`alert--${alert.type}`)
    alertElement.querySelector("[data-js=content]")!.innerHTML = alert.content
    return alertElement
  }

  private showScreenReader = (alert: ScreenReaderAlert) => {
    return new Promise<void>(resolve => {
      const alertElement = alert.type === "polite" ? this.screenReaderPoliteAlert : this.screenReaderAssertiveAlert
      alertElement.textContent = alert.content
      setTimeout(resolve, 1)
    })
  }

  private drainScreenReader = async () => {
    this.screenReaderRunning = true
    while (this.screenReaderAlerts.length > 0) {
      await this.showScreenReader(this.screenReaderAlerts.shift()!)
    }
    this.screenReaderRunning = false
  }

  push = (alert: Alert) => {
    this.alerts.push(alert)
    if (!this.running) this.drain()
  }

  pushScreenReader = (alert: ScreenReaderAlert) => {
    this.screenReaderAlerts.push(alert)
    if (!this.screenReaderRunning) this.drainScreenReader()
  }
}