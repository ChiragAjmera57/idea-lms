import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import Login from './Login'
import { Studentdashboard } from './Studentdashboard'
import { Admindashboard } from './Admindashboard'
import { Coursedetail } from './Coursedetail'
import { LectureDetails } from './LectureDetails'
import AdminProtected from '../components/AdminProtected'
import Protected from '../components/Protected'
import UserDetailPage from './User'
import StudentPage from './StudentsList'
import UserDetailsPage from './StudentDetailsPage'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />  
        <Route path='/auth' element={<Login />} />  
        <Route path='/student' element={<Protected><Studentdashboard /></Protected>} />  
        <Route path='/admin' element={ <AdminProtected><Admindashboard /></AdminProtected> } />  
        <Route path='/course/:id' element={<Coursedetail />} />  
        <Route path='/lecture/:id' element={<LectureDetails />} />  
        <Route path='/user-details' element={<Protected><UserDetailPage /></Protected>} />  
        <Route path='/managestudents' element={ <AdminProtected><StudentPage /></AdminProtected> } />  
        <Route path='/student/details/:id' element={ <AdminProtected><UserDetailsPage /></AdminProtected> } />  

    </Routes>
  )
}
