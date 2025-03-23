"use client"

import { useTranslations } from "next-intl"

import { technologies, type TechnologyKey } from "@/constants/technologies"

import { type TranslationKey } from "@/i18n/request"

import Badge from "@/components/badge"

interface TechnologyCategoryProps { category: { title: TranslationKey, list: TechnologyKey[] } }

function TechnologyCategory({ category }: TechnologyCategoryProps) {
  const t = useTranslations()

  return (
    <div className="tech__category" >
      <h3 id={`tech-category-${category.title}`} className="tech__category__title">{t(category.title)}</h3>
      <ul className="tech__category__list" aria-labelledby={`tech-category-${category.title}`}>
        {(category.list.map((techKey, index) => {
          const technology = technologies[techKey]
          return (
            <li key={index} className="tech__category__item">
              <Badge icon={technology.icon} size={technology.iconSize} title={technology.title} />
            </li>
          )
        }))}
      </ul>
    </div>
  )
}

export default TechnologyCategory