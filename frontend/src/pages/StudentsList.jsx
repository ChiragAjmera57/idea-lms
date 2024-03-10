import React, { useEffect, useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, CircularProgress, Grid, Card, CardHeader, CardContent } from '@mui/material';
import { getNonAdmin } from '../utils/getNonAdmins';
import { Link } from 'react-router-dom';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make a fetch request to fetch student data
    getNonAdmin()
     
      .then(data => {
        setStudents(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching student data:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Student Data</Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {students.map(student => (
                        <Grid item key={student._id} xs={12} sm={6} md={4}>
                            <Link to={`/student/details/${student._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Card style={{ height: '100%' }}>
                                    <CardHeader
                                        title={student.name}
                                        subheader={student.email}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {student.isAdmin ? 'Admin' : 'Student'}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {`${student.courses.length} Courses Availed`}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
  );
};

export default StudentPage;
