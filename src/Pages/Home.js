import React from 'react'
import {  useSelector } from "react-redux";
const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
    {isAuthenticated?
    <div>Auth Home</div>
    :
    <p>UnAuth Home</p>
    }
    </>
  )
}

export default Home