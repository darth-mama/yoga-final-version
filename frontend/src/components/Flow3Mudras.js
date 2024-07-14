// src/components/Mudras.js
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../context/FlowContext";

const mudrasData = [
  { id: uuidv4(), name: "Gyan Mudra", description: "Improves concentration" },
  { id: uuidv4(), name: "Shuni Mudra", description: "Promotes patience" },
];

const Mudras = () => {
  const navigate = useNavigate();
  const { flow, addMudra, removeMudra } = useFlow();

  const toggleMudra = (mudra) => {
    if (flow.mudras.find((m) => m.id === mudra.id)) {
      removeMudra(mudra.id);
    } else {
      addMudra(mudra);
    }
  };

  const proceedToNext = () => {
    navigate("/pranayamas");
  };

  return (
    <Container className="mt-4">

      <p>
        To enhance your yoga practice, we encourage the use of mudras,
        pranayamas, and aromas:
      </p>

      <ul>
        <li>
          <strong>Mudras:</strong> These hand gestures are used to channel
          energy flow and set intentions during your practice. Each mudra has a
          unique purpose and can enhance your physical and emotional well-being.
        </li>
      </ul>
      <h1 className="page-title">Choose Your Mudras</h1>
      <Row>
        <Col md={12}>
          <div className="text-end">
            <h5>Selected Poses:</h5>
            <ListGroup>
              {flow.poses.map((pose) => (
                <ListGroup.Item key={pose.id}>{pose.name}</ListGroup.Item>
              ))}
            </ListGroup>
            <h5>Selected Mudras:</h5>
            <ListGroup>
              {flow.mudras.map((mudra) => (
                <ListGroup.Item key={mudra.id}>{mudra.name}</ListGroup.Item>
              ))}
            </ListGroup>
            <Button
              className="mt-2 me-2"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button className="mt-2" variant="success" onClick={proceedToNext}>
              Continue to Pranayamas
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        {mudrasData.map((mudra) => (
          <Col md={4} className="mb-4" key={mudra.id}>
            <Card>
              <Card.Body>
                <Card.Title>{mudra.name}</Card.Title>
                <Card.Text>{mudra.description}</Card.Text>
                <Button variant="primary" onClick={() => toggleMudra(mudra)}>
                  {flow.mudras.find((m) => m.id === mudra.id)
                    ? "Mudra Added"
                    : "Add Mudra"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Mudras;
