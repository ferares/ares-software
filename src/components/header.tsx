"use client"

import { useCallback, useEffect } from "react"

import Image from "next/image"

import { useTranslations } from "next-intl"

import { prefersReducedMotion } from "@/helpers/a11y"

import { useBackgroundContext } from "@/context/background"
import { useAlertsContext } from "@/context/alerts"
import { useMenuContext } from "@/context/menu"

import LangMenu from "./langMenu"

import meImg from "@/../public/imgs/header.jpg"

function Header() {
  const { newBackground, loadingBg } = useBackgroundContext()
  const { pushScreenReaderAlert } = useAlertsContext()
  const { open, toggleMenu } = useMenuContext()
  const t = useTranslations()

  useEffect(() => {
    if (loadingBg) pushScreenReaderAlert("polite", t("Messages.changing-bg-img"))
    else pushScreenReaderAlert("polite", t("Messages.bg-img-changed"))
  }, [loadingBg, pushScreenReaderAlert, t])

  const handleAvatarClick = useCallback(() => {
    document.querySelector("#main")?.scrollTo({ behavior: prefersReducedMotion() ? "instant" : "smooth", top: 0 })
    newBackground()
  }, [newBackground])

  return (
    <header className="header">
      <nav className="navbar max-width">
        <a className="skip-main visually-hidden-focusable" href="#main">
          {t("Labels.skip-to-content")}
        </a>
        <div className="navbar__content">
          <button className="navbar__btn" type="button" onClick={handleAvatarClick} title={t("Labels.change-background")}>
            <Image className="navbar__img" src={meImg} alt="" height={48} width={48} />
          </button>
          <div className="navbar__content__right">
            <LangMenu />
            <button type="button" className={`menu-toggle-btn ${open ? "open" : ""}`} aria-controls="main-menu" aria-expanded={open} aria-label={open ? t("Labels.close-menu") : t("Labels.open-menu")} onClick={toggleMenu}>
              <span className="icon-hamburger">
                <span className="icon-hamburger__line"></span>
                <span className="icon-hamburger__line"></span>
                <span className="icon-hamburger__line"></span>
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header