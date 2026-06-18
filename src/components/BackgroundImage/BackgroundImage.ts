import type { AresBackgroundEvent } from "../../scripts/types";

import type { Locale } from "../../i18n/config";
import { useTranslations } from "../../i18n/utils";

/**
 * Custom element that manages the background image of a section.
 *
 * Listens for `ares:background` events on `document` to know when a
 * new background is requested or ready to be displayed.
 *
 * @listens ares:background - Updates the background when a new background image gets loaded.
 */
export class BackgroundImage extends HTMLElement {
  private section: HTMLElement;
  private firstLoad = true
  private t = useTranslations(window.Astro.currentLocale as Locale);

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
      if (!this.firstLoad) {
        window.Ares.pushScreenReaderAlert({ type: "polite", content: this.t("Messages.changing-bg-img") })
      }
      // Fade out current background image
      this.section.classList.remove("image-loaded");
    } else if (event.detail.state === "loaded") {
      if (!this.firstLoad) {
        window.Ares.pushScreenReaderAlert({ type: "polite", content: this.t("Messages.bg-img-changed") })
      }
      // Set the new image url
      this.section.style.backgroundImage = `url(${event.detail.url})`;
      // Fade in the new image
      this.section.classList.add("image-loaded");
      this.firstLoad = false
    }
  };
}