const request = require("supertest");
const app = require("../server");

const jwt = require("jsonwebtoken");

// Login to get auth

const envSecret =
  "MIIBOAIBAAJAUw453gGcKgc5d//PVe9eyJ9BKT2Mpu9NqLGDYSG0ZexnV0mvI2Bn";
const token = jwt.sign({ id: "5e928b6423014c35489a78bb" }, envSecret, {
  expiresIn: "1000h",
});

describe("Videos Endpoints", () => {
  it("Should add a new video", function (done) {
    request(app)
      .post("/videos")
      .set("Authorization", "bearer " + token)
      .send({
        Title: "Title Test",
        Genre: "Genre test",
        Released: "20/20/2000",
        Actors: "Actor test",
        youtubeTrailer: "youtube url",
        Poster: "Image",
        imdbRating: "7.2",
      })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
