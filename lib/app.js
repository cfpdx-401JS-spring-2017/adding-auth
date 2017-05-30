const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handlers/error-handler');
const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan('dev'));
app.use(bodyParser.json());

const auth = require('./routes/auth');
const artworks = require('./routes/artworks');

app.use('/auth', auth);
app.use('/artworks', ensureAuth, artworks);

app.use(errorHandler());

module.exports = app;