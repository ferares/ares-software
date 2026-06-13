import type { TranslationKey } from "../i18n/utils"
import type { TechnologyKey } from "./technologies"

import salamDesktopImg from "../assets/projects/salam/desktop.jpg"
import grigadaleDesktopImg from "../assets/projects/grigadale/desktop.jpg"
import ionicDesktopImg from "../assets/projects/ionic/desktop.jpg"
import atlanticoDesktopImg from "../assets/projects/atlantico/desktop.jpg"
import pipinaDesktopImg from "../assets/projects/pipina/desktop.jpg"
import angularDesktopImg from "../assets/projects/angular/desktop.jpg"
import busesuyDesktopImg from "../assets/projects/busesuy/desktop.jpg"
import tutiDesktopImg from "../assets/projects/tuti/desktop.png"
import crabeDesktopImg from "../assets/projects/crabe/desktop.jpg"
import arboladoDesktopImg from "../assets/projects/arbolado/desktop.png"
import papelappDesktopImg from "../assets/projects/papelapp/desktop.jpg"
import ecouterDesktopImg from "../assets/projects/ecouter/desktop.jpg"

import salamMobileImg from "../assets/projects/salam/mobile.png"
import grigadaleMobileImg from "../assets/projects/grigadale/mobile.png"
import ionicMobileImg from "../assets/projects/ionic/mobile.png"
import atlanticoMobileImg from "../assets/projects/atlantico/mobile.png"
import pipinaMobileImg from "../assets/projects/pipina/mobile.png"
import angularMobileImg from "../assets/projects/angular/mobile.png"
import busesuyMobileImg from "../assets/projects/busesuy/mobile.png"
import tutiMobileImg from "../assets/projects/tuti/mobile.png"
import crabeMobileImg from "../assets/projects/crabe/mobile.png"
import arboladoMobileImg from "../assets/projects/arbolado/mobile.png"
import papelappMobileImg from "../assets/projects/papelapp/mobile.png"
import ecouterMobileImg from "../assets/projects/ecouter/mobile.png"

import salamDesktopVideo from "../assets/projects/salam/desktop.webm"
import grigadaleDesktopVideo from "../assets/projects/grigadale/desktop.webm"
import atlanticoDesktopVideo from "../assets/projects/atlantico/desktop.webm"
import pipinaDesktopVideo from "../assets/projects/pipina/desktop.webm"
import angularDesktopVideo from "../assets/projects/angular/desktop.webm"
import ionicDesktopVideo from "../assets/projects/ionic/desktop.webm"
import busesuyDesktopVideo from "../assets/projects/busesuy/desktop.webm"
import crabeDesktopVideo from "../assets/projects/crabe/desktop.webm"
import papelappDesktopVideo from "../assets/projects/papelapp/desktop.webm"
import ecouterDesktopVideo from "../assets/projects/ecouter/desktop.webm"
import arboladoDesktopVideo from "../assets/projects/arbolado/desktop.webm"

import salamMobileVideo from "../assets/projects/salam/mobile.webm"
import grigadaleMobileVideo from "../assets/projects/grigadale/mobile.webm"
import atlanticoMobileVideo from "../assets/projects/atlantico/mobile.webm"
import pipinaMobileVideo from "../assets/projects/pipina/mobile.webm"
import angularMobileVideo from "../assets/projects/angular/mobile.webm"
import ionicMobileVideo from "../assets/projects/ionic/mobile.webm"
import busesuyMobileVideo from "../assets/projects/busesuy/mobile.webm"
import crabeMobileVideo from "../assets/projects/crabe/mobile.webm"
import papelappMobileVideo from "../assets/projects/papelapp/mobile.webm"
import ecouterMobileVideo from "../assets/projects/ecouter/mobile.webm"
import arboladoMobileVideo from "../assets/projects/arbolado/mobile.webm"

import salamDesktopPoster from "../assets/projects/salam/poster-desktop.png"
import grigadaleDesktopPoster from "../assets/projects/grigadale/poster-desktop.png"
import atlanticoDesktopPoster from "../assets/projects/atlantico/poster-desktop.png"
import pipinaDesktopPoster from "../assets/projects/pipina/poster-desktop.png"
import angularDesktopPoster from "../assets/projects/angular/poster-desktop.png"
import ionicDesktopPoster from "../assets/projects/ionic/poster-desktop.png"
import busesuyDesktopPoster from "../assets/projects/busesuy/poster-desktop.png"
import crabeDesktopPoster from "../assets/projects/crabe/poster-desktop.png"
import papelappDesktopPoster from "../assets/projects/papelapp/poster-desktop.png"
import ecouterDesktopPoster from "../assets/projects/ecouter/poster-desktop.png"
import arboladoDesktopPoster from "../assets/projects/arbolado/poster-desktop.png"

