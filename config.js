const dotenv = require("dotenv").config();
// const path = require("path");

// dotenv.config({
//   path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
// });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 8081,
  KEY_PATH: process.env.KEY_PATH,
  KEY_CERT: process.env.KEY_CERT,
  API_KEY: process.env.API_KEY,
};
