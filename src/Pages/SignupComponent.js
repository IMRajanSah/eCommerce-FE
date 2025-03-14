import { Button, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from "react";
import {  useSelector } from "react-redux";

const SignupComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setname] = useState("");
    const [signupSuccess, setsignupSuccess] = useState("");
//   const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSignup=async(e)=>{
    console.log(isAuthenticated);
    e.preventDefault();
    try {
        const response = await axios.post('https://json-server-app-58r9.onrender.com/signup', { name,email, password });
        setsignupSuccess("Signup Successfull")
        console.log(response.data);
        
      } catch (error) {
        console.error("Login Failed:", error.response?.data?.message);
        setsignupSuccess("Signup Failed")
      }
  }
  return (
    
        <>
    {!isAuthenticated?
    <form onSubmit={handleSignup} style={{padding:'2rem'}}>
      <div style={{display:"flex",flexDirection:'column',height:"60vh",alignItems:'center',justifyContent:'space-evenly',border:'1px solid black'}}>
      <h2 style={{fontWeight:'normal',margin:'0'}}>Create an Account</h2>
      <TextField id="outlined-name" size="small" label="Name" variant="outlined" type="text" value={name} onChange={(e) => setname(e.target.value)} required />
      <TextField id="outlined-basic" size="small" label="Email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField id="filled-basic" size="small" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button variant="contained" type="submit" style={{width:'15%',height:'30px'}}>Sing Up</Button>
      {signupSuccess==='Signup Successfull'?<span style={{color:'green'}}>{signupSuccess} !</span>:signupSuccess==='Signup Failed'?<span style={{color:'red'}}>{signupSuccess} !</span>:<></>}
        {/* <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button> */}
      </div>
    </form>
    :<div>successfull login!</div>}

    </>
  )
}

export default SignupComponent