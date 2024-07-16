import React from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./UserLanding.css";

const UserLanding = () => {
  const { user } = useAuth();

  return (
    <Container className="user-landing-container">
      <Row>
        <Col>
          <h1 className="page-title">
            Welcome, {user ? user.username : "User"}!
          </h1>
          <div className="nav-links">
            <Link to="/create-vinyasa" className="nav-link-custom">
              Create Your Own Flow
            </Link>
            <Link to="/my-vinyasas" className="nav-link-custom">
              Saved Flows
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserLanding;
