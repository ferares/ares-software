"use client"

import { type MouseEvent, useCallback } from "react"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faCookieBite, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

import { scrollIntoView } from "@/helpers/scroll"

import { useCookieConsentContext } from "@/context/cookieConsent"

const GITHUB_LINK = "https://github.com/Ares-Software-SAS"
const LINKEDIN_LINK = "https://linkedin.com/company/ares-software-sas"

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
              <a className="footer__menu__link" target="_blank" rel="noreferrer nofollow noopener" href={GITHUB_LINK} aria-label="GitHub">
                <FontAwesomeIcon className="footer__menu__icon" icon={faGithub} />
              </a>
            </li>
            <li className="footer__menu__item">
              <a className="footer__menu__link" target="_blank" rel="noreferrer nofollow noopener" href={LINKEDIN_LINK} aria-label="LinkedIn">
                <FontAwesomeIcon className="footer__menu__icon" icon={faLinkedin} />
              </a>
            </li>
            <li className="footer__menu__item">
              <a className="footer__menu__link" target="_blank" rel="noreferrer nofollow noopener" href="#contact" onClick={(event) => handleContactClick(event)} aria-label={t("contact-us")}>
                <FontAwesomeIcon className="footer__menu__icon" icon={faEnvelope} />
              </a>
            </li>
            <li className="footer__menu__item">
              <button type="button" className="footer__menu__link" onClick={() => showCookieConsentAlert()} aria-label={t("cookie-settings")}>
                <FontAwesomeIcon className="footer__menu__icon" icon={faCookieBite} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer