import React from 'react'
import { useState } from 'react'
import { Navbar } from '../components/index'
import { Textarea } from '@headlessui/react'
import { toast } from 'sonner'
import { CheckIcon } from '@heroicons/react/24/solid'
import { schedulingAxios } from '../lib/axios'
const StudentForm = () => {
    const [formData, setFormData] = useState({
        major: '',
        finished_courses: '',
        days_of_unavailability: '',
        campus: '',
        number_of_electives: '',
        number_of_major: '',
    })

    const {
        finished_courses,
        days_of_unavailability,
        campus,
        number_of_electives,
        number_of_major,
    } = formData

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        //Validate daysOfUnavailability
        const daysOfUnavailabilityRegex = /^[a-z\s,]+$/

        // Process finished_courses and days_of_unavailability as lists
        const finishedCoursesList = finished_courses.split(/[,\s]+/)
        const daysList = days_of_unavailability.split(/[,\s]+/)

        const formDataWithLists = {
            ...formData,
            finished_courses: finishedCoursesList,
            days_of_unavailability: daysList,
        }

        // If all validations pass, submit the form
        console.log(
            'Form submitted with correct information:',
            formDataWithLists,
        )

        //If there are no errors, submit the form
        try {
            //Make a POST request to your backend endpoint
            const response = await schedulingAxios({
                method: 'POST',
                url: '/user-info',
                data: formDataWithLists,
            })

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
            //Handle the response as needed
            console.log(response.data) //Assuming the backend sends back some data
        } catch (error) {
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
            //Handle errors
            console.error('Error submitting form:', error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="major"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Major
                    </label>
                    <select
                        id="major"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                        defaultValue=""
                        value={formData.major}
                        onChange={handleChange}
                    >
                        <option selected disabled value="">
                            Kindly select an option
                        </option>
                        {majorOptions.map((item, index) => {
                            return (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="campus"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Campus
                    </label>
                    <select
                        id="campus"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                        defaultValue=""
                        value={formData.campus}
                        onChange={handleChange}
                    >
                        <option selected disabled value="">
                            Kindly select an option
                        </option>
                        <option value="tripoli">Tripoli</option>
                        <option value="beirut">Beirut</option>
                        <option value="debbieh">Debbieh</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="number_of_major"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Number of major courses
                    </label>
                    <input
                        type="text"
                        id="number_of_major"
                        value={formData.number_of_major}
                        onChange={handleChange}
                        placeholder="Number of major courses"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label
                        htmlFor="number_of_electives"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Number of elective courses
                    </label>
                    <input
                        type="text"
                        id="number_of_electives"
                        value={formData.number_of_electives}
                        onChange={handleChange}
                        placeholder="Number of elective courses"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label
                        htmlFor="finished_courses"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Finished courses
                    </label>
                    <textarea
                        id="finished_courses"
                        value={formData.finished_courses}
                        onChange={handleChange}
                        placeholder="Finished courses (e.g., CMPS347, MATH101)"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label
                        htmlFor="days_of_unavailability"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Days of unavailability
                    </label>
                    <Textarea
                        id="days_of_unavailability"
                        value={formData.days_of_unavailability}
                        onChange={handleChange}
                        placeholder="Days of unavailability (e.g., monday, tuesday)"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-8 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default StudentForm
