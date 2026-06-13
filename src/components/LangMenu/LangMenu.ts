import type { Dropdown } from "../Dropdown/Dropdown.ts";

/**
 * Custom element that manages a language selection dropdown.
 *
 * Toggles an `ares-dropdown` open/closed via a button, and navigates
 * to the selected locale's root path when a locale option is chosen.
 *
 * @element ares-lang-menu
 */
export class LangMenu extends HTMLElement {
  private isOpen = false;
  private dropdown: Dropdown;
  private toggler: HTMLButtonElement;
  private localeButtons: NodeListOf<HTMLButtonElement>;
  private initialized = false;

  constructor() {
    super();
    this.dropdown = this.querySelector("ares-dropdown") as Dropdown;
    this.toggler = this.querySelector(
      "[data-js=toggler]",
    ) as HTMLButtonElement;
    this.localeButtons = this.querySelectorAll("[data-locale]");
  }

  connectedCallback() {
    this.toggler.addEventListener("click", this.toggleClickHandler);
    if (!this.initialized) {
      this.localeButtons.forEach((optionBtn) => {
        optionBtn.addEventListener("click", () => {
          window.location.href = `/${optionBtn.getAttribute("data-locale")}`;
        });
      });
      this.initialized = true;
    }
  }

  disconnectedCallback() {
    this.toggler.removeEventListener("click", this.toggleClickHandler);
  }

  /** Toggles the dropdown open or closed on each button click. */
  private toggleClickHandler = () => {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.dropdown.open();
      this.toggler.classList.add("open");
      this.toggler.ariaExpanded = "true";
    } else {
      this.dropdown.close();
      this.toggler.classList.remove("open");
      this.toggler.ariaExpanded = "false";
    }
  };
}