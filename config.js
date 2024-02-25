// config.js
// Configuration for database server

/**
 * Configuration object for the database server.
 * @typedef {Object} Config
 * @property {string} host - The host address of the server.
 * @property {number} port - The port number of the server.
 * @property {string} code_path - The path to the code directory (do not change).
 * @property {string} back_server - The path to the backend server.
 */

const config = {
  host: "127.0.0.1",
  port: 80,
  code_path: __dirname,
  back_server: {
    host: "127.0.0.1",
    port: 8080,
  },
};

module.exports = config;
