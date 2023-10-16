const fs = require('fs');
const csv = require('csvtojson');

const readStream = fs.createReadStream('file.csv', 'utf8');
const writeStream = fs.createWriteStream('text.txt', { flags: 'a' });
let allData = '';
let result = [];

readStream.on('data', async (partsOfData) => {
  allData += partsOfData;
  try {
    const jsonArray = await csv().fromString(allData);
    for (const item of jsonArray) {
      result.push(item);
    }
    writeStream.write(JSON.stringify(result));
    allData = '';
  } catch (err) {
    console.log('error', err);
  }
});
/* readStream.on('data', (partsOfData) => {
  const lines = partsOfData.split('\n');
  console.log(lines, 'these are lines')
  lines.forEach(async line => {
    console.log(line)
    try{
      if(line.trim().length > 0){
      const json = await csv().fromString(partsOfData);
        console.log('bbbb', json)
        json.forEach((js) => {
          writeStream.write(JSON.stringify(js) + '\n');
        });
      }
       // console.log(JSON.stringify(json))
      }
     catch (err) {
      console.log(err)
    }
  });
}) */
