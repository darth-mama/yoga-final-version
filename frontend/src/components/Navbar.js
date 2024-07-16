// src/components/Navbar.js
import React from "react";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../images/logo.jpg";
import "./Navbar.css";

const NavigationBar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/"; // Redirect to home page after logout
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Link to="/" className="brand-container">
        <img src={logo} alt="Yoga On A Dime Logo" className="navbar-logo" />
        <div className="navbar-brand-text">Yoga On A Dime</div>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className="mx-auto">{!user && <></>}</Nav>
        <Nav className="ms-auto">
          {user ? (
            <NavDropdown title={`Hi, ${user.username}`} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/my-vinyasas">
                Saved Flows
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/create-vinyasa">
                Create Your Flow
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                variant="outline-light"
                className="nav-button"
              >
                Sign In
              </Button>
              <Button
                as={Link}
                to="/register"
                variant="outline-light"
                className="nav-button"
              >
                Join Now
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
