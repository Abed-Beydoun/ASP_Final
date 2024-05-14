const axios = require('axios')
const UserModel = require('../Models/userModel')
//Student Info
const studentInfo = async (req, res) => {
    try {
        const { _id } = req.user
        //Take input data from the request body
        const {
            major,
            finished_courses,
            days_of_unavailability,
            campus,
            number_of_electives,
            number_of_major,
        } = req.body

        //Create an object with the student data
        const studentData = {
            major,
            finished_courses,
            days_of_unavailability,
            campus,
            number_of_electives,
            number_of_major,
        }

        await UserModel.findByIdAndUpdate(_id, {
            $set: {
                major,
                finished_courses,
                days_of_unavailability,
                campus,
                number_of_electives,
                number_of_major,
            },
        })
        return res.status(204).json({})
    } catch (error) {
        console.error('Error adding student info:', error.message)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

//Available major courses
const majorCourses = async (req, res) => {
    try {
        const _id = req.user._id
        const student = await UserModel.findById(_id)
        const payload = {
            major: student?.major,
            finished_courses: student?.finished_courses,
            days_of_unavailability: student?.days_of_unavailability,
            campus: student?.campus,
            number_of_electives: student?.number_of_electives,
            number_of_major: student?.number_of_major,
        }
        const response = await axios({
            url: `${process.env.CORE_API_URL}/major-courses`,
            method: 'GET',
            data: payload,
        })
        return res.status(200).json(response.data)
    } catch (error) {
        console.error('Error fetching major courses:', error.message)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

//Available elective courses
const electiveCourses = async (req, res) => {
    try {
        const _id = req.user._id
        const student = await UserModel.findById(_id)
        const payload = {
            major: student?.major,
            finished_courses: student?.finished_courses,
            days_of_unavailability: student?.days_of_unavailability,
            campus: student?.campus,
            number_of_electives: student?.number_of_electives,
            number_of_major: student?.number_of_major,
        }
        const response = await axios({
            url: `${process.env.CORE_API_URL}/elective-courses`,
            method: 'GET',
            data: payload,
        })
        return res.status(200).json(response.data)
    } catch (error) {
        console.error('Error fetching elective courses:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//Optimized schedule
const optimizedSchedule = async (req, res) => {
    try {
        const _id = req.user._id
        const student = await UserModel.findById(_id)
        const payload = {
            major: student?.major,
            finished_courses: student?.finished_courses,
            days_of_unavailability: student?.days_of_unavailability,
            campus: student?.campus,
            number_of_electives: student?.number_of_electives,
            number_of_major: student?.number_of_major,
        }
        const response = await axios({
            url: `${process.env.CORE_API_URL}/optimized-schedule`,
            method: 'GET',
            data: payload,
        })
        return res.status(200).json(response.data)
    } catch (error) {
        console.error('Error fetching optimized schedule:', error.message)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

//Add elective course
const addElectiveCourse = async (req, res) => {
    try {
        //get the crn from the request body
        const { crn } = req.body
        const _id = req.user._id
        const student = await UserModel.findById(_id)
        const payload = {
            major: student?.major,
            finished_courses: student?.finished_courses,
            days_of_unavailability: student?.days_of_unavailability,
            campus: student?.campus,
            number_of_electives: student?.number_of_electives,
            number_of_major: student?.number_of_major,
        }
        const response = await axios({
            url: `${process.env.CORE_API_URL}/add-elective-course/${crn}`,
            method: 'POST',
            data: payload,
        })

        return res.status(200).json(response.data)
    } catch (error) {
        console.error('Error adding elective course:', error.message)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

//Add major course
const addMajorCourse = async (req, res) => {
    try {
        //get the crn from the request body
        const { crn } = req.body
        const _id = req.user._id
        const student = await UserModel.findById(_id)
        const payload = {
            major: student?.major,
            finished_courses: student?.finished_courses,
            days_of_unavailability: student?.days_of_unavailability,
            campus: student?.campus,
            number_of_electives: student?.number_of_electives,
            number_of_major: student?.number_of_major,
        }
        const response = await axios({
            url: `${process.env.CORE_API_URL}/add-major-course/${crn}`,
            method: 'POST',
            data: payload,
        })

        return res.status(200).json(response.data)
    } catch (error) {
        console.error('Error adding major course:', error.message)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

//Delete course
const deleteCourse = async (req, res) => {
    try {
        //get the crn from the request body
        const { crn } = req.query
        const _id = req.user._id
        const student = await UserModel.findById(_id)
        const payload = {
            major: student?.major,
            finished_courses: student?.finished_courses,
            days_of_unavailability: student?.days_of_unavailability,
            campus: student?.campus,
            number_of_electives: student?.number_of_electives,
            number_of_major: student?.number_of_major,
        }
        const response = await axios({
            url: `${process.env.CORE_API_URL}/delete-course/${crn}`,
            method: 'DELETE',
            data: payload,
        })

        return res.status(200).json(response.data)
    } catch (error) {
        console.error('Error deleting course:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    studentInfo,
    majorCourses,
    electiveCourses,
    optimizedSchedule,
    addElectiveCourse,
    addMajorCourse,
    deleteCourse,
}
