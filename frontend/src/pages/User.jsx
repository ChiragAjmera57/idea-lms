import React, { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress, List, ListItem, ListItemText, Container, Paper } from '@mui/material';
import { getUserData } from '../utils/getUserdata';
import { Navigate, useNavigate } from 'react-router-dom';

const rootStyle = {
  marginTop: '20px',
};

const containerStyle = {
  padding: '20px',
};

const listItemStyle = {
  marginBottom: '16px',
};

const UserDetailPage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data when the component mounts
        getUserData()
            .then(data => {
                console.log(data)
                setUserData(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.clear()
        navigate('/auth')
    };

    return (
        <div style={rootStyle}>
            <Container maxWidth="md" style={containerStyle}>
                {userData ? (
                    <div>
                        <Typography variant="h4" gutterBottom>User Detail</Typography>
                        <Typography variant="body1">Email: {userData.email}</Typography>
                        <Typography variant="body1">Name: {userData.name}</Typography>
                        <Typography variant="body1">Is Admin: {userData.isAdmin ? 'Yes' : 'No'}</Typography>
                        <Typography variant="h5" gutterBottom>Courses</Typography>
                        {userData.courses.length > 0 ? (
                            <Typography>{`${userData.courses.length} Courses Availed`}</Typography>
                        ) : (
                            <Typography variant="body1">No courses available</Typography>
                        )}
                        <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                )}
            </Container>
        </div>
    );
};

export default UserDetailPage;
