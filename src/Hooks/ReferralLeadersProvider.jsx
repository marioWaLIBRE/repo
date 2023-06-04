import React, { useContext, useEffect, useState } from 'react'
import {getReferralLeadersApi} from "../Services/ReferralLeaders.api"

const ReferralsLeadersContext = React.createContext();

export function useReferralsLeadersContext() {
    return(
        useContext(ReferralsLeadersContext)
    )
}

export function ReferralsLeadersProvider ({children}) {

    const [listReferralLeaders, setListReferralLeaders] = useState([]);

    const getReferralLeaders = () => {
        getReferralLeadersApi()
            .then((res) => {
                if (res.status === 200) {
                    setListReferralLeaders(res.data);
                }
            })
            .catch((e) => {
                console.log("Error: ", e.response?.data);
                if (e.response?.data.message) {
                    alert(e.response?.data.message);
                }
            })
            .finally(() => {
            });
    }

    useEffect(() => {
        getReferralLeaders();
    }, [])
    
    return (
        <ReferralsLeadersContext.Provider value={listReferralLeaders}>
            {children}
        </ReferralsLeadersContext.Provider>
    )
}