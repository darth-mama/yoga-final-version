const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { body, validationResult } = require("express-validator");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

router.post(
  "/register",
  [
    body("username").isLength({ min: 3 }).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }).trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, email, password } = req.body;

      // Check if username exists already
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({
          msg: "Username already exists. Please choose another username.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      console.log("New user created:", newUser.dataValues); // Log new user data
      const token = jwt.sign({ userId: newUser.id }, jwtSecret);
      res.json({ user: newUser, token });
    } catch (err) {
      console.error("Error registering user:", err);
      res.status(500).json({ error: "Server error", message: err.message });
    }
  }
);

router.post(
  "/login",
  [
    body("username").isLength({ min: 3 }).trim().escape(),
    body("password").isLength({ min: 6 }).trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
      res.json({ user, token });
    } catch (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ error: "Server error", message: err.message });
    }
  }
);

module.exports = router;
