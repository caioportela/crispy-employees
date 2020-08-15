'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

// Initialize routes
require('./src/routes')(app);

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
