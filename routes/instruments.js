var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://cajen:TMbqdz5eMpLshdV@ds123635.mlab.com:23635/gp3db';
var data = require('../data.json');

/* GET instruments page. */
// router.get('/', function(req, res, next) {
//   MongoClient.connect(url,{ useNewUrlParser: true },function(err, client){
//     if(err){
//         console.log(err);
//         res.render('instruments');
//     }
//     else {
//         var db = client.db('gp3db');
//           db.collection('inventory').find().toArray(function (err, result) {
//             let dbDocuments = result;
//             console.log(dbDocuments[0]);
//             res.render('instruments', dbDocuments[0]);
//           });
//         console.log('connected to '+ url);
//         client.close();
//     }
//   });

//   // res.render('instruments');
// });

router.get('/', function(req, res, next) {
  res.render('instruments', data);
});

module.exports = router;
