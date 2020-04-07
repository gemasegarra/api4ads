const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
  title: String,
  type: Boolean,
  price: Number,
  photo: String,
  tags: [String],
});


const Ad = mongoose.model('Ad',adSchema);

module.exports = Ad;
