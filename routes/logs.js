var express = require('express');
var router = express.Router();
// const fastcsv = require('fast-csv');
// const fs = require('fs');
// const ws = fs.createWriteStream("out.csv");

/* GET users listing. */
router.get('/', function(req, res, next) {
  data = {
	"name": "test"
  }
  res.send(data);
});

router.post('/',function(req, res, next) {
  console.log(req.body);
  appendToDB(req.body.data);
  res.send('lol');
});


var mysql = require('mysql');
var con = mysql.createConnection({
  host: "trashtalk-2.cfidporowotn.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "related1",
  database: "trashtalk"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


var appendToDB = function(data) {
	console.log(data)
	values = "" + data['bin_id'] + ',' + data['contamination_flag'] + "," + "'" + data['reasons'] + "'," + data['weights']
	var sql = "INSERT INTO Collection2 (DustbinID, ContaminationFlag, ContaminationReason, Weight) VALUES (" + values +")";
	console.log(sql);
	con.query(sql, function (err, result) {

		if (err) {
			console.log(err);
		} else {
			console.log("1 record inserted");
		}
	});
}

// var appendToFile = function(data) {
// 	values = Object.values(data).join(",");
	
// 	fs.appendFile('data.csv', "\n"+values, function (err) {
// 	  if (err) throw err;
// 	  console.log('Saved!');
// 	});
// }

module.exports = router;