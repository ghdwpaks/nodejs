/*
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
*/






var downloader = require("./test_2downloader.js");



var express = require('express');
var router = express.Router();
//console.log("main.js router :",router)
var { response } = require('express');
var app = express()
app.use(express.urlencoded({extended:true}));

var multer_module = require('multer');
var _storage = multer_module.diskStorage({
  destination : function(request,file,cb){9
    cb(null,'files');
  },
  filename : function(request,file,cb) {
    cb(null,(String(file.originalname).split(".")[0])+String(Date.now()).slice(-6)+"."+String(file.originalname).split(".")[1])
  }
})
var upload_module = multer_module({storage:_storage})
app.use(express.static('files'));

var session = require('express-session');
const { request } = require("http");
const multer = require("multer");

app.use(session({
  //HttpOnly : true,
  secret: "ghdwpaks",
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:24 * 60 * 60 * 1000}
}));

app.get('/',function(request,response) {
  console.log("/ 에 진입했습니다.")
});

app.get("/ghd",function(req,res,next){
  res.download("./","pic1.png")
})

app.get('/download', function(req, res){
  const file = `./pic1.png`;
  res.download(file); // Set disposition and send it.
});



app.listen(3000, function() {
  console.log("진입에 성공했습니다.")
})

