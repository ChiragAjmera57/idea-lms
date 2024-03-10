import { AccountCircle, HomeMaxRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const NavComponents = () => {
  return (
    <div>
        <IconButton component={Link} to="/user-details" aria-label="user details">
          <AccountCircle fontSize='large' />
        </IconButton>
        <IconButton component={Link} to={JSON.parse(localStorage.getItem("isAdmin"))?"/admin":"/student"} aria-label="user details">
          <HomeMaxRounded fontSize='large' />
        </IconButton>
    </div>
  )
}
