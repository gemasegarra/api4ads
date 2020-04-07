const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');

router.get('/', (req, res, next) => {
  Ad.find().exec((err, docs) => {
    res.json(docs)
  })
});

module.exports = router;