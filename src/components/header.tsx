"use client"

import { useEffect } from "react"

import Image from "next/image"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

import { useBackgroundContext } from "@/context/background"
import { useScreenReaderContext } from "@/context/screenReader"

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
        <button className="navbar__btn" type="button" onClick={newBackground} title={t("change-background")}>
          <Image className="navbar__img" src={meImg} alt="" />
        </button>
        <ul className="navbar__menu">
          <li className="navbar__menu__item">
            <a className="navbar__menu__link" target="_blank" rel="noreferrer nofollow noopener" href="https://github.com/ferares">
              <FontAwesomeIcon className="navbar__menu__icon" icon={faGithub} aria-label="GitHub" />
            </a>
          </li>
          <li className="navbar__menu__item">
            <a className="navbar__menu__link" target="_blank" rel="noreferrer nofollow noopener" href="https://www.linkedin.com/in/ferm%C3%ADn-ares-0249b71ab/">
              <FontAwesomeIcon className="navbar__menu__icon" icon={faLinkedin} aria-label="Linkedin" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header