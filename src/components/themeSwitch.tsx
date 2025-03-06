import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

import { useThemeContext } from "@/context/theme"

function ThemeSwitch() {
  const { theme, toggleTheme } = useThemeContext()
  const t = useTranslations("Labels")
  return (
    <button type="button" className="theme-switch" onClick={toggleTheme} aria-label={theme === "dark" ? t("switch-light") : t("switch-dark")}>
      <span className={`theme-switch__indicator ${theme === "dark" ? "left" : "right"}`}></span>
      <span className="theme-switch__icon">
        <FontAwesomeIcon icon={faMoon} />
      </span>
      <span className="theme-switch__icon">
        <FontAwesomeIcon icon={faSun} />
      </span>
    </button>
  )
}

export default ThemeSwitch