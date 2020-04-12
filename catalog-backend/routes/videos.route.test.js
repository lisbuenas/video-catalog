const request = require("supertest");
const app = require("../server");

describe("Videos Endpoints", () => {
  it("Should add a new video", async () => {
    const res = await request(app).post("/videos").send({
      Title: "Title Test",
      Genre: "Genre test",
      Released: "20/20/2000",
      Actors: "Actor test",
      youtubeTrailer: "youtube url",
      Poster: "Image",
      imdbRating: "7.2",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("Should not add a new video (missing required title)", async () => {
    const res = await request(app).post("/videos").send({
      Genre: "Genre test2",
      Released: "20/20/2000",
      Actors: "Actor test",
      youtubeTrailer: "youtube url",
      Poster: "Image",
      imdbRating: "7.2",
    });
    expect(res.statusCode).toEqual(500);
  });

  it("Should list videos", async () => {
    const res = await request(app).get("/videos");
    expect(res.data.lenght).toBeGreaterThan(0);
  });

  it("Should list one single video", async () => {
    const res = await request(app).get("/videos/");
    expect(res.data.lenght).toBeGreaterThan(0);
  });
});
