import type { AresBackgroundEvent } from "../../scripts/types";

/**
 * Custom element that manages the background image of a section.
 *
 * Listens for `ares:background` events on `document` to know when a
 * new background is requested or ready to be displayed.
 *
 * @element ares-background-image
 * @listens ares:background - Updates the background when a new background image gets loaded.
 */
export class BackgroundImage extends HTMLElement {
  private section: HTMLElement;

  constructor() {
    super();
    this.section = this.querySelector("[data-js=section]") as HTMLElement;
  }

  connectedCallback() {
    document.addEventListener("ares:background", this.handleBackgroundEvent);
    window.Ares.switchBackground(); // Load the initial background
  }

  disconnectedCallback() {
    document.removeEventListener(
      "ares:background",
      this.handleBackgroundEvent,
    );
  }

  /**
   * When a new background image starts loading fade out the current background.
   * When a new background image has been loaded fade it in.
   */
  private handleBackgroundEvent = (event: AresBackgroundEvent) => {
    if (event.detail.state === "loading") {
      // Fade out current background image
      this.section.classList.remove("image-loaded");
    } else if (event.detail.state === "loaded") {
      // Set the new image url
      this.section.style.backgroundImage = `url(${event.detail.url})`;
      // Fade in the new image
      this.section.classList.add("image-loaded");
    }
  };
}