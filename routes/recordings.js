var express = require('express');
var router = express.Router();
var data = require('../data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(data);
  res.render('recordings', data);
});

module.exports = router;