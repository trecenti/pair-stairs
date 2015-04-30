var express = require('express')
  , path = require('path')
  , parser = require('body-parser')
  , request = require('request')
  , app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../bower_components')));

module.exports = app;
