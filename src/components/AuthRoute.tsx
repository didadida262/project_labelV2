import { getToken } from '../utils/token';
import { Navigate } from 'react-router-dom';
import React from 'react';

interface AuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    const token = getToken()
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to='/login' replace />
    }
}

export default AuthRoute