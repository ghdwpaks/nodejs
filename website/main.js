var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var ideanote = require("./lib/ideanote.js");
var mainpage = require("./lib/mainpage.js");
var user = require("./lib/user.js");
var db = require('./lib/db.js');

var express = require('express');
var { response } = require('express');
var app = express()
app.use(express.urlencoded({extended:true}));

app.get('/',function(request,response){
  mainpage.home(request,response); 
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


