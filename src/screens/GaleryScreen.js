import React from 'react'

import logoUno from '../assets/img/LOGOTIPO.jpg'
import Header from '../layout/Header'

function GaleryScreen() {

    return (

        <>
        
            <Header/>

            <div>
                <img src={logoUno} alt='Image' />
            </div>

        </>

    )
}

export default GaleryScreen