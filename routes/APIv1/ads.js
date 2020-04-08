const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');

router.get('/', async (req, res, next) => {
  try {
    const docs = await Ad.find()
    res.json(docs);
  } catch(err) {
    next(err)
  }
});

module.exports = router;