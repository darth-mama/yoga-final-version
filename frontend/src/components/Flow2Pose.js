// src/components/PoseShop.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../context/FlowContext";
import "./Home.css";
import "../index.css";
import "./PageTitle.css";
import "./Flow2Pose.css";

const Poses = () => {
  const [posesData, setPosesData] = useState([]);
  const [hoveredPose, setHoveredPose] = useState(null);
  const navigate = useNavigate();
  const { flow, addPose, removePose } = useFlow();

  useEffect(() => {
    const fetchPoses = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/priyangsubanerjee/yogism/master/all-poses.json"
        );
        setPosesData(
          response.data.map((pose) => ({
            id: uuidv4(),
            sanskrit_name: pose.sanskrit_name,
            english_name: pose.english_name,
            description: pose.description,
            time: pose.time,
            image: pose.image,
          }))
        );
      } catch (error) {
        console.error("Error fetching poses data:", error);
      }
    };

    fetchPoses();
  }, []);

  const togglePose = (pose) => {
    if (flow.poses.find((p) => p.id === pose.id)) {
      removePose(pose.id);
    } else {
      addPose(pose);
    }
  };

  const proceedToNext = () => {
    navigate("/mudras");
  };

  return (
    <Container className="mt-4">
      <h1 className="page-title">Choose Your Poses</h1>
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
            <Button
              className="mt-2 custom-button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button
              className="mt-2 custom-button"
              variant="success"
              onClick={proceedToNext}
            >
              Continue to Mudras
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        {posesData.map((pose) => (
          <Col md={4} className="mb-4" key={pose.id}>
            <Card
              className="pose-card"
              onMouseEnter={() => setHoveredPose(pose.id)}
              onMouseLeave={() => setHoveredPose(null)}
            >
              {hoveredPose === pose.id ? (
                <Card.Body>
                  <Card.Title>{pose.english_name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {pose.sanskrit_name}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Time:</strong> {pose.time}
                  </Card.Text>
                  <Card.Text className="scrollable-description">
                    {pose.description}
                  </Card.Text>
                  <Button
                    variant={
                      flow.poses.find((p) => p.id === pose.id)
                        ? "success"
                        : "primary"
                    }
                    onClick={() => togglePose(pose)}
                  >
                    {flow.poses.find((p) => p.id === pose.id)
                      ? "Pose Added"
                      : "Add Pose"}
                  </Button>
                </Card.Body>
              ) : (
                <>
                  <Card.Img variant="top" src={pose.image} />
                  <Card.Body>
                    <Card.Title>{pose.english_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {pose.sanskrit_name}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Time:</strong> {pose.time}
                    </Card.Text>
                    <Button
                      variant={
                        flow.poses.find((p) => p.id === pose.id)
                          ? "success"
                          : "primary"
                      }
                      onClick={() => togglePose(pose)}
                    >
                      {flow.poses.find((p) => p.id === pose.id)
                        ? "Pose Added"
                        : "Add Pose"}
                    </Button>
                  </Card.Body>
                </>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Poses;
