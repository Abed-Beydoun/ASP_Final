import React, { useState, useEffect, useCallback } from 'react'
import { usersAxios } from '../../lib/axios'
import { toast } from 'sonner'
import { Loading } from '../../components'
import listOfCourses from '../../data/listOfCourses'
import withRouter from '../../hoc/withRouter'
const Index = () => {
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        major: '',
        finished_courses: [],
        days_of_unavailability: [],
        campus: '',
        number_of_electives: '',
        number_of_major: '',
        first_name: '',
        last_name: '',
    })
    const daysOfTheWeek = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
    ]
    const fetchUserData = useCallback(() => {
        usersAxios({
            method: 'GET',
            url: '/user-info',
        })
            .then((res) => {
                setFormData(res.data.user)
            })
            .catch((err) => {
                if (err.response.data) {
                    toast.error('Error fetching data', {
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
            })
            .finally(() => {
                setLoading(false)
            })
    }, [setLoading])

    const majorOptions = [
        'Computer',
        'Biology',
        'Biochemistry',
        'Mathematics',
        'Physics',
        'Chemistry',
    ]
    const handleChange = (event) => {
        const { id, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }))
    }

    useEffect(() => {
        setTimeout(() => {
            fetchUserData()
        }, 100)
        return () => {
            fetchUserData()
        }
    }, [fetchUserData])
    const handleChangeCheckbox = (event) => {
        if (event.target.checked) {
            setFormData((prevState) => ({
                ...prevState,
                [event.target.name]: [
                    ...new Set([
                        ...prevState[event.target.name],
                        event.target.id,
                    ]),
                ],
            }))
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [event.target.name]: [
                    ...new Set(
                        prevState[event.target.name].filter(
                            (item) => item !== event.target.id,
                        ),
                    ),
                ],
            }))
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        usersAxios({
            method: 'PUT',
            url: '/user-info',
            data: formData,
        })
            .then((res) => {
                toast.success(res.data.message, {
                    className: 'text-blue-500',
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
                fetchUserData()
            })
            .catch((err) => {
                if (err.response.data) {
                    toast.error('Error fetching data', {
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
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <Loading loading={loading} full>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Use a permanent address where you can receive mail.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        disabled
                                        autoComplete="email"
                                        className="px-2 disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        value={formData?.email}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first_name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="first_name"
                                        autoComplete="given-name"
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="last_name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="last_name"
                                        value={formData?.last_name}
                                        onChange={handleChange}
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="campus"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Campus
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="campus"
                                        value={formData.campus}
                                        onChange={handleChange}
                                        className="px-2 min-w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-transparent"
                                    >
                                        <option selected disabled value="">
                                            Kindly select an option
                                        </option>
                                        <option value="tripoli">Tripoli</option>
                                        <option value="beirut">Beirut</option>
                                        <option value="debbieh">Debbieh</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="major"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Major
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="major"
                                        value={formData.major}
                                        disabled
                                        className="px-2 min-w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6 disabled:bg-gray-200"
                                    >
                                        <option selected disabled value="">
                                            Kindly select an option
                                        </option>
                                        {majorOptions.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >
                                                    {item}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <label
                                    htmlFor="number_of_electives"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Number of elective courses
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="number_of_electives"
                                        onChange={handleChange}
                                        autoComplete="street-address"
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        value={formData?.number_of_electives}
                                    />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <label
                                    htmlFor="number_of_major"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Number of major courses
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="number_of_major"
                                        onChange={handleChange}
                                        autoComplete="street-address"
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        value={formData?.number_of_major}
                                    />
                                </div>
                            </div>

                            <div className="col-span-3">
                                <label
                                    htmlFor="finished_courses"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Finished courses
                                </label>
                                <div className="mt-2 grid grid-cols-4 max-h-96 overflow-y-auto">
                                    {listOfCourses?.map((item) => {
                                        return (
                                            <div
                                                key={item}
                                                className="space-x-2 flex items-center "
                                            >
                                                <input
                                                    name="finished_courses"
                                                    type="checkbox"
                                                    id={item}
                                                    value={item}
                                                    checked={formData?.finished_courses.find(
                                                        (el) => el === item,
                                                    )}
                                                    className="p-8  rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:leading-6"
                                                    onChange={
                                                        handleChangeCheckbox
                                                    }
                                                />
                                                <label
                                                    className="capitalize text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                                                    htmlFor={item}
                                                >
                                                    {item}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="col-span-3">
                                <label
                                    htmlFor="days_of_unavailability"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Days of unavailability
                                </label>
                                <div className="mt-2 flex space-x-2 items-center">
                                    {daysOfTheWeek?.map((item) => {
                                        return (
                                            <div
                                                key={item}
                                                className="space-x-2 flex items-center"
                                            >
                                                <input
                                                    name="days_of_unavailability"
                                                    type="checkbox"
                                                    id={item}
                                                    value={item}
                                                    checked={formData?.days_of_unavailability.find(
                                                        (el) => el === item,
                                                    )}
                                                    className="p-8 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:leading-6"
                                                    onChange={
                                                        handleChangeCheckbox
                                                    }
                                                />
                                                <label
                                                    className="capitalize text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                                                    htmlFor={item}
                                                >
                                                    {item}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Loading>
    )
}

export default withRouter(Index, ['student'], true)
