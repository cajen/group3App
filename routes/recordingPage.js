var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:name', function(req, res, next) {
  var nm = req.params.name;
  res.render('recordingPage',{
    "instName" : nm
  });
});

module.exports = router;