const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
  name: String,
  type: Boolean,
  price: Number,
  photo: String,
  tags: [String],
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
