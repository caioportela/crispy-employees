'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const PORT = 3000;

// Initialize logger
const logger = require('./src/loaders/logger');

// Initialize responses
const responses = require('./src/loaders/responses');

const app = express();

app.use(responses);
app.use(bodyParser.json());

// Initialize routes
require('./src/routes')(app);

app.listen(PORT, () => {
  logger.info(`Running on http://localhost:${PORT}`);
});
