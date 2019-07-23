var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Scraping tools
var axios = require("axios");
var cheerio = require ("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize express
var app = express();

// Morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/rottenTomatoes", { useNewUrlParser: true });


// Routes

// A GET route for scraping the Rotten Tomatoes website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  
  axios.get("https://www.echojs.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
  
    // Grab article class tag, and do the following:
    $("article h2").each(function(i, element) {
      // Save an empty result object
      var result = {};

    //   Add the text and href of every link, and save them as properties of the result object
    result.title = $(this)
    .children("a")
    .text();
    result.link = $(this)
    .children("a")
    .attr("href");

      // Create a new article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    // console.log(result);
    res.send("Scrape Complete");
    });
  });

// Route to get articles from DB
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      
      console.log("server",dbArticle);
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to grab specific article
app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});