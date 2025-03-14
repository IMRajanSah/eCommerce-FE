import React from 'react'
import {  useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
const Cart = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
    {isAuthenticated?
    <div>Cart</div>
    :
    <Navigate to="/login"/>
    }
    </>
  )
}

export default Cart