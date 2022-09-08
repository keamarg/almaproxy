const config = require("./config.js");
var fs = require("fs"),
  http = require("http"),
  https = require("https"),
  fetch = require("node-fetch"),
  express = require("express");

var port = config.PORT;
var host = config.HOST;
var node_env = config.NODE_ENV;

var options = {
  key: fs.readFileSync(
    "/home/projekterkea/ssl/keys/cee57_b1055_41d5cebe6b0e5f396bc521709111b7b9.key"
  ),
  cert: fs.readFileSync(
    "/home/projekterkea/ssl/certs/cpcalendars_projekter_kea_dk_cee57_b1055_1667909481_dd06f94609f02df79d92791162dc8295.crt"
  ),
};

var app = express();

console.log(`NODE_ENV=${node_env}`);

// var server = https.createServer(options, app).listen(port, function () {
//   console.log("Express server listening on port " + port);
// });

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
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

app.listen(port, host, () => {
  console.log(`APP LISTENING ON http://${host}:${port}`);
});

let test = null;
fetch(
  "https://api-eu.hosted.exlibrisgroup.com/almaws/v1/electronic/e-collections/618551140007387/e-services/628551130007387/portfolios?apikey=l8xx1d07986de63b4d0289d5bac8374d99c3",
  {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }
)
  .then((res) => res.json())
  .then((json) => {
    return json;
  });

console.log(test);
app.get("/", (req, res) => {
  res.send('{"message":"hello world"}');
});

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
//   res.end("hello world");
// });
