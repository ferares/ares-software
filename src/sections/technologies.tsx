"use client"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

import { technologies, type TechnologyKey } from "@/constants/technologies"

import { scrollIntoView } from "@/helpers/scroll"

import Badge from "@/components/badge"

const technologiesList: { title: string, list: TechnologyKey[] }[] = [
  {
    title: "Languages",
    list: [ "typescript", "javascript", "go", "python", "php", "html", "css", "sass", "liquid" ],
  },
  {
    title: "Frameworks/Libraries",
    list: [ "next", "react", "angular", "vue", "nodejs", "wordpress", "laravel", "django", "tailwindcss", "bootstrap" ],
  },
  {
    title: "E-Commerce",
    list: [ "shopify", "woocommerce", "paypal", "mercado" ],
  },
  {
    title: "Databases",
    list: [ "graphql", "postgresql", "mongodb", "redis", "valkey", "prisma", "mysql", "mariadb", "sqlite" ],
  },
  {
    title: "Infrastructure",
    list: [ "aws", "digitalocean", "cloudflare", "docker", "git", "bash", "websocket" ],
  },
  {
    title: "Platforms",
    list: [ "apple", "android", "linux", "windows", "pwa" ],
  },
  {
    title: "Tools",
    list: [ "analytics", "tagmanager", "recaptcha", "hcaptcha" ],
  },
]

function Technologies() {
  const t = useTranslations()
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