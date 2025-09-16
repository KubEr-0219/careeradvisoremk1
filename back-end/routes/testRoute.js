const express = require("express");
const router = express.Router();

// Test route
router.get("/hello", (req, res) => {
  res.json({ message: "Hello from backend API 👋" });
});

module.exports = router;
