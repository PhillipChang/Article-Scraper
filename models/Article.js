var mongoose = require("mongoose");

// Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },

    saved: {
        type: Boolean,
        default: false
    }
});

// Creates model in mongoose
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article Model
module.exports = Article;