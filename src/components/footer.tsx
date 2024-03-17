import Image from 'next/image'

import codeImg from '@/../public/imgs/code.svg'

function Footer() {
  return (
    <footer className="footer">
      <div className="max-width">
        <div className="footer__content">
          <Image className="footer__icon" src={codeImg} alt="Desarrollado" />
          <span className="footer__text">
            in La Paloma, Rocha, Uruguay 
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer