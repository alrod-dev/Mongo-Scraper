/* Mongoose Example (Solution) (18.3.03)
 * ===================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");


var PORT = 6969;

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Configure app with morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set Handlebars.
var exphbs = require("express-handlebars");

// Static file support with public folder
app.use(express.static(path.join(__dirname, 'public')));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// Database configuration for mongoose
// db: week18day3mongoose
mongoose.connect("mongodb://localhost/week18day3mongoose");

// Hook mongoose connection to db
var db = mongoose.connection;

// Log any mongoose errors
db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

// Log a success message when we connect to our mongoDB collection with no issues
db.once("open", function () {
    console.log("Mongoose connection successful.");
});

//Routing initiated
require("./routes/api-routing")(app);
require("./routes/html-routing")(app);


// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || PORT, function () {
    console.log("App listening on PORT " + PORT);
});
