const dotenv = require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 8081,
  API_KEY: process.env.API_KEY,
};
