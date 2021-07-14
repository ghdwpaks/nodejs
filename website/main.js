
var ideanote = require("./lib/ideanote.js");
var mainpage = require("./lib/mainpage.js");
var user = require("./lib/user.js");
var login = require("./lib/login.js");
var logout = require("./lib/logout.js");
var filecontrol = require("./lib/filecontrol.js");



var express = require('express');
var router = express.Router();
//console.log("main.js router :",router)
var { response } = require('express');
var app = express()
app.use(express.urlencoded({extended:true}));

var multer_module = require('multer');
var _storage = multer_module.diskStorage({
  destination : function(request,file,cb){
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
  HttpOnly : true,
  secret: "ghdwpaks",
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:24 * 60 * 60 * 1000}
}));

app.get('/',function(request,response) {
  mainpage.home(request,response);
});

app.get('/filepage',function(request,response) {
  filecontrol.uploadpage(request,response);
});

app.post('/upload_process', upload_module.single('userfile'),  function(request,response) {
  //console.log("main app post upload process ",request.file);

  filecontrol.uploadprocess(request,response);
});


app.get('/logout',function(request,response) {
  logout.logout_process(request,response);
});

app.get('/login',function(request,response){
  login.loginpage(request,response); 
});

app.post('/login/login_process',function(request,response){
  login.loginprocess(request,response); 
});

app.get('/ideanote',function(request,response){
  ideanote.home(request,response); 
});

app.get('/ideanote/create',function(request,response){
  ideanote.create(request,response);
});

app.post('/ideanote/create_process',function(request,response){
  ideanote.create_process(request,response);
});

app.post('/ideanote/delete_process/:delete_target_id',function(request,response){
  var delete_target_id = request.params["delete_target_id"];
  ideanote.delete(request,response,delete_target_id);
});

app.get('/user/creating_user' , function(request,response) {
  user.creating_user(request,response);
})

app.post("/user/creating_user_process",function(request,response) {
  user.creating_user_process(request,response);
}) 

app.listen(3000, function() {
  console.log("진입에 성공했습니다.")
})

/*

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    //console.log("url :",url);
    console.log("queryData :",queryData);
    console.log("pathname :",pathname);

    if(pathname === '/'){
      if(queryData.id === undefined) {
        mainpage.home(request,response); 
      }
    } else if (pathname === '/user/creating_user') {
      console.log("creating_user 에 진입하였습니다.")
      user.creating_user(request,response);
    }  else if (pathname === '/user/creating_user_process') {
      console.log("creating_user_process 에 진입하였습니다.")
      user.creating_user_process(request,response);
    } else if (pathname === '/ideanote') {
      console.log("Ideanote 에 진입하였습니다.")
      ideanote.home(request,response);
    } else if (pathname === '/ideanote/create') {
      ideanote.create(request,response);
    }else if(pathname === '/ideanote/create_process'){
      ideanote.create_process(request,response);
    } else if(pathname === '/ideanote/delete'){
      ideanote.delete(request,response,queryData);
    } 
});
app.listen(3000);

*/


