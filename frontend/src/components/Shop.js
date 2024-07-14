// src/components/Shop.js
import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Shop.css";
import "./PageTitle.css";
import yogaMat from "../images/yogaMat.jpg";
import bolsters from "../images/bolsters.jpg";
import yogaBlocks from "../images/yogaBlocks.jpg";
import yogaStraps from "../images/yogaStraps.jpg";
import lavender from "../images/lavender.jpg";

const products = [
  {
    id: 1,
    name: "Yoga Mat",
    description:
      "High-quality, non-slip yoga mat for all types of yoga practice.",
    price: 20.0,
    image: yogaMat,
  },
  {
    id: 2,
    name: "Bolster",
    description:
      "Firm, supportive bolster for restorative yoga and deep relaxation.",
    price: 30.0,
    image: bolsters,
  },
  {
    id: 3,
    name: "Yoga Blocks",
    description:
      "Lightweight and durable blocks to support and deepen your practice.",
    price: 15.0,
    image: yogaBlocks,
  },
  {
    id: 4,
    name: "Yoga Straps",
    description:
      "Adjustable straps to help you stretch and improve flexibility.",
    price: 10.0,
    image: yogaStraps,
  },
  {
    id: 5,
    name: "Lavender Oil",
    description:
      "Essential oils and diffusers to enhance your yoga and meditation practice.",
    price: 8.99,
    image: lavender,
  },
];

const Shop = () => {
  const { cart, addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const calculateCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container className="shop-container mt-4">
      <h1 className="page-title">Shop</h1>
      <div className="cart-actions">
        <Button
          as={Link}
          to="/cart"
          variant="secondary"
          className="mb-2 cart-button"
        >
          Cart
        </Button>
        <Button
          variant="success"
          onClick={handleProceedToCheckout}
          className="checkout-button"
        >
          Proceed to Checkout ({calculateCartCount()}{" "}
          {calculateCartCount() === 1 ? "item" : "items"})
        </Button>
      </div>
      <div className="cart-link">
        <Link to="/cart">
          <FaShoppingCart size={24} />
          <span className="cart-count">{calculateCartCount()}</span>
        </Link>
        <ListGroup className="cart-preview">
          {cart.map((item, index) => (
            <ListGroup.Item key={index}>
              {item.name} - {item.quantity} x ${item.price.toFixed(2)}
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="cart-total">
            Subtotal: $
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </ListGroup.Item>
        </ListGroup>
      </div>
      <Row>
        {products.map((product) => (
          <Col md={4} className="mb-4" key={product.id}>
            <Card className="product-card">
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  <strong>${product.price.toFixed(2)}</strong>
                </Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Shop;
