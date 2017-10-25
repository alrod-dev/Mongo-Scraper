// require packages needed for scraping data
var article = require('../models/Articles');
var note = require("../models/Notes");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");


module.exports = function (app, request) {

    /*
    / Scrape API
     */

    // A GET route for scraping the nytimes website
    app.get("/api/scrape", function (req, res) {

        var category = $(".active.selected").val().toLowerCase().trim();

        console.log(category);

        // First, we grab the body of the html with request
        axios.get("https://www.nytimes.com/section/sports").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            var genre = "sports";

            // initiate an empty entry object
            var data = {};

            // For each article element with a "buckets-bottom" class
            $("div.stream article").each(function (i, element) {

                // add the title , url, content and image to the object
                data.title = $(this).children('div.story-body').children('a').children('div.story-meta').children('h2').text().trim();
                data.text = $(this).children('div.story-body').children('a').children('div.story-meta').children('p.summary').text().trim();
                data.author = $(this).children('div.story-body').children('a').children('div.story-meta').children('p.byline').text().trim();
                data.link = $(this).children('div.story-body').children('a').attr("href");
                data.image = $(this).children('div.story-body').children('a').children('div.wide-thumb').children('img').attr('src');
                data.genre = genre;

                console.log(data);


                var hbsObject = {
                    articles: data
                };

                console.log(hbsObject);

                res.render("scrape-articles", hbsObject);


            });

        });
    });


    /*
    / Articles API
     */

    // Route for getting all Articles from the db
    app.get("/api/articles", function (req, res) {
        // Grab every document in the Articles collection
        article
            .find({})
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // DELETE route for deleting notes. You can access the note's id in req.params.id
    app.delete("/api/articles/:id", function (req, res) {

        article.findByIdAndRemove({_id: req.params.id}, function (err, results) {
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            var response = {
                message: "Article successfully deleted",
                id: results._id
            };

            results.status(200).send(response);
        });

    });

    /*
    / Notes API
     */

    // Route for saving/updating an Article's associated Note
    app.post("api//articles/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        note
            .create(req.body)
            .then(function (dbNote) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // DELETE route for deleting notes. You can access the note's id in req.params.id
    app.delete("/api/articles/:id", function (req, res) {

        note.findByIdAndRemove({_id: req.params.id}, {note: dbNote._id}, function (err, results) {
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            var response = {
                message: "Note successfully deleted",
                id: results._id
            };

            results.status(200).send(response);
        });

    });


};
