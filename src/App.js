import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { Saved, Home, Login } from "./pages";
import Navigation from './components/Navigation';
import AuthProvider from './AuthProvider';

function App() {
  function RequireAuth({ children }) {
    const { user } = AuthProvider();
    if(!user) { alert('Mohon login terlebih dahulu') }
    return (user) ? children : <Navigate to="/" replace />;
  }

  return (
    <BrowserRouter>
      <Container>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<RequireAuth><Saved /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
