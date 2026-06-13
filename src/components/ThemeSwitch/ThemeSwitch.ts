import type { AresSwitchEvent, Theme } from "../../scripts/types";
import type { Switch } from "../Switch/Switch.ts";

/**
 * Custom element that binds an `ares-switch` to the application theme.
 *
 * Initializes the switch position to match the current theme on connection,
 * and persists theme changes to `localStorage` while notifying other
 * components via an `ares:theme` event.
 *
 * @element ares-theme-switch
 * @fires ares:theme - Dispatched on theme change.
 */
export class ThemeSwitch extends HTMLElement {
  private theme: Theme = window.Ares.theme;
  private switchElement: Switch;

  constructor() {
    super();
    this.switchElement = this.querySelector("ares-switch") as Switch;
  }

  connectedCallback() {
    this.switchElement.set(this.theme === "dark" ? "left" : "right");
    this.switchElement.addEventListener("ares:switch", this.switchHandler);
  }

  disconnectedCallback() {
    this.switchElement.removeEventListener("ares:switch", this.switchHandler);
  }

  /**
   * Updates the active theme in response to an `ares:switch` state change,
   * persists the selection to `localStorage`, and notifies other components.
   */
  private switchHandler = (event: AresSwitchEvent) => {
    this.theme = event.detail.state === "left" ? "dark" : "light";
    localStorage.setItem("theme", this.theme);
    window.Ares.emitEvent(document, "ares:theme", { theme: this.theme });
  };
}