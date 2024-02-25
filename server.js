// server.js
// Frontend server for the application.

// Load the configuration
const config = require("./config");

// Load the server
const express = require("express");
const app = express();

// Load path
const path = require("path");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Load the routes
const routes = require(config.code_path + "/routes/routes");
app.use("/", routes);

// View engine
app.set("view engine", "ejs");

// Server class
class Server {
  static start(host = config.host, port = config.port) {
    // Start the server with HTTPS
    app.listen(port, host, () => {
      console.log(
        `可喵大人の控制 前端服务器 is running on host ${host}, port ${port}`,
        ` | ${host}:${port}`
      );
    });

    process.on("exit", () => {
      console.log("Server stopped...");
    });
  }

  static stop() {
    // Stop the server
    app.close(() => {
      console.log("Server stopped...");
    });
  }
}

Server.start();

module.exports = Server;
