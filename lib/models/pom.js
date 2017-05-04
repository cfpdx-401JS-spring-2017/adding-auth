const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  weight: {
    type: Number,
    min: 1,
    max: 50
  },
  bestPom: {
    type: Boolean
  }
});

module.exports = mongoose.model('Pom', schema);