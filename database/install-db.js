const fs = require('fs');

const db = require('../lib/mongooseConnection');
const Ad = require('../models/Ad');
const User = require('../models/User');

async function initAds() {
  await Ad.deleteMany();
  await Ad.insertMany(JSON.parse(fs.readFileSync('./database/firstAds.json', 'utf8')).ads);
}

db.once('open', async () => {
  try {
    await initAds();

    await User.deleteMany({});
    await (new User({
      email: 'user@example.com',
      password: User.hashPassword('1234'),
    })).save();

    db.close();
  } catch (err) {
    console.error('Ops, something went wrong', err);
    process.exit(1);
  }
});
