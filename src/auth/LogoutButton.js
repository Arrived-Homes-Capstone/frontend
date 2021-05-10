import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button className="filter-type-container" style={{ width: 'auto', paddingRight: 16, paddingLeft: 16 }} onClick={() => logout()}>
            Logout
        </button>
    )
}

export default LogoutButton;
