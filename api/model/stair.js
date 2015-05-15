var chance = require('chance').Chance()
  , mongoose = require('mongoose')
  ;

var schema, Stair;

function extractPairs(array) {
  var res, length, i, j;
  res = {};
  length = array.length;

  for(i = 0; i < length; ++i) {
    for(j = i + 1; j < length; ++j) {
      res[array[i] + '+' + array[j]] = { count: 0 };
    }
  }

  return res;
}

function extractDevelopers(people) {
  function withDifferentName(personA) {
    return function (personB) { return personA != personB; }
  }

  function withOthersArray (person) {
    people = people.slice(people.indexOf(person));
    return {
      name: person,
      others: people.filter(withDifferentName(person)).reverse()
    };
  }
  return people.map(withOthersArray).reverse();
}

function parse(people) {
  var self = {};

  self.id = chance.string({ length: 8, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' });
  self._id = self.id;
  self.pairs = extractPairs(people);
  self.developers = extractDevelopers(people);

  return self;
};


schema = new mongoose.Schema({ _id: String, pairs: Object, developers: Object });
schema.set('toJSON', { virtuals: true });
schema.virtual('id').get(function () { return this._id; });
schema.statics.parse = parse;
Stair =  mongoose.model('Stair', schema);

module.exports = Stair;
