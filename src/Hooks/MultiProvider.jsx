import React from 'react'
import { FaqsTutorialsProvider } from './FaqsTutorialsProvider'
import { ReferralsLeadersProvider } from './ReferralLeadersProvider'

export function MultiProvider({children}) {
    return (
        <FaqsTutorialsProvider>
            <ReferralsLeadersProvider>
                {children}
            </ReferralsLeadersProvider>
        </FaqsTutorialsProvider>
    )
}