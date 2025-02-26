"use client"

import { type ReactNode, useCallback } from "react"

import Image from "next/image"

import useEmblaCarousel from "embla-carousel-react"
import { type EmblaOptionsType } from "embla-carousel"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

interface ProjectsCarouselProps { slides: ReactNode[], options?: EmblaOptionsType }

function ProjectsCarousel({ slides, options }: ProjectsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const carouselNav = useCallback((direction: "prev" | "next") => {
    if (direction === "next") emblaApi?.scrollNext()
    else emblaApi?.scrollPrev()
  }, [emblaApi])

  return (
    <div className="project__carousel-wrapper">
      <div className="project__carousel-frame-wrapper">
        <Image className="project__carousel-frame" src="/imgs/iphone.svg" alt="" height={550} width={270} />
        <button type="button" className="carousel__arrow carousel__arrow-left" onClick={() => carouselNav("prev")}>
          <FontAwesomeIcon icon={faChevronLeft} className="carousel__arrow__icon" />
        </button>
        <button type="button" className="carousel__arrow carousel__arrow-right" onClick={() => carouselNav("next")}>
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