var mongoose = require("mongoose");

// Reference to mongoose schema 
var Schema = mongoose.Schema;

// Model
var NoteSchema = new Schema({

    title: {
        type: String,
    },

    body: {
        type: String,
    }
});

// Create Model into Mongoose Model
var Note = mongoose.model("Note", NoteSchema);

// Export the Note Model
module.exports = Note;