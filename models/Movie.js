var mongoose = require ("mongoose");

// Schema constructor
var Schema = mongoose.Schema;

var MovieSchema = new Schema({

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
    }
});

// Creates model in mongoose
var Movie = mongoose.model("Movie", MovieSchema);

// Export the Movie Model
module.exports = Movie;