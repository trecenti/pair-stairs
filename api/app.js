var express = require('express')
  , parser = require('body-parser')
  , mongoose = require('mongoose')
  , stair = require('./stair')
  , app = express();

var mongoUri = 'mongodb://localhost/test';
mongoose.connect(process.env.MONGOLAB_URI || mongoUri);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/', stair);

module.exports = app;
