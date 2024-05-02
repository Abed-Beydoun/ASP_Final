// Import necessary modules
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import StudentForm from './Pages/StudentForm';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Users from './Pages/Users/Users';
import ScheduleTable from './Pages/optimizedSchedule';
import { useState } from 'react';


// Define your main component
function App() 
{



 


  return (
    <Router>
      <div>
        {/* Define your routes */}
        {/* <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} /> */}
        <Routes>
          <Route path='/optimizedSchedule' element={<ScheduleTable/>}/>
          <Route  path='/register' element={<Register/>}/>
          <Route path="/login" element={ <Login />} /> 
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<StudentForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the component
export default App;
