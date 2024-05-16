import React, { useContext } from 'react'
import { AuthContext } from '../../providers/authProvider'
import AuthenticatedNavbar from './authenticated'
import UnauthenticatedNavbar from './unAuthenticated'
const Index = () => {
    const { isAuthenticated } = useContext(AuthContext)
    if (isAuthenticated) {
        return <AuthenticatedNavbar />
    }

    return <UnauthenticatedNavbar />
}

export default Index
