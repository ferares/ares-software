/**
 * Custom element that manages a simple click to scroll to the contact section.
 */
export class ContactButton extends HTMLElement {
  private anchor: HTMLAnchorElement

  constructor() {
    super()
    this.anchor = this.querySelector("[data-js=anchor]") as HTMLAnchorElement
  }

  connectedCallback() {
    this.anchor.addEventListener("click", this.clickHandler)
  }

  disconnectedCallback() {
    this.anchor.removeEventListener("click", this.clickHandler);
  }

  /** Scroll to the contact section */
  private clickHandler = (event: PointerEvent) => {
    event.preventDefault()
    window.Ares.scrollIntoView("#contact")
  };
}