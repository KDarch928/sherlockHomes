// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var request = require("request");
var xml2js = require("xml2js");
var jsdom = require("jsdom");



// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page



app.get("/", function (req, res) {
  res.send("home");
});


app.post("/testRoute", function (req, res) {
  console.log(req.body);
  console.log("post route fired")
  var state = req.body.state
  var city = req.body.city
  var zipcode = req.body.zipcode

  var baseURL = 'https://search.onboard-apis.com/propertyapi/v1.0.0/assessment/detail?postalcode=' + zipcode

  //===============================================================================================================================================


  request({
    url: baseURL,
    method: "GET",
    headers: {
      apikey: "4b1160e947405c82fcd5633d6fa81929",
      accept: "application/json"
    }
  }, function (error, response, body) {
    // console.log(response)
    // console.log(body)
    return res.send(body);

  })


})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
