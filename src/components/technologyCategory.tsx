"use client"

import { useTranslations } from "next-intl"

import { type EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

import { technologies, type TechnologyKey } from "@/constants/technologies"

import { type TranslationKey } from "@/i18n/request"

import Badge from "@/components/badge"
  
const carouselOptions: EmblaOptionsType = {
  align: "center",
  dragFree: true,
  breakpoints: { "(prefers-reduced-motion)": { duration: 0 } },
}

interface TechnologyCategoryProps { category: { title: TranslationKey, list: TechnologyKey[] } }

function TechnologyCategory({ category }: TechnologyCategoryProps) {
  const [emblaRef] = useEmblaCarousel(carouselOptions)
  const t = useTranslations()

  return (
    <div className="tech__category" >
      <h3 id={`tech-category-${category.title}`} className="tech__category__title">{t(category.title)}</h3>
      <div className="embla" ref={emblaRef}>
      <ul className="embla__container" aria-labelledby={`tech-category-${category.title}`}>
          {(category.list.map((techKey, index) => {
            const technology = technologies[techKey]
            return (
              <li key={index} className="embla__slide tech__category__slide">
                <Badge icon={technology.icon} size={technology.iconSize} title={technology.title} />
              </li>
            )
          }))}
        </ul>
      </div>
    </div>
  )
}

export default TechnologyCategory