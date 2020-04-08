const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');

// GET /apiv1/ads
// Returns list of ads

router.get('/', async (req, res, next) => {
  try {
    const docs = await Ad.find()
    res.json(docs);
  } catch(err) {
    next(err)
  }
});


// GET /apiv1/ads/:id
// Returns ad with specific id

router.get('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const ad = await Ad.findOne({_id });
    if(!ad) {
      const err = new Error ('Not found');
      err.status = 404;
      next(err);
      return
    }
    res.json({result : ad});
  } catch(err) {
    next(err);
  }
});

// POST /apiv1/ads
// Creates new ad

router.post('/', async (req, res, next) => {
  try {
 const adData = req.body;
 const ad = new Ad(adData);
 const savedAd = await ad.save();
 res.status(201).json( {result: savedAd})
} catch(err){
  next(err)
}
})

// DELETE /apiv1/ads/:id
// Removes an ad
/* router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Ad.deleteOne({ _id });
    res.json();
  } catch(err) {
    next(err);
  }
}) */


module.exports = router;