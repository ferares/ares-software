"use client"

import { useCallback, useRef, useState } from "react"

import { type Locale, useLocale, useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLanguage } from "@fortawesome/free-solid-svg-icons"

import { labels, locales } from "@/i18n/routing"
import { redirect } from "@/i18n/navigation"

import Dropdown from "./dropdown"

export default function LangMenu() {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const locale = useLocale()
  const t = useTranslations("Labels")

  const changeLocale = useCallback(async (localeOption: Locale) => {
    redirect({ href: { pathname: "/" }, locale: localeOption })
    setOpen(false)
  }, [])

  return (
    <>
      <button ref={btnRef} id="button-lang" type="button" aria-controls="dropdown-lang" title={t("change-language")} className="language-button" aria-expanded={open} onClick={() => setOpen((open) => !open)}>
        <FontAwesomeIcon className="navbar__menu__icon" icon={faLanguage} />
      </button>
      <Dropdown id="dropdown-lang" open={open} onClose={() => setOpen(false)} togglerRef={btnRef}>
        <ul role="menu" aria-labelledby="button-lang">
          {locales.map((localeOption, index) => {
            if (localeOption === locale) return null
            return (
              <li role="menuitem" key={index}>
                <button type="button" onClick={() => changeLocale(localeOption)} lang={localeOption}>
                  {labels[localeOption]}
                </button>
              </li>
            )
          })}
        </ul>
      </Dropdown>
    </>
  )
}