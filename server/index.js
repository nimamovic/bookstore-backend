const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../config/swagger.json');
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', [
  require('./routes/auth_routes'),
  require('./routes/book_routes'),
  require('./routes/author_routes')
]);

module.exports = app;