const express = require('express')
const router = express.Router()
const auth = require('../Middleware/Authentication')

//Controller Functions
const {
    studentInfo,
    majorCourses,
    electiveCourses,
    optimizedSchedule,
    addElectiveCourse,
    addMajorCourse,
    deleteCourse,
} = require('../Controllers/scheduleController')

//Check authentication for routes
router.use(auth)

//Send student info
router.post('/user-info', studentInfo)

//Get available major courses
router.get('/major-courses', majorCourses)

//Get available elective courses
router.get('/elective-courses', electiveCourses)

//Get optimized schedules
router.get('/optimized-schedule', optimizedSchedule)

//Add elective course
router.put('/elective-course', addElectiveCourse)

//Add major course
router.put('/major-course', addMajorCourse)

//Delete course
router.delete('/delete-course', deleteCourse)

module.exports = router
