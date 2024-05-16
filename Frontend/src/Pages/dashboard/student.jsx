import React, { useState, useEffect } from 'react'
import { schedulingAxios } from '../../lib/axios'
import { TrashIcon } from '@heroicons/react/24/outline'
const Home = () => {
    const [data, setData] = useState([])

    const handleButtonClick = async (type) => {
        let endpoint
        if (type === 'Elective') {
            endpoint = '/elective-couqrses'
        } else if (type === 'Major') {
            endpoint = '/major-courses' // Update the endpoint
        } else if (type === 'Optimized') {
            endpoint = '/optimized-schedule'
        }

        try {
            console.log('Fetching data from:', endpoint)
            const response = await schedulingAxios({
                method: 'GET',
                url: endpoint,
            })
            if (!Array.isArray(response.data)) {
                setData([])
            } else {
                setData(response.data)
            }
        } catch (error) {
            setData([])
            console.error('Error fetching data:', error.message)
        }
    }

    useEffect(() => {
        console.log('Data state updated:', data)
    }, [data])

    console.log('Rendering Home component')
    const columns = Object.keys(data[0] ?? {})
    const handleDeleteCourse = (crn) => {
        schedulingAxios({
            method: 'DELETE',
            url: `/delete-course?crn=${crn}`,
        })
            .then((res) => {
                setData((prevState) =>
                    prevState.filter((item) => item.CRN !== crn),
                )
            })
            .catch(console.error)
    }
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Courses
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all suggested courses based on your major &
                        data.
                    </p>
                </div>
                <div className="space-x-4">
                    <button
                        onClick={() => handleButtonClick('Elective')}
                        className="mt-8 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Available Elective Courses
                    </button>
                    <button
                        onClick={() => handleButtonClick('Major')}
                        className="mt-8 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Available Major Courses
                    </button>
                    <button
                        onClick={() => handleButtonClick('Optimized')}
                        className="mt-8 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Optimized Schedule
                    </button>
                </div>
            </div>

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {columns?.map((column, index) => (
                                            <th
                                                scope="col"
                                                key={index}
                                                className="relative py-3.5 pl-3 pr-4 sm:pr-6 whitespace-nowrap px-3 text-sm text-gray-500"
                                            >
                                                <span>{column}</span>
                                            </th>
                                        ))}
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6 whitespace-nowrap px-3 text-sm text-gray-500"
                                        >
                                            <span>Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {data?.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="13"
                                                className="text-center py-4 text-sm text-gray-500"
                                            >
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                    {data?.map((course) => (
                                        <tr key={course.email}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {course.index}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.CRN}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.COURSE}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.BLDG}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.CAMPUS}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.COURSE}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.COURSETITLE}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.COURSE_ATTRIBUTE}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.CREDITS}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.CTIME}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.DAY}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.ROOM}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {course.SCHEDULETYPE}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        handleDeleteCourse(
                                                            course.CRN,
                                                        )
                                                    }
                                                >
                                                    <TrashIcon className="w-6" />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home
