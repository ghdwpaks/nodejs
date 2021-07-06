var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var mysql = require('mysql')
var db = mysql.createConnection({
    host:'localhost',
    user:'nodejs',
    password:'111111',
    database:'opentutorials'
});
db.connect();
//var sanitizeHtml = require('sanitize-html');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
        /*
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        //var list = template.list(filelist);
        var html = template.HTML(title,
            `<h2>${title}</h2>${description}`
            );
        */
        db.query('SELECT * FROM topic', function (error, results, fields) {
            if (error) {
                console.log(error)
            };
            //console.log('The solution is: ', results[0].solution);
            console.log(results)
        });
        response.writeHead(200);
        response.end("success");
    /*
      if(queryData.id === undefined){
          
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
          
        });
      } else {
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
              allowedTags:['h1']
            });
            var list = template.list(filelist);
            var html = template.HTML(sanitizedTitle, list,
              `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
              ` <a href="/create">create</a>
                <a href="/update?id=${sanitizedTitle}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${sanitizedTitle}">
                  <input type="submit" value="delete">
                </form>`
            );
            response.writeHead(200);
            response.end(html);
          });
        });
      }
      */
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);




