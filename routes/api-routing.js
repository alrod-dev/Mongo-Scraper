// require packages needed for scraping data
var cheerio = require('cheerio');
var article = require('../models/Articles');
var note = require("../models/Notes");


module.exports = function (app, request) {

    /*
    / Articles API
     */

    // GET route for getting all of the sports articles
    app.get("/api/sports", function (req, res) {

        article.find(function (error, results) {

            res.json(results);

        }).catch(function (error) {

            res.json(error)

        });

    });

    // POST route for posting all of the sports articles
    app.post("/api/sports", function (req, res) {

        // Make a request for the news section of mlb.com
        request("https://www.nytimes.com/section/sports", function (error, response, html) {

            var genre = 'sports';
            // Load the html body from request into cheerio
            var $ = cheerio.load(html);


            // For each article element with a "buckets-bottom" class
            $("div.stream article").each(function (i, element) {


                // initiate an empty entry object
                var data = {};

                // add the title , url, content and image to the object
                data.title = $(element).children('div.story-body').children('a').children('div.story-meta').children('h2').text().trim();
                data.link = $(element).children('div.story-body').children('a').attr("href");
                data.image = $(element).children('div.story-body').children('a').children('div.wide-thumb').children('img').attr('src');
                data.text = $(element).children('div.story-body').children('a').children('div.story-meta').children('p').text().trim();
                data.genre = genre;

                console.log(data);

                // Create a new entry using the Article Schema
                var newArticle = new article(data);

                // Query: In our database, go to the animals collection, then "find" everything
                newArticle.save(function (error, results) {
                    // Log any errors if the server encounters one
                    if (error) {
                        console.log(error);
                    }
                    // Otherwise, send the result of this query to the browser
                    else {
                        res.json(results);
                    }
                });


            });


        });


    });


    // DELETE route for deleting sports articles. You can access the sport's id in req.params.id
    app.delete("/api/sports/:id", function (req, res) {

        article.findByIdAndRemove(req.params._id, function (err, results) {
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

    // GET route for getting all of the notes
    app.get("/api/sports", function (req, res) {

        note.find(function (error, results) {

            res.json(results);

        }).catch(function (error) {

            res.json(error)

        });

    });


    // POST route for posting all of the notes
    app.post("/api/notes", function (req, res) {


        // Create a new entry using the Article Schema
        var newNotes = new note(data);

        // Query: In our database, go to the animals collection, then "find" everything
        newNotes.save(function (error, results) {
            // Log any errors if the server encounters one
            if (error) {
                console.log(error);
            }
            // Otherwise, send the result of this query to the browser
            else {
                res.json(results);
            }
        });

    });

    // DELETE route for deleting notes. You can access the note's id in req.params.id
    app.delete("/api/notes/:id", function (req, res) {

        note.findByIdAndRemove(req.params._id, function (err, results) {
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            var response = {
                message: "Article successfully deleted",
                id: results._id
            };

            results.status(200).send(response);
        });

    });


    // PUT route for updating notes. The updated notes will be available in req.body
    app.put("/api/notes", function (req, res) {

        note.findById(req.params._id, function (err, results) {

            // Handle any possible database errors
            if (err) {
                res.status(500).send(err);
            }

            else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.
                results.title = req.body.title || results.title;
                results.link = req.body.link || results.link;
                results.image = req.body.image || results.image;
                results.text = req.body.text || results.text;
                results.genre = req.body.genre || results.genre;

                // Save the updated document back to the database
                results.save(function (err, res) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.status(200).send(res);
                });
            }
        });


    });


};
