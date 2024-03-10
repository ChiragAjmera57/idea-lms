import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, CircularProgress, ListSubheader } from '@mui/material';
import { getAllCourses } from '../utils/getallcourses';
import { addCoursesToStudent } from '../utils/AddcourseToStudent';

const style = {
    width: '100%',
    maxWidth: 900,
}



const CourseList = ({courseAdded}) => {
   const[coursesData,setCourseData] = useState([]) 
  const [checked, setChecked] = useState([]);
const[loading,setloading] = useState(false)
  useEffect(()=>{
    setloading(true)
   getAllCourses()
   .then((res)=>{
    console.log(res)
    setloading(false)
    setCourseData(res)
   })
  },[])
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const  handleSubmition = ()=>{
    addCoursesToStudent(checked)
    .then((res)=>{
        console.log(res)
        courseAdded()
    })
  }
  return (
    <div style={style} >
        {loading?<CircularProgress />:
        <List 
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Select any three
            </ListSubheader>
          }
        >
        {coursesData.map((course) => {
          const labelId = `checkbox-list-label-${course._id}`;

          return (
            <ListItem key={course._id} role={undefined} dense button onClick={handleToggle(course._id)}>
              <ListItemText id={labelId} primary={course.title} />
              <Checkbox
                edge="end"
                checked={checked.indexOf(course._id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItem>
          );
        })}
      </List>}
      
      <Button variant="contained" disabled={checked.length<3} onClick={handleSubmition}>
        Procced
      </Button>
    </div>
  );
};

export default CourseList;
