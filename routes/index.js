const express = require('express');
const i18n = require('i18n');
const path = require('path');

const router = express.Router();
const Ad = require('../models/Ad');

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  autoReload: true,
  syncFiles: true,
  cookie: 'locale',
});
router.use(i18n.init);

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
    const range = price.split('-');
    if (range.length === 2) {
      const [fromPrice, toPrice] = range;
      filter.price = {};
      if (fromPrice) {
        filter.price.$gte = fromPrice;
      }
      if (toPrice) {
        filter.price.$lte = toPrice;
      }
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
