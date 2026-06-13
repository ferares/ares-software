/**
 * Custom element that wraps a "next section" anchor link,
 * replacing default navigation with a smooth scroll to the target.
 *
 * @element ares-next-button
 */
export class NextButton extends HTMLElement {
  private anchor: HTMLAnchorElement;

  constructor() {
    super();
    this.anchor = this.querySelector("[data-js=anchor]") as HTMLAnchorElement;
  }

  connectedCallback() {
    this.anchor.addEventListener("click", this.clickHandler);
  }

  disconnectedCallback() {
    this.anchor.removeEventListener("click", this.clickHandler);
  }

  /**
   * Prevents default anchor navigation and scrolls to the
   * anchor's `href` target using the Ares scroll utility.
   */
  private clickHandler = (event: PointerEvent) => {
    event.preventDefault();
    window.Ares.scrollIntoView(this.anchor.getAttribute("href"));
  };
}