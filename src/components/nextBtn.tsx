"use client"

import { type MouseEvent, useCallback } from "react"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import { scrollIntoView } from "@/helpers/scroll"

interface NextBtnProps { target: string }

function NextBtn({ target }: NextBtnProps) {
  const t = useTranslations("Labels")

  const handleClick = useCallback((event: MouseEvent) => {
    event.preventDefault()
    scrollIntoView(target)
  }, [target])
  
  return (
    <a href={target} className="next-btn" onClick={handleClick} aria-label={t("scroll-down")}>
      <FontAwesomeIcon className="scroll-down" icon={faChevronDown} />
    </a>
  )
}

export default NextBtn