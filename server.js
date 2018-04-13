var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var mongojs = require("mongojs");
// Require all models
// var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//ROUTES================================================================





//Scrape Route
app.get("/scrape", function(req, res){
    // First, we grab the body of the html with request
    
  axios.get("https://www.nytimes.com/section/politics").then(function(response) {
    
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    results = [];
    $("div.story-body").each(function(i, element) {
     
    var link = $(element).find("a").attr("href");
    var title = $(element).find("h2.headline").text();
    var summary = $(element).find("p.summary").text();
    
    if (title && link && summary) {
      // Insert the data in the scrapedData db
      db.scrapedData.insert({
        title: title,
        link: link,
        summary: summary
      },
      function(err, inserted) {
        if (err) {
          // Log the error if one is encountered during the query
          console.log(err);
        }
        else {
          // Otherwise, log the inserted data
          console.log(inserted);
        }
      });
    }
    
    })
  })
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});