"use client"

import Image from "next/image"

import useEmblaCarousel from "embla-carousel-react"

import macbookImage from "@/../public/imgs/macbook.png"

interface CarouselProps { images: string[] }

function Carousel({ images }: CarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true })

  return (
    <div className="carousel">
      <div className="carousel-frame-container">
        <Image className="carousel-frame" src={macbookImage} height={700} width={700} alt="" />
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {images.map((image, index) => (
              <div key={index} className="embla__slide">
                <Image src={image} alt="" width={523} height={349} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel