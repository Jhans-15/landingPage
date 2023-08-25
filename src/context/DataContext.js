import React, { createContext, useState } from "react";
import setting from "../settings/settings";
import { useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [ data, setData ] = useState([]);

    const getData = async () => {

        try {
            
            const response = await fetch(`${setting.api}`);
            const data = await response.json();
            setData(data);

        } catch (error) {
            
            console.log('Error fetching data: ' + error.message);

        }

    }

    useEffect(() => {

        getData();

    }, []);

    const contextValue = {
        data,
        getData
    }

    return (
        <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
    );

}

export default DataContext;