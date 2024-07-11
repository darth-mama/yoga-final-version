// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newUser.id }, jwtSecret);
    res.json({ token });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, jwtSecret);
    res.json({ token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

module.exports = router;
