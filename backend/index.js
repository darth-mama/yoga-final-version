require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const myVinyasasRoute = require("./routes/myVinyasas");
const usersRoute = require("./routes/users");
const testRoute = require("./routes/test");
const paymentRoute = require("./payment");
const { authenticateToken } = require("./middleware/auth");
const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.path);
  next();
});

app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api/myvinyasas", authenticateToken, myVinyasasRoute); // Removed global authenticateToken middleware
app.use("/users", usersRoute);
app.use("/payment", paymentRoute);
app.use("/api/test", testRoute);

app.get("/", (req, res) => {
  res.send("Backend Welcome!");
});

module.exports = app;
