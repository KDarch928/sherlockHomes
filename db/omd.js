// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

// Grab the movieName which will always be the third node argument.
var houseInfo = process.argv[2];

// Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.zillow.com/webservice/GetSearchResults.htm" + houseInfo + "X1-ZWz1gb8v9pao0b_5upah";
var queryUrl = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1gb8v9pao0b_5upah&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA";

// This line is just to help us debug against the actual URL.
// console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("House info: " + JSON.parse(body));
    console.log(body);
    console.log(response.statusCode);
  }
});
