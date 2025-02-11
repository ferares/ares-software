"use client"

import { useRef } from "react"

import Intro from "@/sections/intro"
import Projects from "@/sections/projects"
import About from "@/sections/about"

function Home() {
  const projectsSectionRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Intro projectsSectionRef={projectsSectionRef} />
      <About />
      <Projects projectsSectionRef={projectsSectionRef} />
    </>
  )
}

export default Home