import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { authAxios } from '../../lib/axios'
import { toast } from 'sonner'
import { AuthContext } from '../../providers/authProvider'
import withRouter from '../../hoc/withRouter'
const Index = () => {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await authAxios({
                method: 'POST',
                url: '/signup',
                data: formData,
            })
            localStorage.setItem('token', res.data.token)
            login(res.data.token, true)
            navigate('/dashboard')
        } catch (error) {
            console.log(error.response.data)
            toast.error(error.response.data.message, {
                className: 'text-red-500',
                duration: 3000,
                position: 'top-right',
                dismissible: true,
                cancel: {
                    label: 'Dismiss',
                    onClick: () => {
                        toast.dismiss()
                    },
                },
            })
        }
    }
    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }))
    }
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 space-x-2">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formData.first_name}
                                        id="first_name"
                                        type="first_name"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="last_name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        value={formData.last_name}
                                        id="last_name"
                                        type="text"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    value={formData.email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    id="password"
                                    value={formData.password}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm leading-6">
                                <NavLink
                                    to="/login"
                                    className="font-semibold text-gray-600 hover:text-blue-500"
                                >
                                    Already Have an account?
                                </NavLink>
                            </div>
                            <div className="text-sm leading-6">
                                <NavLink
                                    to="/forgot-password"
                                    className="font-semibold text-blue-600 hover:text-blue-500"
                                >
                                    Forgot password?
                                </NavLink>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Create account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Index, ['admin', 'student'], true)
