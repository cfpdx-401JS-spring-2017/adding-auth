const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true
    },
    number: Number,
    hard: Boolean
});

module.exports = mongoose.model('Prop', schema);