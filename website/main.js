var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');

var db = require('./lib/db');



var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log("queryData :",queryData)
    console.log("pathname :",pathname)

    if(pathname === '/'){
      if(queryData.id === undefined) {
        db.query(`SELECT * FROM ideanote`,function(error,ideas){
          var title = 'welcome';
          var description = "hello, node.js";
          var list = template.list(ideas);
          var html = template.HTML(title,list,`<h2>${title}</h2>${description}`,`<a href="/create">create</a>`);
          response.writeHead(200);
          response.end(html);

        });
      } else {
        //console.log("else 진입1")
        db.query(`SELECT * FROM ideanote`,function(erorr,ideas){
          if(erorr) {
            //console.log(erorr)
          }
          //console.log(queryData.id)
          db.query(`SELECT * FROM ideanote WHERE id=${queryData.id};`,function(erorr2,idea) {
            if(erorr2) {
              //console.log(erorr2)
            }
            //console.log(idea[0].title);
            var title = idea[0].title;
            var description = idea[0].description;
            var list = template.list(ideas);
            var html = template.HTML(title,list,`<h2>${title}</h2>${description}`,`<a href="/create">create</a>
            
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${queryData.id}">
              
            </form>`);
            //<input type="submit" value="delete">
            //<a href="/update?id=${queryData.id}">update</a>
            response.writeHead(200);
            response.end(html);
          })
        }) 
      }
    } else if (pathname === '/create') {
      db.query(`SELECT * FROM ideanote`,function(error,ideas){
        //console.log(topics);
        var title = 'CREATE';
        //var description = "hello, node.js";
        //var list = template.list(topics);
        var list = "";
        var html = template.HTML(title,list,`

          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="적을 내용"></p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          ``);
          //`<a href="/create">create</a>`
        response.writeHead(200);
        response.end(html);
      });
    }else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          tempqu = `INSERT INTO ideanote (title, timestamp, creater_id) VALUES (?, NOW(),? );`,[post.title,1]
          console.log("삽입예정 쿼리문 :",tempqu);
          db.query(`INSERT INTO ideanote (title, timestamp, creater_id) VALUES (?, NOW(),? );`,[post.title,1],function(error,result){
            if(error) {
              throw error;
            }
            response.writeHead(302,{location:`/?id=${result.insertId}`});
            response.end();
          })
      });
    } else if(pathname === '/delete'){
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




