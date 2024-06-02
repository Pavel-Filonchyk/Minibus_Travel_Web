import React from 'react'
import {Route,  Routes} from 'react-router-dom'

import Main from '../Main/Main'
import PrivacyPolicyDriver from '../PrivacyPolicy/PrivacyPolicyDriver'
import PrivacyPolicyClient from '../PrivacyPolicy/PrivacyPolicyClient'

export default function App() {

    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/privacy" element={<PrivacyPolicyDriver/>}/>
            <Route path="/confidentiality" element={<PrivacyPolicyClient/>}/>
        </Routes>
    )
}