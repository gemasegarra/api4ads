const express = require('express');
const router = express.Router();
const Ad = require('../../models/Ad');

router.get('/', async (req, res, next) => {
  let result = Ad.schema.path('tags').caster.validators[0].enumValues;
  const docs = await Ad.list()
  let usedTags = [];
  docs.forEach(item => {
    item.tags.forEach (tag=> {
      if (usedTags.indexOf(tag) === -1){
    usedTags.push(item.tags.toString())
  }});  
})
console.log(usedTags)
res.json({'Allowed tags': result, 'Tags in use:': usedTags})
})

module.exports = router;