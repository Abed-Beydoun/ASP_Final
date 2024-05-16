import React from 'react'
import StudentDashboard from './student'
import InstructorDashboard from './instructor'
import withRouter from '../../hoc/withRouter'
const Index = () => {
    const role = 'student'
    if (role === 'instructor') {
        return <InstructorDashboard />
    }
    return <StudentDashboard />
}

export default withRouter(Index, ['admin', 'student'], true)
