const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

function getRandomElements(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const countries = require('./../laender.json');

app.get('/api/quiz', (req, res) => {

  const countryCodes = Object.keys(countries);

  const correctCountryCode = countryCodes[Math.floor(Math.random()*countryCodes.length)];
  const correctCountryName = countries[correctCountryCode]

  const otherCountyCodes = countryCodes.filter(code => code !== correctCountryCode);
  const wrongCountryNames = getRandomElements(otherCountyCodes, 3).map(code => countries[code]);

  const options = [...wrongCountryNames, correctCountryName].sort(() => 0.5 - Math.random());
  
  const response = {
    flag: `/flags/${correctCountryCode.toLowerCase()}.png`,
    options: options,   
    correctAnswer: correctCountryName, 
  }

  res.json(response)
});

app.use('/flags', express.static('flags'));

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
