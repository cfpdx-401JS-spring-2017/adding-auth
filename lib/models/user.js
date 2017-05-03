const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true
    }
    // TODO: flesh out
});

module.exports = mongoose.model('User', schema);