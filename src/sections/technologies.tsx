"use client"

import { useMemo } from "react"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

import { technologies, type TechnologyKey } from "@/constants/technologies"

import { scrollIntoView } from "@/helpers/scroll"

import Badge from "@/components/badge"

function Technologies() {
  const t = useTranslations()

  const technologiesList: { title: string, list: TechnologyKey[] }[] = useMemo(() => [
    {
      title: t("Labels.languages"),
      list: [ "typescript", "javascript", "go", "python", "php", "html", "css", "sass", "liquid" ],
    },
    {
      title: t("Labels.frameworks"),
      list: [ "next", "react", "angular", "vue", "nodejs", "wordpress", "laravel", "django", "tailwindcss", "bootstrap" ],
    },
    {
      title: t("Labels.e-commerce"),
      list: [ "shopify", "woocommerce", "paypal", "mercado" ],
    },
    {
      title: t("Labels.databases"),
      list: [ "graphql", "postgresql", "mongodb", "redis", "valkey", "prisma", "mysql", "mariadb", "sqlite" ],
    },
    {
      title: t("Labels.infrastructure"),
      list: [ "aws", "digitalocean", "cloudflare", "docker", "git", "bash", "websocket" ],
    },
    {
      title: t("Labels.platforms"),
      list: [ "apple", "android", "linux", "windows", "pwa" ],
    },
    {
      title: t("Labels.tools"),
      list: [ "analytics", "tagmanager", "recaptcha", "hcaptcha" ],
    },
  ], [t])

  return (
    <section id="technologies"className="tech">
      <div className="max-width tech__content">
        <h2 className="section-title">
          {t("Sections.Technologies.title")}
        </h2>
        {technologiesList.map((category, catIndex) => (
          <div className="tech__category" key={catIndex}>
            <h3 className="tech__category__title">{category.title}</h3>
            <ul className="tech__category__list">
              {(category.list.map((techKey, techIndex) => {
                const technology = technologies[techKey]
                return (
                  <Badge key={`${catIndex}-${techIndex}`} icon={technology.icon} size={technology.iconSize} title={technology.title} />
                )
              }))}
            </ul>
          </div>
        ))}
        <div className="tech__contact">
          <button type="button" className="btn about__btn" onClick={() => scrollIntoView("#contact")}>
            <FontAwesomeIcon icon={faEnvelope} />
            {t("Labels.contact-me")}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Technologies