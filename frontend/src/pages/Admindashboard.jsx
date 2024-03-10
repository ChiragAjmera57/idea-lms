
import { Typography, Grid, Card, CardContent, IconButton, CircularProgress, Button, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle, Delete, Edit } from '@mui/icons-material';
import { getAllCourses } from '../utils/getallcourses';
import { getStudentCourses } from '../utils/studentLinkCourses';
import { createCourse } from '../utils/createCourse';
import { editCourse } from '../utils/editCourse';
import { deleteCourse } from '../utils/deleteCourse';

export const Admindashboard = () => {
 
  const[courses,setCourses] = useState([])
  const[isLoading,setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseEditTitle, setCourseEditTitle] = useState('');
  const [CurrCourseId, setCurrentCouseId] = useState(null);
  const navigate = useNavigate()
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditOpen = (course) => {
    setCourseEditTitle(course.title)
    setCurrentCouseId(course._id)
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCourse(courseTitle)
    .then((res)=>{
      console.log(res)
      handleClose()
      fetchData()
    })
    .catch((err)=>{
      console.log(err)
    })
  };
  const fetchData = ()=>{
    getAllCourses().then((res)=>{
      setLoading(false)
      setCourses(res)
    })
  }
  const handleEditFormSubmit = (e)=>{
    e.preventDefault()
    editCourse(CurrCourseId,courseEditTitle)
    .then((res)=>{
      handleEditClose()
      fetchData()
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const handledeleteFormSubmit = (e)=>{
    e.preventDefault()
    deleteCourse(CurrCourseId)
    .then((res)=>{
      handleEditClose()
      fetchData()
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    setLoading(true)
    fetchData()
  },[])
  return (
    <div style={{padding:"20px"}}>
      <header style={{ marginBottom: '20px', display: 'flex',flexWrap:"wrap", justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Typography variant="h5">List of All Courses</Typography>
        <Button variant='contained' onClick={()=>handleOpen()}> 
          Add Course
        </Button>
        <Button variant='contained' onClick={()=>navigate('/managestudents')}> 
          Manage Students
        </Button>
        <IconButton component={Link} to="/user-details" aria-label="user details">
          <AccountCircle fontSize='large' />
        </IconButton>
       
      </header>
      {isLoading?<CircularProgress />:<Grid container spacing={3}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
          <Card style={{ height: '100%', position: 'relative' }}>
            {/* Edit Icon */}
            <IconButton
              
              style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
              aria-label="edit"
            >
              <Edit onClick={()=>handleEditOpen(course)} />
            </IconButton>
            
            {/* Course Title */}
            <Link to={`/course/${course._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardContent style={{ cursor: 'pointer' }}>
                <Typography variant="h5">{course.title}</Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
        ))}
      </Grid>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-course-modal"
        aria-describedby="add-course-form"
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
          <h2 id="add-course-modal">Add Course</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Course Title"
              variant="outlined"
              fullWidth
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              required
              autoFocus
            />
            <Button type="submit" variant="contained" style={{ marginTop: '10px' }}>Submit</Button>
          </form>
        </div>
      </Modal>
      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="add-course-modal"
        aria-describedby="add-course-form"
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
          <h2 id="add-course-modal">Edit Course</h2>
          <form onSubmit={(e)=>handleEditFormSubmit(e)}>
            <TextField
              label="Course Title"
              variant="outlined"
              fullWidth
              value={courseEditTitle}
              onChange={(e) => setCourseEditTitle(e.target.value)}
              required
              autoFocus
            />
            <Button type="submit" variant="contained" style={{ marginTop: '10px' }} >Submit</Button>
            <Button onClick={(E)=>handledeleteFormSubmit(E)} variant="contained" style={{ marginTop: '10px',marginLeft:"5px" }} startIcon={<Delete />}>
  Delete
</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
