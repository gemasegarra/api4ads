const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Users must have an email'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

User.hashPassword = (password) =>
  crypto.createHash('sha256').update(password).digest().toString('base64');

module.exports = User;
