import BgImage from "@/components/bgImage"
import NextBtn from "@/components/nextBtn"

function Intro() {
  return (
    <BgImage>
      <div id="intro" className="max-width intro-content">
        <h1 className="section-title">
          <span className="intro-name">Ares</span><br />
          <b className="intro-subtitle">Software Development</b>
        </h1>
        <NextBtn target="#about" />
      </div>
    </BgImage>
  )
}

export default Intro