// __login.js
// Route for the login page.

// Load the configuration
const config = require("../config");

// Load the server
const express = require("express");
const router = express.Router();

// Load the login page
router.get("/", (req, res) => {
  res.render("login");
});

module.exports = router;
