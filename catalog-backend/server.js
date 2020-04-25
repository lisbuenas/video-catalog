const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let url = "mongodb://mongodb/videodb"; //
//let url = "mongodb://localhost/videodb";
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on("error", console.error.bind(console, "Error MongoDB connection"));

const video = require("./routes/videos.route"); // Importa rota
app.use("/api/videos", video);

const user = require("./routes/users.route"); // Importa rota
app.use("/api/users", user);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.log("Server running " + process.env.PORT);
  });
}

module.exports = app;
