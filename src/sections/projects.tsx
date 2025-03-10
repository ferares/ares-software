"use client"

import { useTranslations } from "next-intl"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import { scrollIntoView } from "@/helpers/scroll"

import ProjectsList, { type Project } from "@/components/projectsList"

import salamDesktopImg from "../../public/imgs/projects/salam/desktop.jpg"
import grigadaleDesktopImg from "../../public/imgs/projects/grigadale/desktop.jpg"
import ionicDesktopImg from "../../public/imgs/projects/ionic/desktop.jpg"
import atlanticoDesktopImg from "../../public/imgs/projects/atlantico/desktop.jpg"
import pipinaDesktopImg from "../../public/imgs/projects/pipina/desktop.jpg"
import angularDesktopImg from "../../public/imgs/projects/angular/desktop.jpg"
import busesuyDesktopImg from "../../public/imgs/projects/busesuy/desktop.jpg"
import crabeDesktopImg from "../../public/imgs/projects/crabe/desktop.jpg"
import arboladoDesktopImg from "../../public/imgs/projects/arbolado/desktop.jpg"
import papelappDesktopImg from "../../public/imgs/projects/papelapp/desktop.jpg"
import ecouterDesktopImg from "../../public/imgs/projects/ecouter/desktop.jpg"

import salamMobileImg from "../../public/imgs/projects/salam/mobile.png"
import grigadaleMobileImg from "../../public/imgs/projects/grigadale/mobile.png"
import ionicMobileImg from "../../public/imgs/projects/ionic/mobile.png"
import atlanticoMobileImg from "../../public/imgs/projects/atlantico/mobile.png"
import pipinaMobileImg from "../../public/imgs/projects/pipina/mobile.png"
import angularMobileImg from "../../public/imgs/projects/angular/mobile.png"
import busesuyMobileImg from "../../public/imgs/projects/busesuy/mobile.png"
import crabeMobileImg from "../../public/imgs/projects/crabe/mobile.png"
import arboladoMobileImg from "../../public/imgs/projects/arbolado/mobile.png"
import papelappMobileImg from "../../public/imgs/projects/papelapp/mobile.png"
import ecouterMobileImg from "../../public/imgs/projects/ecouter/mobile.png"
  
const clientProjects: Project[] = [
  {
    id: "salam",
    title: "Salam Hello",
    images: { desktop: salamDesktopImg, mobile: salamMobileImg },
    desc: "Sections.Projects.projects.salam",
    links: [
      { url: "https://salamhello.com", label: "Labels.visit-site" },
    ],
    technologies: ["shopify", "html", "css", "typescript", "liquid", "webcomponents", "git"],
    videos: {
      desktop: { src: "/vids/salam/desktop.webm", poster: "/imgs/projects/salam/poster-desktop.png" },
      mobile: { src: "/vids/salam/mobile.webm", poster: "/imgs/projects/salam/poster-mobile.png" },
    },
  },
  {
    id: "grigadale",
    title: "Grigadale",
    images: { desktop: grigadaleDesktopImg, mobile: grigadaleMobileImg },
    desc: "Sections.Projects.projects.grigadale",
    links: [
      { url: "https://grigadale.org", label: "Labels.visit-site" },
    ],
    technologies: ["html", "css", "javascript", "wordpress", "bootstrap", "git"],
    videos: {
      desktop: { src: "/vids/grigadale/desktop.webm", poster: "/imgs/projects/grigadale/poster-desktop.png" },
      mobile: { src: "/vids/grigadale/mobile.webm", poster: "/imgs/projects/grigadale/poster-mobile.png" },
    },
  },
  {
    id: "ionic",
    title: "Ionic Themes",
    images: { desktop: ionicDesktopImg, mobile: ionicMobileImg },
    desc: "Sections.Projects.projects.ionic",
    links: [
      { url: "https://ionicthemes.com/", label: "Labels.visit-site" },
    ],
    technologies: ["angular", "typescript", "html", "sass", "git"],
    videos: {
      desktop: { src: "/vids/ionic/desktop.webm", poster: "/imgs/projects/ionic/poster-desktop.png" },
      mobile: { src: "/vids/ionic/mobile.webm", poster: "/imgs/projects/ionic/poster-mobile.png" },
    },
  },
  {
    id: "atlantico",
    title: "Atlántico Desarrollos",
    images: { desktop: atlanticoDesktopImg, mobile: atlanticoMobileImg },
    desc: "Sections.Projects.projects.atlantico",
    links: [
      { url: "https://atlanticodesarrollos.uy/", label: "Labels.visit-site" },
    ],
    technologies: ["php", "html", "sass", "bootstrap", "javascript", "git"],
    videos: {
      desktop: { src: "/vids/atlantico/desktop.webm", poster: "/imgs/projects/atlantico/poster-desktop.png" },
      mobile: { src: "/vids/atlantico/mobile.webm", poster: "/imgs/projects/atlantico/poster-mobile.png" },
    },
  },
  {
    id: "pipina",
    title: "Pipiña",
    images: { desktop: pipinaDesktopImg, mobile: pipinaMobileImg },
    desc: "Sections.Projects.projects.pipina",
    links: [
      { url: "https://pipiña.uy/", label: "Labels.visit-site" },
    ],
    technologies: ["php", "html", "sass", "bootstrap", "javascript", "git"],
    videos: {
      desktop: { src: "/vids/pipina/desktop.webm", poster: "/imgs/projects/pipina/poster-desktop.png" },
      mobile: { src: "/vids/pipina/mobile.webm", poster: "/imgs/projects/pipina/poster-mobile.png" },
    },
  },
  {
    id: "angular",
    title: "Angular Templates",
    images: { desktop: angularDesktopImg, mobile: angularMobileImg },
    desc: "Sections.Projects.projects.angular",
    links: [
      { url: "https://angular-templates.io/", label: "Labels.visit-site" },
    ],
    technologies: ["angular", "typescript", "html", "sass", "git"],
    videos: {
      desktop: { src: "/vids/angular/desktop.webm", poster: "/imgs/projects/angular/poster-desktop.png" },
      mobile: { src: "/vids/angular/mobile.webm", poster: "/imgs/projects/angular/poster-mobile.png" },
    },
  },
]

