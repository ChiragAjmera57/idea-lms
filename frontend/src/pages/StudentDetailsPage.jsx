import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Switch, FormControlLabel, Button, TextField, Paper, CircularProgress, Typography, List, ListItem, ListItemText, Snackbar, Alert } from '@mui/material';
import { getUserDetails } from '../utils/getUserDetails';
import { getAllCourses } from '../utils/getallcourses';
import { addCoursesToStudent } from '../utils/AddcourseToStudent';
import { addCoursesToStudentByAdmin } from '../utils/addCoursetoStudentByadmin';
import { makeAdmin } from '../utils/makeAdmin';

const UserDetailsPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [courseadded, setCourseAdded] = useState(false);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const navigate = useNavigate()
    const fetchUserData = ()=>{
        setLoading(true);
        getUserDetails(id)
            .then((res) => {
                setLoading(false);
                setUser(res);
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    }
    useEffect(() => {
        fetchUserData()

        getAllCourses()
            .then((res) => {
                setCourses(res);
                setFilteredCourses(res);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleAdminToggle = async () => {
        // Implement admin toggle functionality
    };

    const addCourses = async (selectedCourseId) => {
        addCoursesToStudentByAdmin([selectedCourseId],id)
        .then((res)=>{
            setCourseAdded(true)
            fetchUserData()
            console.log(res)
        })
    };

    const handleSearchCourse = (title) => {
        const filtered = courses.filter((course) =>
            course.title.toLowerCase().includes(title.toLowerCase())
        );
        setFilteredCourses(filtered);
    };
    const makeitAdmin = ()=>{
        makeAdmin(id)
        .then((res)=>{
            console.log(res)
            navigate("/managestudents")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
            {loading ? (
                <CircularProgress />
            ) : user ? (
                <div>
                    <Typography variant="h5">User Details</Typography>
                    <Typography>Name: {user.name}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Button onClick={()=>makeitAdmin()} variant='contained'>Make it Admin</Button>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`${user.courses.length} Courses Availed`}
                    </Typography>
                    <Typography variant="h6" style={{ marginTop: '20px' }}>Add Course to Student</Typography>
                    <TextField
                        label="Search Course by Title"
                        value={courseId}
                        onChange={(e) => {
                            setCourseId(e.target.value);
                            handleSearchCourse(e.target.value);
                        }}
                        style={{ marginBottom: '10px' }}
                    />
                   

                    <Typography variant="h6" style={{ marginTop: '20px' }}>Available Courses</Typography>
                    <List>
    {filteredCourses.map((course) => (
        <ListItem
            key={course._id}
            button
            onClick={() => addCourses(course._id)}
            sx={{ borderRadius: '5px', '&:hover': { backgroundColor: '#f0f0f0', cursor: 'pointer' } }}
        >
            <ListItemText primary={course.title} />
        </ListItem>
    ))}
</List>

                </div>
            ) : (
                <Typography>No user found</Typography>
            )}
            <Snackbar open={courseadded} autoHideDuration={6000} onClose={()=>setCourseAdded(false)}>
  <Alert
    onClose={()=>setCourseAdded(false)}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
    Course Added
  </Alert>
</Snackbar>
        </Paper>
    );
};

export default UserDetailsPage;
