const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan('dev'));
app.use(bodyParser.json());

const props = require('./routes/props');
const auth = require('./routes/auth');

app.use('/props', ensureAuth, props);
app.use('/auth', auth);

module.exports = app;