import React from 'react'

import Header from "../layout/Header";
import Footer from "../layout/Footer";

import "../assets/css/brief.css";
import Main from '../layout/Main';

function HomeScreen() {

    return (
    
        <div className='page'>
            
            <Header/>

            <Main/>

            <Footer/>

        </div>
    
    )

}

export default HomeScreen