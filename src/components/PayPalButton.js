import React, { useContext } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import Swal from 'sweetalert2';

import PayConfirmContext from '../context/PayConfirmContext';

function PayPalButton({ total, invoice }) {

    const { acceptConfirmPay, cancelConfirmPay, defCodePay } = useContext(PayConfirmContext);

    const handleApprove = async (data, actions) => {
        try {
            const order = await actions.order.capture();
            let timerInterval;
            Swal.fire({
                title: 'Procesando pago',
                html: '<b></b>',
                text: 'En este momento estamos procesando el pago',
                timer: 2000,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = 'Procesando...';
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.isDismissed) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Listo!',
                        text: 'Se confirmo correctamente el pago',
                        confirmButtonText: 'Aceptar'
                    });
                }
            })
            defCodePay(order.id);
            acceptConfirmPay();
        } catch (error) {
            if (error.name === 'PROCESSOR_DECLINED') {
                Swal.fire({
                    icon: 'error',
                    title: 'Pago rechazado',
                    text: 'El pago fue rechazado debido a fondos insuficientes o un problema con la tarjeta',
                });
            } else {
                // Otro tipo de error
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Hubo un error al momento de procesar el pago. Intentalo más tarde.',
                });
            }
        }
    };

    const handleCancel = (data) => {
        cancelConfirmPay();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Se canceló el proceso de pago'
        })
    };

    const handleError = (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'Hubo un error al momento de procesar el pago. Intentalo más tarde.',
        });
    };

    return (

        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: invoice,
                            amount: {
                                value: total,
                            }
                        }
                    ]
                })
            }}
            onApprove={handleApprove}
            onCancel={handleCancel}
            onError={handleError}
        />

    )
}

export default PayPalButton