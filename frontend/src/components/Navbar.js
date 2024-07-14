// src/components/Navbar.js
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import "./Navbar.css";

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Link to="/" className="brand-container">
        <img src={logo} alt="Yoga On A Dime Logo" className="navbar-logo" />
        <div className="navbar-brand-text">Yoga On A Dime</div>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/" className="nav-link-custom">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/create-vinyasa" className="nav-link-custom">
            Create Your Own Flow
          </Nav.Link>
          <Nav.Link as={Link} to="/shop" className="nav-link-custom">
            Shop
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
