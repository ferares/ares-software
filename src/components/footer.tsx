import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

function Footer() {
  const t = useTranslations("Labels")
  return (
    <footer className="footer">
      <div className="max-width">
        <div className="footer__content">
          <div className="footer__developed">
            <FontAwesomeIcon className="footer__icon" icon={faCode} title={t("developed")} />
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
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer