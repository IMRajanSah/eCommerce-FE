import React from 'react'
import {  useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
const Products = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
    {isAuthenticated?
    <div>Products</div>
    :
    <Navigate to="/login"/>
    }
    </>
  )
}

export default Products