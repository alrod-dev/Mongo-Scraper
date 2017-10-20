// Author: Alfredo Rodriguez
// File: JS - api-routing.js
// Date: 10/20/2017

// Routes
// ======
// Dependencies
var express = require("express");
var Example = require("../controller/article_controller");

// Initialize Express
var app = express();

// Route to post our form submission to mongoDB via mongoose
app.post("/submit", function(req, res) {

    // We use the "Example" class we defined above to check our req.body against our user model
    var user = new Example(req.body);

    // With the new "Example" object created, we can save our data to mongoose
    // Notice the different syntax. The magic happens in userModel.js
    user.save(function(error, doc) {
        // Send any errors to the browser
        if (error) {
            res.send(error);
        }
        // Otherwise, send the new doc to the browser
        else {
            res.send(doc);
        }
    });
});