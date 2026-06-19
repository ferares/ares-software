import type { AresEventMap, Theme } from "./types";

import type { Locale } from "../i18n/config";

import { Alerts, type Alert, type ScreenReaderAlert } from "../components/Alerts/Alerts.ts";
import { App } from "../components/App/App.ts";
import { Avatar } from "../components/Avatar/Avatar.ts";
import { BackgroundImage } from "../components/BackgroundImage/BackgroundImage.ts";
import { Captcha } from "../components/Captcha/Captcha.ts";
import { Carousel } from "../components/Carousel/Carousel.ts";
import { ContactButton } from "../components/ContactButton/ContactButton.ts";
import { ContactForm } from "../components/ContactForm/ContactForm.ts";
import { CookiesBar } from "../components/CookiesBar/CookiesBar.ts";
import { CookiesButton } from "../components/CookiesButton/CookiesButton.ts";
import { CVButton } from "../components/CVButton/CVButton.ts";
import { Dropdown } from "../components/Dropdown/Dropdown.ts";
import { GoogleTagManager } from "../components/GoogleTagManager/GoogleTagManager.ts";
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
    turnstile: Turnstile.Turnstile,
    captchaOnLoadCallBack?: () => void
    // GTM
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
  interface ElementEventMap extends AresEventMap { }
  interface DocumentEventMap extends AresEventMap { }
}

export class Ares {
  private static readonly COOKIE_CONSENT_STORAGE_KEY = "cookieConsent"
  private static readonly THEME_STORAGE_KEY = "theme"
  public readonly prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  public ready = (fn: () => any) => {
    document.addEventListener('DOMContentLoaded', fn)
  }

  public emitEvent = <T extends keyof HTMLElementEventMap>(element: Node, name: T, ...data: OptionalArg<EventDetail<HTMLElementEventMap[T]>>) => {
    element.dispatchEvent(new CustomEvent(name, { detail: data[0] }))
  }

  public setLoading = (loading: boolean, message?: string) => {
    this.emitEvent(document, 'ares:loading', { loading, message })
  }

  public scrollIntoView = (target: string | null, event?: MouseEvent) => {
    if (!target) return
    event?.preventDefault()
    document.querySelector(target)?.scrollIntoView({ behavior: this.prefersReducedMotion ? "instant" : "smooth" })
  }

  public loadImage = async (url: string) => {
    return new Promise((resolve, reject) => {
      const imgElement = document.createElement("img")
      imgElement.addEventListener("load", () => resolve(url))
      imgElement.addEventListener("error", reject)
      imgElement.src = url
    })
  }

  public switchBackground = async () => {
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

  public pushAlert = (alert: Alert) => {
    const alerts = document.querySelector("ares-alerts") as Alerts | undefined
    if (!alerts) return
    alerts.push(alert)
  }

  public pushScreenReaderAlert = (alert: ScreenReaderAlert) => {
    const alerts = document.querySelector("ares-alerts") as Alerts | undefined
    if (!alerts) return
    alerts.pushScreenReader(alert)
  }

  public setTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    this.emitEvent(document, "ares:theme", { theme });
  }

  public getTheme = (): Theme => {
    const localStorageTheme = localStorage?.getItem(Ares.THEME_STORAGE_KEY) ?? "";
    if (["dark", "light"].includes(localStorageTheme)) {
      return localStorageTheme as Theme;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  public setCookieConsent = (consentGiven: boolean | null) => {
    if (consentGiven === null) {
      localStorage.removeItem(Ares.COOKIE_CONSENT_STORAGE_KEY)
    } else {
      localStorage.setItem(Ares.COOKIE_CONSENT_STORAGE_KEY, String(consentGiven))
    }
    this.emitEvent(document, "ares:cookies", { consentGiven })
  }

  public getCookieConsent = () => {
    const saved = localStorage.getItem(Ares.COOKIE_CONSENT_STORAGE_KEY)
    if (saved === null) return null
    return saved === "true"
  }
}

window.Ares = new Ares();

window.Ares.ready(() => {
  customElements.define("ares-modal", Modal);
  customElements.define("ares-alerts", Alerts);
  customElements.define("ares-app", App);
  customElements.define("ares-avatar", Avatar);
  customElements.define("ares-background-image", BackgroundImage);
  customElements.define("ares-captcha", Captcha);
  customElements.define("ares-carousel", Carousel);
  customElements.define("ares-contact-button", ContactButton);
  customElements.define("ares-contact-form", ContactForm);
  customElements.define("ares-cookies-bar", CookiesBar);
  customElements.define("ares-cookies-button", CookiesButton);
  customElements.define("ares-cv-button", CVButton);
  customElements.define("ares-dropdown", Dropdown);
  customElements.define("ares-gtm", GoogleTagManager);
  customElements.define("ares-lang-menu", LangMenu);
  customElements.define("ares-loader", Loader);
  customElements.define("ares-menu", Menu);
  customElements.define("ares-menu-toggle", MenuToggle);
  customElements.define("ares-next-button", NextButton);
  customElements.define("ares-projects-list", ProjectsList);
  customElements.define("ares-switch", Switch);
  customElements.define("ares-theme-switch", ThemeSwitch);
  customElements.define("ares-video-player", VideoPlayer);
})