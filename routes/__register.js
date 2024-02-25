// __register.js
// Route for the register page.

// Load the configuration
const config = require("../config");

// Load the server
const express = require("express");
const router = express.Router();

// Load the register page
router.get("/", (req, res) => {
  res.render("register");
});

module.exports = router;
