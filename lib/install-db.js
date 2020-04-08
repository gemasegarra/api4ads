const fs = require('fs');

const db = require('./mongooseConnection');
const Ad = require('../models/Ad');

db.once('open', async () => {
  try {
    await initAds();
    db.close();
  } catch (err) {
    console.error('Ops, something went wrong', err);
    process.exit(1);
  }
});

async function initAds() {
  await Ad.deleteMany();
  await Ad.insertMany(JSON.parse(fs.readFileSync('./firstAds.json', 'utf8')).ads)
};