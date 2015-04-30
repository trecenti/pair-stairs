var express = require('express')
  , parser = require('body-parser')
  , app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

module.exports = app;
