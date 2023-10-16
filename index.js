const fs = require('fs');
const csv = require('csvtojson');

const readStream = fs.createReadStream('file.csv', 'utf8');
const writeStream = fs.createWriteStream('text.txt', { flags: 'a' });

readStream.on('data', (partsOfData) => {
  const lines = partsOfData.split('\n');
  lines.forEach(async line => {
    try{
      if(line.length>0){
        const json = await csv().fromString(line);
        console.log(json)
        writeStream.write(JSON.stringify(json));
        console.log(JSON.stringify(json))
      }
    } catch (err) {
      console.log(err)
    }
  });
})