import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { emailsAxios } from '../../lib/axios'
import { toast } from 'sonner'
import { CheckIcon } from '@heroicons/react/24/outline'
const Index = () => {
    const [agreed, setAgreed] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        university: '',
        message: '',
        phone_number: '',
    })
    const handleChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formData)
        emailsAxios({
            method: 'POST',
            url: '/contact',
            data: {
                firstName: formData.first_name,
                lastName: formData.last_name,
                university: formData.university,
                email: formData.email,
                phoneNumber: formData.phone_number,
                message: formData.message,
            },
        })
            .then((res) => {
                toast.success('Form submitted successfully', {
                    className: 'text-blue-500',
                    duration: 3000,
                    icon: <CheckIcon className="text-blue-500" />,
                    position: 'top-right',
                    dismissible: true,
                    cancel: {
                        label: 'Dismiss',
                        onClick: () => {
                            toast.dismiss()
                        },
                    },
                })
            })
            .catch((err) => {
                toast.error('Error submitting form', {
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
            })
    }
    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Contact sales
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Aute magna irure deserunt veniam aliqua magna enim
                    voluptate.
                </p>
            </div>
            <form
                className="mx-auto mt-16 max-w-xl sm:mt-20"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="first_name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            First name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                id="first_name"
                                onChange={handleChange}
                                value={formData.first_name}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="last_name"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Last name
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                id="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="university"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            University
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="university"
                                id="university"
                                value={formData.university}
                                onChange={handleChange}
                                autoComplete="organization"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Email
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="phone_number"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Phone number
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="tel"
                                name="phone-number"
                                id="phone_number"
                                autoComplete="tel"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="message"
                            className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                            Message
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                name="message"
                                id="message"
                                rows={4}
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                    </div>
                    <Switch.Group
                        as="div"
                        className="flex gap-x-4 sm:col-span-2"
                    >
                        <div className="flex h-6 items-center">
                            <Switch
                                checked={agreed}
                                onChange={setAgreed}
                                className={classNames(
                                    agreed ? 'bg-blue-600' : 'bg-gray-200',
                                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
                                )}
                            >
                                <span className="sr-only">
                                    Agree to policies
                                </span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        agreed
                                            ? 'translate-x-3.5'
                                            : 'translate-x-0',
                                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out',
                                    )}
                                />
                            </Switch>
                        </div>
                        <Switch.Label className="text-sm leading-6 text-gray-600">
                            By selecting this, you agree to our{' '}
                            <NavLink
                                to="/"
                                className="font-semibold text-blue-600"
                            >
                                privacy&nbsp;policy
                            </NavLink>
                            .
                        </Switch.Label>
                    </Switch.Group>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        disabled={!agreed}
                        className="disabled:bg-gray-200 disabled:cursor-not-allowed block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Let's talk
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Index
