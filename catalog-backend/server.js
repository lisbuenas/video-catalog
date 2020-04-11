const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

console.log(result.parsed);

const app = express();
app.use(cors());

//let url = "mongodb://mongodb/videodb";
let url = "mongodb://localhost/videodb";
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on("error", console.error.bind(console, "Error MongoDB connection"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const video = require("./routes/videos.route"); // Importa rota
app.use("/videos", video);

const user = require("./routes/users.route"); // Importa rota
app.use("/users", user);

const port1 = process.env.DADO;
console.log(`Your Dado is ${port1}`);

let port = 8000;
app.listen(port, () => {
  const dadoEnv = process.env.SECRETAAA;
  console.log(`Your port is ${dadoEnv}`);
  console.log("Server running " + port);
});
