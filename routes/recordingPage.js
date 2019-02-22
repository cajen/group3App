var express = require('express');
var router = express.Router();
var data = require('../data.json');

/* GET home page. */
router.get('/:name', function(req, res, next) {
  var nm = req.params.name;
  res.render('recordingPage',{
    "instName" : nm
  });
});

router.addRecording = function(req, res) {
  let recording = {
    'title' : req.query.title,
    'recUrl' : req.query.recURL,
    'date' : req.query.date,
    'length' : req.query.length
  };

  console.log(recording);
  data.recordingsPlaceholder.push(recording);
  res.render('recordings', data);
}
module.exports = router;