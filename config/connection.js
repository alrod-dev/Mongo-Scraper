// require mongoose
var mongoose = require('mongoose');


// Set mongoose to leverage JavaScript ES6 Promises
mongoose.Promise = Promise;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScrapper";

// Database configuration with mongoose
mongoose.connect(MONGODB_URI, {useMongoClient: true});

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
    console.log("Mongoose connection successful.");
});


// export the database, making it available throughout the application
module.exports = db;