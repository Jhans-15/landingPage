import React from 'react'

import '../assets/css/admin.css';

import Row from '../components/Row';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import EmptyData from '../components/EmptyData';
import ModalContext from '../context/ModalContext';
import Modal from '../components/Modal';

function AdminScreen() {

    const { data } = useContext(DataContext);
    const { modalView } = useContext(ModalContext);

    return (

        <div className='content'>

            <div className='center'>

                <div className='table'>

                    <div className='th'>
                        <div className='column'>
                            <span>Cliente</span>
                        </div>
                        <div className='column'>
                            <span>Email</span>
                        </div>
                        <div className='column'>
                            <span>Teléfono</span>
                        </div>
                        <div className='column'>
                            <span>Logo</span>
                        </div>
                        <div className='column'>
                            <span>Slogan</span>
                        </div>
                        <div className='column'>
                            <span>Hora</span>
                        </div>
                        <div className='column'>
                            <span>Fecha</span>
                        </div>
                        <div className='column'>
                            <span>Mas</span>
                        </div>
                    </div>

                    <div className='tb'>
                        
                        {data.length > 0 ? (
                            <>
                                {data.map((d) => (
                                    <Row key={d.id} id={d.id} clientName={d.client_name} clientEmail={d.client_email} clientPhone={d.client_phone} logo={d.brief.namelogo} slogan={d.brief.sloganlogo} hora={d.hora} fecha={d.fecha}  />
                                ))}
                                {modalView && <Modal/>}

                            </>

                        ) : (

                            <EmptyData text='No tiene registros aún'/>

                        )}

                    </div>

                </div>

            </div>

        </div>

    )

}

export default AdminScreen