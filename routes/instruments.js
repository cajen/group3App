var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://cajen:TMbqdz5eMpLshdV@ds123635.mlab.com:23635/gp3db';

MongoClient.connect(url,{ useNewUrlParser: true },function(err, client){
  if(err){
      console.log(err);
  }
  else {
      var db = client.db('gp3db');
      console.log('connected to '+ url);
      client.close();
  }
})

/* GET instruments page. */
router.get('/', function(req, res, next) {
  res.render('instruments');
});

module.exports = router;
