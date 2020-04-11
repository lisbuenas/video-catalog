const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let VideoSchema = new Schema(
  {
    Title: { type: String, required: true, max: 100 },
    Genre: { type: String, required: false },
    Released: { type: String, required: false },
    Actors: { type: String, required: false },
    youtubeTrailer: { type: String, required: false },
    Poster: { type: String, required: false },
  },
  { collection: "videos" }
);

module.exports = mongoose.model("Video", VideoSchema);
