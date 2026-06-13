import type { AresEventMap, Theme } from "./types";

import type { Locale } from "../i18n/config";

import { App } from "../components/App/App.ts";
import { Avatar } from "../components/Avatar/Avatar.ts";
import { BackgroundImage } from "../components/BackgroundImage/BackgroundImage.ts";
import { Carousel } from "../components/Carousel/Carousel.ts";
import { Dropdown } from "../components/Dropdown/Dropdown.ts";
import { LangMenu } from "../components/LangMenu/LangMenu.ts";
import { Loader } from "../components/Loader/Loader.ts";
import { Menu } from "../components/Menu/Menu.ts";
import { MenuToggle } from "../components/MenuToggle/MenuToggle.ts";
import { Modal } from "../components/Modal/Modal.ts";
import { NextButton } from "../components/NextButton/NextButton.ts";
import { ProjectsList } from "../components/ProjectsList/ProjectsList.ts";
import { Switch } from "../components/Switch/Switch.ts";
import { ThemeSwitch } from "../components/ThemeSwitch/ThemeSwitch.ts";
import { VideoPlayer } from "../components/VideoPlayer/VideoPlayer.ts";

type EventDetail<T> = T extends CustomEvent<infer D> ? D : T extends Event ? void : never

type OptionalArg<D> = D extends void ? [] : [data: D]

declare global {
  interface Window {
    Ares: Ares,
    Astro: { currentLocale: Locale }
  }
  interface ElementEventMap extends AresEventMap { }
  interface DocumentEventMap extends AresEventMap { }
}

export class Ares {
  public readonly prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  public readonly theme: Theme = Ares.getInitialTheme()

  private static getInitialTheme(): Theme {
    const localStorageTheme = localStorage?.getItem("theme") ?? "";
    if (["dark", "light"].includes(localStorageTheme)) {
      return localStorageTheme as Theme;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  public ready(fn: () => any) {
    document.addEventListener('DOMContentLoaded', fn)
  }

  public emitEvent<T extends keyof HTMLElementEventMap>(element: Node, name: T, ...data: OptionalArg<EventDetail<HTMLElementEventMap[T]>>) {
    element.dispatchEvent(new CustomEvent(name, { detail: data[0] }))
  }

  public setLoading(loading: boolean, message?: string) {
    this.emitEvent(document, 'ares:loading', { loading, message })
  }

  public scrollIntoView(target: string | null) {
    if (!target) return
    document.querySelector(target)?.scrollIntoView({ behavior: this.prefersReducedMotion ? "instant" : "smooth" })
  }

  public async loadImage(url: string) {
    return new Promise((resolve, reject) => {
      const imgElement = document.createElement("img")
      imgElement.addEventListener("load", () => resolve(url))
      imgElement.addEventListener("error", reject)
      imgElement.src = url
    })
  }

  public async switchBackground() {
    window.Ares.emitEvent(document, "ares:background", { state: "loading" });
    try {
      const response = (await fetch("https://postales.ares.uy/random").then(
        (response) => response.json(),
      )) as { url: string };
      if (!response.url) throw new Error("No background image URL")
      const url = `https://postales.ares.uy/${response.url}`
      await this.loadImage(url)
      window.Ares.emitEvent(document, "ares:background", {
        state: "loaded",
        url,
      });
    } catch (error) {
      window.Ares.emitEvent(document, "ares:background", { state: "error" });
      console.error("Error fetching background image", error);
    }
  }
}

window.Ares = new Ares();

window.Ares.ready(() => {
  customElements.define("ares-app", App);
  customElements.define("ares-avatar", Avatar);
  customElements.define("ares-background-image", BackgroundImage);
  customElements.define("ares-carousel", Carousel);
  customElements.define("ares-dropdown", Dropdown);
  customElements.define("ares-lang-menu", LangMenu);
  customElements.define("ares-loader", Loader);
  customElements.define("ares-menu", Menu);
  customElements.define("ares-menu-toggle", MenuToggle);
  customElements.define("ares-modal", Modal);
  customElements.define("ares-next-button", NextButton);
  customElements.define("ares-projects-list", ProjectsList);
  customElements.define("ares-switch", Switch);
  customElements.define("ares-theme-switch", ThemeSwitch);
  customElements.define("ares-video-player", VideoPlayer);
})