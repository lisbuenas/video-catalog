const Video = require("../models/videos.model");

exports.index = function (req, res) {
  let search = req.query.search;
  if (search) {
    Video.find({ Title: { $regex: search, $options: "i" } }, function (
      err,
      posts
    ) {
      return res.send({ data: posts });
    });
  } else
    Video.find(function (err, posts) {
      return res.send({ data: posts });
    });
};

exports.show = function (req, res) {
  Video.findById(req.params.id, function (err, video) {
    if (err) return res.status(500).send(err);
    res.send(video);
  });
};

exports.update = async function (req, res) {
  Video.findOneAndUpdate({ _id: req.params.id }, req.body, function (
    err,
    result
  ) {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
};

exports.create = function (req, res) {
  let video = new Video({
    Title: req.body.Title,
    Genre: req.body.Genre,
    Released: req.body.Released,
    Actors: req.body.Actors,
    Plot: req.body.Plot,
    Poster: req.body.Poster,
    youtubeTrailer: req.body.youtubeTrailer,
    imdbRating: req.body.imdbRating,
  });
  video.save(function (err) {
    if (err) {
      if (err) return res.status(500).send(err);
    }
    res.send("Record created");
  });
};

exports.delete = function (req, res) {
  Video.deleteOne({ _id: req.params.id }, function (err, result) {
    if (err) return res.status(500).send(err);
    return res.send(result);
  });
};
