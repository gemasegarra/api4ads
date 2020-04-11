const express = require('express');
const router = express.Router();
const Ad = require('../../models/Ad');

router.get('/', async (req, res) => {
  const result = Ad.schema.path('tags').caster.validators[0].enumValues;
  const docs = await Ad.list();
  const usedTags = [];
  docs.forEach((item) => {
    item.tags.forEach((tag) => {
      if (!usedTags.includes(tag)) {
        usedTags.push(tag);
      }
    });
  });
  res.json({ 'Allowed tags': result, 'Tags in use:': usedTags });
});

module.exports = router;