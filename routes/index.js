var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'msin636',
  password:'msin636db',
  database:'msin636projects',
  port:3306
});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM projects', function(err, rows, fields){
      if(err) throw err
      res.render('index', { rows:rows });

  });
});

module.exports = router;
