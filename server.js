var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Scraping tools
var axios = require("axios");
var cherrio = require ("cheerio");

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