import { prefersReducedMotion } from "./a11y"

export function scrollIntoView(target: string) {
  document.querySelector(target)?.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth" })
}