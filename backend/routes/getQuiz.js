const express = require('express');
const router = express.Router();


const countries = require('../../laender.json');

const {getRandomElements} = require('../modules/flagSelection');

/**
 * @swagger
 * /api/quiz:
 *   get:
 *     summary: Liefert eine zufällige Flagge und 4 Antwortmöglichkeiten
 *     description: Dieser Endpunkt gibt eine zufällige Flagge zurück, zusammen mit vier Antwortmöglichkeiten, von denen eine richtig ist.
 *     responses:
 *       200:
 *         description: Erfolgreiche Antwort mit den Quiz-Daten
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 flag:
 *                   type: string
 *                   description: URL der Flagge
 *                 options:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Eine Liste mit Antwortmöglichkeiten
 *                 correctAnswer:
 *                   type: string
 *                   description: Der korrekte Ländename
 */
router.get('/quiz', (req, res) => {

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



module.exports = router;