// src/components/Checkout.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import "./Checkout.css";

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  return (
    <Container className="checkout-container mt-4">
      <h1 className="text-center mb-4">Checkout</h1>
      {user ? (
        <div>
          <Button variant="success" onClick={handleProceedToPayment}>
            Proceed to Payment
          </Button>
        </div>
      ) : (
        <div>
          <p>You need to log in to proceed with the checkout.</p>
          <Button variant="primary" onClick={handleLogin}>
            Login / Register
          </Button>
        </div>
      )}
      <div className="checkout-actions mt-4">
        <Button variant="secondary" onClick={() => navigate("/shop")}>
          Back to Shop
        </Button>
      </div>
    </Container>
  );
};

export default Checkout;
