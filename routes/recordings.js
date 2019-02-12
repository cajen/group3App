var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('recordings', {
    'recordingsPlaceholder': [
      { 'title': 'Drum',
        'date': '1/25/19',
        'length': '1:05',
        'id': 'mR1'
      },
      { 'title': 'Drum 2',
        'date': '1/25/19',
        'length': '1:11',
        'id': 'mR2'
      },
      { 'title': 'Triangle',
        'date': '1/30/19',
        'length': '1:01',
        'id': 'mR3'
      },
      { 'title': 'Maraca',
        'date': '2/2/19',
        'length': '2:54',
        'id': 'mR4'
      },
      { 'title': 'Maraca Solo',
        'date': '2/10/19',
        'length': '1:20',
        'id': 'mR5'
      },
      { 'title': 'Drum 3',
        'date': '1/25/19',
        'length': '1:05',
        'id': 'mR6'
      },
      { 'title': 'Drum Solo',
        'date': '2/11/19',
        'length': '2:10',
        'id': 'mR7'
      },
      { 'title': 'Maraca 2',
        'date': '2/11/19',
        'length': '0:47',
        'id': 'mR8'
      },
      { 'title': 'Tambourine',
        'date': '2/11/19',
        'length': '0:31',
        'id': 'mR cl9'
      }
    ]  
  });
});

module.exports = router;