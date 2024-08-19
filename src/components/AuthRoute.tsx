import { getToken } from '../utils/token';
import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';


const AuthRoute = ({ children}) => {
    const token = getToken()
    const d = new Date()
    console.log('d',d)
    useEffect(() => {
        console.log('外层2')
        const d2 = new Date()
        console.log('d2',d2)
    }, [])
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to='/login' replace />
    }
}

export default AuthRoute