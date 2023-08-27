import React, { useState, useEffect, Suspense, useContext } from 'react'
import { useTranslation } from 'react-i18next';
import setting from "../settings/settings";

import PayPalButton from './PayPalButton';
import { ChromePicker } from 'react-color';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';

import 'sweetalert2/dist/sweetalert2.min.css';
import "../assets/css/formbrief.css"
import Voucher from './Voucher';
import PayConfirmContext from '../context/PayConfirmContext';


function FormBrief() {

    const { t } = useTranslation(["languaje"]);

    const [ currentStep, setCurrentStep ] = useState(1);
    const [ alert, setAlert ] = useState('');
    const [ userCountry, setUserCountry ] = useState('');

    // Estados para la primera etapa
    const [ fullName, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');

    // Estados para la segunda etapa
    const [ logoName, setLogoName ] = useState('');
    const [ slogan, setSlogan ] = useState('');
    const [ businessDescription, setBusinessDescription ] = useState('');
    const [ logoType, setLogoType ] = useState([]);
    const [ suggestion, setSuggestion ] = useState('');

    const [ pickerColor, setPickerColor ] = useState('#ffffff');
    const [ displayColorPicker, setDisplayColorPicker ] = useState(false);

    const [ uploadedFiles, setUploadedFiles ] = useState([]);

    const [ voucherImage, setVoucherImage ] = useState(null);
    const { confirmPay, codePay } = useContext(PayConfirmContext);

    //const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);

    //console.log(windowWidth);
    //console.log('Current language:', i18n.language);

    const handleNextStep = () => {

        if (currentStep === 1) {
            if (fullName === '' || phone === '' || email === '') {
                setAlert('Por favor antes de continuar completa todos los campos');
                Swal.fire({
                    icon: 'error',
                    title: 'Campos incompletos',
                    text: alert
                });
                return;
            }
            setAlert('');
            setCurrentStep(currentStep + 1);
        } else {
            if (logoName === '' || businessDescription === '' || uploadedFiles === '') {
                setAlert('Please complete all the fields before continuing.');
                Swal.fire({
                    icon: 'error',
                    title: 'Campos incompletos',
                    text: alert
                });
                return;
            }
            setAlert('');
            setCurrentStep(currentStep + 1);
        }
        
    };

    const handlePrevStep = () => {
        setAlert('');
        setCurrentStep(currentStep - 1);
    };

    const handleClick = () => setDisplayColorPicker(!displayColorPicker);
    const handleClose = () => setDisplayColorPicker(false);

    const popover = {
        position: 'absolute',
        zIndex: '2',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    };

    const handleLogoTypeSelect = (type) => {
        // Verificar si el tipo ya está seleccionado
        if (type === "Nopreference") {
            // Si el tipo seleccionado es "Nopreference", desmarcar todas las demás opciones
            setLogoType([type]);
        } else if (logoType.includes("Nopreference")) {
            // Si "Nopreference" está marcado y se hace clic en otra opción, desmarcar "Nopreference"
            setLogoType([type]);
        } else {
            // Marcar o desmarcar la opción según su estado actual
            if (logoType.includes(type)) {
                setLogoType(logoType.filter(item => item !== type)); // Desmarcar
            } else {
                setLogoType([...logoType, type]); // Marcar
            }
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5){
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor selecciona hasta 5 archivos'
            })
            return;
        }
        setUploadedFiles(files);
    };

    const handleColorChange = (color) => {
        setPickerColor(color.hex);
    };

    const generateVoucherImage = async () => {
        const voucherElement = document.getElementById('voucher-container');
        const canvas = await html2canvas(voucherElement);
        const imageUrl = canvas.toDataURL('image/png'); // Generar la URL de la imagen en formato PNG
        setVoucherImage(imageUrl); // Actualizar el estado con la URL de la imagen generada
    };    

    const handleDownloadImage = () => {

        const link = document.createElement('a');
        link.href = voucherImage;
        link.download = `${codePay}.png`;
        link.click();

    };

    const handleShareImage = () => {
        if (voucherImage) {
            const phoneNumber = '995984231';
            const message = '¡Hola! Aquí tienes el voucher generado:';
            const encodedMessage = encodeURIComponent(message);
            const shareLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
            window.open(shareLink, '_blank');
        }
    }

    useEffect(() => {

        const codeCountry = async () => {
            const api = 'https://api.ipbase.com/v1/json/';
            const response = await fetch(api);
            const data = await response.json();
            setUserCountry(data.country_code);
        }

        codeCountry();

    }, []);

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

    useEffect(() => {

        const sendData = () => {

            const formData = new FormData();

            formData.append('client_name', fullName)
            formData.append('client_email', email)
            formData.append('client_phone', phone)

            formData.append('namelogo', logoName)
            formData.append('sloganlogo', slogan)
            formData.append('aboutlogo', businessDescription)
            formData.append('suggestionslogo', suggestion)
            formData.append('colors', pickerColor)

            formData.append('typeslogo', JSON.stringify(logoType)); // Convertir el array en una cadena JSON
            
            for (let i = 0; i < uploadedFiles.length; i++) {
                formData.append('files[]', uploadedFiles[i]);
            }

            fetch(`${setting.api}insert.php`, {
                method: 'POST',
                body: formData
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log('DATA');
                }
            })
            .catch((err) => {
                console.log('ERROR: ' + err.message);
            })
            .finally(() => {
                generateVoucherImage();
            })

        }

        if (confirmPay) {
            
            sendData();

        }

    }, [confirmPay, fullName, email, phone, logoName, slogan, businessDescription, suggestion, pickerColor, logoType, uploadedFiles]);

    return (

        <Suspense fallback='Cargando traducciones'>

            <div className={`elementor-form-${isMobile ? 'mobile' : 'desktop'}`}>

                <div className='elementor-separator elementor-title'>
                    <h1 className='elementor-h1'>{t('startProject')}</h1>
                </div>

                <div className='elementor-separator elementor-guide'>
                    <div className='elementor-steps'>
                        <div className={`elementor-step ${currentStep === 1 ? 'elementor-step-active' : ''}`}>1</div>
                        <div className={`elementor-step ${currentStep === 2 ? 'elementor-step-active' : ''}`}>2</div>
                        <div className={`elementor-step ${currentStep === 3 ? 'elementor-step-active' : ''}`}>3</div>
                    </div>
                </div>

                <div className='elementor-separator elementor-content'>

                    {currentStep === 1 && (
                        <>
                            <div className='elementor-group'>
                                <div className='elementor-title'>
                                    <span>{t('personalInfo.label')}</span>
                                </div>
                            </div>

                            <div className='elementor-group'>

                                <div className='elementor-label'>
                                    <label className='label'>{t('personalInfo.fullName')}<span className='important'>*</span></label>
                                </div>

                                <div className='elementor-entries'>
                                    <input type='text' className='entry' placeholder={t('placeholder.fullNameForm')} value={fullName} onChange={e => setFullName(e.target.value)} />
                                </div>

                            </div>

                            <div className='elementor-group'>

                                <div className='elementor-label'>
                                    <label className='label'>{t('personalInfo.email')}<span className='important'>*</span></label>
                                </div>

                                <div className='elementor-entries'>
                                    <input type='email' className='entry' placeholder={t('placeholder.emailForm')} value={email} onChange={e => setEmail(e.target.value)} />
                                </div>

                            </div>

                            <div className='elementor-group'>

                                <div className='elementor-label'>
                                    <label className='label'>{t('personalInfo.phone')} <span className='important'>*</span></label>
                                </div>

                                <div className='elementor-entries'>
                                    <PhoneInput
                                        international
                                        defaultCountry={userCountry} // Usar el código de país obtenido
                                        value={phone}
                                        onChange={setPhone}
                                        placeholder={'Phone Number'}
                                    />
                                </div>

                            </div>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <div className='elementor-group'>
                                <div className='elementor-title'>
                                    <span>{t('brief.label')}</span>
                                </div>
                            </div>

                            <div className='elementor-group'>

                                <div className='elementor-label'>
                                    <label className='label'>{t('brief.logoName')}</label>
                                </div>

                                <div className='elementor-entries'>
                                    <input type='text' className='entry' placeholder={t('placeholder.companyForm')} value={logoName} onChange={e => setLogoName(e.target.value)}/>
                                </div>

                            </div>

                            <div className='elementor-group'>

                                <div className='elementor-label'>
                                    <label className='label'>{t('brief.slogan')}</label>
                                </div>

                                <div className='elementor-entries'>
                                    <input type='text' className='entry' placeholder={t('placeholder.responseForm')} value={slogan} onChange={e => setSlogan(e.target.value)} />
                                </div>

                            </div>

                            <div className='elementor-group'>

                                <div className='elementor-label'>
                                    <label className='label'>{t('brief.businessInfo')}</label>
                                </div>

                                <div className='elementor-entries'>
                                    <textarea className='entry-area' placeholder={t('placeholder.bussinesForm')} value={businessDescription} onChange={(e) => setBusinessDescription(e.target.value)}/>
                                </div>

                            </div>

                            <div className='elementor-group'>

                                <div className='elementor-label'>
                                    <label className='label'>{t('brief.logoType')}</label>
                                </div>

                                <div className='elementor-grid'>

                                    <div className='elementor-group-items'>
                                        <div className={`elementor-item elementor-item-iso ${logoType.includes('Isotipo') ? 'selected' : ''}`} onClick={() => handleLogoTypeSelect('Isotipo')}></div>
                                        <div className='elementor-text'>
                                            <span className='txt-tit'>{t('placeholder.Isotipo')}</span>
                                            <span className='txt-dec'>(Solo ícono)</span>
                                        </div>
                                    </div>

                                    <div className='elementor-group-items'>
                                        <div className={`elementor-item elementor-item-log ${logoType.includes('Logotipo') ? 'selected' : ''}`} onClick={() => handleLogoTypeSelect('Logotipo')}></div>
                                        <div className='elementor-text'>
                                            <span className='txt-tit'>{t('placeholder.Logotipo')}</span>
                                            <span className='txt-dec'>(Solo texto)</span>
                                        </div>
                                    </div>

                                    <div className='elementor-group-items'>
                                        <div className={`elementor-item elementor-item-ima ${logoType.includes('Imagotipo') ? 'selected' : ''}`} onClick={() => handleLogoTypeSelect('Imagotipo')}></div>
                                        <div className='elementor-text'>
                                            <span className='txt-tit'>{t('placeholder.Imagotipo')}</span>
                                            <span className='txt-dec'>(Simbolo y texto)</span>
                                        </div>
                                    </div>

                                    <div className='elementor-group-items'>
                                        <div className={`elementor-item elementor-item-isl ${logoType.includes('Isologo') ? 'selected' : ''}`} onClick={() => handleLogoTypeSelect('Isologo')}></div>
                                        <div className='elementor-text'>
                                            <span className='txt-tit'>{t('placeholder.Isologo')}</span>
                                            <span className='txt-dec'>(Simbolo y texto mezclado)</span>
                                        </div>
                                    </div>

                                    <div className='elementor-group-items'>
                                        <div className={`elementor-item elementor-item-msc ${logoType.includes('Mascotlogo') ? 'selected' : ''}`} onClick={() => handleLogoTypeSelect('Mascotlogo')}></div>
                                        <div className='elementor-text'>
                                            <span className='txt-tit'>{t('placeholder.Mascotlogo')}</span>
                                            <span className='txt-dec'>(Diseño de mascota)</span>
                                        </div>
                                    </div>

                                    <div className='elementor-group-items'>
                                        <div className={`elementor-item elementor-item-p ${logoType.includes('Nopreference') ? 'selected' : ''}`} onClick={() => handleLogoTypeSelect('Nopreference')}></div>
                                        <div className='elementor-text'>
                                            <span className='txt-tit'>{t('placeholder.noPreference')}</span>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className='elementor-group'>

                                <div className='elementor-label'>
                                    <label className='label'>{t('brief.designSuggestions')}</label>
                                </div>

                                <div className='elementor-entries'>
                                    <textarea className='entry-area' placeholder={t('placeholder.suggestions')} value={suggestion} onChange={(e) => setSuggestion(e.target.value)}/>
                                </div>

                            </div>

                            <div className='elementor-group'>

                                <div className='elementor-label'>
                                    <label className='label'>{t('brief.preferredColor')}</label>
                                </div>

                                <div className='elementor-entries elementor-color'>
                                    <button className='choose-color' onClick={handleClick}>Elige un color</button>
                                    <div className='content-color' style={{backgroundColor: pickerColor}}>{pickerColor}</div>
                                    {displayColorPicker && (
                                        <div style={popover}>
                                            <div style={cover} onClick={handleClose}/>
                                            <ChromePicker color={pickerColor} onChange={handleColorChange} />
                                        </div>
                                    )}
                                    
                                </div>

                            </div>

                            <div className='elementor-group'>

                                <div className='elementor-label'>
                                    <label className='label'>{t('brief.usefulFiles')}</label>
                                </div>

                                <div className='elementor-entries'>
                                    <label htmlFor='files' className={`area-image ${uploadedFiles.length > 0 ? 'area-image-choosed' : ''}`}>
                                        <div className='area-center'>
                                            <div className='icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                                    <path d="M7 9l5 -5l5 5"></path>
                                                    <path d="M12 4l0 12"></path>
                                                </svg>
                                            </div>
                                            {uploadedFiles.length > 0 ? (
                                                <div className='text'>{t('placeholder.filesSuccessfly')} <b>{uploadedFiles.length}</b> {t('placeholder.archivos')}</div>
                                            ) : (
                                                <div className='text'>{t('placeholder.areaFiles')}</div>
                                            )}
                                        </div>
                                    </label>
                                    <input type='file' className='entry-file' name='' id='files' onChange={handleFileChange} accept='image/*' multiple/>
                                </div>

                            </div>
                        </>
                    )}

                    {currentStep === 3 && (
                        <>
                            {!confirmPay ? (
                                <>
                                    <div className='elementor-group'>
                                        <div className='elementor-title'>
                                            <span>{t('payment.label')}</span>
                                        </div>
                                    </div>

                                    <div className='elementor-group'>
                                        <div className='table'>
                                            <div className='table-row'>
                                                <div className='table-column table-left'>
                                                    <span>Cliente</span>
                                                </div>
                                                <div className='table-column table-right'>
                                                    <span>{fullName}</span>
                                                </div>
                                            </div>
                                            <div className='table-row'>
                                                <div className='table-column table-left'>
                                                    <span>Email</span>
                                                </div>
                                                <div className='table-column table-right'>
                                                    <span>{email}</span>
                                                </div>
                                            </div>
                                            <div className='table-row'>
                                                <div className='table-column table-left'>
                                                    <span>Teléfono</span>
                                                </div>
                                                <div className='table-column table-right'>
                                                    <span>{phone}</span>
                                                </div>
                                            </div>
                                            <div className='table-line'></div>
                                            <div className='table-row'>
                                                <div className='table-column table-left'>
                                                    <span>Logo</span>
                                                </div>
                                                <div className='table-column table-right'>
                                                    <span>{logoName}</span>
                                                </div>
                                            </div>
                                            <div className='table-row'>
                                                <div className='table-column table-left'>
                                                    <span>Tipo de logo</span>
                                                </div>
                                                <div className='table-column table-right'>
                                                    <span>{logoType.join(', ')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='elementor-group'>
                                        <div className='table'>
                                            <div className='table-head'>
                                                <div className='column'>CANT</div>
                                                <div className='column'>DESCRIPCIÓN</div>
                                                <div className='column'>P. UNIT</div>
                                                <div className='column'>IMPORTE</div>
                                            </div>
                                            <div className='table-body'>
                                                <div className='column'>1</div>
                                                <div className='column'>Diseño de Logo</div>
                                                <div className='column'>{setting.precio}</div>
                                                <div className='column'>{setting.precio}</div>
                                            </div>
                                            <div className='table-footer'>
                                                <div className='column'></div>
                                                <div className='column'></div>
                                                <div className='column columnBold'>Total</div>
                                                <div className='column'>{setting.precio}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='elementor-group'>

                                        <PayPalButton total={setting.precio} invoice={logoName} />

                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='elementor-group'>
                                        <div id="voucher-container" className="voucher-container">
                                            <Voucher code={codePay} fullname={fullName} email={email} phone={phone} logoName={logoName} amount='1' price='80.00' />
                                        </div>
                                    </div>
                                    <div className='elementor-group elementor-actions'>
                                        {voucherImage !== null && (
                                            <>
                                                <button className='btn btn-lead' onClick={handleDownloadImage}>
                                                    <span className='ico'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-download" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                                            <path d="M7 11l5 5l5 -5"></path>
                                                            <path d="M12 4l0 12"></path>
                                                        </svg>
                                                    </span>
                                                    <span className='txt'>{t('actionsButtons.download')}</span>
                                                </button>
                                                <button className='btn btn-lead' onClick={handleShareImage}>
                                                    <span className='ico'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-share" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                                            <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                                            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                                            <path d="M8.7 10.7l6.6 -3.4"></path>
                                                            <path d="M8.7 13.3l6.6 3.4"></path>
                                                        </svg>
                                                    </span>
                                                    <span className='txt'>{t('actionsButtons.share')}</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {!confirmPay && (
                        <div className='elementor-group'>
                            <div className='elementor-actions'>
                                {currentStep !== 1 && (
                                    <button className='btn btn-preview' onClick={handlePrevStep}>{t('actionsButtons.previous')}</button>
                                )}
                                {currentStep !== 3 && (
                                    <button className='btn btn-next' onClick={handleNextStep}>{t('actionsButtons.next')}</button>
                                )}
                            </div>
                        </div>
                    )}

                </div>

            </div>

        </Suspense>

    )

}

export default FormBrief