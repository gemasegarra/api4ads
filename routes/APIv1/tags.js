const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


let tagsSchema = mongoose.Schema({

  tags: { type: String, enum: ['lifestyle', 'mobile', 'motor', 'work']},

});
let Tags = mongoose.model('Document', tagsSchema);

router.get('/', async (req, res, next) => {
  let result = Tags.schema.path('tags').enumValues
  res.json({tags: result})
})

module.exports = router;