// src/components/Payment.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "./Payment.css";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment logic here

    navigate("/confirmation");
  };

  return (
    <Container className="payment-container mt-4">
      <h1 className="text-center mb-4">Payment Details</h1>
      <Form onSubmit={handlePaymentSubmit}>
        <Form.Group controlId="formCardNumber" className="mb-3">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formExpiryDate" className="mb-3">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCvv" className="mb-3">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBillingAddress" className="mb-3">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter billing address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formShippingAddress" className="mb-3">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Payment
        </Button>
      </Form>
    </Container>
  );
};

export default Payment;
