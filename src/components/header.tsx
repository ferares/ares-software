"use client"

import { useCallback, useEffect } from "react"

import Image from "next/image"

import { useTranslations } from "next-intl"

import { prefersReducedMotion } from "@/helpers/a11y"

import { useBackgroundContext } from "@/context/background"
import { useAlertsContext } from "@/context/Alerts"

import LangMenu from "./langMenu"

import meImg from "@/../public/icons/me.jpg"

function Header() {
  const { newBackground, loadingBg } = useBackgroundContext()
  const { pushScreenReaderAlert } = useAlertsContext()
  const t = useTranslations()

  useEffect(() => {
    if (loadingBg) pushScreenReaderAlert("polite", t("Messages.changing-bg-img"))
    else pushScreenReaderAlert("polite", t("Messages.bg-img-changed"))
  }, [loadingBg, pushScreenReaderAlert, t])

  const handleClick = useCallback(() => {
    document.querySelector("#main")?.scrollTo({ behavior: prefersReducedMotion() ? "instant" : "smooth", top: 0 })
    newBackground()
  }, [newBackground])

  return (
    <header className="header">
      <nav className="navbar max-width">
        <div className="navbar__content">
          <button className="navbar__btn" type="button" onClick={handleClick} title={t("Labels.change-background")}>
            <Image className="navbar__img" src={meImg} alt="" />
          </button>
          <LangMenu />
        </div>
      </nav>
    </header>
  )
}

export default Header