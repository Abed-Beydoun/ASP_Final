import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/dashboard'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import Assignments from './Pages/assignments'
import { Toaster } from 'sonner'
import { Footer, Navbar } from './components'
import Home from './Pages/home'
import NotFound from './Pages/404'
import AboutUs from './Pages/about'
import Profile from './Pages/profile'
import Contact from './Pages/contact'
// Define your main component
function App() {
    return (
        <Router>
            <Toaster />
            <Navbar />
            <div className="mx-auto max-w-7xl mt-16 min-h-screen">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/assignments" element={<Assignments />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact-us" element={<Contact />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    )
}

// Export the component
export default App
