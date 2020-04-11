const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

let url = 'mongodb://localhost:27017/videodb';
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB,{useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error MongoDB connection'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const video = require('./routes/videos.route'); // Importa rota
app.use('/videos', video);


let port = 8000;
app.listen(port, () => {
    console.log('Server running ' + port);
});