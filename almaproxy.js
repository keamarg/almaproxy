const config = require("./config.js");
// var fs = require("fs"),
//   http = require("http"),
//   https = require("https"),
//   fetch = require("node-fetch"),
//   express = require("express");
// var connect = require("connect");
// const { nextTick } = require("process");
// const { json } = require("express");
// var app = connect();

// var port = config.PORT;
// var host = config.HOST;
// var node_env = config.NODE_ENV;
// var key_path = config.KEY_PATH;
// var cert_path = config.CERT_PATH;
// var api_key = config.API_KEY;

// if (node_env == "production") {
//   var options = {
//     key: fs.readFileSync(`${key_path}`),
//     cert: fs.readFileSync(`${cert_path}`),
//     // key: fs.readFileSync(
//     //   "/home/projekterkea/ssl/keys/cee57_b1055_41d5cebe6b0e5f396bc521709111b7b9.key"
//     // ),
//     // cert: fs.readFileSync(
//     //   "/home/projekterkea/ssl/certs/cpcalendars_projekter_kea_dk_cee57_b1055_1667909481_dd06f94609f02df79d92791162dc8295.crt"
//     // ),
//   };
// }
// console.log(`${key_path}`);

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

// let offSet = 0;
// const increaseOffSet = (value) => {
//   console.log("offset: " + offSet);
//   if ((offSet = 0)) {
//     offSet = offSet + value;
//     return 0;
//   } else {
//     offSet = offSet + value;
//     return offSet;
//   }
// };

let offSet = 12;
let limit = 2;
const rewriteFn = function (path, req) {
  return path.replace(
    "/productlist",
    `/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?limit=${limit}&offset=${offSet}`
  );
};

// Proxy endpoints
app.use(
  "/productlist",
  createProxyMiddleware({
    target: url,
    changeOrigin: true,
    // pathRewrite: {
    //   [`^/productlist`]: `/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?limit=12&offset=${increaseOffSet(
    //     12
    //   )}`,
    // },
    pathRewrite: rewriteFn,
  })
);

app.use(
  "/product/:id",
  createProxyMiddleware({
    target: url,
    changeOrigin: true,
    pathRewrite: {
      [`^/product`]: "/almaws/v1/bibs/",
    },
  })
);

// Start the Proxy
app.listen(port, host, () => {
  console.log(`Starting Proxy at ${host}:${port}`);
});

// var http = require("http"),
//   httpProxy = require("http-proxy");
// var proxy = httpProxy.createProxyServer({});
// var server = http.createServer(function (req, res) {
//   proxy.web(req, res, {
//     target: url,
//     secure: false,
//     ws: false,
//     prependPath: false,
//     ignorePath: false,
//   });
// });
// console.log(`listening on port ${port}`);
// server.listen(port);

// // Listen for the `error` event on `proxy`.
// // as we will generate a big bunch of errors
// proxy.on("error", function (err, req, res) {
//   console.log(err);
//   res.writeHead(500, {
//     "Content-Type": "text/plain",
//   });
//   res.end("Oops");
// });

// proxy.on("proxyRes", function (proxyRes, req, res) {
//   // res.setHeader("Access-Control-Allow-Origin", "*");
//   // res.setHeader("Access-Control-Allow-Credentials", "true");
//   // res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   // // res.setHeader("Accept", "application/json");
//   // res.setHeader(
//   //   "Access-Control-Allow-Headers",
//   //   "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   // );
//   // proxyRes.headers["access-control-allow-origin"] = "*";
//   // proxyRes.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
//   // console.log(
//   //   "Raw [target] response",
//   //   JSON.stringify(proxyRes.headers, true, 2)
//   // );
// });

