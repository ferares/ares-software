import type { AresThemeEvent, Theme } from "../../scripts/types";

/**
 * Root application element that manages the active theme.
 *
 * Applies a `theme-{name}` class to itself and updates the `<meta name="theme-color">`
 * tag to match, keeping the browser in sync with the selected theme.
 *
 * @listens ares:theme - Updates the theme when dispatched by other components.
 */
export class App extends HTMLElement {
  /** The `<meta name="theme-color">` tag used to tint the browser UI on mobile. */
  private themeColorMeta: Element | null = null;

  connectedCallback() {
    this.themeColorMeta = document.querySelector("[name=theme-color]");
    this.setTheme(window.Ares.getTheme());
    document.addEventListener("ares:theme", this.themeEventHandler);
  }

  disconnectedCallback() {
    document.removeEventListener("ares:theme", this.themeEventHandler);
  }

  /** Syncs the theme state when `ares:theme` is dispatched. */
  private themeEventHandler = (event: AresThemeEvent) => {
    this.setTheme(event.detail.theme);
  };

  /**
   * Applies the given theme by swapping the `theme-{name}` class on the element
   * and updating the browser's theme-color meta tag.
   */
  private setTheme(theme: Theme) {
    this.classList.remove("theme-dark", "theme-light");
    this.classList.add(`theme-${theme}`);
    const themeColor = theme === "dark" ? "black" : "white";
    this.themeColorMeta?.setAttribute("content", themeColor);
  }
}