import salamMobilePoster from "../assets/projects/salam/poster-mobile.png"
import grigadaleMobilePoster from "../assets/projects/grigadale/poster-mobile.png"
import atlanticoMobilePoster from "../assets/projects/atlantico/poster-mobile.png"
import pipinaMobilePoster from "../assets/projects/pipina/poster-mobile.png"
import angularMobilePoster from "../assets/projects/angular/poster-mobile.png"
import ionicMobilePoster from "../assets/projects/ionic/poster-mobile.png"
import busesuyMobilePoster from "../assets/projects/busesuy/poster-mobile.png"
import crabeMobilePoster from "../assets/projects/crabe/poster-mobile.png"
import papelappMobilePoster from "../assets/projects/papelapp/poster-mobile.png"
import ecouterMobilePoster from "../assets/projects/ecouter/poster-mobile.png"
import arboladoMobilePoster from "../assets/projects/arbolado/poster-mobile.png"

type Video = { src: string, poster: string }

export type Videos = { desktop: Video, mobile: Video }

export type Project = {
  id: string
  title: string
  images: { desktop: ImageMetadata, mobile: ImageMetadata }
  desc: TranslationKey
  links: { url: string, label: TranslationKey, gitHub?: boolean, rel?: string }[]
  stores: { microsoft?: string, google?: string, apple?: string }
  technologies: TechnologyKey[],
  videos?: Videos,
}

export const clientProjects: Project[] = [
  {
    id: "salam",
    title: "Salam Hello",
    images: { desktop: salamDesktopImg, mobile: salamMobileImg },
    desc: "Sections.Projects.projects.salam",
    stores: {},
    links: [
      { url: "https://salamhello.com", label: "Labels.visit-site" },
    ],
    technologies: ["shopify", "html", "css", "typescript", "liquid", "webcomponents", "git", "vite"],
    videos: {
      desktop: { src: salamDesktopVideo, poster: salamDesktopPoster.src },
      mobile: { src: salamMobileVideo, poster: salamMobilePoster.src },
    },
  },
  {
    id: "grigadale",
    title: "Grigadale",
    images: { desktop: grigadaleDesktopImg, mobile: grigadaleMobileImg },
    desc: "Sections.Projects.projects.grigadale",
    stores: {},
    links: [
      { url: "https://grigadale.org", label: "Labels.visit-site" },
    ],
    technologies: ["html", "css", "javascript", "wordpress", "bootstrap", "git"],
    videos: {
      desktop: { src: grigadaleDesktopVideo, poster: grigadaleDesktopPoster.src },
      mobile: { src: grigadaleMobileVideo, poster: grigadaleMobilePoster.src },
    },
  },
  {
    id: "atlantico",
    title: "Atlántico Desarrollos",
    images: { desktop: atlanticoDesktopImg, mobile: atlanticoMobileImg },
    desc: "Sections.Projects.projects.atlantico",
    stores: {},
    links: [
      { url: "https://atlanticodesarrollos.uy/", label: "Labels.visit-site" },
    ],
    technologies: ["php", "html", "sass", "bootstrap", "javascript", "git"],
    videos: {
      desktop: { src: atlanticoDesktopVideo, poster: atlanticoDesktopPoster.src },
      mobile: { src: atlanticoMobileVideo, poster: atlanticoMobilePoster.src },
    },
  },
  {
    id: "pipina",
    title: "Pipiña",
    images: { desktop: pipinaDesktopImg, mobile: pipinaMobileImg },
    desc: "Sections.Projects.projects.pipina",
    stores: {},
    links: [
      { url: "https://pipiña.uy/", label: "Labels.visit-site" },
    ],
    technologies: ["php", "html", "sass", "bootstrap", "javascript", "git"],
    videos: {
      desktop: { src: pipinaDesktopVideo, poster: pipinaDesktopPoster.src },
      mobile: { src: pipinaMobileVideo, poster: pipinaMobilePoster.src },
    },
  },
  {
    id: "angular",
    title: "Angular Templates",
    images: { desktop: angularDesktopImg, mobile: angularMobileImg },
    desc: "Sections.Projects.projects.angular",
    stores: {},
    links: [],
    technologies: ["angular", "typescript", "html", "sass", "git"],
    videos: {
      desktop: { src: angularDesktopVideo, poster: angularDesktopPoster.src },
      mobile: { src: angularMobileVideo, poster: angularMobilePoster.src },
    },
  },
  {
    id: "ionic",
    title: "Ionic Themes",
    images: { desktop: ionicDesktopImg, mobile: ionicMobileImg },
    desc: "Sections.Projects.projects.ionic",
    stores: {},
    links: [],
    technologies: ["angular", "typescript", "html", "sass", "git"],
    videos: {
      desktop: { src: ionicDesktopVideo, poster: ionicDesktopPoster.src },
      mobile: { src: ionicMobileVideo, poster: ionicMobilePoster.src },
    },
  },
]

