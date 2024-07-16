// src/components/SavedFlows.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Card, Container, Row, Col } from "react-bootstrap";

const SavedFlows = () => {
  const { user } = useAuth();
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    const fetchFlows = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          "http://localhost:5001/api/myvinyasas",
          config
        );
        setFlows(response.data);
      } catch (error) {
        console.error("Error fetching flows:", error);
      }
    };

    if (user) {
      fetchFlows();
    }
  }, [user]);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">My Saved Flows</h1>
      <Row>
        {flows.map((flow) => (
          <Col md={4} className="mb-4" key={flow.id}>
            <Card>
              <Card.Body>
                <Card.Title>{flow.name}</Card.Title>
                <Card.Text>{flow.description}</Card.Text>
                <Card.Text>
                  Created At: {new Date(flow.createdAt).toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SavedFlows;
