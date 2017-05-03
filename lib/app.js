const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');
const ensureAuth = require('./auth/ensure-auth')();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));

const auth = require('./routes/auth');
const poms = require('./routes/poms');

app.use('/api/auth', auth);
app.use('/api/poms', ensureAuth, poms);

app.use(errorHandler());

module.exports = app;