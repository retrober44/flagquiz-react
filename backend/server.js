const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const quizRoutes = require('./routes/quiz');
app.use('/api/quiz', quizRoutes);

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
