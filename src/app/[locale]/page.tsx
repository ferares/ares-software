"use client"

import Intro from "@/sections/intro"
import Projects from "@/sections/projects"
import About from "@/sections/about"
import Contact from "@/sections/contact"
import Technologies from "@/sections/technologies"

function Home() {
  return (
    <>
      <Intro />
      <About />
      <Projects />
      <Technologies />
      <Contact />
    </>
  )
}

export default Home