const express = require('express');
const router = express.Router();

const {appendToCSV} = require('./../modules/csvWriter');
 
/**
 * @swagger
 * /api/score:
 *   post:
 *     summary: Empfängt die Scorepunkte eines Nutzers
 *     description: Dieser Endpunkt empfängt den Namen und die Scorepunkte eines Nutzers und speichert diese in eine CSV-Datei.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Der Name des Nutzers
 *                 example: Max Mustermann
 *               score:
 *                 type: number
 *                 description: Die Scorepunkte des Nutzers
 *                 example: 85
 *     responses:
 *       200:
 *         description: Score erfolgreich gespeichert
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Score saved successfully
 *       400:
 *         description: Ungültige Daten
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid data
 */
router.post('/score', (req, res) => {
  const { name, score } = req.body;

  if (!name || typeof score !== 'number'){
    return res.status(400).json({message: 'Invalid data'});
  }

  appendToCSV(name,score);

  res.json({message:'Score saved successfully'});
});

module.exports = router;