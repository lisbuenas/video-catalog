var Video = require('../models/videos.model');

exports.index = function (req, res) {

    Video.find(function (err, posts) {
        return res.send({data: posts});
    });
};

exports.show = function (req, res) {
    Video.findById(req.params.id, function (err, video) {
        if (err) return next(err);
                res.send(video);
    });
};

exports.update = async function (req, res) {


    Video.findOneAndUpdate({_id:req.params.id}, req.body, function (err, place) {
        res.send(place);
    });

}

exports.create = function (req, res) {
    let video = new Video(
        {
            Title: req.body.Title,
            Genre: req.body.Genre,
            Released:req.body.Released,
            Actors: req.body.Actors,
            Plot: req.body.Plot,
            Poster: req.body.Poster,
            youtubeTrailer: req.body.youtubeTrailer
        }
    );
    video.save(function (err) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.send('Registo de Vídeo criado com sucesso');
    });
};