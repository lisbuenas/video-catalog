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
            title: req.body.title,
            genre: req.body.genre,
            releaseDate:req.body.releaseDate,
            mainActors: req.body.mainActors,
            summarizedPlot: req.body.summarizedPlot,
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