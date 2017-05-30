/* eslint no-console: "off" */
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/artwork';

mongoose.connect(dbUri);

mongoose.connection.on('connected', () => {
  console.log(`mongoose default connection open to ${dbUri}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose default connection closed');
});

mongoose.connection.on('error', err => {
  console.log(`mongoose default connection error ${err}`);
});

mongoose.connection.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('mongoose default connection closed due to app termination');
    process.exit(0);
  });
});