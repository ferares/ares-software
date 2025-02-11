import { useTranslations } from "next-intl"

function About() {
  const t = useTranslations("Sections.About")
  return (
    <section className="about-section">
      <div className="max-width about-content">
        <h2 className="section-title">
          {t("title")}
        </h2>
        <p className="about-paragraph">
          I&apos;m Fermín, a Freelance Software Developer working from La Paloma, Uruguay 🏖️
        </p>
        <p className="about-paragraph">
          Most of my experience is in web development working on both simple projects like landing pages and complex ones like web apps, e-commerce sites, blogs, etc.
        </p>
        <p className="about-paragraph">
          I&apos;ve worked both alone and with teams for different companies, and I have plenty of experience working remotely 👨‍💻
        </p>
        <p className="about-paragraph">
          Keep scrolling to learn more about what kind of projects I&apos;m working on 🚀 some of my past client work and the technolgies I&apos;m familiar with 🛸
        </p>
      </div>
    </section>
  )
}

export default About