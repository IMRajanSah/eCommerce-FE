import React from 'react'
import {  useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
const Profile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
    {isAuthenticated?
    <div>Profile</div>
    :
    <Navigate to="/login"/>
    }
    </>
  )
}

export default Profile