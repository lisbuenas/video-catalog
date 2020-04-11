const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VideoSchema = new Schema({
    title: {type: String, required: true, max: 100},
    genre: {type: String, required: true},
    releaseDate: {type: String, required: true},
    mainActors: {type: String, required: true},
    youtubeTrailer: {type: String, required: false},
});

module.exports = mongoose.model('Videos', VideoSchema);