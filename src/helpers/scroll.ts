import { prefersReducedMotion } from "./a11y"

export function scrollIntoView(target: string) {
  console.log(document.querySelector(target))
  document.querySelector(target)?.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth" })
}