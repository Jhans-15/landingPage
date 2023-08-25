import React from 'react'

import "../assets/css/voucher.css"

function Voucher({ code, fullname, email, phone, logoName, amount, price }) {
    
    const importe = price * amount;

    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    return (

        <div className="voucher">

            <div className='voucher-header'>
                <h2 className='tit'>COORPORACIÓN LOGOS VIP S.A.C</h2>
                <div className='txt'>
                    <p className='dir'>
                        <span className='span-dir'>Dirección Fiscal: Jr. Ica Nueva N° 2255 C.P. CAJAS CHICO (ENTRE JR ALISOS Y JR ICA NUEVA) JUNÍN - HUANCAYO - HUANCAYO</span>
                        <span className='span-tel'>Teléfono: +51 902073714</span>
                    </p>
                </div>
                <div className='ptx'>
                    <p className='ruc'>RUC: 20611095377</p>
                    <p className='ptx-tit'>BOLETA DE VENTA</p>
                    <p className='code'>{code}</p>
                </div>
            </div>
            
            <div className='voucher-body'>
                <div className='fila'>
                    <div className='row'>
                        <div className='column columnA'>
                            <span className='text'>Fecha/Hora de Emisión</span>
                        </div>
                        <div className='column columnB'>
                            <span className='text'>{formattedDate}</span>
                        </div>
                    </div>
                </div>
                <div className='fila'>
                    <div className='row'>
                        <div className='column columnA'>
                            <span className='text'>Cliente</span>
                        </div>
                        <div className='column columnB'>
                            <span className='text'>{fullname}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='column columnA'>
                            <span className='text'>Celular</span>
                        </div>
                        <div className='column columnB'>
                            <span className='text'>{phone}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='column columnA'>
                            <span className='text'>Correo</span>
                        </div>
                        <div className='column columnB'>
                            <span className='text'>{email}</span>
                        </div>
                    </div>
                </div>
                <div className='fila'>
                    <div className='row'>
                        <div className='column columnA'>
                            <span className='text'>Origen</span>
                        </div>
                        <div className='column columnB'>
                            <span className='text'>Página Web</span>
                        </div>
                    </div>
                </div>
                <div className='fila'>
                    <div className='table'>
                        <div className='table-head'>
                            <div className='column'>CANT</div>
                            <div className='column'>DESCRIPCIÓN</div>
                            <div className='column'>P. UNIT</div>
                            <div className='column'>IMPORTE</div>
                        </div>
                        <div className='table-body'>
                            <div className='column'>{amount}</div>
                            <div className='column'>{logoName}</div>
                            <div className='column'>{price}</div>
                            <div className='column'>{importe.toFixed(2)}</div>
                        </div>
                        <div className='table-footer'>
                            <div className='column'></div>
                            <div className='column'></div>
                            <div className='column columnBold'>Total</div>
                            <div className='column'>{importe.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='voucher-footer'>
                <h4>Gracias por su compra</h4>
            </div>

        </div>

    )
    
}

export default Voucher