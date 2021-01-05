const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    thumbnail: String,
});

const data = mongoose.model('data', userSchema);

module.exports = data;