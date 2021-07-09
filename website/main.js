var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var ideanote = require("./lib/ideanote.js");
var mainpage = require("./lib/mainpage.js");
var db = require('./lib/db.js');



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




