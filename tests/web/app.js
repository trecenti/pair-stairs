var agent = require('supertest')
  , nock = require('nock')
  , mount = require('express')();

var app = mount.use(require('../../web/app'));
