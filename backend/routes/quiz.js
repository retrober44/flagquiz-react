const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ question: 'Was ist die Hauptstadt von Hessen', answer: 'Wiesbaden' });
});

module.exports = router;
