'use client'

import { useEffect } from 'react'

import Image from 'next/image'

import { useBackgroundContext } from '@/context/background'
import { useScreenReaderContext } from '@/context/screenReader'

import meImg from '@/../public/imgs/me.jpg'
import gitHubLogo from '@/../public/imgs/github.svg'
import linkedinLogo from '@/../public/imgs/linkedin.svg'

function Header() {
  const { newBackground, loadingBg } = useBackgroundContext()
  const { setMessage } = useScreenReaderContext()

  useEffect(() => {
    if (loadingBg) setMessage('Cambiando imagen de fondo')
    else setMessage('Imagen de fondo cambiada')
  }, [loadingBg, setMessage])

  return (
    <header className="header">
      <nav className="navbar max-width">
        <button className="navbar__btn" type="button" onClick={newBackground} title="Cambiar imagen de fondo">
          <Image className="navbar__img" src={meImg} alt="" />
        </button>
        <ul className="navbar__menu">
          <li className="navbar__menu__item">
            <a className="navbar__menu__link" target="_blank" rel="noreferrer nofollow noopener" href="https://github.com/ferares">
              <Image className="navbar__menu__icon" src={gitHubLogo} alt="GitHub" />
            </a>
          </li>
          <li className="navbar__menu__item">
            <a className="navbar__menu__link" target="_blank" rel="noreferrer nofollow noopener" href="https://www.linkedin.com/in/ferm%C3%ADn-ares-0249b71ab/">
              <Image className="navbar__menu__icon" src={linkedinLogo} alt="Linkedin" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header