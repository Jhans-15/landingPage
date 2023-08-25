import React, { createContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [ id, setId ] = useState();
    const [ modalView, setModalView ] = useState(false);

    const openModal = () => {
        setModalView(true);
    }

    const closeModal = () => {
        setModalView(false);
    }

    const getId = (id) => {
        setId(id);
    }

    const contextValue = {
        id,
        modalView,
        openModal,
        closeModal,
        getId
    }

    return (
        <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
    );

}

export default ModalContext;