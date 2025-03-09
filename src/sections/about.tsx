"use client"

import { type MouseEvent, useCallback } from "react"

import Image from "next/image"

import { type RichTranslationValues, useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons"

import { scrollIntoView } from "@/helpers/scroll"

import NextBtn from "@/components/nextBtn"

import aboutImg from "../../public/imgs/about.jpg"

const GOOGLE_MAPS_LA_PALOMA_LINK = "https://maps.app.goo.gl/1JMJA3WRLQ6VAswu6"

const richTranslationValues: RichTranslationValues = {
  p: (chunks) => <p className="about__paragraph">{chunks}</p>,
  b: (chunks) => <strong>{chunks}</strong>,
  a: (chunks) => <a href={GOOGLE_MAPS_LA_PALOMA_LINK} target="_blank" rel="noreferrer nofollow noopener">{chunks}</a>,
}

function About() {
  const t = useTranslations()

  const handleDownload = useCallback(() => {
    const anchor = document.createElement("a")
    anchor.href = t("Sections.About.cv-link")
    anchor.download = "Fermín Ares CV.pdf"
    anchor.target = "_blank"
    anchor.click()
  }, [t])

  const handleContactMe = useCallback((event: MouseEvent) => {
    event.preventDefault()
    scrollIntoView("#contact")
  }, [])

  return (
    <section id="about" className="about">
      <div className="about__content">
        <h2 className="section-title about__title">
          {t("Sections.About.title")}
        </h2>
        <Image className="about__img" src={aboutImg} alt="" width={500} height={500} />
        <div className="about__paragraphs">
          {t.rich("Sections.About.content", richTranslationValues)}
          <div className="about__btns">
            <button type="button" className="btn about__btn" onClick={handleDownload}>
              <FontAwesomeIcon icon={faDownload} />
              {t("Labels.download-cv")}
            </button>
            <a href="#contact" className="btn about__btn" onClick={handleContactMe}>
              <FontAwesomeIcon icon={faEnvelope} />
              {t("Labels.contact-me")}
            </a>
          </div>
        </div>
      </div>
      <NextBtn target="#projects" />
    </section>
  )
}

export default About