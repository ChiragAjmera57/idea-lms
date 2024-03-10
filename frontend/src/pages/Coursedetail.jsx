import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCoursesDetails } from '../utils/getcourseDetails'
import { Typography, List, ListItem, ListItemText, CircularProgress, Paper, Button, TextField, Modal, IconButton } from '@mui/material';
import { NavComponents } from '../components/NavComponents';
import { createLecture } from '../utils/createAndAddLecture';
import { Delete, Edit } from '@mui/icons-material';
import { editLecture } from '../utils/editLecture';
import { deleteLecture } from '../utils/deleteLecture';


export const Coursedetail = () => {
    const params = useParams()
    const [course, setCourse] = useState({}); 
    const[isLoading,setloading] = useState(false)
    const[isAdmin,setAdmin] = useState(false)
    const[isPatchLoadin,setPatchLoading] = useState(false)
    const[currLecture,setCurrLecture] = useState(null)
  // const [selectedLecture, setSelectedLecture] = useState(null);
    const [lectureDetails, setLectureDetails] = useState({
      name: '',
      startTime: '',
      endTime: '',
      meetLink: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setLectureDetails({ ...lectureDetails, [name]: value });
    };
    
  
    const handleDeleteLecture = () => {
      deleteLecture(lectureDetails._id)
        .then((res) => {
          handleCloseModal()
          getData()
        })
        .catch((err) => {
          console.error(err);
        });
    };
   
    const handleSubmit = (e) => {
      e.preventDefault();
      if(lectureDetails._id){
        editLecture(lectureDetails._id,lectureDetails)
        .then((res) => {
          handleCloseModal()
          getData()
        })
        .catch((err) => {
          console.error(err);
        });
        return
      }
      console.log(lectureDetails)
      setPatchLoading(true)
      
      createLecture(lectureDetails.name,lectureDetails.startTime,lectureDetails.endTime,lectureDetails.meetLink,course._id)
      .then((res)=>{
        setPatchLoading(false)
        console.log(res)
        handleCloseModal()
        getData()
      })
      .catch((err)=>{
        console.log(err)
      })
    };

    const handleOpenModal = (selectedLecture) => {
      if (selectedLecture) {
        setLectureDetails(selectedLecture);
        setIsModalOpen(true);
      } else {
        setIsModalOpen(true);
        console.log("No lecture selected");
      }
    };
  
    const handleCloseModal = () => {
      setLectureDetails({
        name: '',
      startTime: '',
      endTime: '',
      meetLink: '',
      })
      setIsModalOpen(false);
    };
   
    console.log(params)
    const getData = ()=>{
      setloading(true)
      getCoursesDetails(params.id)
        .then((res)=>{
            setloading(false)
            setCourse(res)
        })
    }
    useEffect(()=>{
     setAdmin(JSON.parse(localStorage.getItem("isAdmin")))
        
        getData()
    },[ params.id])
  return (
    <div style={{padding:"20px"}}>
      <header>
        <NavComponents />
      </header>
        {isLoading?<CircularProgress />:
        <div>
             <Typography variant="h4">{course.title}</Typography>
          {isAdmin?<Button variant='contained' onClick={()=>handleOpenModal()}>Add Lecture</Button>:<></>}
    <List>
    {course?.lectures?.length > 0 ? (
  <List>
  {course.lectures?.map(lecture => (
    <div key={lecture._id}>
      <Paper elevation={3} style={{ margin: '10px 0', cursor: 'pointer', position: 'relative' }}>
        <ListItem button component={Link} to={`/lecture/${lecture._id}`}>
          <ListItemText primary={lecture.name} />
        </ListItem>
        {isAdmin && (
          <IconButton
            onClick={() => handleOpenModal(lecture)} 
            style={{ position: 'absolute', top: 5, right: 5 }}
            aria-label="edit"
          >
            <Edit />
          </IconButton>
        )}
      </Paper>
    </div>
  ))}
</List>

) : (
  <Typography variant="body1">No lectures available for this course.</Typography>
)}

    </List>
    
        </div>
        }
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <Typography variant="h5" gutterBottom>Create Lecture</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Lecture Name"
            name="name"
            value={lectureDetails.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Start Time"
            name="startTime"
            type="datetime-local"
            value={lectureDetails.startTime}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="End Time"
            name="endTime"
            type="datetime-local"
            value={lectureDetails.endTime}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Meet Link"
            name="meetLink"
            value={lectureDetails.meetLink}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            {isPatchLoadin?"Loading...":"Create"}
          </Button>
          {lectureDetails._id?<Button onClick={()=>handleDeleteLecture()} startIcon={<Delete />} variant="contained" color="primary" style={{ marginTop: '10px',marginLeft:"5px" }}>
            {isPatchLoadin?"Loading...":"Delete"}
          </Button>:<></>}
        </form>
      </div>
    </Modal>
  </div>
  )
}
