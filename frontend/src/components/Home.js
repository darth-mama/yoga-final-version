import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";
import "../index.css";
import lotusImage from "../images/lotusImage2.jpg";

const Home = () => {
  return (
    <Container className="home-container">
      <Row>
        <Col>
          <h1 className="page-title">
            <strong>Welcome to Yoga on a Dime!</strong>
          </h1>
          <img src={lotusImage} alt="Peace Lotus" className="peace-lotus" />
          <div className="content">
            <p>
              Yoga is for everyone, and it doesn't have to be expensive to start
              up.{" "}
            </p>

            <p>
              Our commitment is to provide information so everyone can be their
              own guru in creating their own yoga flow experience.
            </p>
          </div>
          <Link to="/login" className="Home-link">
            To create your own flow, Sign up or Join now!
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
