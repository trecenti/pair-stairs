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

app.get('/', function (req, res) {
  return res.render('home');
});

app.get('/stairs/:id', function (req, res) {
  return res.render('pair-stairs');
});

app.post('/stairs/', function (req, res) {
  return res.redirect('/stairs/12319');
});

module.exports = app;
