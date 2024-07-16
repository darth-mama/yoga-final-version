import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../context/FlowContext";
import "./PageTitle.css";

const pranayamasData = [
  {
    id: uuidv4(),
    name: "Nadi Shodhana",
    description: "Balances energy channels",
  },
  {
    id: uuidv4(),
    name: "Kapalabhati",
    description: "Cleanses respiratory system",
  },
];

const Pranayamas = () => {
  const navigate = useNavigate();
  const { flow, addPranayama, removePranayama } = useFlow();

  const togglePranayama = (pranayama) => {
    if (flow.pranayamas.find((p) => p.id === pranayama.id)) {
      removePranayama(pranayama.id);
    } else {
      addPranayama(pranayama);
    }
  };

  const proceedToNext = () => {
    navigate("/aromas");
  };

  return (
    <Container className="mt-4">
      <h1 className="page-title">
        <strong>Pranayamas:</strong>
      </h1>
      <p>
        Breathing techniques are essential in yoga to control your life force
        energy (prana). Different pranayamas can help calm the mind, increase
        energy, and improve overall health.
      </p>
      <h2 className="text-center mb-4">Choose Your Pranayamas</h2>
      <Row>
        <Col md={12}>
          <div className="text-end">
            <h5>Selected Poses:</h5>
            <ListGroup>
              {flow.poses.map((pose) => (
                <ListGroup.Item key={pose.id}>
                  {pose.english_name}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <h5>Selected Mudras:</h5>
            <ListGroup>
              {flow.mudras.map((mudra) => (
                <ListGroup.Item key={mudra.id}>{mudra.name}</ListGroup.Item>
              ))}
            </ListGroup>
            <h5>Selected Pranayamas:</h5>
            <ListGroup>
              {flow.pranayamas.map((pranayama) => (
                <ListGroup.Item key={pranayama.id}>
                  {pranayama.name}
                </ListGroup.Item>
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
              Continue to Aromas
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        {pranayamasData.map((pranayama) => (
          <Col md={4} className="mb-4" key={pranayama.id}>
            <Card>
              <Card.Body>
                <Card.Title>{pranayama.name}</Card.Title>
                <Card.Text>{pranayama.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => togglePranayama(pranayama)}
                >
                  {flow.pranayamas.find((p) => p.id === pranayama.id)
                    ? "Pranayama Added"
                    : "Add Pranayama"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Pranayamas;
