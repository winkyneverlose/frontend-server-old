// __settings.js
// Route for the settings page.

// Load the configuration
const config = require("../config");

// Load the server
const express = require("express");
const router = express.Router();

// Load the settings page
router.get("/", (req, res) => {
  res.render("settings");
});

module.exports = router;
