const path = require('path');
const fs = require('fs');

function appendToCSV(name, score) {
    const filePath = path.join(__dirname, './../scoreboard.csv');
  
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, 'Name,Score\n', 'utf8');
    }
    const data = `${name},${score}\n`;
    fs.appendFileSync(filePath, data, 'utf8');
  }
  
  module.exports = { appendToCSV };