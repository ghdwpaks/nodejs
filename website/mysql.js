var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : '111111',//1 * 6
  database : 'opentutorials'
});
 
connection.connect();
 
connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error) {
      console.log(error)
  };
  //console.log('The solution is: ', results[0].solution);
  console.log(results)
});
 
connection.end();