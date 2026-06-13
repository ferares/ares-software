import type { AresMenuEvent } from "../../scripts/types";

/**
 * Custom element that manages the navigation menu's open/close state.
 *
 * Listens for `ares:menu` events on `document` to sync state, and closes
 * the menu when a click occurs outside the element or on a nav link.
 *
 * @element ares-menu
 * @listens ares:menu - Opens/closes the menu.
 * @fires ares:menu - Dispatched when the menu is closed.
 */
export class Menu extends HTMLElement {
  private initialized = false;
  private menu: HTMLElement;
  private links: NodeListOf<HTMLAnchorElement>;
  private isOpen = false;

  constructor() {
    super();
    this.menu = this.querySelector("[data-js=nav]") as HTMLElement;
    this.links = this.querySelectorAll("[data-js=nav-link]");
  }

  connectedCallback() {
    document.addEventListener("click", this.documentClickHandler);
    document.addEventListener("ares:menu", this.menuEventHandler);
    // Don't re-attach nav link listeners on reconnection alone
    if (!this.initialized) {
      this.links.forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          window.Ares.scrollIntoView(link.getAttribute("href"));
          this.close();
        });
      });
      this.initialized = true;
    }
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.documentClickHandler);
    document.removeEventListener("ares:menu", this.menuEventHandler);
  }

  /**
   * Syncs open/close state in response to `ares:menu` events dispatched
   * by the menu toggle button
   */
  private menuEventHandler = (event: AresMenuEvent) => {
    this.isOpen = event.detail.open;
    this.menu.classList.toggle("show", this.isOpen);
  };

  /**
   * Closes the menu when the user clicks outside of it,
   * unless the click was on the menu's toggle button.
   */
  private documentClickHandler = (event: PointerEvent) => {
    const target = event.target as HTMLElement;
    const clickOnMenuBtn = document
      .querySelector("[aria-controls='main-menu']")
      ?.contains(target);
    if (!this.contains(target) && !clickOnMenuBtn && this.isOpen) {
      this.close();
    }
  };

  /**
   * Closes the menu by updating local state and notifying other
   * components via an `ares:menu` event.
   */
  private close = () => {
    window.Ares.emitEvent(document, "ares:menu", { open: false });
  };
}