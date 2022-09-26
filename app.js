const config = require("./config.js");
const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const url = "https://api-eu.hosted.exlibrisgroup.com";

// Create Express Server
const app = express();

// Configuration
var port = config.PORT;
var host = config.HOST;
var api_key = config.API_KEY;

// Logging
app.use(morgan("dev"));

// Info GET endpoint
app.get("/info", (req, res, next) => {
  res.send("This is a proxy service which proxies to Alma.");
});

// Authorization
app.use("", (req, res, next) => {
  req.headers.authorization = "apikey " + api_key;
  if (req.headers.authorization) {
    next();
  } else {
    res.sendStatus(403);
  }
});

const options = {
  target: url,
  changeOrigin: true,
};

app.use("/", createProxyMiddleware(options));

// Start the Proxy
app.listen(port, host, () => {
  console.log(`Starting Proxy at ${host}:${port}`);
});
