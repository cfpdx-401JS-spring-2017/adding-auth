const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ensureAuth = require('./auth/ensure-auth')();
const errorHandler = require('./error-handlers/error-handler');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const props = require('./routes/props');
const auth = require('./routes/auth');

app.use('/props', ensureAuth, props);
app.use('/auth', auth);

app.use(errorHandler());

module.exports = app;