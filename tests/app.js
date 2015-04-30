var agent = require('supertest')
  , mount = require('express')();

var app = mount.use(require('../app'));

describe('root app', function () {
  describe('error handling', function (done) {
    it('handles 404', function () {
      agent(app)
        .get('/not-defined')
        .expect(404)
        .expect('Not Found', done);
    });
  });
});
