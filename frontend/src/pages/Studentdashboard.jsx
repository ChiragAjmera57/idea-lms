import { Typography, Grid, Card, CardContent, IconButton, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { getAllCourses } from '../utils/getallcourses';
import { getStudentCourses } from '../utils/studentLinkCourses';

export const Studentdashboard = () => {
 
  const[courses,setCourses] = useState([])
  const[isLoading,setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    getStudentCourses().then((res)=>{
      setLoading(false)
      setCourses(res)
    })
  },[])
  return (
    <div style={{padding:"20px"}}>
      <header style={{ marginBottom: '20px', display: 'flex',flexWrap:"wrap", justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Student Dashboard</Typography>
        <Typography variant="h5">List of Courses</Typography>
        <IconButton component={Link} to="/user-details" aria-label="user details">
          <AccountCircle fontSize='large' />
        </IconButton>
      </header>
      {isLoading?<CircularProgress />:<Grid container spacing={3}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card style={{ height: '100%' }}>
              <Link to={`/course/${course._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardContent style={{ cursor: 'pointer' }}>
                  <Typography variant="h5">{course.title}</Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>}
      
    </div>
  );
}
