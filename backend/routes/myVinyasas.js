const express = require("express");
const Vinyasa = require("../models/Vinyasa");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const vinyasas = await Vinyasa.findAll();
    res.json(vinyasas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, poses, mudras, pranayamas, aromas } = req.body;
    const newVinyasa = await Vinyasa.create({
      name,
      description,
      poses,
      mudras,
      pranayamas,
      aromas,
    });
    res.json(newVinyasa);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