export const personalProjects: Project[] = [
  {
    id: "buses",
    title: "BusesUY",
    images: { desktop: busesuyDesktopImg, mobile: busesuyMobileImg },
    desc: "Sections.Projects.projects.busesuy",
    stores: { microsoft: "https://apps.microsoft.com/detail/9PKB1P5DDLHW?mode=direct", apple: "https://apps.apple.com/app/id6746334736", google: "https://play.google.com/store/apps/details?id=uy.buses.twa" },
    links: [
      { url: "https://buses.uy", label: "Labels.try-it", rel: "" },
    ],
    technologies: ["go", "next", "react", "html", "typescript", "css", "vitest", "postgresql", "valkey", "android", "windows", "apple", "linux", "git", "pwa", "websocket", "cloudflare", "digitalocean", "docker", "bash", "analytics", "tagmanager"],
    videos: {
      desktop: { src: busesuyDesktopVideo, poster: busesuyDesktopPoster.src },
      mobile: { src: busesuyMobileVideo, poster: busesuyMobilePoster.src },
    },
  },
  {
    id: "tuti",
    title: "Tuti",
    images: { desktop: tutiDesktopImg, mobile: tutiMobileImg },
    desc: "Sections.Projects.projects.tuti",
    stores: { apple: "https://apps.apple.com/app/tuti/id6753868166", google: "https://play.google.com/store/apps/details?id=uy.tuti.twa" },
    links: [
      { url: "https://tuti.uy", label: "Labels.try-it", rel: "" },
    ],
    technologies: ["reactRouter", "react", "html", "typescript", "tailwindcss", "css", "vitest", "postgresql", "android", "apple", "linux", "git", "pwa", "cloudflare", "digitalocean", "docker", "bash", "analytics", "tagmanager"],
  },
  {
    id: "crabe",
    title: "La Marche Du Crabe",
    images: { desktop: crabeDesktopImg, mobile: crabeMobileImg },
    desc: "Sections.Projects.projects.crabe",
    stores: {},
    links: [
      { url: "https://crabe.ares.uy", label: "Labels.try-it", rel: "" },
      { url: "https://github.com/ferares/marche-du-crabe", label: "Labels.view-project", gitHub: true },
    ],
    technologies: ["nodejs", "next", "react", "typescript", "css", "pwa", "websocket"],
    videos: {
      desktop: { src: crabeDesktopVideo, poster: crabeDesktopPoster.src },
      mobile: { src: crabeMobileVideo, poster: crabeMobilePoster.src },
    },
  },
  {
    id: "papelapp",
    title: "Papelapp",
    images: { desktop: papelappDesktopImg, mobile: papelappMobileImg },
    desc: "Sections.Projects.projects.papelapp",
    stores: { apple: "https://apps.apple.com/app/id6747598740", google: "https://play.google.com/store/apps/details?id=uy.ares.papelapp.twa" },
    links: [
      { url: "https://papelapp.ares.uy", label: "Labels.try-it", rel: "" },
      { url: "https://github.com/ferares/papelapp", label: "Labels.view-project", gitHub: true },
    ],
    technologies: ["html", "css", "typescript", "vite", "webcomponents", "pwa", "android", "apple"],
    videos: {
      desktop: { src: papelappDesktopVideo, poster: papelappDesktopPoster.src },
      mobile: { src: papelappMobileVideo, poster: papelappMobilePoster.src },
    },
  },
  {
    id: "ecouter",
    title: "Écouter",
    images: { desktop: ecouterDesktopImg, mobile: ecouterMobileImg },
    desc: "Sections.Projects.projects.ecouter",
    stores: {},
    links: [
      { url: "https://github.com/ferares/ecouter", label: "Labels.view-project", gitHub: true },
    ],
    technologies: ["html", "sass", "typescript", "webcomponents", "pwa", "vite"],
    videos: {
      desktop: { src: ecouterDesktopVideo, poster: ecouterDesktopPoster.src },
      mobile: { src: ecouterMobileVideo, poster: ecouterMobilePoster.src },
    },
  },
  {
    id: "arbolado",
    title: "Arbolado Urbano",
    images: { desktop: arboladoDesktopImg, mobile: arboladoMobileImg },
    desc: "Sections.Projects.projects.arbolado",
    stores: { apple: "https://apps.apple.com/app/id6747365722", google: "https://play.google.com/store/apps/details?id=com.arboladourbano.twa" },
    links: [
      { url: "https://arboladourbano.com", label: "Labels.try-it", rel: "" },
      { url: "https://github.com/Arbolado-Urbano", label: "Labels.view-project", gitHub: true },
    ],
    technologies: ["typescript", "bootstrap", "sass", "vite", "leaflet", "php", "laravel", "wordpress", "mysql", "git", "analytics", "tagmanager", "android", "apple"],
    videos: {
      desktop: { src: arboladoDesktopVideo, poster: arboladoDesktopPoster.src },
      mobile: { src: arboladoMobileVideo, poster: arboladoMobilePoster.src },
    },
  },
]