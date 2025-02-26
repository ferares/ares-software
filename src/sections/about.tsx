import Image from "next/image"

import { useTranslations } from "next-intl"

import NextBtn from "@/components/nextBtn"

import aboutImg from "../../public/imgs/about.jpg"

function About() {
  const t = useTranslations("Sections.About")
  return (
    <section id="about" className="about">
      <div className="about__content">
        <div className="about__bio">
          <h2 className="section-title about__title-mobile">
            {t("title")}
          </h2>
          <Image className="about__img" src={aboutImg} alt="" />
          <div>
            <h2 className="section-title about__title-desktop">
              {t("title")}
            </h2>
            {t.rich("content", { p: (chunks) => <p className="about__paragraph">{chunks}</p>, b: (chunks) => <strong>{chunks}</strong> })}
          </div>
        </div>
        <NextBtn target="#projects" color="black" />
      </div>
    </section>
  )
}

export default About