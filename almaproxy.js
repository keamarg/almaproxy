const config = require("./config.js");
var fs = require("fs"),
  http = require("http"),
  https = require("https"),
  fetch = require("node-fetch"),
  express = require("express");
var connect = require("connect");
const { nextTick } = require("process");
var app = connect();

var port = config.PORT;
var host = config.HOST;
var node_env = config.NODE_ENV;
var key_path = config.KEY_PATH;
var cert_path = config.CERT_PATH;

if (node_env == "production") {
  var options = {
    key: fs.readFileSync(`${key_path}`),
    cert: fs.readFileSync(`${cert_path}`),
  };
}

// var server = http.createServer(function (req, res) {
//   res.writeHead(200);
//   res.write("Hello World");
//   res.end();
// });
// server.listen(port);
// console.log(`Listening on http://${host}:${port}/`);
// var app = express();

// Add headers
app.use(function (req, response, next) {
  // response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  next();
});

// respond to all requests
app.use(function (req, res, next) {
  res.write("Hello from Connect!\n");
  next();
});

app.use(function (req, res) {
  res.end("Hellos from Connect!\n");
});

//create node.js http server and listen on port
// http.createServer(options, app).listen(port);

// console.log(`NODE_ENV=${node_env}`);

var server = http.createServer(options, app).listen(port, function () {
  console.log(`APP LISTENING ON http://${host}:${port}`);
});

// // Add headers
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   res.setHeader("Content-type", "application/json");
//   res.setHeader("Accept", "application/json");

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware

//   next();
// });

// // app.listen(port, host, () => {
// //   console.log(`APP LISTENING ON http://${host}:${port}`);
// // });

// // console.log(test);
// app.get("/", (req, res) => {
//   res.send('{"message":"hello world"}');
//   // res.send(fetchData);
//   // res.send("hello world");
// });

// // let test = null;
// const fetchData = fetch(
//   "https://api-eu.hosted.exlibrisgroup.com/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?apikey=l8xx1d07986de63b4d0289d5bac8374d99c3",
//   {
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }
// )
//   .then((res) => res.json())
//   .then((json) => {
//     console.log(json);
//     return json;
//   });

// const fetchData = async function fetchData() {
//   const url =
//     "https://api-eu.hosted.exlibrisgroup.com/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?apikey=l8xx1d07986de63b4d0289d5bac8374d99c3";
//   try {
//     //henter productLinks ind fra den aktuelle portfolio, så de kan bruges til at hente products
//     console.log("loading products");
//     const response = await fetch(url, {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();
//     console.log(data);

// Ændret til "reduce" funktionen nedenfor, for at filtrere uønskede produkter fra
// const productLinks = data.portfolio.map((product, index) => {
//   let linkList = [];
//   return (linkList[index] = {
//     link: product.resource_metadata.mms_id.link,
//   });
// });

// const productLinks = data.portfolio.reduce((result, product) => {
//   if (product.resource_metadata.title !== "Dilemmaspil.") {
//     result.push({ link: product.resource_metadata.mms_id.link });
//   }
//   return result;
// }, []);

// //bruger productLinks til at hente products ind
// productLinks.map(async (link) => {
//   const response = await fetch(link.link, {
//     headers: { "Content-type": "application/json" },
//   });
//   const data = await response.json();
//   this.parseProducts(data);
// });
// this.loading = false;
// // console.log(this.products);
//   } catch (error) {
//     console.error(error);
//   }
// };

// app.get("/", function (req, res) {
//   res.writeHead(200);
// res.end("hello world");
// });
