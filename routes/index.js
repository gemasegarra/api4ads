const express = require('express');

const router = express.Router();
const Ad = require('../models/Ad');

/* GET home page. */
router.get('/', async (req, res) => {
  const { name } = req.query;
  const { price } = req.query;
  const { onSale } = req.query;
  const { tags } = req.query;
  const limit = parseInt(req.query.limit || 100);
  const skip = parseInt(req.query.skip);
  const { sort } = req.query;
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }

  if (price) {
    if (price.indexOf('-') >= 1) {
      const priceGT = price.split('-');
      filter.price = { $gte: priceGT[0] };
    } else if (price.indexOf('-') === 0) {
      const priceGT = price.split('-');
      filter.price = { $lte: priceGT[1] };
    } else {
      filter.price = price;
    }
  }

  if (onSale) {
    filter.onSale = onSale;
  }
  if (tags) {
    filter.tags = tags;
  }
  const docs = await Ad.list(filter, limit, skip, sort);

  res.render('index', {
    title: 'API4ads', docs,
  });
});

/* GET ad detail page */

router.get('/:id', async (req, res, next) => {
  try {
    const ad = await Ad.findOne({ _id: req.params.id });
    if (!ad) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
      return;
    }
    res.render('detail', ad);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
