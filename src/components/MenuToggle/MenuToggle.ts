import type { Locale } from "../../i18n/config";
import { useTranslations } from "../../i18n/utils";
import type { AresMenuEvent } from "../../scripts/types";

/**
 * Custom element that manages the navigation menu's toggle butotn.
 *
 * Listens for `ares:menu` events on `document` to sync state, and toggles
 * the menu when the user clicks on the toggle button.
 *
 * @element ares-menu-toggle
 * @listens ares:menu - To update its state.
 * @fires ares:menu - Dispatched when the button is clicked.
 */
export class MenuToggle extends HTMLElement {
  private button: HTMLButtonElement;
  private isOpen = false;
  private t = useTranslations(window.Astro.currentLocale as Locale);

  constructor() {
    super();
    this.button = this.querySelector("[data-js=button]") as HTMLButtonElement;
  }

  connectedCallback() {
    this.button.addEventListener("click", this.clickHandler);
    document.addEventListener("ares:menu", this.menuEventHandler);
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.clickHandler);
    document.removeEventListener("ares:menu", this.menuEventHandler);
  }

  /**
   * Toggles the menu when the user clicks on the button
   */
  private clickHandler = () => {
    this.isOpen = !this.isOpen;
    this.sync();
    window.Ares.emitEvent(document, "ares:menu", { open: this.isOpen });
  };

  /**
   * Syncs open/close state in response to `ares:menu` events dispatched
   * by the menu itself
   */
  private menuEventHandler = (event: AresMenuEvent) => {
    this.isOpen = event.detail.open;
    this.sync();
  };

  /**
   * Syncs the button's attributes with the current open/close state
   */
  private sync = () => {
    if (this.isOpen) {
      this.button.ariaExpanded = "true";
      this.button.ariaLabel = this.t("Labels.close-menu");
    } else {
      this.button.ariaExpanded = "false";
      this.button.ariaLabel = this.t("Labels.open-menu");
    }
    this.button.classList.toggle("open", this.isOpen);
  };
}