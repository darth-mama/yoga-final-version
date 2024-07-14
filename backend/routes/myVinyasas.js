const express = require("express");
const { Vinyasa } = require("../models");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Get all vinyasas for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const vinyasas = await Vinyasa.findAll({ where: { userId: req.user.id } });
    res.json(vinyasas);
  } catch (err) {
    console.error("Error fetching vinyasas:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

// Get a single vinyasa for the authenticated user
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const vinyasa = await Vinyasa.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!vinyasa) {
      return res.status(404).json({ error: "Flow not found" });
    }
    res.json(vinyasa);
  } catch (err) {
    console.error("Error fetching vinyasa:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

// Add new vinyasa for the authenticated user
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, description, poses, mudras, pranayamas, aromas } = req.body;
    const newVinyasa = await Vinyasa.create({
      name,
      description,
      poses,
      mudras,
      pranayamas,
      aromas,
      userId: req.user.id, // Attach the userId from the authenticated token
    });
    res.json(newVinyasa);
  } catch (err) {
    console.error("Error creating vinyasa:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

// Delete a vinyasa for the authenticated user
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const vinyasa = await Vinyasa.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!vinyasa) {
      return res.status(404).json({ error: "Flow not found" });
    }
    await vinyasa.destroy();
    res.json({ message: "Flow deleted" });
  } catch (err) {
    console.error("Error deleting vinyasa:", err);
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

module.exports = router;
