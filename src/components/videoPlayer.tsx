"use client"

import { type RefObject, useCallback, useEffect, useRef, useState } from "react"

import Image from "next/image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPause, faPlay, type IconDefinition } from "@fortawesome/free-solid-svg-icons"

import { usePrefersReducedMotionContext } from "@/context/reducedMotion"

import macbookImage from "@/../public/imgs/macbook.png"
import iphoneImage from "@/../public/imgs/iphone.png"

type Video = { src: string, poster: string }

export type Videos = { desktop: Video, mobile: Video }

interface VideoPlayerProps { videos: Videos }

function VideoPlayer({ videos }: VideoPlayerProps) {
  const videoDesktopRef = useRef<HTMLVideoElement>(null)
  const videoMobileRef = useRef<HTMLVideoElement>(null)
  const [buttonIcon, setButtonIcon] = useState<IconDefinition>(faPlay)
  const { prefersReducedMotion } = usePrefersReducedMotionContext()

  function handlePlay() { setButtonIcon(faPause) }
  function handlePause() { setButtonIcon(faPlay) }

  const setVideoEventHandlers = useCallback((videoRef: RefObject<HTMLVideoElement | null>) => {
    const videoElement = videoRef.current
    videoElement?.addEventListener("play", handlePlay)
    videoElement?.addEventListener("pause", handlePause)
    return () => {
      videoElement?.removeEventListener("play", handlePlay)
      videoElement?.removeEventListener("pause", handlePause)
    }
  }, [])

  useEffect(() => setVideoEventHandlers(videoDesktopRef), [videoDesktopRef, setVideoEventHandlers])
  useEffect(() => setVideoEventHandlers(videoMobileRef), [videoMobileRef, setVideoEventHandlers])

  return (
    <div className="video">
      <div className="video-wrapper-desktop">
        <div className="video__frame-wrapper">
          <Image className="video__frame" src={macbookImage} height={700} width={700} alt="" />
          <button className="video__control" type="button" onClick={() => videoDesktopRef.current?.paused ? videoDesktopRef.current?.play(): videoDesktopRef.current?.pause() }>
            <FontAwesomeIcon icon={buttonIcon} />
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
            <FontAwesomeIcon icon={buttonIcon} />
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