var data = require('../data.json');

exports.deleteRec = function(req, res) {
	var testVar = req.query.id;
	var recIndex = data.recordingsPlaceholder.findIndex(function(item,i) {
		return item.id === testVar;
	});
	console.log(recIndex);
	data.recordingsPlaceholder.splice(recIndex,1);
	res.render('recordings', data);
}