//
// Create your target server
//

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, {
//       "Content-Type": "text/plain",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Credentials": "true",
//       "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
//     });
//     res.write(
//       "request successfully proxied!" +
//         "\n" +
//         JSON.stringify(req.headers, true, 2)
//     );
//     res.end();
//   })
//   .listen(9000);
// var server = http.createServer(function (req, res) {
//   res.writeHead(200);
//   res.write("Hello World");
//   res.end();
// });
// server.listen(port);
// console.log(`Listening on http://${host}:${port}/`);
// var app = express();

// // Add headers
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

// // respond to all requests
// app.use(function (req, res, next) {
//   // res.write("Hello from Connect!\n");
//   res.end(JSON.stringify(newdata));
//   // res.end(JSON.stringify(req.headers));
//   next();
// });

// app.use(function (req, res) {
//   // res.end(JSON.stringify(newdata));
//   // res.end(fetchData);
// });

// //create node.js http server and listen on port
// // http.createServer(options, app).listen(port);

// // console.log(`NODE_ENV=${node_env}`);

// var server = http.createServer(options, app).listen(port, function () {
//   console.log(`APP LISTENING ON http://${host}:${port}`);
// });

// // // Add headers
// // app.use(function (req, res, next) {
// //   // Website you wish to allow to connect
// //   res.setHeader("Access-Control-Allow-Origin", "*");

// //   // Request methods you wish to allow
// //   res.setHeader(
// //     "Access-Control-Allow-Methods",
// //     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
// //   );

// //   // Request headers you wish to allow
// //   //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// //   res.setHeader("Content-type", "application/json");
// //   res.setHeader("Accept", "application/json");

// //   // Set to true if you need the website to include cookies in the requests sent
// //   // to the API (e.g. in case you use sessions)
// //   res.setHeader("Access-Control-Allow-Credentials", true);

// //   // Pass to next layer of middleware

// //   next();
// // });

// // // app.listen(port, host, () => {
// // //   console.log(`APP LISTENING ON http://${host}:${port}`);
// // // });

// // // console.log(test);
// // app.get("/", (req, res) => {
// //   res.send('{"message":"hello world"}');
// //   // res.send(fetchData);
// //   // res.send("hello world");
// // });

// // // let test = null;
// let newdata = [];
// // const fetchData = fetch(
// //   "https://api-eu.hosted.exlibrisgroup.com/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?apikey=l8xx1d07986de63b4d0289d5bac8374d99c3",
// //   {
// //     headers: {
// //       "Access-Control-Allow-Origin": "*",
// //       Accept: "application/json",
// //       "Content-Type": "application/json",
// //     },
// //   }
// // )
// //   .then((res) => res.text())
// //   .then((data) => {
// //     newdata = data;
// //   });

// // self-onvoking fetch funktion
// (async function fetchData() {
//   const url =
//     "https://api-eu.hosted.exlibrisgroup.com/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios";
//   try {
//     //henter productLinks ind fra den aktuelle portfolio, så de kan bruges til at hente products
//     console.log("loading products");
//     const response = await fetch(url, {
//       headers: {
//         Authorization: `apikey ${api_key}`,
//         // "Access-Control-Allow-Origin": "*",
//         Accept: "application/json",
//         // "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();
//     // console.log(data);
//     // newdata = data;

//     //     //Ændret til "reduce" funktionen nedenfor, for at filtrere uønskede produkter fra
//     //     const productLinks = data.portfolio.map((product, index) => {
//     //       let linkList = [];
//     //       return (linkList[index] = {
//     //         link: product.resource_metadata.mms_id.link,
//     //       });
//     //     });

//     const productLinks = data.portfolio.reduce((result, product) => {
//       if (product.resource_metadata.title !== "Dilemmaspil.") {
//         result.push({ link: product.resource_metadata.mms_id.link });
//       }
//       return result;
//     }, []);

//     //bruger productLinks til at hente products ind
//     productLinks.map(async (link) => {
//       console.log(`${link.link}?apikey=${api_key}`);

//       const response = await fetch(`${link.link}?apikey=${api_key}`, {
//         headers: {
//           Authorization: `apikey ${api_key}`,
//           // "Access-Control-Allow-Origin": "*",
//           Accept: "application/json",
//           // credentials: 'include'
//           // Authorization: "apikey " + api_key,
//           // X-API-Key: api_key
//           // "Content-Type": "application/json",
//           // Authentication: `token ${api_key}`,
//           // Authorization: "Bearer " + api_key,
//           // Authorization: `Basic ${api_key}`,
//           // Authorization: apikey "l8xx1d07986de63b4d0289d5bac8374d99c3",
//         },
//       });
//       const data = await response.json();
//       // this.parseProducts(data);
//       console.log(data);
//       newdata.push(data);
//     });
//     this.loading = false;
//     // console.log(this.products);
//   } catch (error) {
//     console.error(error);
//   }
// })();

// // app.get("/", function (req, res) {
// //   res.writeHead(200);
// // res.end("hello world");
// // });
// // fetchData();
