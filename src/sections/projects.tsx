"use client"

import { type RefObject, useCallback, useState } from "react"

import Image from "next/image"
import Link from "next/link"

import Modal from "@/components/modal"
import Carousel from "@/components/carousel"

type Project = {
  title: string
  image: string
  desc: string
  link: { url: string, label: string, rel?: string }
  slides: string[]
}

const personalProjects: Project[] = [
  {
    title: "BusesUY",
    image: "/imgs/busesuy.png",
    desc: "A search engine for medium & long distance bus lines in Uruguay",
    link: {
      url: "https://buses.uy",
      label: "Try it",
      rel: "",
    },
    slides: ["/imgs/busesuy/1.png", "/imgs/busesuy/2.png", "/imgs/busesuy/3.png", "/imgs/busesuy/4.png", "/imgs/busesuy/5.png", "/imgs/busesuy/6.png"],
  },
  {
    title: "Arbolado Urbano",
    image: "/imgs/arbolado.png",
    desc: "An interactive web tool for exploring data gathered from different census about city trees",
    link: {
      url: "https://arboladourbano.com",
      label: "Try it",
      rel: "",
    },
    slides: [],
  },
  {
    title: "Papelapp",
    image: "/imgs/papelapp.png",
    desc: "An interactive web tool for exploring data gathered from different census about city trees",
    link: {
      url: "https://papelapp.ares.uy",
      label: "Try it",
      rel: "",
    },
    slides: [],
  },
  {
    title: "Écouter",
    image: "/imgs/ecouter.png",
    desc: "An interactive web tool for exploring data gathered from different census about city trees",
    link: {
      url: "https://github.com",
      label: "View Project",
    },
    slides: [],
  },
]

const otherPorjects: Project[] = [
  {
    title: "Salam Hello",
    image: "/imgs/salam.png",
    desc: "An interactive web tool for exploring data gathered from different census about city trees",
    link: {
      url: "https://github.com",
      label: "View Project",
    },
    slides: [],
  },
  {
    title: "Grigadale",
    image: "/imgs/grigadale.png",
    desc: "An interactive web tool for exploring data gathered from different census about city trees",
    link: {
      url: "https://github.com",
      label: "View Project",
    },
    slides: [],
  },
  {
    title: "Angular Templates",
    image: "/imgs/angular.png",
    desc: "An interactive web tool for exploring data gathered from different census about city trees",
    link: {
      url: "https://github.com",
      label: "View Project",
    },
    slides: [],
  },
  {
    title: "Ionic Themes",
    image: "/imgs/ionic.png",
    desc: "An interactive web tool for exploring data gathered from different census about city trees",
    link: {
      url: "https://github.com",
      label: "View Project",
    },
    slides: [],
  },
  {
    title: "Atlántico Desarrollos",
    image: "/imgs/atlantico.png",
    desc: "An interactive web tool for exploring data gathered from different census about city trees",
    link: {
      url: "https://github.com",
      label: "View Project",
    },
    slides: [],
  },
  {
    title: "Pipiña",
    image: "/imgs/pipina.png",
    desc: "An interactive web tool for exploring data gathered from different census about city trees",
    link: {
      url: "https://github.com",
      label: "View Project",
    },
    slides: [],
  },
]

interface ProjectsProps { projectsSectionRef: RefObject<HTMLDivElement | null> }

function Projects({ projectsSectionRef }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project>()

  const projectToElement = useCallback((project: Project, key: number) => {
    return (
      <button type="button" className="project" key={key} onClick={() => setSelectedProject(project)}>
        <h2>{project.title}</h2>
        <Image src={project.image} alt="BusesUY" height={300} width={300} />
      </button>
    )
  }, [])

  return (
    <section className="projects-section">
      <div ref={projectsSectionRef} className="max-width projects-content">
        <h2 className="section-title">
          Personal Projects
        </h2>
        <div className="projects">
          {personalProjects.map(projectToElement)}
        </div>
        <h2 className="section-title">
          Client Projects
        </h2>
        <div className="projects">
          {otherPorjects.map(projectToElement)}
        </div>
        <Modal id="project-modal" labelledBy={selectedProject?.title ?? ""} onClose={() => setSelectedProject(undefined)} open={!!selectedProject}>
          {selectedProject && (
            <>
              <h3>{selectedProject.title}</h3>
              <Carousel images={selectedProject.slides} />
              <p>
                {selectedProject.desc}
              </p>
              <Link href={selectedProject.link.url} target="_blank" rel={selectedProject.link.rel ?? "noopener noreferrer nofollow"}>
                {selectedProject.link.label}
              </Link>
            </>
          )}
        </Modal>
      </div>
    </section>
  )
}

export default Projects