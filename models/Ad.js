const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
  name: {  
    type: String, 
    required: [true, 'Ads must have a name'],
    unique: true,
    maxlength: [50, 'Ad names must have less than 50 characters']},

  onSale: {
    type: Boolean,
    required: [true, 'You must specify whether you are looking to sell or looking to buy']
  },
  price: {
    type: Number,
    required: [true, 'Ads must have a price']
  },
  photo: String,
  tags: {
    type: [String],
    enum: ['lifestyle', 'mobile', 'motor', 'work']
  },
  description: {
    type: String,
    maxlength: [100, 'Ad descriptions must have less than 100 characters']
  } 
});

adSchema.statics.list = function(filter, limit, skip, sort, fields) {
  const query = Ad.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(fields);
  return query.exec();
};



const Ad = mongoose.model('Ad',adSchema);

module.exports = Ad;
