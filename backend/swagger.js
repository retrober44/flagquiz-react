const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger-Konfigurationsoptionen
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // OpenAPI-Spezifikation Version
    info: {
      title: 'Quiz API',
      version: '1.0.0',
      description: 'API für das Quiz-Spiel',
    },
    servers: [
      {
        url: 'http://localhost:5000', // URL deines Servers
      },
    ],
  },
  apis: ['./routes/*.js'],// Pfad zu den API-Dokumentationsdateien (hier wird es aus server.js genommen)
};

// Swagger-Dokumentation generieren
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpecs };
