const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  medium: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Artwork', schema);