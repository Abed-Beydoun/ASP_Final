/* eslint-disable no-mixed-operators */
import React from "react";
import { useState } from "react";
import "./StudentForm.css";
import { Navbar , Sidebar,FormBtn } from "../components/index";


const StudentForm = () => {

    const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prevVisible) => !prevVisible);
 };



    const [errorMessages, setErrorMessages] = useState({
        major: '',
        finished_courses: '',
        days_of_unavailability: '',
        campus: '',
        number_of_electives: '',
        number_of_major: ''
    });

    const [formData, setFormData] = useState({
        major: '',
        finished_courses: '',
        days_of_unavailability: '',
        campus: '',
        number_of_electives: '',
        number_of_major: ''
    });

    const { major,
        finished_courses,
        days_of_unavailability,
        campus,
        number_of_electives,
        number_of_major } = formData;

    const majorOptions = [
        'Computer',
        'Biology',
        'Biochemistry',
        'Mathematics',
        'Physics',
        'Chemistry'
    ];

    const [inputErrors, setInputErrors] = useState({
        major: false,
        finishedCourses: false,
        days_of_unavailability: false,
        campus: false,
        number_of_electives: false,
        number_of_major: false
    });

    const clearErrorMessage = (fieldId) => {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [fieldId]: '',
        }));

        setInputErrors((prevInputErrors) => ({
            ...prevInputErrors,
            [fieldId]: false,
        }));
    };

    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        //Reset the error message when the user types
        clearErrorMessage(name);
    };

    const displayErrorMessage = (fieldId, message) => {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [fieldId]: Array.isArray(message) ? message.join(' ') : message,
        }));

        setInputErrors((prevInputErrors) => ({
            ...prevInputErrors,
            [fieldId]: true,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const errors = [];

        //Validate major
        if (!major) {
            errors.push('Please select your major.');
            displayErrorMessage('major', 'Please select your major.');
        }

        //Validate campus
        if (!campus) {
            errors.push('Please select your campus.');
            displayErrorMessage('campus', 'Please select your campus.');
        }

        //Validate numMajorCourses
        if (!number_of_major || isNaN(number_of_major) || number_of_major <= 0 || number_of_major > 5) {
            errors.push('Please enter a valid number of major courses (up to 5, positive integer).');
            displayErrorMessage('number_of_major', 'Please enter a valid number of major courses (up to 5, positive integer).');
        }

        // Validate numElectiveCourses
    if ((number_of_electives !== '' && (isNaN(number_of_electives) || number_of_electives < 0 || number_of_electives > 3)) || number_of_electives === '') {
        errors.push('Please enter a valid number of elective courses (up to 3, non-negative integer).');
        displayErrorMessage('number_of_electives', 'Please enter a valid number of elective courses (up to 3, non-negative integer).');
    }

        //Validate finishedCourses
        const finishedCoursesRegex = /^[A-Z0-9\s,]+$/;
        if (!finished_courses || !finishedCoursesRegex.test(finished_courses)) {
            errors.push('Please enter finished courses in uppercase alphanumeric format (e.g., CMPS347).');
            displayErrorMessage('finished_courses', 'Please enter finished courses in uppercase alphanumeric format (e.g., CMPS347).');
        } else {
            //Split the finished courses input into individual course numbers
            const finishedCoursesList = finished_courses.split(/[,\s]+/);

            //Validate each individual course number
            for (const course of finishedCoursesList) {
                if (!course.match(/^[A-Z0-9]+$/)) {
                    errors.push('Please enter each finished course using uppercase alphanumeric characters only.');
                    displayErrorMessage('finished_courses', 'Please enter each finished course using uppercase alphanumeric characters only.');
                    break;
                }
            }
        }

        //Validate daysOfUnavailability
        const daysOfUnavailabilityRegex = /^[a-z\s,]+$/;
        if (!days_of_unavailability || !daysOfUnavailabilityRegex.test(days_of_unavailability)) {
            errors.push('Please enter days of unavailability in lowercase format (e.g., monday, tuesday).');
            displayErrorMessage('days_of_unavailability', 'Please enter days of unavailability in lowercase format (e.g., monday, tuesday).');
        } else {
            //Split the days of unavailability input into individual days
            const daysList = days_of_unavailability.split(/[,\s]+/);

            //Validate each individual day
            for (const day of daysList) {
                if (!day.match(/^[a-z]+$/)) {
                    errors.push('Please enter each day of unavailability using lowercase characters only.');
                    displayErrorMessage('days_of_unavailability', 'Please enter each day of unavailability using lowercase characters only.');
                    break;
                }
            }
        }

       // Process finished_courses and days_of_unavailability as lists
    const finishedCoursesList = finished_courses.split(/[,\s]+/);
    const daysList = days_of_unavailability.split(/[,\s]+/);


        //If there are any errors, stop the form submission
        if (errors.length > 0) {
            return;
        }

        const formDataWithLists = {
            ...formData,
            finished_courses: finishedCoursesList,
            days_of_unavailability: daysList
        };


  // If all validations pass, submit the form
  console.log("Form submitted with correct information:", formDataWithLists);

        //If there are no errors, submit the form
        try {
            //Make a POST request to your backend endpoint
            const response = await fetch('http://localhost:5500/api/scheduling/studentInfo', {
                method: 'POST',
                body: JSON.stringify(formDataWithLists),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            //Handle the response as needed
            console.log(response.data); //Assuming the backend sends back some data
        } catch (error) {
            //Handle errors
            console.error('Error submitting form:', error);
        }
    };

    return (

<>

           {/*  Navbar Section Starts Here ! */}
   <Navbar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
   {/*  Navbar Section Ends Here ! */}
   
   
   
   {/*  SideBar Section Starts Here !  */}
   <Sidebar toggleSidebar={toggleSidebar}  sidebarVisible={sidebarVisible}/>
   {/*  SideBar Section Ends Here !  */}
   


        <div className="home-container">
            <form onSubmit={handleSubmit} className='schedule-form'>
                <select
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    className={inputErrors.major ? 'error-input' : ''}
                >
                    <option value="">Select your major</option>
                    {majorOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                {errorMessages.major && <span className="error-message">{errorMessages.major}</span>}
                
                <select
                    name="campus"
                    value={formData.campus}
                    onChange={handleInputChange}
                    className={inputErrors.campus ? 'error-input' : ''}
                >
                    <option value="">Select your campus</option>
                    <option value="tripoli">Tripoli</option>
                    <option value="beirut">Beirut</option>
                    <option value="debbieh">Debbieh</option>
                </select>
                {errorMessages.campus && <span className="error-message">{errorMessages.campus}</span>}

                <input
                    type="text"
                    name="number_of_major"
                    value={formData.number_of_major}
                    onChange={handleInputChange}
                    placeholder="Number of major courses"
                    className={inputErrors.number_of_major ? 'error-input' : ''}
                />
                {errorMessages.number_of_major && <span className="error-message">{errorMessages.number_of_major}</span>}

                <input
                    type="text"
                    name="number_of_electives"
                    value={formData.number_of_electives}
                    onChange={handleInputChange}
                    placeholder="Number of elective courses"
                    className={inputErrors.number_of_electives ? 'error-input' : ''}
                />
                {errorMessages.number_of_electives && <span className="error-message">{errorMessages.number_of_electives}</span>}

                <textarea
                    name="finished_courses"
                    value={formData.finished_courses}
                    onChange={handleInputChange}
                    placeholder="Finished courses (e.g., CMPS347, MATH101)"
                    className={inputErrors.finished_courses ? 'error-input' : ''}
                />
                {errorMessages.finished_courses && <span className="error-message">{errorMessages.finished_courses}</span>}

                <textarea
                    name="days_of_unavailability"
                    value={formData.days_of_unavailability}
                    onChange={handleInputChange}
                    placeholder="Days of unavailability (e.g., monday, tuesday)"
                    className={inputErrors.days_of_unavailability ? 'error-input' : ''}
                />
                {errorMessages.days_of_unavailability && <span className="error-message">{errorMessages.days_of_unavailability}</span>}

                <FormBtn text="Generate Schedule" />
            </form>
        </div>
        </>
    );
}

export default StudentForm;
