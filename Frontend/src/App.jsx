// Import necessary modules
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/dashboard';
import StudentForm from './Pages/StudentForm';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Users from './Pages/Users/Users';
import ScheduleTable from './Pages/optimizedSchedule';
import { Toaster } from 'sonner';
import { Footer, Navbar } from './components';
import Home from './Pages/home';
import NotFound from './Pages/404';
import AboutUs from './Pages/about';
// Define your main component
function App() {
  return (
    <Router>
      <Toaster />
      <Navbar />
      <div className="mx-auto max-w-7xl mt-16 min-h-screen">
        <Routes>
          <Route path="/optimizedSchedule" element={<ScheduleTable />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/form" element={<StudentForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

// Export the component
export default App;
