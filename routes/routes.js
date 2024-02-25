// routes.js
// This is a router file that contains the code to load all the other router files.

const router = require("express").Router();

// Load the routes

// Login route
router.use("/login", require("./__login"));

// Load the default route
router.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
    status: "error",
  });
});

module.exports = router;
