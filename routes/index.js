var express = require('express');
var router = express.Router();
const Ad = require('../models/Ad');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const docs = await Ad.list();

  res.render('index', {
    title: 'API4ads', docs: docs
  });
})

/* GET ad detail page */

router.get('/:id', async function (req, res, next) {
  try {
  const ad = await Ad.findOne({ _id: req.params.id });
  if(!ad) {
    const err = new Error ('Not found');
    err.status = 404;
    next(err);
    return
  }
  res.render('detail', ad);
}
catch(err) {
  next(err);
}
});

module.exports = router;
