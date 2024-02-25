// __home.js
// Route for the home page.

// Load the configuration
const config = require("../config");

// Load the server
const express = require("express");
const router = express.Router();

// Load the home page
router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
