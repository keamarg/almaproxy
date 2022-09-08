const dotenv = require("dotenv");
const { Http2ServerRequest } = require("http2");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  KEY_PATH: process.env.KEY_PATH || null,
  KEY_CERT: process.env.KEY_CERT || null,
};
