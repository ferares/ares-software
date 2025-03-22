"use client"

import { useCallback, useMemo, useState } from "react"

import Image from "next/image"

import { useTranslations } from "next-intl"

import { faDisplay, faMobileScreen } from "@fortawesome/free-solid-svg-icons"

import { usePrefersReducedMotionContext } from "@/context/reducedMotion"

import Switch from "./switch"

import macbookImage from "@/../public/imgs/macbook.png"
import iphoneImage from "@/../public/imgs/iphone.png"

type Video = { src: string, poster: string }

export type Videos = { desktop: Video, mobile: Video }

interface VideoPlayerProps { videos: Videos }

function VideoPlayer({ videos }: VideoPlayerProps) {
  const [mobileView, setMobileView] = useState(false)
  const { prefersReducedMotion } = usePrefersReducedMotionContext()
  const t = useTranslations()

  const switchAriaLabel = useMemo(() => (
    mobileView ? t("Labels.show-desktop-video") : t("Labels.show-mobile-video")
  ), [mobileView, t])

  const toggleDisplay = useCallback(() => {
    setMobileView((current) => current ? false : true)
  }, [])

  return (
    <div className={`video video--${mobileView ? "mobile" : "desktop"}`}>
      <Switch className="video__switch" ariaLabel={switchAriaLabel} leftIcon={faDisplay} rightIcon={faMobileScreen} onChange={toggleDisplay} state={mobileView ? "right" : "left"} />
      <div className={`video__wrapper video__wrapper--${mobileView ? "mobile" : "desktop"}`}>
        <Image className="video__frame" src={mobileView ? iphoneImage : macbookImage} height={700} width={700} alt="" />
        <video key={mobileView ? "mobile" : "desktop"} controls className="video__player" poster={videos[mobileView ? "mobile" : "desktop"].poster} autoPlay={!prefersReducedMotion} muted loop>
          <source src={videos[mobileView ? "mobile" : "desktop"].src} type="video/webm" />
        </video> 
      </div>
    </div>
  )
}

export default VideoPlayer