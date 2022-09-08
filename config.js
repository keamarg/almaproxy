require("dotenv").config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});
const path = require("path");

// dotenv.config({
//   path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
// });

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  KEY_PATH: process.env.KEY_PATH,
  KEY_CERT: process.env.KEY_CERT,
};
