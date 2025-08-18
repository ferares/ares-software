import { useCallback, useMemo, useState } from "react"

import Image, { type StaticImageData } from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { type IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faChevronLeft, faChevronRight, faDisplay, faExternalLink, faMobileScreen } from "@fortawesome/free-solid-svg-icons"

import { type EmblaOptionsType, type EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"

import { technologies, type TechnologyKey } from "@/constants/technologies"

import { type TranslationKey } from "@/i18n/request"

import VideoPlayer, { type Videos } from "./videoPlayer"
import Modal from "./modal"
import Badge from "./badge"
import Switch from "./switch"

export type Project = {
  id: string
  title: string
  images: { desktop: StaticImageData, mobile: StaticImageData }
  desc: TranslationKey
  links: { url: string, label: TranslationKey, icon?: IconDefinition, rel?: string }[]
  stores: { microsoft?: string, google?: string, apple?: string }
  technologies: TechnologyKey[],
  videos: Videos,
}

interface ProjectsListProps { id: string, title: string, intro: string, projects: Project[] }

const carouselOptions: EmblaOptionsType = {
  align: "center",
  loop: true,
  dragFree: true,
  breakpoints: { "(prefers-reduced-motion)": { duration: 0 } },
}

function ProjectsList({ id, title, intro, projects }: ProjectsListProps) {
  const t = useTranslations()
  const [selectedProject, setSelectedProject] = useState<Project>()
  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions)
  const [displayMode, setDisplayMode] = useState<"mobile" | "desktop">("desktop")

  const switchAriaLabel = useMemo(() => (
    displayMode === "desktop" ? t("Labels.show-mobile-screenshots") : t("Labels.show-desktop-screenshots")
  ), [displayMode, t])

  const toggleDisplay = useCallback(() => {
    setDisplayMode((current) => current === "desktop" ? "mobile" : "desktop")
  }, [])

  const carouselNav = useCallback((direction: "prev" | "next", emblaApi?: EmblaCarouselType) => {
    if (direction === "next") emblaApi?.scrollNext()
    else emblaApi?.scrollPrev()
  }, [])

  return (
    <>
      <div className="projects__title-wrapper">
        <h3 id={id} className="projects__title">
          {title}
        </h3>
        <Switch ariaLabel={switchAriaLabel} leftIcon={faDisplay} rightIcon={faMobileScreen} onChange={toggleDisplay} state={displayMode === "mobile" ? "right" : "left"} />
      </div>
      <p className="projects-list__intro">
        {intro}
      </p>
      <div className={`project__carousel project__carousel--${displayMode}`}>
        <button type="button" className="project__carousel__arrow project__carousel__arrow--left" onClick={() => carouselNav("prev", emblaApi)} aria-label={t("Labels.previous")}>
          <FontAwesomeIcon icon={faChevronLeft} className="project__carousel__arrow__icon" />
        </button>
        <button type="button" className="project__carousel__arrow project__carousel__arrow--right" onClick={() => carouselNav("next", emblaApi)} aria-label={t("Labels.next")}>
          <FontAwesomeIcon icon={faChevronRight} className="project__carousel__arrow__icon" />
        </button>
        <div className="embla" ref={emblaRef}>
          <ul className="embla__container" aria-labelledby={id}>
            {projects.map((project, key) => (
              <li key={key} className="embla__slide projects__slide">
                <button id={`project-${project.id}`} type="button" className="project" onClick={() => setSelectedProject(project)}>
                  <Image className="project__img" src={displayMode === "desktop" ? project.images.desktop : project.images.mobile} alt="" />
                  <h4 className="project__title">
                    {project.title}
                  </h4>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal id="project" title={selectedProject?.title} labelledBy="modal-project-title" onClose={() => setSelectedProject(undefined)} open={!!selectedProject}>
        {selectedProject && (
          <>
            <VideoPlayer videos={selectedProject.videos} />
            <p className="project__paragraph">
              {t(selectedProject.desc)}
            </p>
            <div id={`project-${selectedProject.id}-links`} className="project__links">
              {selectedProject.links.map((link, index) => (
                <Link key={index} className="project__btn btn" href={link.url} target="_blank" rel={link.rel ?? "noopener noreferrer nofollow"}>
                  {t(link.label)}
                  <FontAwesomeIcon icon={link.icon ?? faExternalLink} className={link.icon ? "" : "small"} />
                </Link>
              ))}
            </div>
            {selectedProject.stores && (
              <ul className="project__stores">
                {selectedProject.stores.apple && (
                  <li className="project__store">
                    <a className="project__store__link" href={selectedProject.stores.apple}>
                      <img className="project__store__img" src={t("Stores.apple.image")} alt={t("Stores.apple.label")} />
                    </a>
                  </li>
                )}
                {selectedProject.stores.google && (
                  <li className="project__store">
                    <a className="project__store__link" href={selectedProject.stores.google}>
                      <img className="project__store__img" src={t("Stores.google.image")} alt={t("Stores.google.label")} />
                    </a>
                  </li>
                )}
                {selectedProject.stores.microsoft && (
                  <li className="project__store">
                    <a className="project__store__link" href={selectedProject.stores.microsoft}>
                      <img className="project__store__img" src={t("Stores.microsoft.image")} alt={t("Stores.microsoft.label")} />
                    </a>
                  </li>
                )}
              </ul>
            )}
            <h3 className="project__tech-title">{t("Labels.developed-using")}</h3>
            <ul className="project__technologies">
              {selectedProject.technologies.map((tech, index) => {
                const technology = technologies[tech]
                return (
                  <li key={index}>
                    <Badge icon={technology.icon} size={technology.iconSize} title={technology.title} small />
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </Modal>
    </>
  )
}

export default ProjectsList