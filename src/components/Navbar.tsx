import '../styles/_navbar.scss';
import { useRef, useState } from 'react';
import Lottie from 'lottie-react';
import type { LottieRefCurrentProps } from 'lottie-react';
import menuClose from '../assets/icons8-menu.json';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuAnimation = useRef<LottieRefCurrentProps | null>(null);

  const handleMenu = () => {
    if (!isOpen) {
      setShowMenu(true);
      setIsOpen(true);
      menuAnimation.current?.playSegments([0, 14], true);
    } else {
      setIsOpen(false);
      menuAnimation.current?.playSegments([14, 0], true);
    }
  };

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setShowMenu(false); // Ocultamos después de la animación de salida
    }
  };

  const onComplete = () => {
    menuAnimation.current?.goToAndStop(isOpen ? 14 : 0, true);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link className="navbar__logo" to="/">
          <img
            className="navbar__logo--img"
            src="https://s3.ca-central-1.amazonaws.com/logojoy/logos/223270745/noBgWhite.png?8695.5"
            alt="logo"
          />
        </Link>
        <button className="navbar__menu" onClick={handleMenu}>
          <Lottie
            lottieRef={menuAnimation}
            animationData={menuClose}
            loop={false}
            autoplay={false}
            className="navbar__menu--icon"
            onComplete={onComplete}
          />
        </button>
      </nav>

      {showMenu && (
        <ul
          className={`navbar__list ${isOpen ? 'slide-in' : 'slide-out'}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <li className="navbar__list--item">Ventas</li>
          <li className="navbar__list--item">Alquileres</li>
          <li className="navbar__list--item">Tasaciones</li>
          <li className="navbar__list--item">Contacto</li>
        </ul>
      )}
    </header>
  );
};
