var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ghdwpaks',
  password : 'ghd0327',//1 * 6
  database : 'ghdweb',
  multipleStatements : true
});

var fs = require("fs");

var express = require('express');

var app = express()
app.use(express.urlencoded({extended:true}));

app.get('/',function(request,response) {
    
    console.log("진입 성공")
    
    connection.query(`SELECT * FROM filetable;SELECT * FROM users;`,function(error,data){
        if(error) {
          console.log("오류 발생")
          console.log("error :",error)
        }
        console.log("data :",data)
        var prints = "Hello world!"
        var html = `${data}`
        response.writeHead(200);
        response.end(html)
    });
});

app.get("/d/:dtn",function(request,response){
  //filetarget1251145.png
  var dtn = request.params["dtn"];//download target name
  var dtt = request.params["dtn"].split(".")[1];//download traget type
  console.log("dtt :",dtt)
  console.log("dtn :",dtn)
  var html = `${dtn}`;
  var downloadfolderpath = `../files/`;
  var downloadfilefullpath = downloadfolderpath+dtn;
  
  
  console.log("dtn :",dtn)
  console.log("dtt :",dtt)
  console.log("downloadfilefullpath :",downloadfilefullpath)

  response.setHeader('Content-disposition','attachment; filename='+dtn);
  response.setHeader('Content-type',dtt)
  var filestream = fs.createReadStream(downloadfilefullpath);
  filestream.pipe(response);


  response.writeHead(200);
  response.end(html)
})

app.listen(5151, function() {
console.log("진입에 성공했습니다.")
})