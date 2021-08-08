const fs = require('fs');

const path = 'db/data.json';

const saveData = (data) => {
  fs.writeFileSync(path, JSON.stringify(data)) ;
}

const readDB = (data) => {
  if(fs.existsSync(path)) {
    const info = fs.readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(info);
  }
  return null;
}

module.exports = {
  saveData,
  readDB
};