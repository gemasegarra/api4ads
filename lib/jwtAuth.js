const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('Authorization') || req.query.token;

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    next();
  } catch (e) {
    const error = new Error('invalid token');
    error.status = 401;
    next(error);
  }
};
