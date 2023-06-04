import React, { useContext, useEffect, useState } from 'react';
import { getFAQsTutorialsApi } from '../Services/FAQsTutorials.api';

const FaqsTutorialsContext = React.createContext();

export function useFaqsTutorialsContext() {
    return (
        useContext(FaqsTutorialsContext)
    )
}

export const faqsTutorialsListFilteredByTypeView = (faqsTutorialsList, type, view) => {
    return(
        faqsTutorialsList.filter((itemFilterFaqsTutorialsList) => {
            return ( (!type) || type ===  itemFilterFaqsTutorialsList.FAQSType) 
            && ( (!view) || view  === itemFilterFaqsTutorialsList.FAQSPage)
        })
    )
}


export function FaqsTutorialsProvider({children}) {

    const [faqsTutorialsList, setFaqsTutorialsList] = useState([]);

    // Consumo de FAQ & Tutorials

const getFAQsTutorials = () => {
    // setLoadingChild(true);
    getFAQsTutorialsApi()
        .then((response) => {
            if (response.status === 200) {
                setFaqsTutorialsList(response.data);
                // setLoadingChild(false);
            }
        })
        .catch((e) => {
            // setLoadingChild(false);
            console.log("Error: ", e.response?.data);
            if (e.response?.data.message) {
                alert(e.response?.data.message);
            }
        })
        .finally(() => {
            // setLoadingChild(false);
        });
};
    useEffect(() => {
        getFAQsTutorials();
    }, [])
    
    return(
        <FaqsTutorialsContext.Provider value={faqsTutorialsList}>
            {children}
        </FaqsTutorialsContext.Provider>
    );
}