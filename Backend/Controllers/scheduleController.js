const axios = require('axios');

//Student Info
const studentInfo = async (req, res) => {
  try {
    //Take input data from the request body
    const {
      major,
      finished_courses,
      days_of_unavailability,
      campus,
      number_of_electives,
      number_of_major
    } = req.body;

    //Create an object with the student data
    const studentData = {
      major,
      finished_courses,
      days_of_unavailability,
      campus,
      number_of_electives,
      number_of_major
    };

    //Send data to Python server
    const response = await axios.post('http://localhost:8000/studentInfo', studentData);

    //Check if the request was successful
    if (response.status === 200) {
      //Check if the message indicates successful saving
      if (response.data && response.data.message === 'Student info received and saved successfully') {
        console.log('Student info added successfully');
        res.send({ message: 'Student info added successfully' });
      } else {
        console.error('Failed to add student info');
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      console.error('Failed to add student info');
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    console.error('Error creating student:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Available major courses
const majorCourses = async(req, res) => {
  try {
    const response = await axios.get('http://localhost:8000/majorCourses');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching major courses:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//Available elective courses
const electiveCourses = async(req, res) => {
  try {
    const response = await axios.get('http://localhost:8000/electiveCourses');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching elective courses:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//Optimized schedule
const optimizedSchedule = async(req, res) => {
  try {
    const response = await axios.get('http://localhost:8000/optimizedSchedule');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching optimized schedule:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
};


//Add elective course
const addElectiveCourse = async(req,res) =>{
  try{
    //get the crn from the request body
    const {crn} = req.body;
  
    const response = await axios.post(`http://localhost:8000/addElectiveCourse/${crn}`);
  
    const updatedSchedule = response.data;
    
    res.status(200).json(updatedSchedule);
  } catch (error){
     console.error('Error adding elective course:', error.message);
     res.status(500).json({ error: 'Internal Server Error' });
  }
};


//Add major course
const addMajorCourse = async(req,res) =>{
  try{
    //get the crn from the request body
    const {crn} = req.body;
  
    const response = await axios.post(`http://localhost:8000/addMajorCourse/${crn}`);
  
    const updatedSchedule = response.data;

    res.status(200).json(updatedSchedule);
  } catch (error){
     console.error('Error adding major course:', error.message);
     res.status(500).json({ error: 'Internal Server Error' });
  }
};


//Delete course
const deleteCourse = async(req,res) =>{
  try{
    //get the crn from the request body
    const {crn} = req.body;
  
    const response = await axios.post(`http://localhost:8000/deleteCourse/${crn}`);
  
    const updatedSchedule = response.data;

    res.status(200).json(updatedSchedule);
  } catch (error){
     console.error('Error deleting course:', error.message);
     res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    studentInfo,
    majorCourses,
    electiveCourses,
    optimizedSchedule,
    addElectiveCourse,
    addMajorCourse,
    deleteCourse
};