import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {  useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../redux/authentication/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandle = (e) => {
      e.preventDefault();
      try {
          dispatch(logoutUser());
      } catch (error) {
          console.log(error);
      }
    };
  return (
    <>
      <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">eCommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {!isAuthenticated?
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        :
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/Cart">Cart</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            <Nav.Link as={Link} onClick={logoutHandle}>Sign Out</Nav.Link>

          </Nav>
        </Navbar.Collapse>
        }
      </Container>
    </Navbar>
    </>
  )
}

export default Header