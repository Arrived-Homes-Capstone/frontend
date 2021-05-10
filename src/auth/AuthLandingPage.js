import React, { useState } from 'react';
import App from '../App';
import { useAuth0 } from '@auth0/auth0-react';

const AuthLandingPage = () => {
    const { loginWithRedirect, user } = useAuth0();

    if (!user) {
        return (
            <div className="landing-container">
                <div className="landing-module">
                    <img src={'images/arrived-logo-sm.png'} className="landing-logo" alt="arrived homes" />
                    <p style={{ fontWeight: 400, marginBottom: 48 }}>Welcome to the Arrived Homes Acquisition Finder</p>
                    <button className="landing-btn" onClick={() => loginWithRedirect()}>Sign in</button>
                </div>

            </div>
        )
    } else {
        return <App />
    }

}

export default AuthLandingPage;