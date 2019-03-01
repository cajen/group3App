var express = require('express');
var router = express.Router();
var data = require('../data.json');

router.get('/:id', function(req, res) {
	var testVar = req.params.id;
	console.log(testVar);
	var recIndex = data.recordingsPlaceholder.findIndex( item => {
		return item.id === testVar;
	});
	console.log(recIndex);
	data.recordingsPlaceholder.splice(recIndex,1);
	res.render('recordings', data);
});

module.exports = router;