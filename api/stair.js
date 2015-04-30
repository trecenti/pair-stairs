var router = require('express').Router();

var stairs = {};

function extractPairs(arr) {
  var res = [], l = arr.length;

  for(var i=0; i<l; ++i) {
    for(var j=i+1; j<l; ++j) {
      res.push(arr[i] + '+' + arr[j]);
    }
  }
  return res;
}

router.post('/stairs', function (req, res) {
  var people, pairs, stair;

  pairs = {};
  people = req.body.developers.replace(/, /g, ',').split(',');

  allPairs = extractPairs(people);
  allPairs.forEach(function (pair) {
    pairs[pair] = 0;
  });

  stair = { id: 1, pairs: pairs };
  stairs[1] = stair;

  return res.status(201).send(stair);
});

router.get('/stairs/:id', function (req, res) {
  var stair = stairs[req.params.id];
  return res.status(200).json(stair);
});

module.exports = router;
