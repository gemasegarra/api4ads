const cote = require('cote');
const jimp = require('jimp');
const path = require('path');

const subscriber = new cote.Subscriber({ name: 'adsThumbnails' });

subscriber.on('adPhoto', async ({ path: imagePath }) => {
  const image = await jimp.read(imagePath);
  await image.resize(100, jimp.AUTO);
  await image.writeAsync(path.join(
    path.dirname(imagePath),
    `thumbnail_100_${path.basename(imagePath)}`,
  ));
});
