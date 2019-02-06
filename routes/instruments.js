var express = require('express');
var router = express.Router();

/* GET instruments page. */
router.get('/', function(req, res, next) {
  res.render('instruments', { title: 'Express' });
});

module.exports = router;
