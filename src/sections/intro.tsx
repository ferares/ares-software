import BgImage from "@/components/bgImage"
import NextBtn from "@/components/nextBtn"

function Intro() {
  return (
    <BgImage>
      <div id="intro" className="max-width intro">
        <h1 className="intro__title">
          <span className="intro__title__first-line">Ares</span><br />
          <b className="intro__title__second-line">Software Development</b>
        </h1>
        <NextBtn target="#about" />
      </div>
    </BgImage>
  )
}

export default Intro