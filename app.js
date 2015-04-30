//for local env
if (!process.env.API_ENDPOINT) {
  process.env.API_ENDPOINT = 'http://localhost:3000/api'
}

var express = require('express')
  , logger = require('morgan')
  , app = express()
  , api = require('./api/app')
  , web = require('./web/app');

app.use(logger('dev'));

app.use('/api', api);
app.use('/', web);

// 404
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handling
app.use(function(err, req, res, next) {
  var message = err.message;

  if (app.get('env') === 'development') {
    message += '. ' + err.stack;
  }
  res.status(err.status || 500);
  res.send(message);
});

module.exports = app;
