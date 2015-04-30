var express = require('express')
  , parser = require('body-parser')
  , stair = require('./stair')
  , app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/', stair);

module.exports = app;
