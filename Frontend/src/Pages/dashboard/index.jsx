import React from 'react';
import StudentDashboard from './student';
import InstructorDashboard from './instructor';
const Index = () => {
  const role = 'student';
  if (role === 'instructor') {
    return <InstructorDashboard />;
  }
  return <StudentDashboard />;
};

export default Index;
