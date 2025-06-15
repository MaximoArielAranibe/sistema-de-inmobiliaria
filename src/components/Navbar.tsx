import '../styles/_navbar.scss';
import { useRef, useState } from 'react';
import Lottie from 'lottie-react';
import type { LottieRefCurrentProps } from 'lottie-react';
import menuClose from '../assets/icons8-menu.json';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const menuAnimation = useRef<LottieRefCurrentProps | null>(null);

  const handleMenu = () => {
    if (!isOpen) {
      setIsVisible(true);
      setAnimationClass('slide-in-top');
    } else {
      setAnimationClass('slide-out-top');
      setTimeout(() => {
        setIsVisible(false);
      }, 500); // duración igual a la animación
    }

    setIsOpen(!isOpen);

    menuAnimation.current?.playSegments(isOpen ? [14, 0] : [0, 14], true);
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

      <ul className={`navbar__list ${isVisible ? animationClass : 'd-none'}`}>
        <li className="navbar__list--item">Ventas</li>
        <li className="navbar__list--item">Alquileres</li>
        <li className="navbar__list--item">Tasaciones</li>
        <li className="navbar__list--item">Contacto</li>
      </ul>
    </header>
  );
};
