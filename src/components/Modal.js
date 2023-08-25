import React from 'react'
import { saveAs } from "file-saver";

import '../assets/css/modal.css'
import { useContext } from 'react'
import ModalContext from '../context/ModalContext'
import DataContext from '../context/DataContext'
import setting from '../settings/settings'

function Modal() {

    const { data } = useContext(DataContext);
    const { closeModal, getId, id } = useContext(ModalContext);

    const datos = data.find((d) => d.id === id);

    const handleCloseModal = () => {
        getId('');
        closeModal();
    }

    const handleDownload = (images) => {

        const randomCode = generateRandomCode();

        // Construir la URL completa de la imagen
        const downloadUrl = `${setting.image}/${images}`;

        // Hacer la solicitud para descargar el archivo
        fetch(downloadUrl)
        .then((response) => response.blob())
        .then((blob) => {
            // Crear un objeto Blob con la respuesta de la solicitud
            const file = new Blob([blob], { type: 'image/png' });

            // Descargar el archivo utilizando file-saver
            saveAs(file, `${randomCode}.png`);
        })
        .catch((error) => {
            console.error('Error al descargar la imagen:', error);
        });

    }

    const generateRandomCode = () => {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const codeLength = 10;
        let randomCode = '';
        
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomCode += characters[randomIndex];
        }
        
        return randomCode;

    }

    return (

        <div className='overflow-modal'>

            <div className='modal'>

                <div className='modal-head'>
                    
                    <div className='content-modal-head'>

                        <div className='tit'>
                            <span>Más información</span>
                        </div>

                        <div className='act'>
                            <button className='btn' onClick={handleCloseModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M18 6l-12 12"></path>
                                    <path d="M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                    </div>

                </div>

                <div className='modal-body'>

                    <div className='content-modal-body'>

                        <div className='wrap'>
                            <div className='group'>
                                <div className='control'>
                                    <div className='content-control'>
                                        <span className='span-block span-label'>Cliente</span>
                                        <span className='span-block'>{datos.client_name}</span>
                                    </div>
                                </div>
                                <div className='control'>
                                    <div className='content-control'>
                                        <span className='span-block span-label'>Teléfono</span>
                                        <span className='span-block'>{datos.client_phone}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='group'>
                                <div className='control'>
                                    <div className='content-control'>
                                        <span className='span-block span-label'>Email</span>
                                        <span className='span-block'>{datos.client_email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='wrap'>
                            <div className='group'>
                                <div className='control'>
                                    <div className='content-control'>
                                        <span className='span-block span-label'>Tipo de Logo</span>
                                        <span className='span-block'>
                                            {datos.type.map((typeItem, index) => (
                                                <span className='badge-type' key={index}>{typeItem}</span>
                                            ))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='group'>
                                <div className='control'>
                                    <div className='content-control'>
                                        <span className='span-block span-label'>Nombre del Logo</span>
                                        <span className='span-block'>{datos.brief.namelogo}</span>
                                    </div>
                                </div>
                                <div className='control'>
                                    <div className='content-control'>
                                        <span className='span-block span-label'>Slogan del Logo</span>
                                        <span className='span-block'>{datos.brief.sloganlogo}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='group'>
                                <div className='control'>
                                    <div className='content-control'>
                                        <span className='span-block span-label'>Acerca del Logo</span>
                                        <span className='span-block'>{datos.brief.aboutlogo}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='group'>
                                <div className='control'>
                                    <div className='content-control'>
                                        <span className='span-block span-label'>Sugerencias del Logo</span>
                                        <span className='span-block'>{datos.brief.suggestionslogo}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='group'>
                                <div className='control'>
                                    <div className='content-control'>
                                        <span className='span-block span-label'>Colores del Logo</span>
                                        <span className='span-block span-block-color' style={{backgroundColor: `${datos.brief.colors}`}}>{datos.brief.colors}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='wrap'>

                            <div className='images'>
                                {datos.files.map((image, index) => (
                                    <div className='content-image' key={index}>
                                        <img src={`${setting.image}/${image}`} alt={`Preview ${index}`} />
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default Modal