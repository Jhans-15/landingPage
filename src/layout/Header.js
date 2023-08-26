import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import logo from "../assets/img/LOGO NEGRO.png"
import "../assets/css/header.css";

function Header() {

    const { i18n } = useTranslation(['languaje']);

    //const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);

    const changeLanguaje = () => {
        if (i18n.language === 'en') {
            i18n.changeLanguage('es');
        } else {
            i18n.changeLanguage('en');
        }
    }

    useEffect(() => {

        const handleResize = () => {
            const newWindowWidth = window.innerWidth;
            //setWindowWidth(newWindowWidth);
            setIsMobile(newWindowWidth <= 768); // Actualizar isMobile en función del nuevo ancho de la ventana
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return (

        <div className='header'>

            <div className='content-header'>

                <div className={`header-component header-component-mobile-${isMobile ? 'visible' : 'hidden'}`}>

                    <div className='side sideA'>
                        <button className='btn btn-lang' onClick={changeLanguaje}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-world" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                <path d="M3.6 9h16.8"></path>
                                <path d="M3.6 15h16.8"></path>
                                <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                                <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                            </svg>
                        </button>
                    </div>

                    <div className='side sideB'>
                        <div className='logo'>
                            <img src={logo} alt='Logo de LogosVip' />
                        </div>
                    </div>

                    <div className='side sideC'>
                        <button className='btn btn-phone' onClick={() => window.location.href = 'tel:+51902073714'}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                            </svg>
                        </button>
                    </div>

                </div>

                <div className={`header-component header-component-desktop-${!isMobile ? 'visible' : 'hidden'}`}>

                    <div className='side sideB'>
                        <ul className='list-nav'>
                            <li className='li-item'>
                                <a href='/' className='a-item'>Servicios de diseño</a>
                            </li>
                            <li className='li-item'>
                                <a href='/' className='a-item'>Galeria</a>
                            </li>
                            <li className='li-item'>
                                <a href='/' className='a-item'>Nosotros</a>
                            </li>
                            <li className='li-item'>
                                <a href='/' className='a-item'>Blog</a>
                            </li>
                            <li className='li-item'>
                                <a href='/' className='a-item'>FAQ</a>
                            </li>
                        </ul>
                    </div>

                    <div className='side sideA'>
                        <div className='logo'>
                            <img src={logo} alt='Logo de LogosVip' />
                        </div>
                    </div>

                    <div className='side sideC'>
                        <button className='btn btn-phone' onClick={() => window.location.href = 'tel:+51902073714'}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                            </svg>
                            <span>+51 902073714</span>
                        </button>
                        <button className='btn btn-lang' onClick={changeLanguaje}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-world" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                <path d="M3.6 9h16.8"></path>
                                <path d="M3.6 15h16.8"></path>
                                <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                                <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                            </svg>
                            <span className='lang'>{i18n.language === 'es' ? 'eng' : 'esp'}</span>
                        </button>
                    </div>
                </div>

            </div>

        </div>

    )

}

export default Header