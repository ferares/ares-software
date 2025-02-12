"use client"

import { useEffect } from "react"

import Image from "next/image"

import { useTranslations } from "next-intl"

import { useBackgroundContext } from "@/context/background"
import { useScreenReaderContext } from "@/context/screenReader"

import LangMenu from "./langMenu"

import meImg from "@/../public/icons/me.jpg"

function Header() {
  const { newBackground, loadingBg } = useBackgroundContext()
  const { setMessage } = useScreenReaderContext()
  const t = useTranslations("Labels")

  useEffect(() => {
    if (loadingBg) setMessage("Cambiando imagen de fondo")
    else setMessage("Imagen de fondo cambiada")
  }, [loadingBg, setMessage])

  return (
    <header className="header">
      <nav className="navbar max-width">
        <div className="navbar__content">
          <button className="navbar__btn" type="button" onClick={newBackground} title={t("change-background")}>
            <Image className="navbar__img" src={meImg} alt="" />
          </button>
          <LangMenu />
        </div>
      </nav>
    </header>
  )
}

export default Header