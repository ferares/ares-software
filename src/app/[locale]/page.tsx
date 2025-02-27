import Intro from "@/sections/intro"
import Projects from "@/sections/projects"
import About from "@/sections/about"
import Contact from "@/sections/contact"
import Technologies from "@/sections/technologies"

const { CAPTCHA_SITE_KEY } = process.env

function Home() {
  return (
    <>
      <Intro />
      <About />
      <Projects />
      <Contact captchaSiteKey={CAPTCHA_SITE_KEY ?? ""} />
      <Technologies />
    </>
  )
}

export default Home