const fs = require('fs');
const csv = require('csvtojson');

const readStream = fs.createReadStream('file.csv', 'utf8');
const writeStream = fs.createWriteStream('text.txt', { flags: 'a' });

readStream.on('data', (partsOfData) => {
  const lines = partsOfData.split('\n');
  console.log(lines, 'these are lines')
  lines.forEach(async line => {
    console.log(line)
    try{
      if(line.trim().length > 0){
      const json = await csv().fromString(partsOfData);
        console.log('bbbb', json)
        writeStream.write(JSON.stringify(json));
       // console.log(JSON.stringify(json))
      }
    } catch (err) {
      console.log(err)
    }
  });
})