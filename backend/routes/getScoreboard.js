const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const scoreboardFile = path.join(__dirname, '../scoreboard.csv');

/**
 * @swagger
 * /api/scoreboard:
 *   get:
 *     summary: Gibt das aktuelle Scoreboard zurück
 *     responses:
 *       200:
 *         description: Erfolgreiche Antwort mit dem Scoreboard
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Der Name des Spielers
 *                   score:
 *                     type: integer
 *                     description: Die erzielte Punktzahl
 *       500:
 *         description: Fehler beim Lesen der Scoreboard-Datei
 */
router.get('/scoreboard', (req, res) => {
  fs.readFile(scoreboardFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading scoreboard file' });
    }

    const lines = data.trim().split('\n');

    const scoreboard = lines.slice(1).map(line => {
      const [name, score] = line.split(',');
      return { name, score: Number(score) };
    });

    res.json(scoreboard);
  });
});


module.exports = router;