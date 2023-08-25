import React, { createContext, useState } from "react";

const PayConfirmContext = createContext();

export const PayConfirmProvider = ({ children }) => {

    const [ confirmPay, setConfirmPay ] = useState(false);
    const [ codePay, setCodePay ] = useState();

    const acceptConfirmPay = () => {
        setConfirmPay(true);
    }

    const cancelConfirmPay = () => {
        setConfirmPay(false);
    }

    const defCodePay = (code) => {
        setCodePay(code);
    }

    return (

        <PayConfirmContext.Provider value={{confirmPay, codePay, acceptConfirmPay, cancelConfirmPay, defCodePay}}>
            {children}
        </PayConfirmContext.Provider>

    )

}

export default PayConfirmContext;