// routes.js
// This is a router file that contains the code to load all the other router files.

const router = require("express").Router();

// Load the routes

// Login route
router.use("/login", require("./__login"));

// Register route
router.use("/register", require("./__register"));

// Home route
router.use("/", require("./__home"));

// Settings route
router.use("/settings", require("./__settings"));

// Load the default route
router.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
    status: "error",
  });
});

module.exports = router;
