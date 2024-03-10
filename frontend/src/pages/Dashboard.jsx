import { Button, Container } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
    <h1>Welcome to Chirag's Application</h1>
    <Button variant="contained" component={Link} to="/auth" color="primary">
        Go to Authentication
    </Button>
</Container>
  )
}
