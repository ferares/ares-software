"use client"

import { type RefObject } from "react"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import BgImage from "@/components/bgImage"

interface IntroProps { projectsSectionRef: RefObject<HTMLDivElement | null> }

function Intro({ projectsSectionRef }: IntroProps) {
  const t = useTranslations("Labels")
  return (
    <BgImage>
      <div className="max-width intro-content">
        <h1 className="section-title">
          <span className="intro-name">Ares</span><br />
          <b className="intro-subtitle">Software Development</b>
        </h1>
        <button type="button" className="btn intro-btn" onClick={() => projectsSectionRef.current?.scrollIntoView({ behavior: "smooth" })}>
          <FontAwesomeIcon className="scroll-down" icon={faChevronDown} aria-label={t("scroll-down")} />
        </button>
      </div>
    </BgImage>
  )
}

export default Intro