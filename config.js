const dotenv = require("dotenv");
const { Http2ServerRequest } = require("http2");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

console.log(process.env.HOST);
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  KEY_PATH: process.env.KEY_PATH,
  KEY_CERT: process.env.KEY_CERT,
};
