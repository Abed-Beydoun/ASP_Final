import { Loading } from '../components'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../providers/authProvider'
import { usersAxios } from '../lib/axios'
import { useNavigate, useHref } from 'react-router-dom'
const withRouter = (WrappedComponent, roles, isPrivate = true) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const path = useHref()
        console.log(path)
        const [loading, setLoading] = useState(true)
        const navigate = useNavigate()
        const { logout, isAuthenticated, token, globalLoading } =
            useContext(AuthContext)
        const validateAuth = useCallback(() => {
            return usersAxios({
                method: 'GET',
                url: '/user-info',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }).catch((err) => {
                logout()
                setLoading(false)
            })
        }, [logout, token])

        useEffect(() => {
            if (isAuthenticated) {
                if (!globalLoading) {
                    validateAuth().then(() => {
                        setLoading(false)
                        if (path === '/login') {
                            navigate('/dashboard')
                        }
                    })
                }
                if (isAuthenticated && path === '/login') {
                    navigate('/dashboard')
                    setLoading(false)
                }
            } else if (
                !isAuthenticated &&
                isPrivate &&
                path !== '/login' &&
                !globalLoading
            ) {
                setLoading(false)
                navigate('/login')
            }
            setLoading(false)
        }, [isAuthenticated, validateAuth, globalLoading, navigate, path])

        if (globalLoading) return <Loading loading />
        if (loading) return <Loading loading />
        return <WrappedComponent {...props} />
    }
}
export default withRouter
