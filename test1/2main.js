var http = require('http');
var fs = require('fs');
var url =  require('url');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;//url.parse(_url,true).query이라는 명령어가, url을 분석함
    
    //console.log("id = " + queryData.id);
    //console.log("name = " + queryData.name);
    var pathname = url.parse(_url,true).pathname;
    console.log(url.parse(_url,true));

    if(pathname === '/'){
    fs.readFile(`data/${queryData.id}.txt`,'utf8',function(err,description){
      if(queryData.id === undefined) {
        //var description = data;
          var title = 'Welcome';
          var description = 'Hello, Node.js';
      } else {
      var title = queryData.id;
      }
      //var description = data;
        var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      response.writeHead(200);
      //console.log(__dirname + _url); 
      response.end(template);
    });
    } else {
      response.writeHead(404);
      response.end('Not Found');
    }
    
    
 
});
app.listen(3000);