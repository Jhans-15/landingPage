import React, { useState, useEffect, Suspense } from 'react'
import { useTranslation } from 'react-i18next';

import logo from "../assets/img/LOGO BLANCO.png"

import "../assets/css/footer.css"

import Swal from 'sweetalert2';
import setting from '../settings/settings';

function Footer() {

    const { t } = useTranslation(["languaje"]);

    //const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);
    const [ loadingSend, setLoadingSend ] = useState(false);
    
    const [ nameMail, setNameMail ] = useState('');
    const [ lastMail, setLastMail ] = useState('');
    const [ emailMail, setEmailMail ] = useState('');
    const [ messageMail, setMessageMail ] = useState('');


    //console.log(windowWidth);

    const isValidEmail = (email) => {
        // Expresión regular para verificar un formato de correo electrónico básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const emptyText = () => {
        setNameMail('');
        setLastMail('');
        setEmailMail('');
        setMessageMail('');
    }

    const handleSendMail = () => {

        if (nameMail.trim() === '' || lastMail.trim() === '' || emailMail.trim() === '' || messageMail.trim() === '') {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Los campos no deben estar vacíos'
            })
            return;
            
        }

        if (!isValidEmail(emailMail)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresa un correo electrónico válido'
            });
            return;
        }
        
        //Contraseña del correo eSx4L@ZZ@pKseip
        
        setLoadingSend(true);

        const formData = new FormData();

        formData.append('nombre', nameMail);
        formData.append('apellido', lastMail);
        formData.append('email', emailMail);
        formData.append('message', messageMail);

        fetch(`${setting.email}`, {
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    text: data.message
                })
                emptyText();
            }
        })
        .catch((error) => {
            console.error('Error en el fetch:', error);
        })
        .finally(() => {
            setLoadingSend(false);
        })

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

    //%rUU{klMWwg+

    return (

        <Suspense fallback='cargando'>
            <div className='footer'>

                <div className={`footerA ${!isMobile ? 'footerA-desktop' : 'footerA-mobile'}`}>

                    <div className='content-footerB'>
                        <div className='logo'>
                            <img src={logo} alt='Logo de LogosVip Blanco' />
                        </div>
                    </div>

                    <div className='content-footerA'>

                        <div className='tit'>
                            <span>{t('footer.redesSociales')}</span>
                        </div>

                        <div className='bdy'>
                            <ul className='list-network'>
                                <li className='item-network'>
                                    <a href='https://www.facebook.com/LogosVIPotenciaTuMarca' target='_blank' rel='noopener noreferrer' className='a-network'>
                                        <span className='ico ico-facebook'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                                            </svg>
                                        </span>
                                        <span className='txt'>/LogosVIPotenciaTuMarca</span>
                                    </a>
                                </li>
                                <li className='item-network'>
                                    <a href='https://www.instagram.com/logosvipcorporatebrand/' target='_blank' rel='noopener noreferrer' className='a-network'>
                                        <span className='ico ico-instagram'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-instagram" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                                <path d="M16.5 7.5l0 .01"></path>
                                            </svg>
                                        </span>
                                        <span className='txt'>/logosvipcorporatebrand</span>
                                    </a>
                                </li>
                                <li className='item-network'>
                                    <a href='http://wa.link/logosvip' target='_blank' rel='noopener noreferrer' className='a-network'>
                                        <span className='ico ico-whatsapp'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-whatsapp" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
                                                <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
                                            </svg>
                                        </span>
                                        <span className='txt'>/logosvip</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className='content-footerC'>

                        <div className='tit'>
                            <span>{t('footer.contactanos')}</span>
                        </div>

                        <div className='bdy'>

                            <div className='form'>
                                <div className='form__group form__flex'>
                                    <input type='text' className='entry' name='entryNombre' id='entryNombre' placeholder={t('placeholder.labelNameMail')} value={nameMail} onChange={(e) => setNameMail(e.target.value)} />
                                    <input type='text' className='entry' name='entryApellido' id='entryApellido' placeholder={t('placeholder.labelLastMail')} value={lastMail} onChange={(e) => setLastMail(e.target.value)} />
                                </div>
                                <div className='form__group'>
                                    <input type='email' className='entry' name='entryEmail' id='entryEmail' placeholder={t('placeholder.labelEmailMail')} value={emailMail} onChange={(e) => setEmailMail(e.target.value)} required />
                                </div>
                                <div className='form__group'>
                                    <textarea className='entry-text' name='entryMessage' id='entryMessage' placeholder={t('placeholder.labelTextMail')} value={messageMail} onChange={(e) => setMessageMail(e.target.value)} />
                                </div>
                                <div className='form__group'>
                                    <button className='btn' onClick={handleSendMail}>
                                        {loadingSend ? (
                                            <>
                                                {t('actionsButtons.sendingMail')}
                                            </>
                                        ) : (
                                            <>
                                                {t('actionsButtons.sendMail')}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <div className={`footerB ${!isMobile ? 'footerB-desktop' : 'footerB-mobile'}`}>

                    <div className='content-footerB'>
                        <div className='side sideA'>
                            <div className='text'>© LogosVip 2023  |   All rights reserved.</div>
                        </div>
                        
                        <div className='side sideB'>
                            <div className='text'>{t('footer.sitioCreadoPor')} <a href='https://www.facebook.com/arcanatech12' target='_blank' rel='noopener noreferrer'>A.R.C.A.N.A</a></div>
                        </div>
                    </div>

                </div>

            </div>
        </Suspense>

    )

}

export default Footer