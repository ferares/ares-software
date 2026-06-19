export type Theme = "light" | "dark"
export type SwitchState = "left" | "right"

export type AresBackgroundEvent = CustomEvent<{ state: "loading" } | { state: "error" } | { state: "loaded", url: string }>
export type AresLoadingEvent = CustomEvent<{ loading: boolean, message?: string }>
export type AresMenuEvent = CustomEvent<{ open: boolean }>
export type AresThemeEvent = CustomEvent<{ theme: Theme }>
export type AresSwitchEvent = CustomEvent<{ state: SwitchState }>
export type AresDropdownEvent = CustomEvent<{ open: boolean }>
export type AresCookieConsentEvent = CustomEvent<{ consentGiven: boolean | null }>
export type AresCaptchaEvent = CustomEvent<{ token: string }>

export type AresEventMap = {
  'ares:background': AresBackgroundEvent
  'ares:loading': AresLoadingEvent
  'ares:menu': AresMenuEvent
  'ares:theme': AresThemeEvent
  'ares:switch': AresSwitchEvent
  'ares:dropdown': AresDropdownEvent
  'ares:cookies': AresCookieConsentEvent
  'ares:captcha': AresCaptchaEvent
}