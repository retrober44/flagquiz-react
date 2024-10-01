const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ question: 'What is the capital of France?', answer: 'Paris' });
});

module.exports = router;
