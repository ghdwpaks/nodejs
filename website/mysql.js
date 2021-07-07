var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ghdwpaks',
  password : 'ghd0327',//1 * 6
  database : 'ghdweb'
});
 
connection.connect();
 
connection.query('SELECT * FROM ideanote', function (error, results, fields) {
  if (error) {
      console.log(error)
  };
  //console.log('The solution is: ', results[0].solution);
  console.log(results)
});
 
connection.end();