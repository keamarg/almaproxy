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

app.use(function (req, response, next) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  // response.setHeader("Authorization", `apikey ${api_key}`);
  next();
});

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

const rewriteFn = function (path, req) {
  console.log("min path:" + path);
  return path.replace(
    "/almaproxy", // `${queryPath}` // `/${queryPath}&limit=${queryLimit}&offset=${queryOffSet}` //?limit=${limit}&offset=${o$
    // "almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios"
    ``
    //"almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios"
    //"almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios"
  );
};

const options = {
  target: url,
  changeOrigin: true,
  pathRewrite: rewriteFn,
};

app.use("/", createProxyMiddleware(options));

// Start the Proxy
app.listen(port, host, () => {
  console.log(`Starting Proxy at ${host}:${port}`);
});
