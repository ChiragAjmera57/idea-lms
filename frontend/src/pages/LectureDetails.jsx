import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLectureDetails } from '../utils/getLectureDetails'
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { NavComponents } from '../components/NavComponents';


export const LectureDetails = () => {
    const {id} = useParams()
    console.log(id)

    const [lecture, setLecture] = useState(null);
    useEffect(()=>{
      getLectureDetails(id)
      .then((res)=>{
        console.log(res)
        setLecture(res);
      })
    },[id])
    if (!lecture) {
      return <Typography variant="h6">Loading...</Typography>;
    }
  return (
    <div style={{padding:"30px"}}>
      <header>
        <NavComponents />
      </header>
      <Typography variant="h4">{lecture.name}</Typography>
      <Typography variant="body1">Start Time: {dayjs(lecture.startTime).format('MMMM D, YYYY h:mm A')}</Typography>
      <Typography variant="body1">End Time: {dayjs(lecture.endTime).format('MMMM D, YYYY h:mm A')}</Typography>
    </div>
  )
}
