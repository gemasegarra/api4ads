const mongoose = require('mongoose');
const connection = mongoose.connection;

connection.on('open', () => {
  console.log('Connected to mongoDB! Database:', connection.name);
});

connection.on('error', err => {
  console.error('Error:', err);
  process.exit(1);
});


mongoose.connect('mongodb://localhost/api4ads', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;