var agent = require('supertest')
  , mount = require('express')();

var app = mount.use(require('../../web/app'));

describe('get /', function () {
  it('renders the home page', function (done) {
    agent(app)
      .get('/')
      .expect(200)
      .expect(/Create/, done);
  });
});

describe('get /stairs/12334', function () {
  it('renders the pair stairs page for that id', function (done) {
    agent(app)
      .get('/stairs/12334')
      .expect(200)
      .expect(/Pair Stairs/)
      .end(done);
  });
});
