var express = require('express');
var router = express.Router();
const Ad = require('../models/Ad');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const name = req.query.name;
    const price = req.query.price;
    const onSale = req.query.onSale; 
    const tags = req.query.tags;
    const limit = parseInt(req.query.limit || 100);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    const filter = {};
    if (name) {
      filter.name =  { $regex: name, $options: 'i' };
    }
    if (price) {
      filter.price = price;
    }
  
    if (onSale) {
      filter.onSale = onSale;
    }
    if (tags) {
      filter.tags = tags;
    }
  const docs = await Ad.list(filter, limit, skip, sort);

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
