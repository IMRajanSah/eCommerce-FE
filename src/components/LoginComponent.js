import React, { useState,useEffect } from "react";
import { login } from "../redux/authentication/authActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/authentication/authActions";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
// import ProtectedComponent from "./Users";
import { Link } from "react-router-dom";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loginSuccess, setloginSuccess] = useState("");
  

  const handleLogin = (e) => {
    e.preventDefault();
    try {
        dispatch(login(email, password));
    } catch (error) {
        console.log(error);
        setloginSuccess('login failed')
    }
    if(!isAuthenticated){
      setloginSuccess('login failed')
    }
  };
  // const logoutHandle = (e) => {
  //   e.preventDefault();
  //   try {
  //       dispatch(logoutUser());
  //   } catch (error) {
  //       console.log(error);
  //   }
    
  // };
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    }else{
      setloginSuccess('')
    }
  }, [dispatch, isAuthenticated]);
console.log(isAuthenticated);

  return (
    <>
    {!isAuthenticated?
    <form onSubmit={handleLogin} style={{padding:'2rem'}}>
      <div style={{display:"flex",flexDirection:'column',height:"60vh",alignItems:'center',justifyContent:'space-evenly',border:'1px solid black'}}>
      <h2 style={{fontWeight:'normal',margin:'0'}}>Login</h2>
      <TextField id="outlined-basic" size="small" label="Email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField id="filled-basic" size="small" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button variant="contained" type="submit" style={{width:'15%',height:'30px'}}>Login</Button>
      <p style={{marginTop:'-1.25rem',fontSize:'0.75rem',color:'#1976d2',textDecoration:'underline'}}><Link to="/signup">Sign Up</Link></p>
    {loginSuccess==='login failed'?<span style={{color:'red'}}>{loginSuccess} !</span>:<></>}
        {/* <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button> */}
      </div>
    </form>
    :<div>You're logged In !</div>}

    {/* <ProtectedComponent/> */}
    </>
  );
};

export default LoginComponent;
