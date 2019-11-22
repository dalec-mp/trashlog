var express = require('express');
var router = express.Router();
const fastcsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream("out.csv");

/* GET users listing. */
router.get('/', function(req, res, next) {
  data = {
  	"name": "test"
  }
  res.send(data);
});

router.post('/',function(req, res, next) {
  console.log(req.body);
  appendToFile(req.body.data);
  res.send('list of logs');
});


var appendToFile = function(data) {
	values = Object.values(data).join(",");
	
	fs.appendFile('data.csv', "\n"+values, function (err) {
	  if (err) throw err;
	  console.log('Saved!');
	});
}

module.exports = router;