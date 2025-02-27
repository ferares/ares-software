"use client"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import { scrollIntoView } from "@/helpers/scroll"

interface NextBtnProps { target: string, color?: string }

function NextBtn({ target, color }: NextBtnProps) {
  const t = useTranslations("Labels")
  return (
    <button type="button" className="next-btn" onClick={() => scrollIntoView(target)}>
      <FontAwesomeIcon className="scroll-down" icon={faChevronDown} aria-label={t("scroll-down")} style={{ color }} />
    </button>
  )
}

export default NextBtn