
var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'ghdwpaks',
    password : 'ghd0327',//1 * 6
    database : 'ghdweb',
    multipleStatements : true
  });
db.connect();
module.exports = db;

/*
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'ghdwpaks',
  password : 'ghd0327',//1 * 6
  database : 'ghdweb',
  multipleStatements : true
});
db.connect();
*/