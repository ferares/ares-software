'use client'

import { useEffect } from 'react'

import { useBackgroundContext } from '@/context/background'

function Home() {
  const { bg, loadingBg, newBackground } = useBackgroundContext()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(newBackground, [])

  return (
    <main className="main">
      <section id="intro" className={`section ${loadingBg ? '' : 'image-loaded'}`} style={{ backgroundImage: bg ? `url(${bg})`: '' }}>
        <div className="max-width intro-content">
          <h1 className="intro-title">
            <span className="intro-name">Ares</span><br />
            <b className="intro-subtitle">Software Boutique</b>
          </h1>
        </div>
      </section>
    </main>
  )
}

export default Home