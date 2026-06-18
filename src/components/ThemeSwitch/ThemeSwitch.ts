import type { AresSwitchEvent, AresThemeEvent, Theme } from "../../scripts/types";
import type { Switch } from "../Switch/Switch.ts";

/**
 * Custom element that binds an `ares-switch` to the application theme.
 *
 * Initializes the switch position to match the current theme on connection,
 * and persists theme changes to `localStorage` while notifying other
 * components via an `ares:theme` event.
 *
 * @listens ares:switch - On its Switch element to trigger a theme change.
 */
export class ThemeSwitch extends HTMLElement {
  private switchElement: Switch;

  constructor() {
    super();
    this.switchElement = this.querySelector("ares-switch") as Switch;
  }

  connectedCallback() {
    this.switchElement.set(window.Ares.getTheme() === "dark" ? "left" : "right");
    this.switchElement.addEventListener("ares:switch", this.switchHandler);
  }

  disconnectedCallback() {
    this.switchElement.removeEventListener("ares:switch", this.switchHandler);
  }

  /**
   * Updates the active theme in response to an `ares:switch` state change.
   */
  private switchHandler = (event: AresSwitchEvent) => {
    const theme = event.detail.state === "left" ? "dark" : "light";
    window.Ares.setTheme(theme)
  };
}