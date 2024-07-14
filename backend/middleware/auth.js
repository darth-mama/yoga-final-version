// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.userId); // Get the user from the database
    if (!req.user) return res.sendStatus(404); // No user found
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.sendStatus(403);
  }
};

module.exports = { authenticateToken };
