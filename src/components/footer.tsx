import Image from "next/image"

function Footer() {
  return (
    <footer className="footer">
      <div className="max-width">
        <div className="footer__content">
          <Image className="footer__icon" width={20} height={16} src="icons/code.svg" alt="Desarrollado" />
          <span className="footer__text">
            in La Paloma, Rocha, Uruguay 
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer