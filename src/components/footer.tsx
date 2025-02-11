import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"

function Footer() {
  const t = useTranslations("Labels")
  return (
    <footer className="footer">
      <div className="max-width">
        <div className="footer__content">
          <FontAwesomeIcon className="footer__icon" icon={faCode} title={t("developed")} />
          <span className="footer__text">
            {t("in")} La Paloma, Rocha, Uruguay 
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer