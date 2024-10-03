const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpecs } = require('./swagger'); // Swagger-Module importieren

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Swagger nodes
app.use('/api', require('./routes/getQuiz'));

app.use('/api', require('./routes/getScoreboard'));

app.use('/api', require('./routes/setScore'));



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
