"use client"

import { type MouseEvent, useCallback } from "react"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faCookieBite, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

import { scrollIntoView } from "@/helpers/scroll"

import { useCookieConsentContext } from "@/context/cookieConsent"

function Footer() {
  const t = useTranslations("Labels")
  const { showCookieConsentAlert } = useCookieConsentContext()

  const handleContactClick = useCallback((event: MouseEvent) => {
    event.preventDefault()
    scrollIntoView("#contact")
  }, [])

  return (
    <footer className="footer">
      <div className="max-width">
        <div className="footer__content">
          <div className="footer__developed">
            <FontAwesomeIcon className="footer__icon" icon={faCode} aria-label={t("developed")} />
            <span className="footer__text">
              {t("in")} La Paloma, Rocha, Uruguay 
            </span>
          </div>
          <ul className="footer__menu">
            <li className="footer__menu__item">
              <a className="footer__menu__link" target="_blank" rel="noreferrer nofollow noopener" href="https://github.com/ferares">
                <FontAwesomeIcon className="footer__menu__icon" icon={faGithub} aria-label="GitHub" />
              </a>
            </li>
            <li className="footer__menu__item">
              <a className="footer__menu__link" target="_blank" rel="noreferrer nofollow noopener" href="https://www.linkedin.com/in/ferm%C3%ADn-ares-0249b71ab/">
                <FontAwesomeIcon className="footer__menu__icon" icon={faLinkedin} aria-label="Linkedin" />
              </a>
            </li>
            <li className="footer__menu__item">
              <a className="footer__menu__link" target="_blank" rel="noreferrer nofollow noopener" href="#contact" onClick={(event) => handleContactClick(event)}>
                <FontAwesomeIcon className="footer__menu__icon" icon={faEnvelope} aria-label={t("contact-me")} />
              </a>
            </li>
            <li className="footer__menu__item">
              <button type="button" className="footer__menu__link" onClick={() => showCookieConsentAlert()}>
                <FontAwesomeIcon className="footer__menu__icon" icon={faCookieBite} aria-label={t("cookie-settings")} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer