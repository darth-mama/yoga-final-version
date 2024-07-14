// src/components/FlowStart.js
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useFlow } from "../context/FlowContext";
import "./Flow1Start.css";
import "../index.css";
import yogaFlow from "../images/yogaFlow.jpg";
import mudra from "../images/mudra.jpg";
import pranayama from "../images/pranayama.jpg";
import aroma from "../images/aroma.jpg";

const FlowStart = () => {
  const navigate = useNavigate();
  const { resetFlow } = useFlow();

  useEffect(() => {
    resetFlow();
  }, [resetFlow]);

  return (
    <div className="flow-start-wrapper">
      <div className="image-collage">
        <Row>
          <Col xs={6} md={3}>
            <img src={yogaFlow} alt="Yoga Flow" className="collage-image" />
          </Col>
          <Col xs={6} md={3}>
            <img src={mudra} alt="Mudra" className="collage-image" />
          </Col>
          <Col xs={6} md={3}>
            <img src={pranayama} alt="Pranayama" className="collage-image" />
          </Col>
          <Col xs={6} md={3}>
            <img src={aroma} alt="Aroma" className="collage-image" />
          </Col>
        </Row>
      </div>
      <div className="text-center">
        <h1 className="page-title">
          <strong>Engage Your Body, Breath, Hands, and Senses</strong>
        </h1>
        <p>Welcome to your personalized yoga journey!</p>
        <p>
          In this section, you'll craft a unique vinyasa flow that follows the
          essential arc of grounding, warming, heating, cooling, and relaxing
          poses. Enhance your practice by incorporating mudras to channel
          energy, pranayamas to control your breath, and aromas to elevate your
          sensory experience. Let’s begin creating a harmonious flow that aligns
          with your intentions and well-being.
        </p>

        <Button onClick={() => navigate("/poses")} className="custom-button">
          Start
        </Button>
      </div>
    </div>
  );
};

export default FlowStart;
