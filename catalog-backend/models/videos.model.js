const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VideoSchema = new Schema({
    Title: {type: String, required: true, max: 100},
    Genre: {type: String, required: true},
    Released: {type: String, required: true},
    Actors: {type: String, required: true},
    youtubeTrailer: {type: String, required: false},
    Poster: {type: String, required: false}
});

module.exports = mongoose.model('Videos', VideoSchema);