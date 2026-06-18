/**
 * Custom element that renders an interactive avatar button.
 *
 * Clicking the avatar scrolls the main content area back to the top
 * and triggers a background switch via {@link window.Ares.switchBackground}.
 */
export class Avatar extends HTMLElement {
  private mainElement: Element | null = null;
  private button: HTMLButtonElement;

  constructor() {
    super();
    this.button = this.querySelector("[data-js=button]") as HTMLButtonElement;
  }

  connectedCallback() {
    this.mainElement = document.querySelector("#main");
    this.button.addEventListener("click", this.clickHandler);
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.clickHandler);
  }

  /**
   * Scrolls the main element to the top, respecting the user's
   * reduced motion preference, then switches the background.
   */
  private clickHandler = () => {
    const behavior = window.Ares.prefersReducedMotion ? "instant" : "smooth";
    this.mainElement?.scrollTo({ behavior, top: 0 });
    window.Ares.switchBackground();
  };
}