var agent = require('supertest')
  , mount = require('express')();

var app = mount.use(require('../../web/app'));

describe('get /', function () {
  it('renders the home page', function (done) {
    agent(app)
      .get('/')
      .expect(200)
      .expect(/Create/, done)
  });
});
