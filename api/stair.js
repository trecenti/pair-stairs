var router = require('express').Router()
  , Stair = require('./model/stair')
  ;

var stairs = {};

function withStair(req, res, next) {
  //stair = stairs[req.params.id];
  Stair.findOne({ _id: req.params.id }, function (err, stair) {
    if (err) { return res.status(404).send(); }

    req.stair = stair;
    return next();
  });
}

function withPair(req, res, next) {
  var pair;
  pair = req.stair.pairs[req.params.pair];

  if (pair === undefined) {
    return res.status(404).send();
  } else {
    req.pair = pair;
    return next();
  }
}

function parsePeople(developers) {
  var lowerCase = '[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž0-9]'
  var upperCase = '[A-ZÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9]'
  var regex = new RegExp(upperCase + lowerCase + '+|' + upperCase, 'g');

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function removeExtraSpacesAndFixCapitalLetters(string) {
    string = string.toLowerCase();
    return string.split(' ').map(capitalize).join('').trim().match(regex).join(' ')
  }

  function unique(value, index, array) {
    return array.indexOf(value) === index;
  }

  function removeLeadingTrailingCommas(string) {
    return string.replace(/,+$/, '').replace(/^,+/, '');
  }

  if (!developers) {
    return [];
  }

  return removeLeadingTrailingCommas(developers)
    .split(',')
    .map(removeExtraSpacesAndFixCapitalLetters)
    .filter(unique);
}

router.post('/stairs', function (req, res) {
  var people, pairs, stair, allPairs, id;

  people = parsePeople(req.body.developers);

  if (people.length < 2) {
    return res.status(422).send('Can only create a stair with more than 1 person');
  }

  if (people.length > 16) {
    return res.status(422).send('Can only create a stair with less than or equal 16 people');
  }

  stair = new Stair(Stair.parse(people));
  stair.save(function (err) {
    if (err) { throw Error(err); }

    return res.status(201).json(stair);
  });
});

router.get('/stairs/:id', withStair, function (req, res) {
  return res.status(200).json(req.stair);
});

router.post('/stairs/:id/:pair/increment', withStair, withPair, function (req, res) {
  req.pair.count += 1;
  Stair.findByIdAndUpdate(req.stair.id, req.stair, function (err) {
    if (err) { throw Error(err); }
    return res.status(200).json(req.stair);
  });
});

router.post('/stairs/:id/:pair/decrement', withStair, withPair, function (req, res) {
  req.pair.count = Math.max(req.pair.count - 1, 0);
  Stair.findByIdAndUpdate(req.stair.id, req.stair, function (err) {
    if (err) { throw Error(err); }
    return res.status(200).json(req.stair);
  });
});

module.exports = router;
