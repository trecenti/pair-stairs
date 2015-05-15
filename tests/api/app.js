var agent = require('supertest')
  , mount = require('express')();

var app = mount.use(require('../../api/app'));

describe('post /stairs', function () {
  it('creates a pair stair', function (done) {
    agent(app)
      .post('/stairs')
      .send({ developers: 'John Doe, Harry Potter' })
      .expect(201, done)
  });
});

describe('get /stairs/:id', function () {
  it('returns a previously create stairs', function (done) {
    var stairId;

    agent(app)
      .post('/stairs')
      .send({ developers: 'John Doe, Harry Potter' })
      .end(function (err, res) {
        stairId = JSON.parse(res.text).id;
        agent(app)
          .get('/stairs/' + stairId)
          .expect(function (res) {
            expect(JSON.parse(res.text).pairs).to.have.property('John Doe+Harry Potter').and.deep.equal({ count: 0 });
          }).expect(200, done.bind(err));
      });
  });
});
