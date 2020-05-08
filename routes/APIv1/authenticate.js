const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password: User.hashPassword(password),
  });
  if (!user) {
    const error = new Error('bad credentials');
    error.status = 401;
    next(error);
    return;
  }

  res.send({
    token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET),
  });
});

module.exports = router;
