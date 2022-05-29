import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import useAuth from '../AuthProvider';

export default function Navigation(props) {
  const { user, logoutHandler } = useAuth();
  const handleLogout = () => {
    const confirmation = window.confirm('Anda yakin untuk keluar?');
    if(confirmation) {
      logoutHandler();
    }
  }
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Movie Watcher</Navbar.Brand>
        <Nav className="me-auto">
          <Link className='nav-link' to='/'>Home</Link>
          <Link className='nav-link' to='/saved'>Saved</Link>
        </Nav>
        <Nav className="ms-auto">
          {
            (user) ? <div>Welcome back, {user}  <button className='btn btn-outline-danger p-1' onClick={logoutHandler}>Logout</button></div> :
              <Link className='btn btn-outline-primary' to='/login'>Login</Link>
          }
        </Nav>
      </Container>
    </Navbar>
  )
}