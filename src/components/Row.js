import React from 'react'
import { useContext } from 'react';
import ModalContext from '../context/ModalContext';

function Row({ id, clientName, clientEmail, clientPhone, logo, slogan, hora, fecha }) {

    const { openModal, getId } = useContext(ModalContext);

    const handleOpenModal = (id) => {
        getId(id);
        openModal();
    }

    return (

        <div className='row'>
            <div className='column'>
                <span title={clientName}>{clientName}</span>
            </div>
            <div className='column'>
                <span title={clientEmail}>{clientEmail}</span>
            </div>
            <div className='column'>
                <span title={clientPhone}>{clientPhone}</span>
            </div>
            <div className='column'>
                <span title={logo}>{logo}</span>
            </div>
            <div className='column'>
                <span title={slogan}>{slogan}</span>
            </div>
            <div className='column'>
                <span title={hora}>{hora}</span>
            </div>
            <div className='column'>
                <span title={fecha}>{fecha}</span>
            </div>
            <div className='column'>
                <button className='btn' onClick={() => handleOpenModal(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M12 9h.01"></path>
                        <path d="M11 12h1v4h1"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Row