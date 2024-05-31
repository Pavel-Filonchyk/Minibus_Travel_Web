import React from 'react'
import {Route,  Routes} from 'react-router-dom'

import Main from '../Main/Main'
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'

export default function App() {

    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/privacy-policy-client" element={<PrivacyPolicy/>}/>
        </Routes>
    )
}