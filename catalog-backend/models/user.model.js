const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Userchema = new Schema({
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true},
});

module.exports = mongoose.model('Videos', Userchema);