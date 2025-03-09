"use client"

import { type RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react"

import Image from "next/image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDisplay, faMobileScreen, faPause, faPlay, type IconDefinition } from "@fortawesome/free-solid-svg-icons"

import { usePrefersReducedMotionContext } from "@/context/reducedMotion"

import macbookImage from "@/../public/imgs/macbook.png"
import iphoneImage from "@/../public/imgs/iphone.png"
import Switch from "./switch"
import { useTranslations } from "next-intl"

type Video = { src: string, poster: string }

export type Videos = { desktop: Video, mobile: Video }

interface VideoPlayerProps { videos: Videos }

function VideoPlayer({ videos }: VideoPlayerProps) {
  const [displayMode, setDisplayMode] = useState<"desktop"|"mobile">("desktop")
  const videoDesktopRef = useRef<HTMLVideoElement>(null)
  const videoMobileRef = useRef<HTMLVideoElement>(null)
  const [buttonIcon, setButtonIcon] = useState<IconDefinition>(faPlay)
  const { prefersReducedMotion } = usePrefersReducedMotionContext()
  const t = useTranslations()

  function handlePlay() { setButtonIcon(faPause) }
  function handlePause() { setButtonIcon(faPlay) }

  const switchAriaLabel = useMemo(() => (
    displayMode === "desktop" ? t("Labels.show-mobile-video") : t("Labels.show-desktop-video")
  ), [displayMode, t])

  const setVideoEventHandlers = useCallback((videoRef: RefObject<HTMLVideoElement | null>) => {
    const videoElement = videoRef.current
    videoElement?.addEventListener("play", handlePlay)
    videoElement?.addEventListener("pause", handlePause)
    return () => {
      videoElement?.removeEventListener("play", handlePlay)
      videoElement?.removeEventListener("pause", handlePause)
    }
  }, [])

  const toggleDisplay = useCallback(() => {
    setDisplayMode((current) => current === "desktop" ? "mobile" : "desktop")
  }, [])

  useEffect(() => setVideoEventHandlers(videoDesktopRef), [videoDesktopRef, setVideoEventHandlers])
  useEffect(() => setVideoEventHandlers(videoMobileRef), [videoMobileRef, setVideoEventHandlers])

  return (
    <div className={`video video--${displayMode}`}>
      <Switch className="video__switch" ariaLabel={switchAriaLabel} leftIcon={faDisplay} rightIcon={faMobileScreen} onChange={toggleDisplay} state={displayMode === "mobile" ? "right" : "left"} />
      <div className="video-wrapper-desktop">
        <div className="video__frame-wrapper">
          <Image className="video__frame" src={macbookImage} height={700} width={700} alt="" />
          <button className="video__control" type="button" onClick={() => videoDesktopRef.current?.paused ? videoDesktopRef.current?.play(): videoDesktopRef.current?.pause() }>
            <span className="video__control__content">
              <FontAwesomeIcon icon={buttonIcon} />
            </span>
          </button>
        </div>
        <video ref={videoDesktopRef} className="video__player" poster={videos.desktop.poster} autoPlay={!prefersReducedMotion} muted loop>
          <source src={videos.desktop.src} type="video/webm" />
          <Image src={videos.desktop.poster} alt="" height={200} width={200} />
        </video> 
      </div>
      <div className="video-wrapper-mobile">
        <div className="video__frame-wrapper">
          <Image className="video__frame" src={iphoneImage} height={700} width={700} alt="" />
          <button className="video__control" type="button" onClick={() => videoMobileRef.current?.paused ? videoMobileRef.current?.play(): videoMobileRef.current?.pause() }>
            <span className="video__control__content">
              <FontAwesomeIcon icon={buttonIcon} />
            </span>
          </button>
        </div>
        <video ref={videoMobileRef} className="video__player" poster={videos.mobile.poster} autoPlay={!prefersReducedMotion} muted loop>
          <source src={videos.mobile.src} type="video/webm" />
          <Image src={videos.mobile.poster} alt="" height={200} width={200} />
        </video>
      </div>
    </div>
  )
}

export default VideoPlayer