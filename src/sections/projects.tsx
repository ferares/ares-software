"use client"

import { useCallback, useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLink, type IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import { technologies, type TechnologyKey } from "@/constants/technologies"

import { type TranslationKey } from "@/i18n/request"

import Modal from "@/components/modal"
import Badge from "@/components/badge"
import VideoPlayer, { type Videos } from "@/components/videoPlayer"
import ProjectsCarousel from "@/components/projectsCarousel"

type Project = {
  id: string
  title: string
  images: { desktop: string, mobile: string }
  desc: TranslationKey
  links: { url: string, label: TranslationKey, icon?: IconDefinition, rel?: string }[]
  technologies: TechnologyKey[],
  videos: Videos,
}

const carouselOptions = { loop: true, active: false, breakpoints: { "(max-width: 768px)": { active: true } } }
  
const clientPorjects: Project[] = [
  {
    id: "salam",
    title: "Salam Hello",
    images: { desktop: "/imgs/projects/salam/desktop.png", mobile: "/imgs/projects/salam/mobile.png" },
    desc: "Sections.Projects.projects.salam",
    links: [
      { url: "https://salamhello.com", label: "Labels.visit-site" },
    ],
    technologies: ["shopify", "html", "css", "typescript", "liquid", "git"],
    videos: { desktop: { src: "/vids/salam/desktop.webm", poster: "/imgs/projects/salam/poster-desktop.png" }, mobile: { src: "/vids/salam/mobile.webm", poster: "/imgs/projects/salam/poster-mobile.png" }},
  },
  {
    id: "grigadale",
    title: "Grigadale",
    images: { desktop: "/imgs/projects/grigadale/desktop.png", mobile: "/imgs/projects/grigadale/mobile.png" },
    desc: "Sections.Projects.projects.grigadale",
    links: [
      { url: "https://grigadale.org", label: "Labels.visit-site" },
    ],
    technologies: ["html", "css", "javascript", "wordpress", "bootstrap", "git"],
    videos: { desktop: { src: "/vids/grigadale/desktop.webm", poster: "/imgs/projects/grigadale/poster-desktop.png" }, mobile: { src: "/vids/grigadale/mobile.webm", poster: "/imgs/projects/grigadale/poster-mobile.png" }},
  },
  {
    id: "ionic",
    title: "Ionic Themes",
    images: { desktop: "/imgs/projects/ionic/desktop.png", mobile: "/imgs/projects/ionic/mobile.png" },
    desc: "Sections.Projects.projects.ionic",
    links: [
      { url: "https://ionicthemes.com/", label: "Labels.visit-site" },
    ],
    technologies: ["angular", "typescript", "html", "sass", "git"],
    videos: { desktop: { src: "/vids/ionic/desktop.webm", poster: "/imgs/projects/ionic/poster-desktop.png" }, mobile: { src: "/vids/ionic/mobile.webm", poster: "/imgs/projects/ionic/poster-mobile.png" }},
  },
  {
    id: "atlantico",
    title: "Atlántico Desarrollos",
    images: { desktop: "/imgs/projects/atlantico/desktop.png", mobile: "/imgs/projects/atlantico/mobile.png" },
    desc: "Sections.Projects.projects.atlantico",
    links: [
      { url: "https://atlanticodesarrollos.uy/", label: "Labels.visit-site" },
    ],
    technologies: ["php", "html", "sass", "bootstrap", "javascript", "git"],
    videos: { desktop: { src: "/vids/atlantico/desktop.webm", poster: "/imgs/projects/atlantico/poster-desktop.png" }, mobile: { src: "/vids/atlantico/mobile.webm", poster: "/imgs/projects/atlantico/poster-mobile.png" }},
  },
  {
    id: "pipina",
    title: "Pipiña",
    images: { desktop: "/imgs/projects/pipina/desktop.png", mobile: "/imgs/projects/pipina/mobile.png" },
    desc: "Sections.Projects.projects.pipina",
    links: [
      { url: "https://pipiña.uy/", label: "Labels.visit-site" },
    ],
    technologies: ["php", "html", "sass", "bootstrap", "javascript", "git"],
    videos: { desktop: { src: "/vids/pipina/desktop.webm", poster: "/imgs/projects/pipina/poster-desktop.png" }, mobile: { src: "/vids/pipina/mobile.webm", poster: "/imgs/projects/pipina/poster-mobile.png" }},
  },
  {
    id: "angular",
    title: "Angular Templates",
    images: { desktop: "/imgs/projects/angular/desktop.png", mobile: "/imgs/projects/angular/mobile.png" },
    desc: "Sections.Projects.projects.angular",
    links: [
      { url: "https://angular-templates.io/", label: "Labels.visit-site" },
    ],
    technologies: ["angular", "typescript", "html", "sass", "git"],
    videos: { desktop: { src: "/vids/angular/desktop.webm", poster: "/imgs/projects/angular/poster-desktop.png" }, mobile: { src: "/vids/angular/mobile.webm", poster: "/imgs/projects/angular/poster-mobile.png" }},
  },
]

const personalProjects: Project[] = [
  {
    id: "buses",
    title: "BusesUY",
    images: { desktop: "/imgs/projects/busesuy/desktop.png", mobile: "/imgs/projects/busesuy/mobile.png" },
    desc: "Sections.Projects.projects.busesuy",
    links: [
      { url: "https://buses.uy", label: "Labels.try-it", rel: "" },
    ],
    technologies: ["go", "next", "react", "html", "typescript", "css", "postgresql", "valkey", "android", "windows", "apple", "linux", "git", "pwa", "websocket" ,"cloudflare", "digitalocean", "docker", "bash", "analytics", "tagmanager"],
    videos: { desktop: { src: "/vids/busesuy/desktop.webm", poster: "/imgs/projects/busesuy/poster-desktop.png"}, mobile: { src: "/vids/busesuy/mobile.webm", poster: "/imgs/projects/busesuy/poster-mobile.png"}},
  },
  {
    id: "crabe",
    title: "La Marche Du Crabe",
    images: { desktop: "/imgs/projects/crabe/desktop.png", mobile: "/imgs/projects/crabe/mobile.png" },
    desc: "Sections.Projects.projects.crabe",
    links: [
      { url: "https://crabe.ares.uy", label: "Labels.try-it", rel: "" },
      { url: "https://github.com/ferares/marche-du-crabe", label: "Labels.view-project", icon: faGithub },
    ],
    technologies: ["nodejs", "next", "react", "typescript", "css", "pwa", "websocket"],
    videos: { desktop: { src: "/vids/crabe/desktop.webm", poster: "/imgs/projects/crabe/poster-desktop.png" }, mobile: { src: "/vids/crabe/mobile.webm", poster: "/imgs/projects/crabe/poster-mobile.png" }},
  },
  {
    id: "arbolado",
    title: "Arbolado Urbano",
    images: { desktop: "/imgs/projects/arbolado/desktop.png", mobile: "/imgs/projects/arbolado/mobile.png" },
    desc: "Sections.Projects.projects.arbolado",
    links: [
      { url: "https://arboladourbano.com", label: "Labels.try-it", rel: "" },
      { url: "https://github.com/Arbolado-Urbano", label: "Labels.view-project", icon: faGithub },
    ],
    technologies: ["next", "react", "bootstrap", "sass", "php", "laravel", "wordpress", "mysql", "git", "analytics", "tagmanager"],
    videos: { desktop: { src: "/vids/arbolado/desktop.webm", poster: "/imgs/projects/arbolado/poster-desktop.png" }, mobile: { src: "/vids/arbolado/mobile.webm", poster: "/imgs/projects/arbolado/poster-mobile.png" }},
  },
  {
    id: "papelapp",
    title: "Papelapp",
    images: { desktop: "/imgs/projects/papelapp/desktop.png", mobile: "/imgs/projects/papelapp/mobile.png" },
    desc: "Sections.Projects.projects.papelapp",
    links: [
      { url: "https://papelapp.ares.uy", label: "Labels.try-it", rel: "" },
      { url: "https://github.com/ferares/papelapp", label: "Labels.view-project", icon: faGithub },
    ],
    technologies: ["html", "css", "typescript", "pwa", "android"],
    videos: { desktop: { src: "/vids/papelapp/desktop.webm", poster: "/imgs/projects/papelapp/poster-desktop.png" }, mobile: { src: "/vids/papelapp/mobile.webm", poster: "/imgs/projects/papelapp/poster-mobile.png" }},
  },
  {
    id: "ecouter",
    title: "Écouter",
    images: { desktop: "/imgs/projects/ecouter/desktop.png", mobile: "/imgs/projects/ecouter/mobile.png" },
    desc: "Sections.Projects.projects.ecouter",
    links: [
      { url: "https://github.com/ferares/ecouter", label: "Labels.view-project", icon: faGithub },
    ],
    technologies: ["html", "sass", "typescript", "pwa"],
    videos: { desktop: { src: "/vids/ecouter/desktop.webm", poster: "/imgs/projects/ecouter/poster-desktop.png" }, mobile: { src: "/vids/ecouter/mobile.webm", poster: "/imgs/projects/ecouter/poster-mobile.png" }},
  },
]

function Projects() {
  const t = useTranslations()
  const [selectedProject, setSelectedProject] = useState<Project>()

  const projectToElement = useCallback((project: Project) => {
    return (
      <button id={`project-${project.id}`} type="button" className="project" onClick={() => setSelectedProject(project)}>
        <h2 className="project__title">
          <span className="btn">{t("Labels.view-details")}</span>
          <span className="project__title__label">{project.title}</span>
        </h2>
        <div className="project__img-desktop-wrapper">
          <span className="project__hover">
            <span className="btn">
              {t("Labels.view-details")}
            </span>
          </span>
          <Image className="project__img-desktop" src={project.images.desktop} alt="" height={500} width={500} />
        </div>
        <Image className="project__img-mobile" src={project.images.mobile} alt="" height={300} width={300} />
      </button>
    )
  }, [t])

  return (
    <section id="projects" className="projects">
      <div className="max-width projects__content">
        <h2 className="section-title">
          {t("Sections.Projects.personal-projects")}
        </h2>
        <ProjectsCarousel slides={personalProjects.map(projectToElement)} options={carouselOptions} />
        <h2 className="section-title">
          {t("Sections.Projects.client-projects")}
        </h2>
        <ProjectsCarousel slides={clientPorjects.map(projectToElement)} options={carouselOptions} />
        <Modal id="project" title={selectedProject?.title} labelledBy="modal-project-title" onClose={() => setSelectedProject(undefined)} open={!!selectedProject}>
          {selectedProject && (
            <>
              <div className="project__carousel">
                <VideoPlayer videos={selectedProject.videos} />
              </div>
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
              <h4 className="project__tech-title">{t("Labels.developed-using")}</h4>
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
      </div>
    </section>
  )
}

export default Projects