import { useTranslations } from "next-intl"

import { technologies, type TechnologyKey } from "@/constants/technologies"
import Badge from "@/components/badge"

const technologiesList: { title: string, list: TechnologyKey[] }[] = [
  {
    title: "Languages",
    list: [ "go", "python", "php", "html", "css", "sass", "javascript", "typescript", "liquid" ],
  },
  {
    title: "Frameworks/Libraries",
    list: [ "next", "react", "angular", "vue", "nodejs", "wordpress", "laravel", "django", "tailwindcss", "bootstrap" ],
  },
  {
    title: "E-Commerce",
    list: [ "shopify", "woocommerce", "stripe", "paypal", "mercado" ],
  },
  {
    title: "Databases",
    list: [ "graphql", "postgresql", "mongodb", "redis", "valkey", "prisma", "mysql", "sqlite", "mariadb" ],
  },
  {
    title: "Infrastructure",
    list: [ "aws", "digitalocean", "cloudflare", "docker", "git", "bash", "websocket" ],
  },
  {
    title: "Platforms",
    list: [ "linux", "apple", "windows", "android", "pwa" ],
  }
]

function Technologies() {
  const t = useTranslations("Sections.Technologies")
  return (
    <section id="technologies"className="tech">
      <div className="max-width tech__content">
        <h2 className="section-title">
          {t("title")}
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
      </div>
    </section>
  )
}

export default Technologies