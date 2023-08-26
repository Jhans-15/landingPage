import React from "react";
import ReactDOM from "react-dom/client";
import './settings/i18n';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

import "./assets/css/global.css"
import { PayConfirmProvider } from "./context/PayConfirmContext";
import AdminScreen from "./screens/AdminScreen";
import { DataProvider } from "./context/DataContext";
import { ModalProvider } from "./context/ModalContext";

import setting from "./settings/settings";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <PayPalScriptProvider
            options={{
                "clientId" : setting.apiKeyPaypal
            }}
        >
            <PayConfirmProvider>
                <DataProvider>
                    <ModalProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<HomeScreen/>} />
                                <Route path="/admin" element={<AdminScreen/>} />
                            </Routes>
                        </BrowserRouter>
                    </ModalProvider>
                </DataProvider>
            </PayConfirmProvider>
        </PayPalScriptProvider>
    </React.StrictMode>
);