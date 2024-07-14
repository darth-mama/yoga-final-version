// src/components/Confirmation.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./Confirmation.css";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <Container className="confirmation-container mt-4">
      <h1 className="text-center mb-4">Order Confirmation</h1>
      <p>Your order has been placed successfully!</p>
      <p>Thank you for shopping with us.</p>
      <div className="confirmation-actions mt-4">
        <Button variant="primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
        <Button variant="secondary" onClick={() => navigate("/shop")}>
          Continue Shopping
        </Button>
      </div>
    </Container>
  );
};

export default Confirmation;
