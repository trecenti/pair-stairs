var chai = require('chai');

global.expect = chai.expect;

//Testing API endpoints
process.env.API_ENDPOINT = 'http://localhost:3000/api'