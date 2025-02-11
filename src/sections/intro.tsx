"use client"

import { type RefObject } from "react"

import Image from "next/image"

import BgImage from "@/components/bgImage"

interface IntroProps { projectsSectionRef: RefObject<HTMLDivElement | null> }

function Intro({ projectsSectionRef }: IntroProps) {
  return (
    <BgImage>
      <div className="max-width intro-content">
        <h1 className="section-title">
          <span className="intro-name">Ares</span><br />
          <b className="intro-subtitle">Software Development</b>
        </h1>
        <button type="button" className="btn intro-btn" onClick={() => projectsSectionRef.current?.scrollIntoView({ behavior: "smooth" })}>
          <Image alt="Scroll down" src="/icons/chevron-down.svg" width="50" height="50" />
        </button>
      </div>
    </BgImage>
  )
}

export default Intro