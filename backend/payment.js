// backend/payment.js
const express = require("express");
const Stripe = require("stripe");
const { Pool } = require("pg");

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
