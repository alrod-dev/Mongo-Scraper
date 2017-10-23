/* Mongoose Example (Solution) (18.3.03)
 * ===================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require("path");
var request = require("request");

var PORT = 6969;

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


//Routing initiated
require("./routes/html-routing")(app);
require("./routes/api-routing")(app, request);
//require("./controller/articleController")(request);


// requiring the news and notes models
require('./models/Articles');
require('./models/Notes');


// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || PORT, function () {
    console.log("App listening on PORT " + PORT);
});
