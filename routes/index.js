var express = require('express');
var router = express.Router();
var data = require('../data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', data);
});

router.post('/:name', function(req, res, next) {
  var nm = req.params.name;
  res.json(data);
});

router.addUser = function(req, res) {
  let user = {'name': req.query.name, 'imageURL': req.query.picURL};
  console.log(user);
  data.user.push(user);
  res.render('instruments', data);
}
module.exports = router;
