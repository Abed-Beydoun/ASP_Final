const express = require('express');
const router = express.Router();
//const auth = require('../Middleware/Authentication');

//Controller Functions
const {
  studentInfo,
  majorCourses,
  electiveCourses,
  optimizedSchedule,
  addElectiveCourse,
  addMajorCourse,
  deleteCourse
} = require('../Controllers/scheduleController');

//Check authentication for routes
//router.use(auth);


//Send student info
router.post('/studentInfo',studentInfo);

//Get available major courses
router.get('/majorCourses',majorCourses);


//Get available elective courses
router.get('/electiveCourses',electiveCourses);


//Get optimized schedules
router.get('/optimizedSchedule',optimizedSchedule);


//Add elective course
router.put('/addElectiveCourse',addElectiveCourse);


//Add major course
router.put('/addMajorCourse',addMajorCourse);


//Delete course
router.delete('/deleteCourse',deleteCourse);


module.exports = router;