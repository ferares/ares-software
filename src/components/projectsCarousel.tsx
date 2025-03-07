"use client"

import { type ReactNode, useCallback } from "react"

import { useTranslations } from "next-intl"

import useEmblaCarousel from "embla-carousel-react"
import { type EmblaOptionsType } from "embla-carousel"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

import IPhoneFrame from "./iPhoneFrame"

interface ProjectsCarouselProps { slides: ReactNode[], options?: EmblaOptionsType }

function ProjectsCarousel({ slides, options }: ProjectsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const t = useTranslations("Labels")

  const carouselNav = useCallback((direction: "prev" | "next") => {
    if (direction === "next") emblaApi?.scrollNext()
    else emblaApi?.scrollPrev()
  }, [emblaApi])

  return (
    <div className="project__carousel-wrapper">
      <div className="project__carousel-frame-wrapper">
        <IPhoneFrame className="project__carousel-frame" height={520} width={254} />
        <button type="button" className="carousel__arrow carousel__arrow-left" onClick={() => carouselNav("prev")} aria-label={t("previous")}>
          <FontAwesomeIcon icon={faChevronLeft} className="carousel__arrow__icon" />
        </button>
        <button type="button" className="carousel__arrow carousel__arrow-right" onClick={() => carouselNav("next")} aria-label={t("next")}>
          <FontAwesomeIcon icon={faChevronRight} className="carousel__arrow__icon" />
        </button>
      </div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container projects__list">
          {slides.map((slide, key) => <div key={key} className="embla__slide">{slide}</div>)}
        </div>
      </div>
    </div>
  )
}

export default ProjectsCarousel