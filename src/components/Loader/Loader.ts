import type { AresLoadingEvent } from "../../scripts/types";

/**
 * Custom element that displays a loading overlay with an optional message.
 *
 * Listens for `ares:loading` events on `document` to show or hide itself,
 * toggling visibility and updating ARIA attributes for accessibility.
 *
 * @element ares-loader
 * @listens ares:loading - Shows the loader when `loading` is true, hides it otherwise.
 */
export class Loader extends HTMLElement {
  private messageElement: HTMLElement;

  constructor() {
    super();
    this.messageElement = this.querySelector(
      "[data-js=message]",
    ) as HTMLElement;
  }

  connectedCallback() {
    document.addEventListener("ares:loading", this.loadingEventHandler);
  }

  disconnectedCallback() {
    document.removeEventListener("ares:loading", this.loadingEventHandler);
  }

  /**
   * Shows or hides the loader in response to an `ares:loading` event.
   * When shown, renders the provided message (if any) and marks the element
   * as visible to assistive technologies.
   */
  private loadingEventHandler = (event: AresLoadingEvent) => {
    const { loading, message } = event.detail;
    this.classList.toggle("active", loading);
    this.setAttribute("aria-hidden", String(!loading));
    this.messageElement.innerHTML = message ?? "";
  };
}