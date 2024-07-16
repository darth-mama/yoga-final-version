import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../context/FlowContext";
import "./PageTitle.css";

const aromasData = [
  { id: uuidv4(), name: "Lavender", description: "Calming" },
  { id: uuidv4(), name: "Peppermint", description: "Energizing" },
];

const Aromas = () => {
  const navigate = useNavigate();
  const { flow, addAroma, removeAroma } = useFlow();

  const toggleAroma = (aroma) => {
    if (flow.aromas.find((a) => a.id === aroma.id)) {
      removeAroma(aroma.id);
    } else {
      addAroma(aroma);
    }
  };

  const proceedToNext = () => {
    navigate("/flow-preview");
  };

  return (
    <Container className="mt-4">
      <div>
        <h1 className="page-title">
          <strong>Aromas:</strong>
        </h1>
        <li>
          Engaging your sense of smell with essential oils or natural aromas can
          deepen your yoga experience. Scents like lavender can be calming,
          while peppermint can be invigorating.
        </li>
      </div>
      <h1 className="text-center mb-4">Choose Your Aromas</h1>
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
            <h5>Selected Aromas:</h5>
            <ListGroup>
              {flow.aromas.map((aroma) => (
                <ListGroup.Item key={aroma.id}>{aroma.name}</ListGroup.Item>
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
              Continue to Vinyasa Preview
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        {aromasData.map((aroma) => (
          <Col md={4} className="mb-4" key={aroma.id}>
            <Card>
              <Card.Body>
                <Card.Title>{aroma.name}</Card.Title>
                <Card.Text>{aroma.description}</Card.Text>
                <Button variant="primary" onClick={() => toggleAroma(aroma)}>
                  {flow.aromas.find((a) => a.id === aroma.id)
                    ? "Aroma Added"
                    : "Add Aroma"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Aromas;
