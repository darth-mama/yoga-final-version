import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../context/FlowContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Flow6Preview.css";
import "../index.css";

const FlowPreview = () => {
  const { flow, setFlow, resetFlow } = useFlow();
  const { user } = useAuth();
  const [flowName, setFlowName] = useState(flow.name || "");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFlowName(flow.name || "");
  }, [flow.name]);

  const saveFlowName = () => {
    setFlow((prevFlow) => ({ ...prevFlow, name: flowName }));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const startOver = () => {
    resetFlow();
    navigate("/poses");
  };

  const handleSaveFlowClick = async () => {
    if (user) {
      await saveFlow();
    } else {
      navigate("/login");
    }
  };

  const saveFlow = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "http://localhost:5001/api/myvinyasas",
        flow,
        config
      );
      console.log(response.data);
      navigate("/my-vinyasas");
    } catch (error) {
      console.error("Error saving flow:", error);
      navigate("/login");
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="page-title">Flow Preview</h1>
      <Form.Group className="mb-3">
        <Form.Label>
          Flow Name <span style={{ color: "red" }}>(Required)</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter flow name"
          value={flowName}
          onChange={(e) => setFlowName(e.target.value)}
        />
        <Button
          className="mt-2 custom-button"
          variant="primary"
          onClick={saveFlowName}
        >
          Save Name
        </Button>
      </Form.Group>
      {showAlert && <Alert variant="success">Flow name saved!</Alert>}
      <Row>
        <Col md={12}>
          <h5>Selected Poses:</h5>
          <ListGroup>
            {flow.poses.map((pose) => (
              <ListGroup.Item key={pose.id}>{pose.english_name}</ListGroup.Item>
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
            className="mt-2 me-2 custom-button"
            variant="secondary"
            onClick={startOver}
          >
            Start Over
          </Button>
          <Button
            className="mt-2 custom-button"
            variant="success"
            onClick={handleSaveFlowClick}
          >
            {user ? "Save Flow" : "Login/Register to Save Flow"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FlowPreview;
