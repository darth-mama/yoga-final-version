// src/components/Cart.js
import React from "react";
import { Container, Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, updateItemQuantity, removeItem } = useCart();

  const handleQuantityChange = (item, quantity) => {
    updateItemQuantity(item.id, parseInt(quantity));
  };

  const handleRemoveItem = (item) => {
    removeItem(item.id);
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Container className="cart-container mt-4">
      <h1 className="text-center mb-4">Shopping Cart</h1>
      {cart.length > 0 ? (
        <ListGroup>
          {cart.map((item) => (
            <ListGroup.Item key={item.id} className="cart-item">
              <Row>
                <Col md={4}>{item.name}</Col>
                <Col md={2}>${item.price.toFixed(2)}</Col>
                <Col md={2}>
                  <Form.Control
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                    min="1"
                  />
                </Col>
                <Col md={2}>${(item.price * item.quantity).toFixed(2)}</Col>
                <Col md={2}>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveItem(item)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="cart-total">
            <Row>
              <Col md={{ span: 4, offset: 8 }}>
                <strong>Total: ${calculateTotal()}</strong>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <p>Your cart is empty</p>
      )}
      <div className="cart-actions mt-4">
        <Button as={Link} to="/shop" variant="secondary">
          Back to Shop
        </Button>
        <Button as={Link} to="/checkout" variant="success">
          Proceed to Checkout
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
