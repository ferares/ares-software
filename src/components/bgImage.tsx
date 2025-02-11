'use client'

import { useEffect } from 'react'

import { useBackgroundContext } from '@/context/background'

interface BgImageProps { children: React.ReactNode }

function BgImage({ children }: BgImageProps) {
  const { bg, loadingBg, newBackground } = useBackgroundContext()

  useEffect(newBackground, [newBackground])

  return (
    <section className={`section bg-image ${loadingBg ? '' : 'image-loaded'}`} style={{ backgroundImage: bg ? `url(${bg})`: '' }}>
      {children}
    </section>
  )
}

export default BgImage