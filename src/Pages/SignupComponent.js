import { Button, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import emailjs, { send } from "emailjs-com";
import { Link } from 'react-router-dom';
const SignupComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setname] = useState("");
    const [sendOTP, setSendOTP] = useState(0);
    const [userOTP, setUserOTP] = useState("");
    const [isOTPVerified, setIsOTPVerified] = useState();
    const [isOTPSent, setisOTPSent] = useState();
    const [signupSuccess, setsignupSuccess] = useState("");
//   const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  const sendOTPtoEmail = async(e) => {
    e.preventDefault();
    if (!email) {
      alert("Enter email first!");
      return;
    }
    //generate otp
   const newOtp = Math.floor(100000 + Math.random() * 900000);
   setSendOTP(newOtp)
    
    
    emailjs
      .send(
        "service_qrlrkp4",   // Replace with your EmailJS Service ID
        "template_wqs69wl",   // Replace with your EmailJS Template ID
        {
          passcode: newOtp,
          time: new Date().toLocaleString(),
          email: email,
          name:name
        },
        "6tszMZVeQ6_BkWHtN"     // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          // console.log("Email sent successfully!", response);
          alert("Email sent successfully!");
          setisOTPSent(true);
        },
        (error) => {
          // console.error("Failed to send email:", error);
          alert("Failed to send email.");
          setisOTPSent(false)
        }
      );
  };
  const handleSignup=async(e)=>{
  // console.log("Updated state:"+userOTP);
    // console.log(isAuthenticated);
    e.preventDefault();
    try {
      //verify otp
      if(userOTP === sendOTP.toString()){
        const response = await axios.post('https://json-server-app-58r9.onrender.com/signup', { name,email, password });
        // setsignupSuccess("Signup Successfull")
        // console.log(response.data);
        setIsOTPVerified(true)
      }else{
        setIsOTPVerified(false);
        setsignupSuccess("Signup Failed")
        // console.log(userOTP+'failed'+sendOTP);
      }
        
      } catch (error) {
        
        // console.error("Login Failed:", error.response?.data?.message);
        setsignupSuccess("Signup Failed")
      }
  }
  useEffect(() => {
    // console.log("Updated state:", sendOTP);
  }, [sendOTP]); // Runs AFTER state update

  return (
    
        <>
        {isAuthenticated?<div>successfull login!</div>:
    !isOTPSent?
    <form onSubmit={sendOTPtoEmail} style={{padding:'2rem'}}>
      <div style={{display:"flex",flexDirection:'column',height:"60vh",alignItems:'center',justifyContent:'space-evenly',border:'1px solid black'}}>
      <h2 style={{fontWeight:'normal',margin:'0'}}>Create an Account</h2>
      <TextField id="outlined-name" size="small" label="Name" variant="outlined" type="text" value={name} onChange={(e) => setname(e.target.value)} required />
      <TextField id="outlined-basic" size="small" label="Email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField id="filled-basic" size="small" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button variant="contained" type="submit" style={{width:'35%',height:'30px'}}>Send OTP</Button>
      {isOTPSent?<span style={{color:'green'}}>OTP Sent Successfull !</span>:isOTPSent==='false'?<span style={{color:'red'}}>OTP Sent Failed !</span>:<></>}
        {/* <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button> */}
      </div>
    </form>
    :!isOTPVerified?
    <div>
      <form onSubmit={handleSignup} style={{padding:'2rem'}}>
      <div style={{display:"flex",flexDirection:'column',height:"60vh",alignItems:'center',justifyContent:'space-evenly',border:'1px solid black'}}>
      <h2 style={{fontWeight:'normal',margin:'0'}}>Verify OTP</h2>
      <TextField id="outlined-name" size="small" label="OTP" variant="outlined" type="number" value={userOTP} onChange={(e) => setUserOTP(e.target.value)} required />
      <Button variant="contained" type="submit" style={{width:'35%',height:'30px'}}>Sing Up</Button>
      {signupSuccess==='Signup Successfull'?<span style={{color:'green'}}>{signupSuccess} !</span>:signupSuccess==='Signup Failed'?<span style={{color:'red'}}>{signupSuccess} !</span>:<></>}
      {/* {isOTPVerified?<span style={{color:'green'}}>OTP Verified Successfull !</span>:isOTPVerified==='false'?<span style={{color:'red'}}>OTP Verification Failed !</span>:<></>} */}

        {/* <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button> */}
      </div>
    </form>
    </div>:
    <div style={{textAlign:"center",marginTop:"5rem"}}>
      <p>You have been successfully registered !</p>
      <Button as={Link} to="/login" variant='contained'>Sign In</Button>
    </div>}
    </>
  )
}

export default SignupComponent