const personalProjects: Project[] = [
  {
    id: "buses",
    title: "BusesUY",
    images: { desktop: busesuyDesktopImg, mobile: busesuyMobileImg },
    desc: "Sections.Projects.projects.busesuy",
    links: [
      { url: "https://buses.uy", label: "Labels.try-it", rel: "" },
    ],
    technologies: ["go", "next", "react", "html", "typescript", "css", "postgresql", "valkey", "android", "windows", "apple", "linux", "git", "pwa", "websocket" ,"cloudflare", "digitalocean", "docker", "bash", "analytics", "tagmanager"],
    videos: {
      desktop: { src: "/vids/busesuy/desktop.webm", poster: "/imgs/projects/busesuy/poster-desktop.png"},
      mobile: { src: "/vids/busesuy/mobile.webm", poster: "/imgs/projects/busesuy/poster-mobile.png"},
    },
  },
  {
    id: "crabe",
    title: "La Marche Du Crabe",
    images: { desktop: crabeDesktopImg, mobile: crabeMobileImg },
    desc: "Sections.Projects.projects.crabe",
    links: [
      { url: "https://crabe.ares.uy", label: "Labels.try-it", rel: "" },
      { url: "https://github.com/ferares/marche-du-crabe", label: "Labels.view-project", icon: faGithub },
    ],
    technologies: ["nodejs", "next", "react", "typescript", "css", "pwa", "websocket"],
    videos: {
      desktop: { src: "/vids/crabe/desktop.webm", poster: "/imgs/projects/crabe/poster-desktop.png" },
      mobile: { src: "/vids/crabe/mobile.webm", poster: "/imgs/projects/crabe/poster-mobile.png" },
    },
  },
  {
    id: "arbolado",
    title: "Arbolado Urbano",
    images: { desktop: arboladoDesktopImg, mobile: arboladoMobileImg },
    desc: "Sections.Projects.projects.arbolado",
    links: [
      { url: "https://arboladourbano.com", label: "Labels.try-it", rel: "" },
      { url: "https://github.com/Arbolado-Urbano", label: "Labels.view-project", icon: faGithub },
    ],
    technologies: ["next", "react", "bootstrap", "sass", "php", "laravel", "wordpress", "mysql", "git", "analytics", "tagmanager"],
    videos: {
      desktop: { src: "/vids/arbolado/desktop.webm", poster: "/imgs/projects/arbolado/poster-desktop.png" },
      mobile: { src: "/vids/arbolado/mobile.webm", poster: "/imgs/projects/arbolado/poster-mobile.png" },
    },
  },
  {
    id: "papelapp",
    title: "Papelapp",
    images: { desktop: papelappDesktopImg, mobile: papelappMobileImg },
    desc: "Sections.Projects.projects.papelapp",
    links: [
      { url: "https://papelapp.ares.uy", label: "Labels.try-it", rel: "" },
      { url: "https://github.com/ferares/papelapp", label: "Labels.view-project", icon: faGithub },
    ],
    technologies: ["html", "css", "typescript", "webcomponents", "pwa", "android"],
    videos: {
      desktop: { src: "/vids/papelapp/desktop.webm", poster: "/imgs/projects/papelapp/poster-desktop.png" },
      mobile: { src: "/vids/papelapp/mobile.webm", poster: "/imgs/projects/papelapp/poster-mobile.png" },
    },
  },
  {
    id: "ecouter",
    title: "Écouter",
    images: { desktop: ecouterDesktopImg, mobile: ecouterMobileImg },
    desc: "Sections.Projects.projects.ecouter",
    links: [
      { url: "https://github.com/ferares/ecouter", label: "Labels.view-project", icon: faGithub },
    ],
    technologies: ["html", "sass", "typescript", "webcomponents", "pwa"],
    videos: {
      desktop: { src: "/vids/ecouter/desktop.webm", poster: "/imgs/projects/ecouter/poster-desktop.png" },
      mobile: { src: "/vids/ecouter/mobile.webm", poster: "/imgs/projects/ecouter/poster-mobile.png" },
    },
  },
]

function Projects() {
  const t = useTranslations()

  return (
    <section id="projects" className="projects">
      <h2 className="section-title">{t("Sections.Projects.title")}</h2>
      <div className="projects__content">
        <ProjectsList id="projects-personal" title={t("Sections.Projects.personal-projects")} projects={personalProjects} />
        <ProjectsList id="projects-client" title={t("Sections.Projects.client-projects")} projects={clientProjects} />
      </div>
      <div className="projects__contact">
        <button type="button" className="btn projects__btn" onClick={() => scrollIntoView("#contact")}>
          <FontAwesomeIcon icon={faEnvelope} />
          {t("Labels.contact-me")}
        </button>
      </div>
    </section>
  )
}

export default Projects