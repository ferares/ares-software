"use client"

import { useTranslations } from "next-intl"

import { type TechnologyKey } from "@/constants/technologies"

import { type TranslationKey } from "@/i18n/request"

import TechnologyCategory from "@/components/technologyCategory"

const technologiesList: { title: TranslationKey, list: TechnologyKey[] }[] = [
  {
    title: "Labels.languages",
    list: [ "typescript", "javascript", "go", "liquid", "python", "php", "sass", "html", "css" ],
  },
  {
    title: "Labels.frameworks",
    list: [ "next", "react", "angular", "vue", "webcomponents", "nodejs", "wordpress", "laravel", "django", "tailwindcss", "bootstrap" ],
  },
  {
    title: "Labels.e-commerce",
    list: [ "shopify", "woocommerce", "paypal", "mercado" ],
  },
  {
    title: "Labels.databases",
    list: [ "graphql", "postgresql", "mongodb", "redis", "valkey", "prisma", "mysql", "mariadb", "sqlite" ],
  },
  {
    title: "Labels.infrastructure",
    list: [ "aws", "digitalocean", "cloudflare", "docker", "heroku", "git", "bash", "websocket" ],
  },
  {
    title: "Labels.platforms",
    list: [ "apple", "android", "linux", "windows", "pwa" ],
  },
  {
    title: "Labels.tools",
    list: [ "analytics", "tagmanager", "vite", "vitest", "jest", "postman", "figma", "sketch", "leaflet", "linear", "jwt", "recaptcha", "hcaptcha" ],
  },
]

function Technologies() {
  const t = useTranslations()

  return (
    <section id="technologies" className="tech">
      <div className="tech__content">
        <h2 className="section-title">
          {t("Sections.Technologies.title")}
        </h2>
        <p className="tech__intro">
          {t("Sections.Technologies.intro")}
        </p>
        {technologiesList.map((category, index) => <TechnologyCategory key={index} category={category} />)}
      </div>
    </section>
  )
}

export default Technologies