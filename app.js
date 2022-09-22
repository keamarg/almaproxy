const app = express();

const http = require("http");
const host = "127.0.0.1";
const port = 8081;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World! NodeJS \n");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

app.get("/", (req, res, next) => {
  res.send("Home folder.");
});

app.get("/info", (req, res, next) => {
  res.send("This is a proxy service which proxies to Alma.");
});

// Start the Proxy
app.listen(port, host, () => {
  console.log(`Starting Proxy at ${host}:${port}`);
});

// const config = require("./config.js");
// const express = require("express");
// const morgan = require("morgan");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// const url = "https://api-eu.hosted.exlibrisgroup.com";

// // Create Express Server
// const app = express();

// // Configuration
// var port = "8081"; //config.PORT;
// var host = "127.0.0.1"; //config.HOST;
// var api_key = config.API_KEY;

// // var port = config.PORT;
// // var host = config.HOST;
// // var node_env = config.NODE_ENV;
// // var key_path = config.KEY_PATH;
// // var cert_path = config.CERT_PATH;
// // var api_key = config.API_KEY;

// // Logging
// app.use(morgan("dev"));

// app.use(function (req, response, next) {
//   response.setHeader("Access-Control-Allow-Origin", "*");
//   response.setHeader("Access-Control-Allow-Credentials", "true");
//   response.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT"
//   );
//   response.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   // response.setHeader("Authorization", `apikey ${api_key}`);
//   next();
// });

// // Info GET endpoint
// app.get("/info", (req, res, next) => {
//   res.send("This is a proxy service which proxies to Alma.");
// });

// // Authorization
// app.use("", (req, res, next) => {
//   req.headers.authorization = "apikey " + api_key;
//   if (req.headers.authorization) {
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// });

// // let offSet = 0;
// // const increaseOffSet = (value) => {
// //   console.log("offset: " + offSet);
// //   if ((offSet = 0)) {
// //     offSet = offSet + value;
// //     return 0;
// //   } else {
// //     offSet = offSet + value;
// //     return offSet;
// //   }
// // };

// let first = true;
// let offSet = 0;
// let limit = 12;
// const rewriteFn = function (path, req) {
//   if (first == true) {
//     first = false;
//   } else {
//     offSet = offSet + 12;
//   }
//   return path.replace(
//     "/productlist",
//     `/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?limit=${limit}&offset=${offSet}`
//   );
// };

// // Proxy endpoints
// app.use(
//   "/productlist",
//   createProxyMiddleware({
//     target: url,
//     changeOrigin: true,
//     // pathRewrite: {
//     //   [`^/productlist`]: `/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?limit=12&offset=${increaseOffSet(
//     //     12
//     //   )}`,
//     // },
//     pathRewrite: rewriteFn,
//   })
// );

// app.use(
//   "/product/:id",
//   createProxyMiddleware({
//     target: url,
//     changeOrigin: true,
//     pathRewrite: {
//       [`^/product`]: "/almaws/v1/bibs/",
//     },
//   })
// );

// // Start the Proxy
// app.listen(port, host, () => {
//   console.log(`Starting Proxy at ${host}:${port}`);
// });
