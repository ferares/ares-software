import type { AresDropdownEvent } from "../../scripts/types.ts";
import type { Dropdown } from "../Dropdown/Dropdown.ts";

/**
 * Custom element that manages a language selection dropdown.
 *
 * Toggles an `ares-dropdown` open/closed via a button, and navigates
 * to the selected locale's root path when a locale option is chosen.
 * Listens for `ares:dropdown` events on its dropdown to keep its open state in sync.
 *
 * @listens ares:dropdown - Updates the open state when a the dropdown opens/closes on its own.
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
    this.dropdown.addEventListener("ares:dropdown", this.dropdownEventHandler)
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
    this.dropdown.removeEventListener("ares:dropdown", this.dropdownEventHandler)
    this.toggler.removeEventListener("click", this.toggleClickHandler);
  }

  /** Sync the open or closed state whenever the dropdown changes on its own. */
  private dropdownEventHandler = (event: AresDropdownEvent) => {
    if (event.detail.open !== this.isOpen) this.toggleClickHandler()
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