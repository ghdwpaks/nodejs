var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var ideanote = require("./lib/ideanote.js");
var db = require('./lib/db.js');



var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log("queryData :",queryData)
    console.log("pathname :",pathname)

    if(pathname === '/'){
      if(queryData.id === undefined) {
        ideanote.home(request,response); 
      } else {
        ideanote.else(Request,response);}
    } else if (pathname === '/create') {
      ideanote.create(request,response);
    }else if(pathname === '/create_process'){
      ideanote.create_process(request,response);


    } else if(pathname === '/deleteprocess'){
      console.log("delete 진입 및 queryData값 :",queryData)
      request.on('data',function(data){
        body = body + data;
      });
      request.on('end',function(){
        var post = qs.parse(body);
        db.query(`DELETE FROM ideanote WHERE id = ?`,[post.id])
        fs.unlink(`data/${filteredId}`,function(error) {
          response.writeHead(302,{location:`/`});
          response.end();
        }) 
      })
    } 
});
app.listen(3000);




