// require mongoose and the database connection
const mongoose = require("mongoose");
// Create Schema class
const Schema = mongoose.Schema;

// Create article schema
const ArticleSchema = new Schema({
    // title is a required string
    title: {
        type: String,
        required: true
    },
    // // // link is a required string
    link: {
        type: String,
        required: true
    },
    //  image is a required string
    image: {
        type: String,
        required: true
    },
    //  content is a required string
    text: {
        type: String,
        required: true
    },
    genre:  {
        type: String,
        require: true
    },

    // This only saves one note's ObjectId, ref refers to the Note model
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;